const MAX_PERCENTS = 100;

export const percentOfNumber = (value: number, maxValue: number): number => Math.round((Math.round(value) * MAX_PERCENTS) / maxValue);
