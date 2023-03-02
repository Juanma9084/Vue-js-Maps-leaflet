<template>
  <div class="h-screen relative">
    <div id="sidebar" class="leaflet-sidebar collapsed">
      Nav tabs
      <div class="leaflet-sidebar-tabs">
        <ul role="tablist">
          <!-- top aligned tabs -->
          <li>
            <a href="#home" role="tab"
              ><i><MagnifyingGlassIcon class="h-8 w-8" /></i
            ></a>
          </li>
          <li>
            <a href="#layers" role="tab"
              ><i><Square3Stack3DIcon class="h-8 w-8" /></i
            ></a>
          </li>
          <li>
            <a href="#tools" role="tab"
              ><i><WrenchIcon class="h-8 w-8" /></i
            ></a>
          </li>
          <li>
            <a href="#profile" role="tab"
              ><i><UserIcon class="h-8 w-8" /></i
            ></a>
          </li>
        </ul>

        <ul role="tablist">
          <!-- bottom aligned tabs -->
        </ul>
      </div>

      <!-- Tab panes -->
      <div class="leaflet-sidebar-content">
        <div class="leaflet-sidebar-pane" id="home">
          <h1 class="leaflet-sidebar-header">
            Consulta por:
            <div class="leaflet-sidebar-close">
              <!-- <i class="fa fa-caret-left"></i> -->
            </div>
          </h1>
          <p>A responsive sidebar for mapping libraries</p>
        </div>

        <div class="leaflet-sidebar-pane" id="layers">
          <h1 class="leaflet-sidebar-header">
            Mapas base y Capas
            <div class="leaflet-sidebar-close">
              <!-- <i class="fa fa-caret-left"></i> -->
            </div>
          </h1>
        </div>

        <div class="leaflet-sidebar-pane" id="tools">
          <h1 class="leaflet-sidebar-header">
            Herramientas
            <div class="leaflet-sidebar-close">
              <!-- <i class="fa fa-caret-left"></i> -->
            </div>
          </h1>
        </div>

        <div class="leaflet-sidebar-pane" id="profile">
          <h1 class="leaflet-sidebar-header">
            Seccion de usuario
            <div class="leaflet-sidebar-close">
              <!-- <i class="fa fa-caret-left"></i> -->
            </div>
          </h1>
        </div>
      </div>
    </div>
    <!-- Map -->
    <div id="mapid" class="h-5/6 z-[10] relative"></div>
  </div>
</template>

<script lang="ts">
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-sidebar-v2";
import "leaflet-sidebar-v2/css/leaflet-sidebar.css";
// import MiniMap from "leaflet-minimap";
// import LeafletMinimap from "leaflet-minimap";
import {
  MagnifyingGlassIcon,
  Square3Stack3DIcon,
  WrenchIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";
import { defineComponent, onMounted } from "vue";
// import axios from "axios";

export default defineComponent({
  name: "LMap",
  components: { MagnifyingGlassIcon, Square3Stack3DIcon, WrenchIcon, UserIcon },
  setup() {
    let mymap;
    let tilemap;
    let sidebar;

    const lat = 3.3682;
    const lon = -76.3854;
    const zoom = 11;
    // const panelContent = {
    //   id: "userinfo",
    //   tab: '<i class="fa fa-gear"></i>',
    //   title: "Your Profile",
    // };
    const scaleBarOption = {
      maxWidth: 200,
      metric: true,
      imperial: false,
    };
    // const miniMapOption = {
    //   position: "bottomleft",
    //   width: 200,
    //   height: 200,
    // };

    const createMap = () => {
      mymap = leaflet.map("mapid").setView([lat, lon], zoom);
      tilemap = leaflet.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 18,
        }
      );
      tilemap.addTo(mymap);
      sidebar = leaflet.control
        .sidebar({
          autopan: false,
          closeButton: true,
          container: "sidebar",
          position: "left",
        })
        .addTo(mymap);
      leaflet.control.scale(scaleBarOption).addTo(mymap);
      // MiniMap(tilemap, miniMapOption).addTo(mymap);
      // let coords = leaflet.latLng();
      // console.log(coords);
      // sidebar.addPanel(panelContent);
      // sidebar.addPanel({
      //   id: "ghlink",
      //   tab: '<i class="fa fa-github"></i>',
      //   button: "https://github.com/noerw/leaflet-sidebar-v2",
      // });
      // sidebar.addPanel({
      //   id: "click",
      //   tab: '<i class="fa fa-info"></i>',
      //   button: function (event) {
      //     console.log(event);
      //   },
      // });
      sidebar.removePanel("userinfo");
      // sidebar.disablePanel("userinfo");
      // sidebar.enablePanel("userinfo");
      sidebar.open("userinfo");
      sidebar.close();
      sidebar.remove();
      sidebar.removeFrom(mymap);
    };

    onMounted(() => {
      createMap();
    });
  },
});
</script>
