// import axios from "axios";
import { memo, useCallback, useEffect, useState } from "react";
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapComponentsProvider,
  YMapDefaultMarker,
  YMapListener,
} from "ymap3-components";
// import { features, LOCATION } from
// import { YMapMyMarker } from "./YMapMyMarker"

function YandexMapEdit({ coordinates, setCoordinates }) {
  // const [markerTitle, setMarkerTitle] = useState();
  // const [markerCoordinates, setMarkerCoordinates] = useState(null);
  const [coordinatesTemp, setCoordinatesTemp] = useState([]);

  // const clickCallback = (object,entity) => setCoordinates(() => entity.coordinates);

  const MemoizedMarker = memo(({ coord }) => (
    <YMapDefaultMarker coordinates={coord} />
  ));

  const clickCallback = useCallback((object, entity) => {
    setCoordinatesTemp(() => entity.coordinates);
    setCoordinates(() => entity.coordinates);
  }, []);

  useEffect(() => {
    setCoordinatesTemp(() => coordinates);
    console.log(coordinates);
  }, [coordinates]);

  return (
    <>
      <div style={{ width: "800px", height: "600px" }}>
        <YMapComponentsProvider apiKey="9a755d75-8fed-42f6-9785-a2e149b48899">
          <YMap location={{ center: [43.2, 42.26], zoom: 6 }} mode="vector">
            <YMapDefaultSchemeLayer />
            <YMapDefaultFeaturesLayer />

            <YMapListener onClick={clickCallback} />
            <MemoizedMarker
              coord={[Number(coordinatesTemp[0]), Number(coordinatesTemp[1])]}
            />
          </YMap>
        </YMapComponentsProvider>
      </div>
    </>
  );
}

export default YandexMapEdit;
