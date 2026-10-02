# NOVA PULSE — Implementation & Design Plan

## Product diagnosis

NOVA CART is growing on acquisition-led metrics while the quality of the customer relationship is deteriorating. Registered users (+46%), MAU (+18%), orders (+23%), and revenue (+20%) all increased, but repeat purchase fell from 41% to 27%, delivery time rose from 29 to 37 minutes, cancellations rose from 6% to 11%, and support tickets rose from 3,100 to 5,900/month. The connecting evidence is operational reliability: 35% of cancellations are caused by unavailable products, 27% by delivery delay, 39% of partners say inventory maintenance is too hard, and inventory freshness ranges from multiple updates/day to once every 1–3 days.

**Evidence → insight → root cause → business problem → product opportunity**

- Evidence: first order completion is 54%, but only 31% place a second order in 30 days; 3-order customers have 72% next-month probability.
- Insight: NOVA CART has a narrow, high-value retention window after the first or second order.
- Root cause: customer recovery is disconnected from stale inventory, store capacity, delivery reliability, and support signals.
- Business problem: acquisition spend is masking a leaky customer experience; increasing marketing alone adds more users to the same reliability failure loop.
- Product opportunity: NOVA PULSE connects local-store inventory intelligence to transparent customer-risk intervention and operator workflows.

## Implementation approach

A frontend-first, deterministic prototype uses React + Vite + TypeScript, Recharts for trends, Framer Motion for restrained transitions, and the existing managed Express runtime. All demo calculations are local and transparent; no external AI API is required. AI value is represented through structured, evidence-grounded explanations and action plans with deterministic fallbacks. The app uses seeded synthetic records plus the exact source case aggregates, clearly labeled in the UI.

The main interaction loop is INPUT → PROCESSING/LOGIC → OUTPUT → ACTION:

- Customer selection → weighted rule-based risk score → drivers/recommendation → mark actioned.
- Store selection → health metrics/root causes → generated action plan → mark plan active.
- Order selection → risk analysis → recommended resolution → actioned/resolved/escalated status.
- Scenario controls → deterministic assumption model → current vs scenario outcome → apply improved-reliability preset.

## Project structure

- `client/src/App.tsx`: shell, route-aware section rendering, workflows, and visual components.
- `client/src/data.ts`: source case metrics, synthetic records, transparent scoring, and scenario helpers.
- `client/src/index.css`: NOVA PULSE design tokens, layout, charts, tables, responsive rules, and motion.
- `client/public/manus-routes.json`: declared page routes for the managed preview.
- `plan.md`: this product and design record.

## Design direction

- **Design movement:** editorial operations control room — a quiet, premium dark workspace that feels closer to an air-traffic control console than a SaaS template.
- **Core principles:** evidence first; calm under pressure; progressive disclosure; every insight ends in an operator action.
- **Color philosophy:** ink navy provides focus, bone-white type provides executive readability, and NOVA amber is the ownable signal color for attention/action. Mint is reserved for reliability wins; coral is reserved for friction and risk.
- **Layout paradigm:** fixed command rail + wide canvas with a compact briefing header, asymmetric evidence panels, and side-by-side “signal / decision” groupings. Avoid centered marketing grids.
- **Signature elements:** amber pulse-dot status marker, thin signal rails beside metrics, and a recurring “source case / synthetic records” provenance label.
- **Interaction philosophy:** selection changes context in place, actions visibly change state, and calculations expose their assumptions instead of hiding behind AI claims.
- **Animation:** 160–220ms ease-out fades and lift on cards, a low-key pulse on active signal markers, and no looping decorative motion.
- **Typography:** Inter for interface/data with a heavier condensed-feeling weight for display numbers; sentence-case headlines with short, editorial subheads.
- **Brand essence:** “The reliability layer for local commerce retention.” Personality: forensic, grounded, decisive.
- **Brand voice:** Headlines say what changed and why it matters. CTAs name the next operator move. Example lines: “Growth is up. Confidence is down.” / “Recover the relationship, not just the order.”
- **Wordmark & logo:** a split amber pulse mark before NOVA PULSE, representing a customer signal crossing an operations signal.
- **Signature brand color:** NOVA amber `#F5B84B`.

## Business impact and feasibility

NOVA PULSE stays inside the additional ₹25 lakh / six-month envelope by reusing the order database, customer database, delivery tracking, partner dashboard, and coupon system. The roadmap shown in-product is: Phase 1 Data integration + dashboards (₹6L); Phase 2 Risk + root-cause engine (₹7L); Phase 3 Store + operations workflows (₹8L); Phase 4 Pilot + measurement (₹4L). The product reports baselines and measurement methods, not fabricated achieved results. Recommended pilot measurement is exposed vs control cohorts for repeat purchase, cancellation, delivery time, inventory accuracy, acceptance, support volume, and promotional efficiency.

## Judge-ready submission upgrade

The final submission layer adds an executive **Start Judge Demo** mode that guides a judge through business problem, customer risk, root cause, recommended intervention, store action, order resolution, and impact measurement. The navigation now includes an **Impact** page with KPI baselines, pilot targets, mechanisms, treatment-vs-control design, and measurement criteria. AI Insights exposes an **Analyze with AI** action with a deterministic fallback that explicitly says “Based on available case data...” when no external AI service is available. Root-cause nodes now follow Customer → Order → Product → Inventory → Store → Delivery → Support → Retention Risk, and Operations exposes a lightweight activity timeline. Intervention copy is root-cause dependent: availability, delivery, store capacity, support, or targeted incentive.

## Final competition upgrade

Start Judge Demo now navigates directly to the Priya Sharma rescue workspace before opening the guided executive investigation. AI Insights now includes an always-visible **AI Rescue Analysis** panel with prototype risk 82/100, HIGH priority, 87% prototype confidence, stale inventory as the primary root cause, four supporting signals, evidence-grounded explanation, a concrete replacement/update/notify/monitor intervention, and repeat purchase plus secondary KPI framing.
