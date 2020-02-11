import { MeydaFeaturesObject } from "meyda";

export function getObjectWithArraysPerFeature(featuresForSignal: Partial<MeydaFeaturesObject>[]) {
  const mapper = (key: string): [string, number[]] => {
    return [key, []];
  }

  const returnedFeatures = Object.keys(featuresForSignal[0])

  let newSignals: { [x: string]: number[] } = Object.fromEntries(
    returnedFeatures.map(mapper)
  );

  let isLoudnessResult = (p: any): p is { specific: Float32Array, total: number } => !!p.total;

  for (let i = 0; i < featuresForSignal.length; i++) {
    const featureForFrame = featuresForSignal[i];
    if (featureForFrame) {
      Object.entries(featureForFrame).forEach(([name, value]) => {
        if (typeof value === "number") {
          newSignals[name].push(value);
        } else if (isLoudnessResult(value)) {
          newSignals[name].push(value.total);
        } else {
          newSignals[name].push(0);
        }
      })
    }
  }

  return newSignals;
}