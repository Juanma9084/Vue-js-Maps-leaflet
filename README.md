# Geoportal Cali

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Uso
 Consumo del api con ***Django-restframework-gis-Cali*** con axios
 
 ### leaflet map
 Se crea un store con leaflet en pinia, en donde se crea el mapa y se consume el estado.
 ```js
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
 ```
 Y este se consume en LeafletMap.ts
 
 ```js
import { onMounted } from "vue";
import { useListStore } from "@/store/listados";
import { useMapStore } from "@/store/mapa";

const lat = 3.3682;
const lon = -76.4854;
const zoom = 11;

const storeList = useListStore();
const mapStore = useMapStore();

storeList.comunas;

onMounted(async () => {
  await storeList.getComunas();
  mapStore.createMap(lat, lon, zoom);
}); 
```
 ### Consumo de API's
 Se crea el API en axios, en donde se crea la URL al que se crea la conexción con el servicio
 ```js
 import axios from 'axios'

const ceniApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})

export default ceniApi
```
Luego se crean los stores de los listados y las geometrias que consumen los servicos del API, en listados.js
```js
import { defineStore } from 'pinia'
import ceniApi from '@/services/ceniApi'
import { ref } from 'vue'
import type { Comunas, Barrios } from '@/services/types'

export const useListStore = defineStore("list", () => {
  const comunas = ref<Comunas[]>([]);
  const barrios = ref<Barrios[]>([]);

    const getComunas = async () => {
    try {
      const data = await ceniApi.get('listados/comunas')
      comunas.value = data.data
      }
      catch (error) {
        console.log(error)
    }
  };
    const getBarrios = async (codigoComuna:string) => {
    try {
      const data = await ceniApi.get(`listados/barrios/?comuna=${codigoComuna}`)
      barrios.value = data.data
      }
      catch (error) {
        console.log(error)
    }
  };
  return {
    comunas,
    getComunas,
    barrios,
    getBarrios,
  }
})
```
y geometrias.js
```js
import { defineStore } from 'pinia'
import ceniApi from '@/services/ceniApi'
import { ref } from 'vue'

export const useGeometryStore = defineStore("geometry", () => {
  const comunas = ref([]);
  const barrios = ref([]);

    const getComunasGeo = async (codigoComuna:string) => {
    try {
      const data = await ceniApi.get(`geometrias/comunas/?comuna=${codigoComuna}`)
      comunas.value = data.data
      }
      catch (error) {
        console.log(error)
    }
  };
    const getBarriosGeo = async (codigoBarrio:string) => {
    try {
      const data = await ceniApi.get(`geometrias/barrios/?barrio=${codigoBarrio}`)
      barrios.value = data.data
      }
      catch (error) {
        console.log(error)
    }
  };
  return {
    comunas,
    getComunasGeo,
    barrios,
    getBarriosGeo,
  }
})
```
