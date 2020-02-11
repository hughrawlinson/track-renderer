import React, { useState, ChangeEvent } from 'react';
import { MeydaAudioFeature, MeydaFeaturesObject } from 'meyda';
import { extractFeature } from 'feature-extractor-worker';
import RepeatComponent from './components/RepeatComponent';
import Line from './components/Line';

function App() {
  type SignalsType = Map<MeydaAudioFeature, number[]>;
  const [signals, updateSignal] = useState(null as SignalsType | null);

  const features = ['loudness' as MeydaAudioFeature];

  async function inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const loudness: (Partial<MeydaFeaturesObject> | null)[][] = await extractFeature({
        audioBlob: file,
        audioFeatures: features,
        extractionParams: {
          channels: [0],
          bufferSize: 2048,
          hopSize: 0,
        }
      });

      const featuresForSignal = loudness[0];

      if (featuresForSignal[0]) {
        const mapper = (key: string): [string, number[]] => {
          return [key, []];
        }

        const returnedFeatures = Object.keys(featuresForSignal[0])

        let newSignals: {[x: string]: number[]} = Object.fromEntries(
          returnedFeatures.map(mapper)
        );

        let isLoudnessResult = (p: any): p is {specific: Float32Array, total: number} => !! p.total;

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
        updateSignal(() => newSignals as unknown as SignalsType);
      }
    }
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
