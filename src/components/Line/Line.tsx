import React, {useState, useEffect, useRef} from 'react';
import CSS from 'csstype';

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
export function Line({signal, label}: LineProps) {
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

