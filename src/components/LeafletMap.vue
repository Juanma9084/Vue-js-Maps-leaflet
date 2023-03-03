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
          <div id="controls-pane" class="object-left-top object-contain"></div>
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
import {
  MagnifyingGlassIcon,
  Square3Stack3DIcon,
  WrenchIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";
import useLayers from "@/composables/useLayers";
import {
  defineComponent,
  onMounted,
  // computed,
} from "vue";
// import { useListadoIngenios } from "@/store/listadoIngenios";

export default defineComponent({
  name: "LMap",
  components: {
    MagnifyingGlassIcon,
    Square3Stack3DIcon,
    WrenchIcon,
    UserIcon,
  },
  setup() {
    let mymap;
    let sidebar;
    let layercontrol;

    const lat = 3.3682;
    const lon = -76.3854;
    const zoom = 11;
    const scaleBarOption = {
      maxWidth: 200,
      metric: true,
      imperial: false,
    };
    // const panelContent = {
    //   id: "userinfo",
    //   tab: '<i class="fa fa-gear"></i>',
    //   title: "Your Profile",
    // };

    // const listIngenios = useListadoIngenios();
    // const ingenios = computed(() => listIngenios.ingenios);
    // console.log(ingenios);

    const createMap = () => {
      mymap = leaflet.map("mapid", {
        center: [lat, lon],
        zoom: zoom,
        layers: [useLayers.osm, useLayers.arcsat, useLayers.cenimap],
      });

      sidebar = leaflet.control
        .sidebar({
          autopan: false,
          closeButton: true,
          container: "sidebar",
          position: "left",
        })
        .addTo(mymap);

      layercontrol = leaflet.control
        .layers(useLayers.baseMaps, useLayers.overlayMaps, {
          collapsed: false,
        })
        .addTo(mymap);
      const htmlObjectLayers = layercontrol.getContainer();
      const layerpane = document.getElementById("controls-pane");
      const setParent = (elemento: any, newParent: any) => {
        newParent.appendChild(elemento);
      };
      console.log(layerpane);
      setParent(htmlObjectLayers, layerpane);
      leaflet.control.scale(scaleBarOption).addTo(mymap);
      // sidebar.addPanel(layercontrol);

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
