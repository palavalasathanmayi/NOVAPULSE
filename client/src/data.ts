export type NavKey =
  | "command"
  | "rescue"
  | "causes"
  | "stores"
  | "operations"
  | "insights"
  | "simulator"
  | "impact";

export type Customer = {
  id: string;
  name: string;
  area: string;
  orders: number;
  lastOrderDays: number;
  cancellations: number;
  deliveryIssues: number;
  unavailableItems: number;
  supportIssues: number;
  aov: number;
  segment: string;
};

export type Store = {
  id: string;
  name: string;
  area: string;
  health: number;
  inventoryAccuracy: number;
  acceptance: number;
  cancellations: number;
  substitutions: number;
  prepTime: number;
  complaints: number;
  revenue: string;
  focus: string;
};

export type Order = {
  id: string;
  customer: string;
  store: string;
  value: number;
  eta: string;
  status: string;
  risk: "High" | "Medium" | "Watch";
  reason: string;
  rootCause: string;
  action: string;
};

export const sourceMetrics = {
  registeredUsers: { current: "120k", previous: "82k", delta: "+46%", tone: "up" },
  mau: { current: "46k", previous: "39k", delta: "+18%", tone: "up" },
  orders: { current: "38.5k", previous: "31.2k", delta: "+23%", tone: "up" },
  revenue: { current: "₹26.1L", previous: "₹21.8L", delta: "+20%", tone: "up" },
  repeat: { current: "27%", previous: "41%", delta: "−14 pp", tone: "down" },
  cancellation: { current: "11%", previous: "6%", delta: "+5 pp", tone: "down" },
  delivery: { current: "37 min", previous: "29 min", delta: "+8 min", tone: "down" },
  tickets: { current: "5,900", previous: "3,100", delta: "+90%", tone: "down" },
  promo: { current: "₹17L", previous: "₹9.5L", delta: "+79%", tone: "down" },
} as const;

export const trendData = [
  { month: "Apr", users: 82, orders: 31.2, repeat: 41, delivery: 29 },
  { month: "May", users: 87, orders: 32.5, repeat: 39, delivery: 30 },
  { month: "Jun", users: 94, orders: 34.1, repeat: 37, delivery: 31 },
  { month: "Jul", users: 101, orders: 35.2, repeat: 34, delivery: 33 },
  { month: "Aug", users: 112, orders: 36.9, repeat: 30, delivery: 35 },
  { month: "Sep", users: 120, orders: 38.5, repeat: 27, delivery: 37 },
];

const baseCustomers: Customer[] = [
  { id: "CUS-2048", name: "Priya Sharma", area: "MVP Nagar", orders: 4, lastOrderDays: 18, cancellations: 1, deliveryIssues: 1, unavailableItems: 1, supportIssues: 1, aov: 612, segment: "High risk · 2nd-order window" },
  { id: "CUS-1982", name: "Arjun Mehta", area: "Kalyan West", orders: 2, lastOrderDays: 26, cancellations: 0, deliveryIssues: 1, unavailableItems: 1, supportIssues: 0, aov: 474, segment: "At risk · cooling" },
  { id: "CUS-1775", name: "Meera Iyer", area: "MVP Nagar", orders: 7, lastOrderDays: 6, cancellations: 0, deliveryIssues: 0, unavailableItems: 0, supportIssues: 0, aov: 538, segment: "Healthy · multi-category" },
  { id: "CUS-1654", name: "Rohan Das", area: "Andheri East", orders: 3, lastOrderDays: 14, cancellations: 1, deliveryIssues: 0, unavailableItems: 1, supportIssues: 1, aov: 422, segment: "Watch · reliability friction" },
  { id: "CUS-1540", name: "Ananya Rao", area: "Indiranagar", orders: 5, lastOrderDays: 9, cancellations: 0, deliveryIssues: 1, unavailableItems: 0, supportIssues: 0, aov: 691, segment: "Watch · delivery sensitivity" },
];

