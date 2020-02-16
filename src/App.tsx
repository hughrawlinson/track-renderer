import React, { useState, ChangeEvent } from 'react';
import { MeydaAudioFeature, MeydaFeaturesObject } from 'meyda';
import { from } from 'rxjs';
import { flatMap, map, filter, tap, scan } from 'rxjs/operators';
import RepeatComponent from './components/RepeatComponent';
import Line from './components/Line';
import { getFileFromEvent } from './lib/getFileFromEvent';
import { getFeaturesFromFile } from './lib/getFeaturesFromFile';
import { getObjectWithArraysPerFeature } from './lib/getObjectWithArraysPerFeature';

const EXTRACTION_PARAMETERS = {
  channels: [0],
  bufferSize: 2048,
  hopSize: 0,
}

function getFormattedFeaturesFromEvent(event: ChangeEvent<HTMLInputElement>, features: MeydaAudioFeature[]) {
  return from(getFileFromEvent(event))
    .pipe(
      flatMap(file => getFeaturesFromFile(file, features, EXTRACTION_PARAMETERS))
    )
    .pipe(tap(console.log))
    .pipe(filter(x => !!x))
    .pipe(map(getObjectWithArraysPerFeature))
    .pipe(scan((acc, el) => {
      return Object.keys(acc).reduce((intacc, intel) => ({
        ...intacc,
        [intel]: [...acc[intel], ...el[intel]]
      }), {})
    }))
    // .pipe(mergeScan((acc, el) => {
    //    Object.keys(acc).map(key =)
    // }))

  // return getFileFromEvent(event)
  //     .then(file => getFeaturesFromFile(file, features, EXTRACTION_PARAMETERS))
  //     .then(first)
  //     .then(getObjectWithArraysPerFeature);
}

function App() {
  type SignalsType = Map<MeydaAudioFeature, number[]>;
  const [signals, updateSignal] = useState(null as SignalsType | null);

  const features = ['loudness' as MeydaAudioFeature];

  async function inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    getFormattedFeaturesFromEvent(event, features)
      .subscribe(newSignals => {
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
