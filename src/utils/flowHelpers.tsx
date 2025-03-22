import dagre from "dagre";
import { Node, Edge } from "reactflow";

/**
 * The hierarchy is constructed from top to bottom:
 * 1. Single datacenter node at the top level with aggregated resource utilization
 * 2. VM nodes in the middle with connections to their parent datacenter
 * 3. Cloudlet nodes at the bottom with connections to their parent VMs
 *
 */
export const generateLayout = (simulationData: any, workloadType: string) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "TB", nodesep: 70, ranksep: 100 });

  // Create datacenter node with aggregate util metrics
  if (simulationData?.hostResourceUtilization) {
    nodes.push({
      id: "datacenter-1",
      type: "datacenter",
      data: {
        label: "Datacenter",
        utilization: {
          cpu:
            simulationData.hostResourceUtilization.averageCpuUtilization || 0,
          ram:
            simulationData.hostResourceUtilization.averageRamUtilization || 0,
          bandwidth:
            simulationData.hostResourceUtilization.averageBwUtilization || 0,
        },
      },
      position: { x: 0, y: 0 },
    });
  }

  // Locate workload-specific results pero based on workload type parameter
  const resultsKey = `${workloadType.toLowerCase()}Results`;
  const results = simulationData?.[resultsKey] || [];

  // First pass: identify unique VMs and their utilization metrics
  const vmMap = new Map();
  results.forEach((cloudlet: any) => {
    if (!vmMap.has(cloudlet.vmId)) {
      const vmUtilKey = `vmResourceUtilization${workloadType}`;
      const vmUtil = simulationData[vmUtilKey];
      vmMap.set(cloudlet.vmId, {
        id: `vm-${cloudlet.vmId}`,
        utilization: {
          cpu: vmUtil?.[`averageCpuUtilization${workloadType}`] || 0,
          ram: vmUtil?.[`averageRamUtilization${workloadType}`] || 0,
          bandwidth: vmUtil?.[`averageBwUtilization${workloadType}`] || 0,
        },
      });
    }
  });

  // Create VM nodes and connect them to datacenter
  // just do a one -one mapping like a pass since walang vm details sa json
  vmMap.forEach((vm, vmId) => {
    nodes.push({
      id: vm.id,
      type: "vm",
      data: {
        label: `VM ${vmId}`,
        status: "Active",
        utilization: vm.utilization,
      },
      position: { x: 0, y: 0 },
    });
    edges.push({
      id: `datacenter-${vm.id}`,
      source: "datacenter-1",
      target: vm.id,
      animated: true,
    });
  });

  // Create cloudlet nodes and connect them to their parent VMs
  results.forEach((cloudlet: any, index: number) => {
    const cloudletId = `cloudlet-${index + 1}`;
    nodes.push({
      id: cloudletId,
      type: "cloudlet",
      data: {
        label: `Cloudlet ${cloudlet.cloudletId || index}`,
        executionTime: cloudlet.cpuTime || 0,
        status: cloudlet.status || "SUCCESS",
      },
      position: { x: 0, y: 0 },
    });
    edges.push({
      id: `vm-${cloudlet.vmId}-${cloudletId}`,
      source: `vm-${cloudlet.vmId}`,
      target: cloudletId,
      animated: true,
    });
  });

  // Configure node dimensions
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 172, height: 80 });
  });

  // Register all edges in the layout graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate optimal node positions
  dagre.layout(dagreGraph);

  // Apply calculated positions to nodes,
  // centering each node on its position point when simulation start
  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - nodeWithPosition.width / 2,
      y: nodeWithPosition.y - nodeWithPosition.height / 2,
    };
  });

  return { nodes, edges };
};
