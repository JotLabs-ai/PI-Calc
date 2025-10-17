# Build Guide — Car Accident Settlement Calculator Landing/CTA Page

This guide explains how to implement a **car-accident–focused** Personal Injury Calculator (PIC) landing page with a 9‑category flow and a **single total estimate**. Other PI types (e.g., slip & fall, dog bite) are shown as **disabled “Coming soon” tabs** for now.

**Stack**
- Next.js 15 (App Router), React 19
- TypeScript (strict)
- Tailwind CSS + shadcn/ui
- Vitest (+ Testing Library) & Storybook

**Route**
- `/car-accident-calculator` (primary CTA landing)
- Optional `/calculators` index shows other PI types (disabled).

---

## 0) Architecture Overview

- **Landing sections:** Hero → Trust → How it works → **Car Accident Calculator** (primary CTA) → Benefits → Testimonials → FAQ → Disclaimer → Contact CTA.
- **Calculator UX:** 9 category cards; each has a **Yes/No** switch under its heading. “Yes” reveals inputs; “No” skips. User can choose either:
  - **(1) Bills‑known mode** — enters medical bills per category, or
  - **(2) Injury‑estimate mode** — enters treatment/injury counts to derive value.
- **Output:** **One single total** (no visible per‑category subtotals). Internally we keep a breakdown.
- **Config‑driven:** All dollar bands & multipliers in `src/lib/config.ts`.
- **Deterministic from ranges:** Use midpoint (or conservative/standard/aggressive percentiles) to collapse ranges to a single number.

Other PI calculators appear in a tab list but are **visually disabled** (no interaction).

---

## 1) Install & Setup

```bash
# If new app
npx create-next-app@latest car-accident-pic --ts --eslint
cd car-accident-pic

# Tailwind
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# shadcn/ui (install per docs)
npm i clsx lucide-react

# Tests & Storybook
npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom
npx storybook@latest init

# Optional schema validation
npm i zod
```

Tailwind: ensure content globs include `app/**/*`, `components/**/*`, `src/**/*` and shadcn/ui paths.

---

## 2) Folder Structure

```
app/
  car-accident-calculator/
    page.tsx                # Landing/CTA page (embeds CalculatorCar)
  calculators/
    page.tsx                # (Optional) hub with disabled tabs for other PI types
components/
  calculator/
    CalculatorCar.tsx       # 9 cards + Calculate button for car accidents
    cards/
      SoftTissueCard.tsx
      SpecialistsCard.tsx
      PainMgmtCard.tsx
      DiagnosticsCard.tsx
      BrokenBonesCard.tsx
      WageLossCard.tsx
      SurgeryCard.tsx
      FaultCard.tsx
      WrongfulDeathCard.tsx
  layout/
    Hero.tsx
    HowItWorks.tsx
    TrustBar.tsx
    FAQ.tsx
    Testimonials.tsx
src/
  lib/
    types.ts
    config.ts
    calc.ts
    format.ts
  tests/
    calc.test.ts
stories/
  CalculatorCar.stories.tsx
  cards/*.stories.tsx
```

---

## 3) Types (Car Accident Calculator)

Create `src/lib/types.ts`:

```ts
export type YesNo = 'yes' | 'no';
export type Money = number;

export interface SoftTissueInput {
  enabled: YesNo;
  knowsBills?: YesNo;
  medicalBills?: Money;
  monthsChiro?: number;
  doctorVisits?: number;
}

export interface SpecialistsInput {
  enabled: YesNo;
  visits?: number;
  method?: 'multiplier' | 'flat';
}

export interface PainMgmtInput {
  enabled: YesNo;
  injections?: number;
  method?: 'conservative' | 'aggressive';
}

export interface DiagnosticsInput {
  enabled: YesNo;
  xrays?: { count: number; method: 'multiplier' | 'flat' };
  mris?:  { count: number; method: 'multiplier' | 'flat' };
  cts?:   { count: number; method: 'multiplier' | 'flat' };
}

export interface BrokenBonesInput {
  enabled: YesNo;
  knowsBills?: YesNo;
  medicalBills?: Money;
  bodyPart?: 'leg' | 'arm' | 'collar_bone' | 'foot_ankle' | 'hip';
}

export interface WageLossInput {
  enabled: YesNo;
  grossLoss?: Money;
  percentApplied?: number; // 0..100, default 100
}

export interface SurgeryInput {
  enabled: YesNo;
  knowsBills?: YesNo;
  medicalBills?: Money;
  bodyPart?: 'neck' | 'shoulder' | 'knee' | 'arm' | 'leg' | 'hip';
}

export interface FaultInput {
  enabled: YesNo;
  percent?: number; // 0..100
}

export interface WrongfulDeathInput {
  enabled: YesNo;
  ageBracket?: '1_20' | '21_30' | '31_50' | '51_70' | '70_100';
}

export interface CalculatorInput {
  softTissue: SoftTissueInput;
  specialists: SpecialistsInput;
  painMgmt: PainMgmtInput;
  diagnostics: DiagnosticsInput;
  brokenBones: BrokenBonesInput;
  wageLoss: WageLossInput;
  surgery: SurgeryInput;
  fault: FaultInput;
  wrongfulDeath: WrongfulDeathInput;
  globalStyle?: 'conservative' | 'standard' | 'aggressive';
}

export interface CalculationBreakdown {
  categoryTotals: Record<string, number>;
  gross: number;
  net: number;
}
```

