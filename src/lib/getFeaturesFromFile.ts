import { MeydaAudioFeature } from "meyda";
import { extractFeatureObservable } from 'feature-extractor-worker/dist/main/';
import { ExtractionParams } from 'feature-extractor-worker/dist/main/feature-extractor';

export function getFeaturesFromFile(file: Blob, features: MeydaAudioFeature[], extractionParams: ExtractionParams) {
  return extractFeatureObservable({
    audioBlob: file,
    audioFeatures: features,
    extractionParams,
  });
}