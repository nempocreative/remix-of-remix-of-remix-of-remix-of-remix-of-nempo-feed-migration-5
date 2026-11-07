import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideThirtyOneBackground } from "./SlideThirtyOneBackground";

// Each MusiComedy slide must keep its own artwork: 31 = performers,
// 32 = cafe atmosphere, 33 = neither (reminder card only).
describe("SlideThirtyOneBackground variants", () => {
  it("shows the performers only in talent mode", () => {
    const { container } = render(<SlideThirtyOneBackground mode="talent" />);
    expect(container.querySelector('img[alt*="pengisi acara"]')).not.toBeNull();
    expect(container.querySelectorAll(".musicomedy-cafe-card")).toHaveLength(0);
  });

  it("shows the cafe photos and no performers in cafe mode", () => {
    const { container } = render(<SlideThirtyOneBackground mode="cafe" />);
    expect(container.querySelectorAll(".musicomedy-cafe-card").length).toBeGreaterThan(0);
    expect(container.querySelector('img[alt*="pengisi acara"]')).toBeNull();
  });

  it("shows neither performers nor cafe photos in plain mode", () => {
    const { container } = render(<SlideThirtyOneBackground mode="plain" />);
    expect(container.querySelector('img[alt*="pengisi acara"]')).toBeNull();
    expect(container.querySelectorAll(".musicomedy-cafe-card")).toHaveLength(0);
    // the shared frame and title stay on every variant
    expect(container.querySelector('img[alt^="Bingkai MusiComedy"]')).not.toBeNull();
    expect(container.querySelector('img[alt="MusiComedy Night"]')).not.toBeNull();
  });
});
