import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapComponentsProvider,
  YMapMarker,
} from "ymap3-components";
import { ToursType } from "../../redux/ToursPage/toursTypes";
// import { features, LOCATION } from

function YandexMapMain() {
  const [tours, setTours] = useState<ToursType>([]);
  const [marker, setMarker] = useState<number | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:3009/api/tours/`).then((response) => {
      setTours(response.data);
    });
  }, []);

  return (
    <>
      <div style={{ width: "100%", height: "600px" }}>
        <YMapComponentsProvider apiKey="9a755d75-8fed-42f6-9785-a2e149b48899">
          <YMap location={{ center: [38.59, 45.02], zoom: 7 }} mode="vector">
            <YMapDefaultSchemeLayer />
            <YMapDefaultFeaturesLayer />

            {tours.map(
              (el) => (
                <YMapMarker
                  key={el.id}
                  coordinates={[Number(el.location_y), Number(el.location_x)]}
                >
                  <img
                    src="../../../public/wino pointer.ico"
                    onClick={() => setMarker(el.id)}
                  />
                  {marker === el.id && (
                    <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                        backgroundColor: "#EBDAA8",
                        border: "2px solid #A62044",
                        padding: "10px",
                        borderRadius: "6px",
                        maxWidth: "250px",
                        maxHeight: "200px",
                      }}
                    >
                      <Link to={`/tour/${el.id}`}>
                        <h4 style={{ textAlign: "center", padding: "4px" }}>
                          {el.title}
                        </h4>
                      </Link>{" "}
                      <img
                        src={`http://localhost:3009/images/${el.path_img}`}
                        alt="photo"
                        style={{
                          justifyContent: "space-around",
                          display: "flex",
                          width: "120px",
                          height: "70px",
                          padding: "4px",
                        }}
                      />
                      <p
                        style={{
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        {" "}
                        <Button
                          onClick={() => setMarker(null)}
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: "#A62044",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <h4 style={{ margin: 0 }}>x</h4>
                        </Button>
                      </p>
                    </div>
                  )}
                </YMapMarker>
              )
              /* (
        <YMapDefaultMarker  key={el.id} coordinates={[Number(el.location_y),Number(el.location_x)]} />) */
            )}
          </YMap>
        </YMapComponentsProvider>
      </div>
    </>
  );
}

export default YandexMapMain;
