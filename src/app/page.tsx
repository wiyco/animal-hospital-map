"use client";

import mapboxgl from "mapbox-gl";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
    const map = new mapboxgl.Map({
      container: "map", // container `id`
      style: "mapbox://styles/w1yco/clilw3bwh004o01pw9bfa5hbh", // style URL
      center: [139.696892, 35.690318], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });
  }, []);

  return (
    <main>
      <div id="map" className="w-full h-full overflow-clip"></div>
    </main>
  );
}
