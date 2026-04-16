export const MIN_ICE_VALUE = 1;
export const MAX_ICE_VALUE = 10;

export const clampIceValue = (value: number): number => {
  if (Number.isNaN(value)) {
    return MIN_ICE_VALUE;
  }

  return Math.min(MAX_ICE_VALUE, Math.max(MIN_ICE_VALUE, Math.round(value)));
};

export const isValidIceValue = (value: number): boolean => {
  return Number.isInteger(value) && value >= MIN_ICE_VALUE && value <= MAX_ICE_VALUE;
};

export const calculateIceScore = (
  impact?: number,
  confidence?: number,
  ease?: number,
): number | undefined => {
  if (
    impact === undefined ||
    confidence === undefined ||
    ease === undefined ||
    !isValidIceValue(impact) ||
    !isValidIceValue(confidence) ||
    !isValidIceValue(ease)
  ) {
    return undefined;
  }

  return impact * confidence * ease;
};

export const normalizeIceValues = (
  values: Partial<{ impact: number; confidence: number; ease: number }>,
) => ({
  impact:
    values.impact === undefined ? undefined : clampIceValue(values.impact),
  confidence:
    values.confidence === undefined ? undefined : clampIceValue(values.confidence),
  ease: values.ease === undefined ? undefined : clampIceValue(values.ease),
});