export const customers: Customer[] = [
  ...baseCustomers,
  ...Array.from({ length: 24 }, (_, index) => ({
    id: `CUS-${1400 - index}`,
    name: ["Kabir", "Nisha", "Vikram", "Sara", "Dev"][index % 5] + " " + ["Kapoor", "Joshi", "Sethi", "Menon", "Bose"][index % 5],
    area: ["MVP Nagar", "Kalyan West", "Andheri East", "Indiranagar"][index % 4],
    orders: 1 + (index % 8),
    lastOrderDays: 2 + (index * 7) % 34,
    cancellations: index % 4 === 0 ? 1 : 0,
    deliveryIssues: index % 3 === 0 ? 1 : 0,
    unavailableItems: index % 5 === 0 ? 1 : 0,
    supportIssues: index % 6 === 0 ? 1 : 0,
    aov: 390 + (index * 37) % 330,
    segment: index % 3 === 0 ? "Watch" : "Active",
  })),
];

export const stores: Store[] = [
  { id: "STR-041", name: "Local Mart", area: "MVP Nagar", health: 61, inventoryAccuracy: 68, acceptance: 77, cancellations: 14, substitutions: 11, prepTime: 12, complaints: 42, revenue: "₹3.2L", focus: "Inventory freshness" },
  { id: "STR-018", name: "Green Basket", area: "Kalyan West", health: 84, inventoryAccuracy: 91, acceptance: 96, cancellations: 4, substitutions: 3, prepTime: 8, complaints: 16, revenue: "₹4.8L", focus: "Scale winner" },
  { id: "STR-063", name: "Daily Needs Pharmacy", area: "Andheri East", health: 72, inventoryAccuracy: 79, acceptance: 88, cancellations: 8, substitutions: 5, prepTime: 11, complaints: 28, revenue: "₹2.6L", focus: "Busy-hour capacity" },
  { id: "STR-027", name: "Bake House", area: "Indiranagar", health: 89, inventoryAccuracy: 94, acceptance: 97, cancellations: 3, substitutions: 2, prepTime: 7, complaints: 10, revenue: "₹2.1L", focus: "Scale winner" },
  { id: "STR-055", name: "Corner Pantry", area: "MVP Nagar", health: 66, inventoryAccuracy: 71, acceptance: 81, cancellations: 12, substitutions: 9, prepTime: 14, complaints: 35, revenue: "₹1.9L", focus: "Replenishment planning" },
];

export const orders: Order[] = [
  { id: "NC10482", customer: "Priya Sharma", store: "Local Mart", value: 612, eta: "12:42", status: "Picking", risk: "High", reason: "Delivery delay + unavailable item", rootCause: "Stale inventory snapshot", action: "Contact store → replace item → update inventory → notify customer" },
  { id: "NC10479", customer: "Arjun Mehta", store: "Local Mart", value: 474, eta: "12:31", status: "Delayed", risk: "High", reason: "Delivery estimate breached", rootCause: "Busy-period store rejection", action: "Reassign courier and send delay update" },
  { id: "NC10471", customer: "Rohan Das", store: "Corner Pantry", value: 422, eta: "12:18", status: "Awaiting store", risk: "Medium", reason: "Acceptance pending", rootCause: "Capacity signal missing", action: "Prompt store capacity check" },
  { id: "NC10466", customer: "Ananya Rao", store: "Daily Needs Pharmacy", value: 691, eta: "12:06", status: "Out for delivery", risk: "Watch", reason: "Long route + fragile item", rootCause: "Delivery zone load", action: "Monitor ETA and proactive notification" },
  { id: "NC10451", customer: "Meera Iyer", store: "Green Basket", value: 538, eta: "11:49", status: "Delivered", risk: "Watch", reason: "Post-delivery refund question", rootCause: "Refund status lag", action: "Confirm refund timeline" },
];