---

## 4) Config (car accident values)

Create `src/lib/config.ts`:

```ts
export const CONFIG = {
  softTissue: {
    billsMultiplier: [1.5, 2.5] as const,
    chiroPerMonth: [3000, 5000] as const,
    doctorPerVisit: [150, 300] as const,
  },
  specialists: {
    perVisit: [450, 600] as const,
    multiplier: [2, 4] as const,
    flatEnhanced: [900, 1200] as const,
  },
  painMgmt: {
    conservativePerInjection: [2000, 5000] as const,
    aggressivePerInjection: [4000, 20000] as const,
  },
  diagnostics: {
    xray: {
      perStudy: [75, 200] as const,
      perStudyMultiplier: [2, 4] as const,
      flat: [150, 800] as const,
    },
    mri: {
      perStudy: [1500, 4000] as const,
      perStudyMultiplier: [2, 4] as const,
      flat: [3000, 16000] as const,
    },
    ct: {
      perStudy: [2500, 4000] as const,
      perStudyMultiplier: [2, 4] as const,
      flat: [5000, 16000] as const,
    },
  },
  brokenBones: {
    billsMultiplier: [2, 4] as const,
    parts: {
      leg: [250_000, 400_000] as const,
      arm: [75_000, 150_000] as const,
      collar_bone: [100_000, 200_000] as const,
      foot_ankle: [100_000, 200_000] as const,
      hip: [200_000, 400_000] as const,
    },
  },
  wageLoss: { defaultPercent: 100 },
  surgery: {
    billsMultiplier: [2, 4] as const,
    parts: {
      neck: [600_000, 1_500_000] as const,
      shoulder: [100_000, 300_000] as const,
      knee: [100_000, 300_000] as const,
      arm: [100_000, 200_000] as const,
      leg: [100_000, 200_000] as const,
      hip: [500_000, 1_000_000] as const,
    },
  },
  wrongfulDeath: {
    ages: {
      '1_20': [100_000, 400_000] as const,
      '21_30': [500_000, 1_000_000] as const,
      '31_50': [1_000_000, 5_000_000] as const,
      '51_70': [500_000, 1_000_000] as const,
      '70_100': [100_000, 400_000] as const,
    },
  },
} as const;
```

---

## 5) Calculation Engine

Create `src/lib/calc.ts`:

