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
