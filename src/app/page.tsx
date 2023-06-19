"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

import MapboxDirections from "@mapbox/mapbox-gl-directions";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import Sheet, { SheetRef } from "react-modal-sheet";

type hospitalParams = {
  name: string;
  address: string;
  phone: string;
  animal_type: string;
  hospital_url: string;
};

export default function Home({ mapboxDirections }: any) {
  // State of hospital params
  const [params, setParams] = useState<hospitalParams>();
  // Is cursor on the layer that `animal-hospitals`
  const [onCursor, setOnCursor] = useState<boolean>(false);
  // The target feature id
  let featureId = 0;

  // Open status of bottom sheet
  const [isOpen, setIsOpen] = useState(false);
  // Reference of bottom sheet
  const sheetRef = useRef<SheetRef>();
  // Snap func of bottom sheet
  const snapTo = (i: number) => sheetRef.current?.snapTo(i);
  // Open bottom sheet
  const openSheet = () => {
    setIsOpen(true);
    snapTo(0);
  };
  // Snap bottom sheet to header height
  const snapSheet = () => {
    snapTo(1);
  };

  // Set hospital params to bottom sheet
  const setData = (map: mapboxgl.Map, e: mapboxgl.EventData) => {
    const feature = e.features?.[0];
    if (!feature) return;
    // Set a hover param to `true`
    map.setFeatureState(
      {
        source: "animal-hospitals",
        sourceLayer: "animal_hospital_kanto_v1-500lo8",
        id: feature.id,
      },
      {
        hover: true,
      }
    );
    // Set a hover param to `false` that clicked before
    if (featureId !== feature.id) {
      map.setFeatureState(
        {
          source: "animal-hospitals",
          sourceLayer: "animal_hospital_kanto_v1-500lo8",
          id: featureId,
        },
        {
          hover: false,
        }
      );
    }
    featureId = feature.id;
    const props = feature.properties;
    /**
     * @todo mapbox要相談
     * @param {props.name}
     * csv(utf-8, comma)をTilesへアップロードすると、
     * 先頭のcolumn-headerに謎のUnicode文字が追加される。(u{feff})
     * おそらくutf-8のbomに関連するバグだと思われる。
     */
    setParams({
      name: props?.["\u{feff}name"] as string,
      address: props?.address as string,
      phone: props?.phone as string,
      animal_type: props?.animal_type as string,
      hospital_url: props?.hospital_url as string,
    });
    // Open bottom sheet
    openSheet();
  };

  // Mapbox
  useEffect(() => {
    // Init Mapbox
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [139.696892, 35.690318],
      zoom: 14,
    });

    // Ready Mapbox
    map.on("load", () => {
      map.addSource("animal-hospitals", {
        type: "vector",
        url: "mapbox://w1yco.3a69ve5a",
      });
      map.addLayer({
        id: "animal-hospitals",
        source: "animal-hospitals",
        "source-layer": "animal_hospital_kanto_v1-500lo8",
        type: "circle",
        paint: {
          "circle-color": "#4264fb",
          "circle-stroke-width": 3,
          "circle-stroke-color": "#ffffff",
          // change circle-size at `hover`
          "circle-radius": ["case", ["boolean", ["feature-state", "hover"], false], 12, 8],
        },
      });
      map.addLayer({
        id: "animal-hospitals-label",
        source: "animal-hospitals",
        "source-layer": "animal_hospital_kanto_v1-500lo8",
        type: "symbol",
        layout: {
          /**
           * @todo @param {props.name}
           */
          "text-field": ["get", "\u{feff}name"],
          "text-font": ["Open Sans Regular"],
          "text-offset": [0, 1],
          "text-anchor": "top",
          "text-size": 14,
        },
        paint: {
          "text-color": "#e64c4c",
          "text-halo-color": "#ffffff",
          "text-halo-width": 1,
        },
      });

      // Add zoom and rotation controls
      const nav = new mapboxgl.NavigationControl({
        visualizePitch: true,
      });
      map.addControl(nav, "top-right");

      // Add geo controls
      const geo = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      });
      map.addControl(geo);

      // Add directions
      const dir = mapboxDirections;
      map.addControl(dir);

      map.on("click", (e) => {
        const features = map.queryRenderedFeatures(e.point);
        const hasTarget = features.some((feature) => feature.source === "animal-hospitals");
        if (hasTarget) return;
        // Snap bottom sheet
        snapSheet();
      });
      map.on("click", "animal-hospitals", (e) => {
        setOnCursor(true);
        setData(map, e);
      });
      map.on("mousemove", "animal-hospitals", (e) => {
        setOnCursor(true);
        setData(map, e);
      });
      map.on("mouseleave", "animal-hospitals", () => {
        setOnCursor(false);
        // Set a hover param to `false`
        map.setFeatureState(
          {
            source: "animal-hospitals",
            sourceLayer: "animal_hospital_kanto_v1-500lo8",
            id: featureId,
          },
          {
            hover: false,
          }
        );
      });
    });
  }, []);

  return (
    <main className="relative">
      <div
        id="map"
        className={`${onCursor ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"}`}
      ></div>
      <Sheet
        ref={sheetRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        snapPoints={[0.5, 65, 25]}
        initialSnap={2}
        springConfig={{ stiffness: 200, damping: 20, mass: 0.5 }}
        detent="content-height"
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className="px-4 flex flex-col items-start justify-center">
              <h1 className="text-xl">{params?.name}</h1>
              <ul className="py-4 flex flex-col items-start justify-center space-y-2">
                <li>{params?.address}</li>
                <li>{params?.phone}</li>
                <li>{params?.animal_type}</li>
                <li>
                  <a
                    className="text-blue-600 hover:underline"
                    href={params?.hospital_url ?? ""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {params?.hospital_url}
                  </a>
                </li>
              </ul>
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </main>
  );
}

export async function getStaticProps() {
  const mapboxDirections = new MapboxDirections({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "",
    unit: "metric",
    profile: "mapbox/driving",
  });

  return {
    props: {
      mapboxDirections: mapboxDirections,
    },
  };
}