```ts
import { CONFIG } from './config';
import type { CalculatorInput, CalculationBreakdown } from './types';

const pointFromRange = (
  [lo, hi]: readonly [number, number],
  style: 'conservative' | 'standard' | 'aggressive' = 'standard'
) => {
  const pct = style === 'conservative' ? 0.35 : style === 'aggressive' ? 0.65 : 0.5;
  return lo + (hi - lo) * pct;
};

export function calculateEstimate(input: CalculatorInput): CalculationBreakdown {
  const style = input.globalStyle ?? 'standard';
  const p = (r: readonly [number, number]) => pointFromRange(r, style);
  const totals: Record<string, number> = {};

  // 1 Soft Tissue
  totals.softTissue = 0;
  if (input.softTissue.enabled === 'yes') {
    const m = p(CONFIG.softTissue.billsMultiplier);
    if (input.softTissue.knowsBills === 'yes' && input.softTissue.medicalBills) {
      totals.softTissue += input.softTissue.medicalBills * m;
    } else {
      const chiro = (input.softTissue.monthsChiro ?? 0) * p(CONFIG.softTissue.chiroPerMonth) * m;
      const doc = (input.softTissue.doctorVisits ?? 0) * p(CONFIG.softTissue.doctorPerVisit) * m;
      totals.softTissue += chiro + doc;
    }
  }

  // 2 Specialists
  totals.specialists = 0;
  if (input.specialists.enabled === 'yes' && (input.specialists.visits ?? 0) > 0) {
    const v = input.specialists.visits!;
    if (input.specialists.method === 'multiplier') {
      totals.specialists += v * p(CONFIG.specialists.perVisit) * p(CONFIG.specialists.multiplier);
    } else {
      totals.specialists += v * p(CONFIG.specialists.flatEnhanced);
    }
  }

  // 3 Pain Mgmt
  totals.painMgmt = 0;
  if (input.painMgmt.enabled === 'yes' && (input.painMgmt.injections ?? 0) > 0) {
    const per =
      input.painMgmt.method === 'aggressive'
        ? p(CONFIG.painMgmt.aggressivePerInjection)
        : p(CONFIG.painMgmt.conservativePerInjection);
    totals.painMgmt += input.painMgmt.injections! * per;
  }

  // 4 Diagnostics
  totals.diagnostics = 0;
  if (input.diagnostics.enabled === 'yes') {
    const add = (count = 0, cfg: any, method: 'multiplier'|'flat') =>
      count
        ? method === 'multiplier'
          ? count * p(cfg.perStudy) * p(cfg.perStudyMultiplier)
          : count * p(cfg.flat)
        : 0;
    totals.diagnostics += add(input.diagnostics.xrays?.count, CONFIG.diagnostics.xray, input.diagnostics.xrays?.method ?? 'multiplier');
    totals.diagnostics += add(input.diagnostics.mris?.count,  CONFIG.diagnostics.mri,  input.diagnostics.mris?.method  ?? 'multiplier');
    totals.diagnostics += add(input.diagnostics.cts?.count,   CONFIG.diagnostics.ct,   input.diagnostics.cts?.method   ?? 'multiplier');
  }

  // 5 Broken Bones
  totals.brokenBones = 0;
  if (input.brokenBones.enabled === 'yes') {
    if (input.brokenBones.knowsBills === 'yes' && input.brokenBones.medicalBills) {
      totals.brokenBones += input.brokenBones.medicalBills * p(CONFIG.brokenBones.billsMultiplier);
    } else if (input.brokenBones.bodyPart) {
      totals.brokenBones += p(CONFIG.brokenBones.parts[input.brokenBones.bodyPart]);
    }
  }

  // 6 Wage Loss
  totals.wageLoss = 0;
  if (input.wageLoss.enabled === 'yes') {
    const pct = (input.wageLoss.percentApplied ?? 100) / 100;
    totals.wageLoss += (input.wageLoss.grossLoss ?? 0) * pct;
  }

  // 7 Surgery
  totals.surgery = 0;
  if (input.surgery.enabled === 'yes') {
    if (input.surgery.knowsBills === 'yes' && input.surgery.medicalBills) {
      totals.surgery += input.surgery.medicalBills * p(CONFIG.surgery.billsMultiplier);
    } else if (input.surgery.bodyPart) {
      totals.surgery += p(CONFIG.surgery.parts[input.surgery.bodyPart]);
    }
  }

  // 9 Wrongful Death
  totals.wrongfulDeath = 0;
  if (input.wrongfulDeath.enabled === 'yes' && input.wrongfulDeath.ageBracket) {
    totals.wrongfulDeath += p(CONFIG.wrongfulDeath.ages[input.wrongfulDeath.ageBracket]);
  }

  const gross = Object.values(totals).reduce((a, b) => a + b, 0);

  // 8 Fault (apply at end)
  const faultPct = (input.fault.enabled === 'yes' ? (input.fault.percent ?? 0) : 0) / 100;
  const net = gross * (1 - faultPct);

  return { categoryTotals: totals, gross, net };
}
```

---

## 6) Tests (Vitest)

Create `src/tests/calc.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { calculateEstimate } from '@/src/lib/calc';
import type { CalculatorInput } from '@/src/lib/types';

const base: CalculatorInput = {
  softTissue: { enabled: 'no', knowsBills: 'no' },
  specialists: { enabled: 'no', method: 'multiplier' },
  painMgmt: { enabled: 'no', method: 'conservative' },
  diagnostics: { enabled: 'no', xrays: { count: 0, method: 'multiplier' }, mris: { count: 0, method: 'multiplier' }, cts: { count: 0, method: 'multiplier' } },
  brokenBones: { enabled: 'no', knowsBills: 'no' },
  wageLoss: { enabled: 'no', percentApplied: 100, grossLoss: 0 },
  surgery: { enabled: 'no', knowsBills: 'no' },
  fault: { enabled: 'no', percent: 0 },
  wrongfulDeath: { enabled: 'no' },
  globalStyle: 'standard',
};

describe('calculateEstimate', () => {
  it('soft tissue with known bills midpoint', () => {
    const input: CalculatorInput = { ...base, softTissue: { enabled: 'yes', knowsBills: 'yes', medicalBills: 10000 } };
    const out = calculateEstimate(input);
    expect(Math.round(out.net)).toBe(20000); // 10k * 2.0 midpoint
  });

  it('comparative fault reduces net', () => {
    const input: CalculatorInput = {
      ...base,
      softTissue: { enabled: 'yes', knowsBills: 'yes', medicalBills: 10000 },
      fault: { enabled: 'yes', percent: 25 },
    };
    const out = calculateEstimate(input);
    expect(Math.round(out.net)).toBe(15000);
  });

  it('surgery shoulder band midpoint', () => {
    const input: CalculatorInput = {
      ...base,
      surgery: { enabled: 'yes', knowsBills: 'no', bodyPart: 'shoulder' },
    };
    const out = calculateEstimate(input);
    expect(Math.round(out.net)).toBe(200000);
  });
});
```

---

## 7) Storybook

Create `stories/CalculatorCar.stories.tsx` with empty + prefilled states. Add stories for each card with Yes/No toggles.

---

## 8) Disclaimer

Place your provided disclaimer verbatim at the bottom of the landing page.
