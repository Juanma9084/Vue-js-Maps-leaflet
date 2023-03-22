import { defineStore } from 'pinia'
import { ref} from 'vue';

import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-sidebar-v2";
import "leaflet-sidebar-v2/css/leaflet-sidebar.css";
import "leaflet-spin";

import useLayers from "@/composables/useLayers";

const scaleBarOption = {
  maxWidth: 200,
  metric: true,
  imperial: false,
};

export const useMapStore = defineStore('mapa', () => {
  const mymap = ref();
  const sidebar = ref();
  const layercontrol = ref();
  
  const spinMap = (bool:boolean): void => {
    mymap.value.spin(bool)
  }
  
  const createMap = (lat:number, lon:number, zoom:number): void => {
    mymap.value = leaflet.map("mapid", {
      center: [lat, lon],
      zoom: zoom,
      layers: [useLayers.osm, useLayers.arcsat, useLayers.cenimap],
    });
  
    sidebar.value = leaflet.control
      .sidebar({
        autopan: false,
        closeButton: true,
        container: "sidebar",
        position: "left",
      })
      .addTo(mymap.value);
  
    layercontrol.value = leaflet.control
      .layers(useLayers.baseMaps, useLayers.overlayMaps, {
        collapsed: false,
      })
      .addTo(mymap.value);
    const htmlObjectLayers = layercontrol.value.getContainer();
    const layerpane = document.getElementById("controls-pane")!;
    const setParent = (elemento: HTMLElement, newParent: HTMLElement) => {
      newParent.appendChild(elemento);
    };
    setParent(htmlObjectLayers, layerpane);
    leaflet.control.scale(scaleBarOption).addTo(mymap.value);
  
    sidebar.value.open("userinfo");
    sidebar.value.close();
    sidebar.value.remove();
    sidebar.value.removeFrom(mymap.value);
  };
  
  const spatialQuery = (map:leaflet.Map, data:any, capa:leaflet.GeoJSON): void => {
    console.log(map);
    map.removeLayer(capa);
    capa.clearLayers();
    capa.addData(data);
    const estilo = { fill: false, color: "#6C0CF0" };
    capa.setStyle((feature) => {
        return estilo;
    });
    map.addLayer(capa);
    capa.addTo(map);
    map.fitBounds(capa.getBounds());
  }

  return{
    mymap,
    spinMap,
    createMap,
    spatialQuery
  }
})