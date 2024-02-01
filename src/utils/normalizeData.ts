export const normalizeData = (
  temperature: number,
  minTemperature: number,
  maxTemperature: number,
  minNormalized: number,
  maxNormalized: number
) => {
  const normalizedTemperature =
    ((temperature - minTemperature) / (maxTemperature - minTemperature)) *
      (maxNormalized - minNormalized) +
    minNormalized

  return Math.max(minNormalized, Math.min(normalizedTemperature, maxNormalized))
}
