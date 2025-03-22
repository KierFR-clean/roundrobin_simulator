import React from "react";

interface HelpButtonProps {
  onClick: () => void;
}

const HelpButton: React.FC<HelpButtonProps> = ({ onClick }) => {
  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      {/* Tooltip */}
      <div
        style={{
          position: "absolute",
          bottom: "100%",
          right: "50%",
          transform: "translateX(50%)",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          color: "white",
          padding: "6px 12px",
          borderRadius: "6px",
          fontSize: "14px",
          whiteSpace: "nowrap",
          opacity: 0,
          visibility: "hidden",
          transition: "opacity 0.2s ease-in-out, visibility 0.2s ease-in-out",
        }}
        className="tooltip"
      >
        Help Simulation
      </div>

      {/* Help Button */}
      <button
        onClick={onClick}
        style={{
          width: "64px",
          height: "64px",
          backgroundColor: "#2FAEFE",
          color: "white",
          fontSize: "28px", // Adjust font size as needed
          fontWeight: "bold",
          borderRadius: "50%",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "pointer",
          position: "relative",
          transition: "box-shadow 0.3s ease-in-out",
          lineHeight: "64px", // Ensure the text is vertically centered
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.3)";
          const tooltip = e.currentTarget.parentElement?.querySelector(
            ".tooltip"
          ) as HTMLElement;
          if (tooltip) {
            tooltip.style.opacity = "1";
            tooltip.style.visibility = "visible";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
          const tooltip = e.currentTarget.parentElement?.querySelector(
            ".tooltip"
          ) as HTMLElement;
          if (tooltip) {
            tooltip.style.opacity = "0";
            tooltip.style.visibility = "hidden";
          }
        }}
      >
        ?
      </button>
    </div>
  );
};

export default HelpButton;
