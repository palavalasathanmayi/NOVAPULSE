# NOVA PULSE

**AI-powered local-commerce retention and reliability command center for NOVA CART.**

NOVA CART is growing, but reliability and customer retention are deteriorating. NOVA PULSE connects customer, order, product, inventory, store, delivery, and support evidence into one operating loop:

> **Detect → Explain → Recommend → Act → Resolve → Measure**

## Problem and evidence

**CASE DATA** from the challenge: registered users 82k → 120k, MAU 39k → 46k, orders 31.2k → 38.5k, AOV ₹452 → ₹486, revenue ₹21.8L → ₹26.1L, while repeat purchase fell 41% → 27%, delivery rose 29 → 37 minutes, cancellations rose 6% → 11%, support tickets rose 3,100 → 5,900/month, and promotional spend rose ₹9.5L → ₹17L/month.

The working hypothesis is that growth quality is deteriorating because availability, store capacity, delivery, and support friction are leaking the second order.

## Product and rescue workflow

The flagship **Priya Sharma / NC10482 / Local Mart** case demonstrates:

1. Transparent prototype rule-based risk scoring.
2. Evidence chain: Customer → Order → Product → Inventory → Store → Delivery → Support → Retention Risk.
3. Root-cause-specific intervention recommendation.
4. Shared state mutation across rescue, store, operations, and impact views.
5. Recalculated customer risk from updated signals after recovery.
6. Control-vs-intervention measurement with explicit synthetic/prototype labels.

**DEMO DATA** is synthetic and clearly separated from challenge case metrics. **PROTOTYPE ESTIMATES** are illustrative decision-support calculations, not achieved NOVA CART outcomes.

## Architecture and data model

- React 19 + Vite + TypeScript
- Express server with managed platform helpers
- Drizzle/MySQL starter schema retained for platform authentication/database capability
- Typed models for Customer, Order, Store, RiskAssessment, RootCause, Intervention, Scenario, AIInsight, and ImpactMeasurement
- Pure business helpers for risk calculation, recovery signal mutation, root-cause mapping, scenario validation, and synthetic lift
- App-owned rescue-case state with reset/remount support

## Risk engine

Weights: inactivity 30%, cancellation history 25%, delivery problems 20%, unavailable products 15%, support/refund issues 10%.

Bands: 0–39 Low, 40–69 Medium, 70–100 High. Inputs reject missing records, NaN, Infinity, negative values, and out-of-range scenario values. The UI labels this as a **Prototype rule-based risk score**, never production ML.

## AI architecture

AI Insights provides structured evidence, reasoning, intervention, and KPI framing. When no AI provider is configured, the UI uses a clearly labeled **AI reasoning: deterministic prototype fallback** grounded in available case/demo data. No private API key is exposed to the browser.

## Google Services

| Google service | Purpose | Data used | Environment variables | Security restrictions | Fallback |
|---|---|---|---|---|---|
| Google Maps Platform proxy | Optional local-store geography, coverage, delivery-zone analysis | Server-side map queries only | Managed server-side map configuration; never commit keys | Keep keys server-side; restrict browser keys by origin/API where applicable | The rescue workflow remains fully functional in local demo mode without Maps |

The repository retains the managed server-side Maps helper at `server/_core/map.ts`; the core demo does not invent a fake Maps feature merely for evaluation points.

## Security and accessibility

Private credentials remain server-side through the managed public configuration boundary. No unsafe HTML rendering is used in the NOVA PULSE app. Customer search and scenario controls have accessible labels, keyboard-native buttons/inputs, visible focus styling, and responsive mobile behavior.

## Testing and quality gates

```bash
pnpm check
pnpm test
pnpm build
```

The test suite covers platform security behavior plus risk drivers, score bounds, 40/70 boundaries, invalid inputs, scenario validation, root-cause mapping, recovery mutation, state-isolated customer signals, and synthetic impact lift.

## Demo flow

Click **Start Judge Demo** to enter the Priya rescue case, then follow Diagnose → Investigate → Select Priya → Explain → Recommend → Execute → Resolve → Measure. **Reset Demo** restores the initial rescue state and remounts the UI.

## Feasibility

The implementation preserves the ₹25L six-month roadmap: Data layer ₹6L, Risk engine ₹7L, Operations workflows ₹8L, Pilot ₹4L.

## Setup

```bash
pnpm install
pnpm dev
```

The development server listens on `PORT` (default 3000). Do not commit `.env` files or private credentials. Managed deployment configuration is controlled through `webdev.config` and the canonical managed Git repository.
