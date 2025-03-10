// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
  test("renders the header title", () => {
    render(<App />);
    expect(
      screen.getByText(
        /Cloud Load Balancing Simulation using Round Robin Algorithm/i
      )
    ).toBeInTheDocument();
  });

  test("renders the toggle button with 'Hide' initially", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: /Hide/i })).toBeInTheDocument();
  });

  test("left panel is visible by default", () => {
    render(<App />);
    expect(screen.getByText(/Hi There!!!/i)).toBeInTheDocument();
  });

  test("toggling the button hides and shows the left panel", () => {
    render(<App />);
    const toggleButton = screen.getByRole("button", { name: /Hide/i });
    const panelText = screen.getByText(/Hi There!!!/i);

    expect(panelText).toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(panelText).not.toBeInTheDocument(); // Note: Might need adjustment (see below)
    expect(toggleButton).toHaveTextContent(/Show/i);
    fireEvent.click(toggleButton);
    expect(panelText).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent(/Hide/i);
  });

  test("renders the VM input form and Create Instances button", () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/eg. 5/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create Instances/i })
    ).toBeInTheDocument();
  });
});
