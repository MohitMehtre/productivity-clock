import { describe, it, expect } from "vitest";
import { formatTime } from "./time";

describe("formatTime", () => {
  it("formats zero as 00:00:00", () => {
    expect(formatTime(0)).toBe("00:00:00");
  });

  it("floors sub-second values down to 00:00:00", () => {
    expect(formatTime(999)).toBe("00:00:00");
  });

  it("formats whole seconds", () => {
    expect(formatTime(1000)).toBe("00:00:01");
    expect(formatTime(59_000)).toBe("00:00:59");
  });

  it("rolls seconds into minutes", () => {
    expect(formatTime(60_000)).toBe("00:01:00");
    expect(formatTime(90_000)).toBe("00:01:30");
  });

  it("rolls minutes into hours", () => {
    expect(formatTime(3_600_000)).toBe("01:00:00");
    expect(formatTime(3_661_000)).toBe("01:01:01");
  });

  it("supports hours beyond 24 without wrapping", () => {
    expect(formatTime(25 * 3_600_000)).toBe("25:00:00");
  });

  it("floors partial seconds toward zero", () => {
    expect(formatTime(1_500)).toBe("00:00:01");
  });
});
