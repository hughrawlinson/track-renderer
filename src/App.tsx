import React, { useState, ChangeEvent } from 'react';
import { MeydaAudioFeature, MeydaFeaturesObject } from 'meyda';
import { extractFeature } from 'feature-extractor-worker';
import RepeatComponent from './components/RepeatComponent';
import Line from './components/Line';
import { ExtractionParams } from 'feature-extractor-worker/dist/main/feature-extractor';

async function getFileFromEvent(event: ChangeEvent<HTMLInputElement>) {
  if (event.target.files?.[0]) {
    return event.target.files[0];
  }
  throw new Error('File not found');
}

async function getFeaturesFromFile(file: Blob, features: MeydaAudioFeature[], extractionParams: ExtractionParams) {
  if (file) {
    return await extractFeature({
      audioBlob: file,
      audioFeatures: features,
      extractionParams,
    });
  }
  throw new Error('File not found');
}

function first(a: Array<any>) {
  return a[0];
}

function getObjectWithArraysPerFeature(featuresForSignal: Partial<MeydaFeaturesObject>[]) {
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

const EXTRACTION_PARAMETERS = {
  channels: [0],
  bufferSize: 2048,
  hopSize: 0,
}

function App() {
  type SignalsType = Map<MeydaAudioFeature, number[]>;
  const [signals, updateSignal] = useState(null as SignalsType | null);

  const features = ['loudness' as MeydaAudioFeature];

  async function inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    return getFileFromEvent(event)
      .then(file => getFeaturesFromFile(file, features, EXTRACTION_PARAMETERS))
      .then(first)
      .then(getObjectWithArraysPerFeature)
      .then(newSignals => {
        updateSignal(() => newSignals as unknown as SignalsType);
      });
  }

  return (
    <div className="App">
      <input onChange={inputChangeHandler} type='file' accept='audio/*' />
      { signals &&
        <>
          <h1>Signal here!</h1>
          { Object.entries(signals).map(([feature, signal]) =>
            <>
              <h4>{feature}</h4>
              <Line key={feature} label={feature} style={{ maxWidth: "1vw" }} signal={signal} />
            </>)
          }
        </>
      }
      <RepeatComponent controllable initialN={1}>
        <h5>Worked!</h5>
      </RepeatComponent>
    </div>
  );
}

export default App;
