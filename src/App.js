import React, {useRef, useEffect, useState} from 'react';
import {extractFeature} from 'feature-extractor-worker';

function normalize(array) {
  const maxVal = Math.max.apply(null,array);
  return array.map(val => val / maxVal);
}

function Line({signal}) {
  const height = 150;
  let [zoom, setZoom] = useState(0);

  const scrollRef = useRef(null)
  useEffect(() => {
    const scrollEl = scrollRef.current
    scrollEl.addEventListener('wheel', stopScroll)
    return () => scrollEl.removeEventListener('wheel', stopScroll)
  }, [])
  const stopScroll = e => e.preventDefault()

  const points = normalize(signal)
    .reduce(({points, previous}, value, index) => ({
      "points": points + `${index},${height - height * (value + previous) / 2} `,
      "previous": value
    }), {
      "points": `0,${height} `,
      "previous": 0
    }).points + `${signal.length},${height}`;

  function handleScroll(event) {
    event.preventDefault();
    setZoom(zoom - event.deltaY);
    return false;
  }

  return (
    <svg
      ref={scrollRef}
      onWheel={handleScroll}
      preserveAspectRatio="none"
      viewBox={`${(x => x > 0 ? x : 0)(zoom)} 0 ${signal.length - (x => x > 0 ? x : 0)(2*zoom)} ${height}`}
      style={{height, width: "100%"}}
      >
      <defs>
        <linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="black"></stop>
          <stop offset="100%" stopColor="black" stopOpacity="0.2"></stop>
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="url(#Gradient1)"
        stroke="black"
      />
    </svg>
  )
}

function App() {
  const [signals, updateSignal] = useState(null);

  async function inputChangeHandler(event) {
    console.log(event.target.files[0]);
    const loudness = await extractFeature({
      audioBlob: event.target.files[0],
      audioFeatures: ['rms', 'spectralCentroid', 'spectralFlatness'],
      extractionParams: {
        channels: [0]
      }
    });
    const newSignals = loudness[0].reduce((acc, el) => ({
      'rms': [...acc.rms, el.rms],
      'spectralCentroid': [...acc.spectralCentroid, el.spectralCentroid],
      'spectralFlatness': [...acc.spectralFlatness, el.spectralFlatness]
    }), {rms:[], spectralCentroid:[], spectralFlatness:[]});
    console.log(newSignals);
    updateSignal(newSignals);
  }

  return (
    <div className="App">
      <input onChange={inputChangeHandler} type='file' accept='audio/*' />
      { signals &&
        <>
          <h1>Signal here!</h1>
          { Object.entries(signals).map(([feature, signal]) =>
            <Line key={feature} style={{ maxWidth: "1vw" }} signal={signal} />)
          }
        </>
      }
    </div>
  );
}

export default App;