export const rootCauseNodes = [
  { label: "Customer", value: "Priya Sharma", meta: "4 orders · 18 days inactive", tone: "amber" },
  { label: "Order", value: "#NC10482", meta: "₹612 · cancelled", tone: "coral" },
  { label: "Product", value: "Aashirvaad Atta 5kg", meta: "Unavailable at pick", tone: "amber" },
  { label: "Inventory", value: "Snapshot stale", meta: "Last updated 2 days ago", tone: "coral" },
  { label: "Store", value: "Local Mart", meta: "Health 61 · MVP Nagar", tone: "coral" },
  { label: "Delivery", value: "ETA breached", meta: "37 min average · +8 min", tone: "coral" },
  { label: "Support", value: "Refund request", meta: "Ticket opened after failure", tone: "amber" },
  { label: "Retention risk", value: "HIGH", meta: "Next order at risk", tone: "coral" },
];

export const insights = [
  { id: 1, tag: "RETENTION", title: "Growth is hiding a second-order cliff.", evidence: "New users grew from 82k to 120k, but only 31% place a second order within 30 days; repeat purchase fell from 41% to 27%.", implication: "NOVA CART is paying to refill a leaky funnel instead of building a reliable habit.", action: "Prioritize the first 30 days: detect friction after order one and recover before the next decision." },
  { id: 2, tag: "RELIABILITY", title: "Availability and delivery are one connected problem.", evidence: "35% of cancellations cite product unavailability, 27% cite delivery delay, and 39% of partners say inventory maintenance is too hard.", implication: "Customer pain and partner effort meet at the local inventory layer.", action: "Surface stale inventory and busy-period capacity as operator work, not post-failure support work." },
  { id: 3, tag: "EFFICIENCY", title: "More promotion is not the same as more retention.", evidence: "Promotional spend rose from ₹9.5L to ₹17L while repeat purchase declined; 44% of coupons are never redeemed.", implication: "A 30% budget increase could amplify low-quality acquisition if reliability stays unchanged.", action: "Replace blanket discounts with reliability recovery and measure exposed vs control cohorts." },
];

export function calculateRisk(customer: Customer) {
  const components = [
    { label: "Recent inactivity", weight: 30, score: Math.min(30, Math.round((customer.lastOrderDays / 21) * 30)), detail: `${customer.lastOrderDays} days since last order` },
    { label: "Cancellation history", weight: 25, score: Math.min(25, customer.cancellations * 13), detail: `${customer.cancellations} cancellation in history` },
    { label: "Delivery problems", weight: 20, score: Math.min(20, customer.deliveryIssues * 20), detail: `${customer.deliveryIssues} delayed delivery signal` },
    { label: "Unavailable products", weight: 15, score: Math.min(15, customer.unavailableItems * 15), detail: `${customer.unavailableItems} availability issue` },
    { label: "Support / refund issues", weight: 10, score: Math.min(10, customer.supportIssues * 10), detail: `${customer.supportIssues} support interaction` },
  ];
  const score = Math.min(100, components.reduce((sum, item) => sum + item.score, 0));
  const level = score >= 70 ? "HIGH" : score >= 45 ? "MEDIUM" : "LOW";
  return { score, level, components, drivers: components.filter(item => item.score >= item.weight * 0.45).sort((a, b) => b.score - a.score) };
}

export function scenarioEstimate(input: { promo: number; delivery: number; cancellation: number; inventory: number; retention: number }) {
  const reliabilityLift = Math.max(0, (input.inventory - 68) * 0.08 + (37 - input.delivery) * 0.55 + (11 - input.cancellation) * 2.1);
  const retentionEstimate = Math.min(44, Math.max(input.retention, input.retention + reliabilityLift * 0.22));
  const supportEstimate = Math.max(3100, Math.round(5900 - (input.inventory - 68) * 19 - (37 - input.delivery) * 48));
  const promoEfficiency = Math.max(0.4, Math.min(1.3, 0.63 * (retentionEstimate / 27) * (17 / input.promo)));
  return { retentionEstimate, supportEstimate, promoEfficiency, reliabilityLift };
}
