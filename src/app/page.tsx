"use client";

import mapboxgl from "mapbox-gl";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
    const map = new mapboxgl.Map({
      container: "map", // container `id`
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }, []);

  return (
    <main>
      <div id="map" className="w-full h-full overflow-clip"></div>
    </main>
  );
}
