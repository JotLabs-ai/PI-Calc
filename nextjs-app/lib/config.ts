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
