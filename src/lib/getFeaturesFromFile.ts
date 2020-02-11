import { MeydaAudioFeature } from "meyda";
import { extractFeature } from 'feature-extractor-worker';
import { ExtractionParams } from 'feature-extractor-worker/dist/main/feature-extractor';

export async function getFeaturesFromFile(file: Blob, features: MeydaAudioFeature[], extractionParams: ExtractionParams) {
  return await extractFeature({
    audioBlob: file,
    audioFeatures: features,
    extractionParams,
  });
}