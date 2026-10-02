import { describe, expect, it } from "vitest";
import { calculateRisk, scenarioEstimate, type Customer } from "./data";

const customer = (overrides: Partial<Customer> = {}): Customer => ({
  id: "TEST-1",
  name: "Test Customer",
  area: "MVP Nagar",
  orders: 1,
  lastOrderDays: 0,
  cancellations: 0,
  deliveryIssues: 0,
  unavailableItems: 0,
  supportIssues: 0,
  aov: 450,
  segment: "Test",
  ...overrides,
});

describe("calculateRisk", () => {
  it("applies the inactivity driver at its 30-point weight", () => {
    expect(calculateRisk(customer({ lastOrderDays: 21 })).components[0]).toMatchObject({ label: "Recent inactivity", score: 30, weight: 30 });
  });

  it("applies cancellation, delivery, availability, and support weights", () => {
    const result = calculateRisk(customer({ cancellations: 2, deliveryIssues: 1, unavailableItems: 1, supportIssues: 1 }));
    expect(result.components.map(component => component.score)).toEqual([0, 25, 20, 15, 10]);
  });

  it("supports minimum and maximum scores", () => {
    expect(calculateRisk(customer()).score).toBe(0);
    expect(calculateRisk(customer({ lastOrderDays: 999, cancellations: 99, deliveryIssues: 99, unavailableItems: 99, supportIssues: 99 })).score).toBe(100);
  });

  it("classifies the 40-point boundary as medium and 70 as high", () => {
    expect(calculateRisk(customer({ lastOrderDays: 21, supportIssues: 1 })).level).toBe("MEDIUM");
    expect(calculateRisk(customer({ lastOrderDays: 21, cancellations: 2, unavailableItems: 1 })).level).toBe("HIGH");
  });

  it("rejects invalid numeric customer inputs", () => {
    expect(() => calculateRisk(customer({ lastOrderDays: -1 }))).toThrow("Invalid customer field: lastOrderDays");
    expect(() => calculateRisk(customer({ cancellations: Number.NaN }))).toThrow("Invalid customer field: cancellations");
    expect(() => calculateRisk(undefined as never)).toThrow("Invalid customer record");
  });
});

describe("scenarioEstimate", () => {
  it("rejects NaN and out-of-range scenario inputs", () => {
    expect(() => scenarioEstimate({ promo: Number.NaN, delivery: 37, cancellation: 11, inventory: 68, retention: 27 })).toThrow("Invalid scenario input: promo");
    expect(() => scenarioEstimate({ promo: 17, delivery: 37, cancellation: 11, inventory: 101, retention: 27 })).toThrow("Invalid scenario input: inventory");
    expect(() => scenarioEstimate(undefined as never)).toThrow("Invalid scenario input");
  });
});
