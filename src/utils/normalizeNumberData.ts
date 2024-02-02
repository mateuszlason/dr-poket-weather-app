export const normalizeNumberData = (
  data: number,
  minNumber: number,
  maxNumber: number,
  minNormalized: number,
  maxNormalized: number
) => {
  const normalizedData =
    ((data - minNumber) / (maxNumber - minNumber)) *
      (maxNormalized - minNormalized) +
    minNormalized

  return Math.max(minNormalized, Math.min(normalizedData, maxNormalized))
}
