import React, { useState, ChangeEvent } from 'react';
import { MeydaAudioFeature } from 'meyda';
import RepeatComponent from './components/RepeatComponent';
import Line from './components/Line';
import { getFileFromEvent } from './lib/getFileFromEvent';
import { getFeaturesFromFile } from './lib/getFeaturesFromFile';
import { getObjectWithArraysPerFeature } from './lib/getObjectWithArraysPerFeature';

function first(a: Array<any>) {
  return a[0];
}

const EXTRACTION_PARAMETERS = {
  channels: [0],
  bufferSize: 2048,
  hopSize: 0,
}

async function getFormattedFeaturesFromEvent(event: ChangeEvent<HTMLInputElement>, features: MeydaAudioFeature[]) {
  return getFileFromEvent(event)
      .then(file => getFeaturesFromFile(file, features, EXTRACTION_PARAMETERS))
      .then(first)
      .then(getObjectWithArraysPerFeature);
}

function App() {
  type SignalsType = Map<MeydaAudioFeature, number[]>;
  const [signals, updateSignal] = useState(null as SignalsType | null);

  const features = ['loudness' as MeydaAudioFeature];

  async function inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    getFormattedFeaturesFromEvent(event, features)
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
