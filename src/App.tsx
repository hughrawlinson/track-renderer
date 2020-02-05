import React, {useRef, useEffect, useState, ChangeEvent } from 'react';
import { MeydaAudioFeature, MeydaFeaturesObject } from 'meyda';
import CSS from 'csstype';
import { extractFeature, availableFeatureExtractors } from 'feature-extractor-worker';

function normalize(array: number[]) {
  const maxVal = Math.max.apply(null,array);
  return array.map(val => val / maxVal);
}

type LineProps = {
  signal: number[],
  label: string,
  style: CSS.Properties
}

/**
 * Render a signal in a zoomable SVG
 * @param options.signal An ArrayLike of numbers
 * @param options.label A string to be shown as a label of the signal
 */
function Line({signal, label}: LineProps) {
  const height = 150;
  let [zoom, setZoom] = useState(0);

  const scrollRef = useRef(null as (SVGSVGElement | null));
  useEffect(() => {
    const scrollEl = scrollRef?.current;
    scrollEl?.addEventListener('wheel', stopScroll);
    return () => scrollEl?.removeEventListener('wheel', stopScroll);
  }, [])
  const stopScroll = (e: Event) => e.preventDefault()

  function handleScroll(event: React.WheelEvent) {
    event.preventDefault();
    setZoom(zoom - event.deltaY);
  }

  const points = normalize(signal)
    .reduce(({points, previous}, value, index) => ({
      "points": points + `${index},${height - height * (value + previous) / 2} `,
      "previous": value
    }), {
      "points": `0,${height} `,
      "previous": 0
    }).points + `${signal.length},${height}`;

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
      <text x="10" y="20">{label}</text>
      <polyline
        points={points}
        fill="url(#Gradient1)"
        stroke="black"
      />
    </svg>
  )
}

function App() {
  type SignalsType = Map<MeydaAudioFeature, number[]>;
  const [signals, updateSignal] = useState(null as SignalsType | null);

  const [featureInSelector, updateFeatureInSelector] = useState('loudness' as MeydaAudioFeature);
  const selectedFeatures: MeydaAudioFeature[] = [featureInSelector];

  async function inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const loudness: (Partial<MeydaFeaturesObject> | null)[][] = await extractFeature({
        audioBlob: file,
        audioFeatures: selectedFeatures,
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
      <select value={featureInSelector} onChange={event => updateFeatureInSelector(event.target.value as MeydaAudioFeature)}>
        {
          availableFeatureExtractors.map(feature => (<option key={feature} value={feature}>{feature}</option>))
        }
      </select>
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
    </div>
  );
}

export default App;
