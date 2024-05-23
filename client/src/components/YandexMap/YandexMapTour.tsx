// import React from "react";
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapComponentsProvider,
  YMapMarker,
} from "ymap3-components";
// import styles from "./YandexMapTour.module.css"

interface YandexMapTourProps {
  tourId: number;
  locationX: string;
  locationY: string;
}

function YandexMapTour({ tourId, locationX, locationY }: YandexMapTourProps) {
  return (
    <>
    <div style={{ width: "1200px", height: "500px" }}>
    <YMapComponentsProvider apiKey="9a755d75-8fed-42f6-9785-a2e149b48899">
      <YMap
        location={{ center: [parseFloat(locationX), parseFloat(locationY)], zoom: 7 }}
        mode="vector"
      >
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />

        {/* <YMapMarker coordinates={[parseFloat(locationX), parseFloat(locationY)]} >
          <section>
            <h1>You can drag this header</h1>
          </section>
        </YMapMarker> */}
        <YMapMarker
                key={ tourId }
                coordinates={[parseFloat(locationX), parseFloat(locationY)]}
                // color="#fc4c00"
                // popup={{content: tourTitle, position: 'left'}}
              >
                <img src='/wino_pointer.ico'/>
                </YMapMarker>
      </YMap>
    </YMapComponentsProvider>
    </div>
    </>
  );
}

export default YandexMapTour;
