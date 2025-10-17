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
