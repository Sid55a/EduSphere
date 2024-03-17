"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Layer, Map, Marker, Source } from "react-map-gl";
import * as z from "zod";
import { Button } from "../ui/button";
const formSchema = z.object({
  name: z.string().min(1, { message: "Music name is required" }),
});

export const MapModel = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, aiChatResult, type, coord, data } = useModal();
  const isModelOpen = isOpen && type === "mapModel";
  const mapRef = useRef<any>();
  const MAPBOX_DRIVING_ENDPOINT =
    "https://api.mapbox.com/directions/v5/mapbox/driving/";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const otherCoor = {
    lat: data.other?.lat,
    lng: data.other?.lng,
  };

  const [direction, setDirection] = useState<any>();

  const mapSet = async () => {
    if (coord.lat !== "" && coord.lng !== "") {
      console.log("Bhai bhai bhai");
      await axios.patch("/api/map", coord);
    }
  };

  mapSet();
  const getDirectionRoute = async () => {
    console.log("Api get direction");
    if (otherCoor?.lng && otherCoor?.lat) {
      const res = await fetch(
        MAPBOX_DRIVING_ENDPOINT +
          coord.lng +
          "," +
          coord.lat +
          ";" +
          parseFloat(otherCoor?.lng) +
          "," +
          parseFloat(otherCoor?.lat) +
          "?overview=full&geometries=geojson" +
          "&access_token=" +
          "pk.eyJ1Ijoic2lkNTV4IiwiYSI6ImNsbGdzZmxudDBqMHkzanBxNHkyYmNscXgifQ.3JrFe4DQFnrQND58lTsgXg",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      setDirection(result);
    }
  };
  const handleCor = () => {
    getDirectionRoute();
  };

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <Dialog open={isModelOpen} onOpenChange={onClose}>
        <DialogContent className={"bg-white text-black pb-6 overflow-hidden "}>
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Current Location
              <Button onClick={handleCor}>Click</Button>
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              {coord?.lat && coord?.lng ? (
                <Map
                  ref={mapRef}
                  mapboxAccessToken="pk.eyJ1Ijoic2lkNTV4IiwiYSI6ImNsbGdzZmxudDBqMHkzanBxNHkyYmNscXgifQ.3JrFe4DQFnrQND58lTsgXg"
                  initialViewState={{
                    longitude: coord.lng,
                    latitude: coord.lat,
                    zoom: 15,
                  }}
                  style={{ width: "100%", height: 450, borderRadius: 10 }}
                  mapStyle="mapbox://styles/mapbox/standard"
                >
                  <Marker
                    longitude={coord?.lng}
                    latitude={coord?.lat}
                    anchor="bottom"
                  >
                    <img src="/pin.png" alt="pin" className="w-10 h-10" />
                  </Marker>
                  {data?.type &&
                  otherCoor?.lat &&
                  otherCoor?.lat !== "" &&
                  otherCoor?.lng &&
                  otherCoor?.lng !== "" ? (
                    <Marker
                      longitude={parseFloat(otherCoor?.lng)}
                      latitude={parseFloat(otherCoor?.lat)}
                      anchor="bottom"
                    >
                      <img src="/pin.png" alt="pin" className="w-10 h-10" />
                    </Marker>
                  ) : (
                    <h1>No the other user no location</h1>
                  )}

                  {/* <SourceConfig other={data.other} me={data.me} /> */}

                  {direction && (
                    <Source
                      type="geojson"
                      data={{
                        type: "Feature",
                        geometry: {
                          type: "LineString",
                          coordinates:
                            direction?.routes[0]?.geometry?.coordinates,
                        },
                        properties: {},
                      }}
                    >
                      <Layer
                        type="line"
                        layout={{ "line-join": "round", "line-cap": "square" }}
                        paint={{ "line-color": "#0462d4", "line-width": 4 }}
                      />
                    </Source>
                  )}
                </Map>
              ) : (
                <h1>Refesh the map</h1>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
