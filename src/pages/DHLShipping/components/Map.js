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

    const zoneColors = {
        0: '#ccc',
        1: '#ffbb00',
        2: '#ff2600',
        3: '#e100ff',
        4: '#7745b5',
        5: '#2e62f2',
        6: '#3f8296',
        7: '#6fa69e',
        8: '#26a664',
        9: '#62bd39',
        10: '#a5b55c',
    }

  return (
    <div className="w-full -mt-32">
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {geographies.map(geo => {
                const currentState = data.find(e => e.state === allStates.find(e => e.val === geo.id).id)
                return(
                <Geography
                  key={geo.rsmKey}
                  stroke={selectedState.id === geo.id ? 'rgb(43, 89, 242)' : "#ccc"}
                  geography={geo}
                  strokeWidth={selectedState.id === geo.id ? 2 : 0.5}
                  onClick={() => setSelectedState(geo)}
                  style={{
                    default: { outline: 'none', opacity: currentState ? 1 : 0 },
                    hover: { outline: 'none', opacity: currentState ? 1 : 0 },
                    pressed: { outline: 'none', opacity: currentState ? 1 : 0 },
                  }}
                  fill={zoneColors[currentState ? currentState.zone_number : 0]}
                />
              )
              })}
              {geographies.map(geo => {
                const centroid = geoCentroid(geo);
                const cur = allStates.find(s => s.val === geo.id);
                const currentState = data.find(e => e.state === allStates.find(e => e.val === geo.id).id)
                return (
                  <g key={geo.rsmKey + "-name"} style={{ opacity: currentState ? 1 : 0 }}>
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