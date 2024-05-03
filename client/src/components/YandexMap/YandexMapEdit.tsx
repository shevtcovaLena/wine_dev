// import React from "react";
import { memo, useCallback, useEffect, useState } from "react";
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapComponentsProvider,
  YMapDefaultMarker,
  YMapListener,
} from "ymap3-components";

export type CoordType = [number, number]

interface IPropsMapEdit {
  coordinates: CoordType,
  setCoordinates: (value: React.SetStateAction<CoordType>) => void,
}

function YandexMapEdit({ coordinates, setCoordinates }: IPropsMapEdit) {
  const [coordinatesTemp, setCoordinatesTemp] = useState<CoordType>([0, 0]);

  const MemoizedMarker = memo(({ coord }: { coord: CoordType }) => (
    <YMapDefaultMarker coordinates={coord} />
  ));

  const clickCallback = useCallback((object: unknown, entity: {coordinates:[number, number], screenCoordinates:[number, number]}) => {
    console.log(object);
    setCoordinatesTemp(() => entity.coordinates);
    setCoordinates(entity.coordinates);
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
