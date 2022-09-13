import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";

import allStates from "../data/allstates.json";


const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};

export const Map = ({ data, selectedState, setSelectedState }) => {

  return (
    <div style={{ width: window.innerWidth < 1080 ? '100%' : '67%', margin: '0 auto' }}>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {geographies.map(geo => {
                const biggestState = data.sort((a, b) => b.packages_sent - a.packages_sent)[0]
                const currentState = data.find(e => e.state === allStates.find(e => e.val === geo.id).id)
                const redValue = currentState ? (currentState.packages_sent * 255 / biggestState.packages_sent ): 0
                return(
                <Geography
                  key={geo.rsmKey}
                  stroke={selectedState.id === geo.id ? 'rgb(43, 89, 242)' : "#ccc"}
                  geography={geo}
                  strokeWidth={selectedState.id === geo.id ? 2 : 0.5}
                  onClick={() => setSelectedState(geo)}
                  style={{
                    default: { outline: 'none'},
                    hover: { outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                  fill={`rgb(255, ${255 - redValue}, ${255 - redValue})`}
                />
              )
              })}
              {geographies.map(geo => {
                const centroid = geoCentroid(geo);
                const cur = allStates.find(s => s.val === geo.id);
                return (
                  <g key={geo.rsmKey + "-name"}>
                    {cur &&
                      centroid[0] > -160 &&
                      centroid[0] < -67 &&
                      (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                        <Marker coordinates={centroid}>
                          <text y="2" fontSize={8} textAnchor="middle">
                          {cur.id}
                          </text>
                        </Marker>
                      ) : (
                        <Annotation
                          subject={centroid}
                          dx={offsets[cur.id][0]}
                          dy={offsets[cur.id][1]}
                        >
                          <text x={4} fontSize={8} alignmentBaseline="middle">
                            {cur.id}
                          </text>
                        </Annotation>
                      ))}
                  </g>
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>
    </div>
  );
};