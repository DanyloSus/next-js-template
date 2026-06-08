import { describe, expect, it, vi } from "vitest";

import { renderApp, screen } from "@/testing/test-utils";

import { Button } from "./button";

describe("Button", () => {
  it("renders its children", () => {
    renderApp(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("calls onClick when pressed", async () => {
    const onClick = vi.fn();
    const { user } = renderApp(<Button onClick={onClick}>Press</Button>);
    await user.click(screen.getByRole("button", { name: /press/i }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled while loading", () => {
    renderApp(<Button isLoading>Saving</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
