import { describe, expect, it } from "vitest";
import { applyRecoverySignals, calculateRisk, calculateSyntheticLift, customers, mapRootCause, scenarioEstimate, type Customer } from "./data";

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
    expect(result.components.map(component => component.score)).toEqual([0, 24, 20, 15, 10]);
  });

  it("supports minimum and maximum scores", () => {
    expect(calculateRisk(customer()).score).toBe(0);
    expect(calculateRisk(customer({ lastOrderDays: 999, cancellations: 99, deliveryIssues: 99, unavailableItems: 99, supportIssues: 99 })).score).toBe(100);
  });

  it("classifies the 40-point boundary as medium and 70 as high", () => {
    expect(calculateRisk(customer({ lastOrderDays: 21, supportIssues: 1 })).level).toBe("MEDIUM");
    expect(calculateRisk(customer({ lastOrderDays: 18, cancellations: 0, unavailableItems: 1, supportIssues: 1, deliveryIssues: 1 })).level).toBe("HIGH");
  });

  it("rejects invalid numeric customer inputs", () => {
    expect(() => calculateRisk(customer({ lastOrderDays: -1 }))).toThrow("Invalid customer field: lastOrderDays");
    expect(() => calculateRisk(customer({ cancellations: Number.NaN }))).toThrow("Invalid customer field: cancellations");
    expect(() => calculateRisk(undefined as never)).toThrow("Invalid customer record");
  });
});

describe("rescue workflow helpers", () => {
  it("maps operational signals to evidence-chain causes", () => {
    expect(mapRootCause("Product unavailable")).toBe("Inventory");
    expect(mapRootCause("Delivery delay")).toBe("Delivery");
    expect(mapRootCause("Store rejection")).toBe("Store");
    expect(mapRootCause("Refund issue")).toBe("Support");
    expect(mapRootCause("Repeated inactivity")).toBe("Retention");
  });

  it("mutates only the selected customer signals during recovery", () => {
    const recovered = applyRecoverySignals(customer({ lastOrderDays: 18, cancellations: 1, deliveryIssues: 1, unavailableItems: 1, supportIssues: 1 }));
    expect(calculateRisk(recovered).score).toBe(25);
    expect(recovered.id).toBe("TEST-1");
  });

  it("recalculates the flagship Priya case from 82 to a low-risk state", () => {
    const priya = customers.find(item => item.id === "CUS-2048");
    if (!priya) throw new Error("Priya fixture missing");
    expect(calculateRisk(priya).score).toBe(82);
    expect(calculateRisk(applyRecoverySignals(priya)).score).toBe(25);
  });

  it("calculates synthetic percentage-point lift without claiming a result", () => {
    expect(calculateSyntheticLift(27, 31.4)).toBe(4.4);
    expect(() => calculateSyntheticLift(101, 31)).toThrow("Invalid experiment percentage");
  });
});

describe("scenarioEstimate", () => {
  it("rejects NaN and out-of-range scenario inputs", () => {
    expect(() => scenarioEstimate({ promo: Number.NaN, delivery: 37, cancellation: 11, inventory: 68, retention: 27 })).toThrow("Invalid scenario input: promo");
    expect(() => scenarioEstimate({ promo: 17, delivery: 37, cancellation: 11, inventory: 101, retention: 27 })).toThrow("Invalid scenario input: inventory");
    expect(() => scenarioEstimate(undefined as never)).toThrow("Invalid scenario input");
  });
});
