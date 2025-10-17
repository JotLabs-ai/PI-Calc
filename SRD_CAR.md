# Software Requirements Document (SRD)
**Project:** Car Accident Settlement Calculator Landing/CTA Page  
**Owner:** JotLabs / Browne Law Group  
**Version:** 1.0

---

## 1. Purpose
Deliver a **car-accident–focused** conversion landing page with a 9‑category calculator. Users either enter **known medical bills** or provide **injury/treatment details**. The app computes a **single total estimate** (wide-range logic collapsed deterministically). Other PI calculators are visible but **disabled** (“Coming soon”).

## 2. Scope
**In scope**
- Route `/car-accident-calculator` (landing/CTA).
- 9 categories with Yes/No under headings:
  1) Soft tissue  
  2) Specialists  
  3) Pain management (injections)  
  4) Diagnostics (X‑ray/MRI/CT)  
  5) Broken bones  
  6) Wage loss  
  7) Surgery  
  8) Comparative fault  
  9) Wrongful death
- Single total estimate (no subtotals shown).
- Config‑driven ranges/multipliers.
- Disabled tabs for other PI types.
- Unit tests for calc; Storybook for UI.

**Out of scope (v1)**
- CRM integration, auth, data persistence, i18n.

## 3. Users & Goals
- **Injured driver/passenger**: get a quick estimate and consider contacting firm.
- **Intake team**: generate leads; understand user’s self‑reported context.

## 4. Functional Requirements
### 4.1 Category Logic (as provided)
1. **Soft tissue**
   - Bills-known: `medical bills × (1.5–2.5)`  
   - Injury-estimate:  
     - Chiro: `months × $3–5k × (1.5–2.5)`  
     - Doctor visits: `visits × $150–$300 × (1.5–2.5)`
2. **Specialists**
   - Option A: `visits × $450–$600 × (2–4)`  
   - Option B: `visits × $900–$1,200`
3. **Pain management (injections)**
   - Conservative: `# × $2,000–$5,000`  
   - Aggressive: `# × $4,000–$20,000`
4. **Diagnostics**
   - Multiplier style:  
     - X‑ray: `# × $75–$200 × (2–4)`  
     - MRI:  `# × $1,500–$4,000 × (2–4)`  
     - CT:   `# × $2,500–$4,000 × (2–4)`  
   - Flat style:  
     - X‑ray: `# × $150–$800`  
     - MRI:  `# × $3,000–$16,000`  
     - CT:   `# × $5,000–$16,000`
5. **Broken bones**
   - Bills-known: `medical bills × (2–4)`  
   - Body part bands: Leg `$250k–$400k`, Arm `$75k–$150k`, Collar bone `$100k–$200k`, Foot/ankle `$100k–$200k`, Hip `$200k–$400k`
6. **Wage loss**
   - Add amount, scaled by percent (0–100%).
7. **Surgery**
   - Bills-known: `medical bills × (2–4)`  
   - Body part bands: Neck `$600k–$1.5M`, Shoulder `$100k–$300k`, Knee `$100k–$300k`, Arm `$100k–$200k`, Leg `$100k–$200k`, Hip `$500k–$1M`
8. **Comparative fault**
   - After summing gross: `NET = GROSS × (1 − fault%)`.
9. **Wrongful death**
   - Age brackets: `1–20: $100k–$400k`, `21–30: $500k–$1M`, `31–50: $1M–$5M`, `51–70: $500k–$1M`, `70–100: $100k–$400k`.

### 4.2 Range → Single Number
- Deterministic pick from range using midpoint strategy (or conservative 35th / aggressive 65th). Global style optional, default **standard**.

### 4.3 Output
- One currency value shown (rounded). No subtotals. Disclaimer visible below.

### 4.4 Landing Content
- Hero (H1 + sub + CTA)
- Trust/awards
- How it works (3 steps)
- **Car Accident Calculator** (tabs show other PI types as disabled)
- Benefits, Testimonials, FAQ
- Disclaimer, Contact CTA

## 5. Non‑Functional Requirements
- **Performance**: first input delay < 100ms; bundle split calculator.
- **A11y**: labeled inputs, keyboard nav, color contrast AA.
- **SEO**: canonical, OG tags, JSON‑LD (FAQ + LegalService).
- **Privacy**: no PII persisted client‑side by default.
- **Maintainability**: config‑driven ranges, 100% TypeScript, unit tests.

## 6. Data Model
See `src/lib/types.ts`. `CalculatorInput` holds all 9 category inputs + optional `globalStyle`. `CalculationBreakdown` returns `{ categoryTotals, gross, net }`.

## 7. Acceptance Criteria
1. With all categories “No”, result is `$0`.
2. Soft tissue “Yes”, knows bills `$10,000` (standard midpoint): total = `$20,000`.
3. Same with 25% fault: total = `$15,000`.
4. Surgery (shoulder band only, standard midpoint) = `$200,000`.
5. Diagnostics: 2 X‑rays + 1 MRI (multiplier style, standard midpoints) matches unit test expectations.
6. Ranges editable in `config.ts` affect results without changing `calc.ts`.
7. Tabs show other PI types as disabled (“Coming soon”).
8. Disclaimer visible and matches provided copy exactly.

## 8. Risks & Mitigation
- **User misinterprets estimate as a promise** → prominent disclaimer and “estimate only” copy.
- **Stacking high‑value categories** → monitor analytics; tune config as needed.
- **Jurisdictional nuances (no‑fault, thresholds)** → future version with state presets.

## 9. Future Enhancements
- Lead gate (email/phone to reveal estimate), PDF export, state‑specific presets, insurance limit awareness, admin UI to edit ranges.

## 10. Disclaimer (to display on page)
> Personal injury calculator (“PIC”) is an estimate of the value of a given personal injury matter. It is not a guarantee that if you retain Browne Law Group that your case will have the exact or approximate value displayed by this PIC. The PIC also does not consider whether the bad actor that injured you has insurance, funds, or the means to pay the estimate provided by the PIC. There are a myriad intangible factors such as credibility, presentation, criminal history, number of family members, closeness of relatives, criminal history, age, gender and other nuanced factors that play into value that cannot be electronically factored in to the PIC.
