<template>
  <div class="h-screen relative">
    <!-- <div id="sidebar" class="leaflet-sidebar collapsed"> -->
    <div id="sidebar" class="leaflet-sidebar">
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
        <div class="leaflet-sidebar-pane active" id="home">
          <h1 class="leaflet-sidebar-header">
            Consulta por:
            <div class="leaflet-sidebar-close">
              <!-- <i class="fa fa-caret-left"></i> -->
            </div>
          </h1>
          <Listbox as="div" v-model="ingenioSelected">
            <ListboxLabel
              class="block text-sm font-medium leading-6 text-gray-900"
              >Ingenios</ListboxLabel
            >
            <div class="relative mt-2">
              <ListboxButton
                class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <span class="block truncate">{{
                  ingenioSelected.nombre_ingenio
                }}</span>
                <span
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                >
                  <ChevronUpDownIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    as="template"
                    v-for="ingenio in store.ingenios"
                    :key="ingenio.id_ingenio"
                    :value="ingenio"
                    v-slot="{ active, ingenioSelected }"
                  >
                    <li
                      :class="[
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      ]"
                    >
                      <span
                        :class="[
                          ingenioSelected ? 'font-semibold' : 'font-normal',
                          'block truncate',
                        ]"
                        >{{ ingenio.nombre_ingenio }}</span
                      >

                      <span
                        v-if="ingenioSelected"
                        :class="[
                          active ? 'text-white' : 'text-indigo-600',
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                        ]"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>

          <!-- <span>Seleccionado: {{ ingenio.codigo_ingenio }}</span> -->

          <!-- <select v-model="haciendaSelected">
            <option
              v-for="hacienda in store.haciendas"
              :key="hacienda.id_hacienda"
              :value="hacienda.ing_hda"
            >
              {{ hacienda.nombre_hda }}
            </option>
          </select> -->

          <Combobox as="div" v-model="haciendaSelected">
            <ComboboxLabel
              class="block text-sm font-medium leading-6 text-gray-900"
              >Haciendas</ComboboxLabel
            >
            <div class="relative mt-2">
              <ComboboxInput
                class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @change="query = $event.target.value"
                :display-value="(hacienda) => hacienda?.nombre_hda"
              />
              <ComboboxButton
                class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
              >
                <ChevronUpDownIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </ComboboxButton>

              <ComboboxOptions
                v-if="filteredHaciendas.length > 0"
                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ComboboxOption
                  v-for="hacienda in filteredHaciendas"
                  :key="hacienda.id_hacienda"
                  :value="hacienda"
                  as="template"
                  v-slot="{ active, haciendaSelected }"
                >
                  <li
                    :class="[
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                    ]"
                  >
                    <span
                      :class="[
                        'block truncate',
                        haciendaSelected && 'font-semibold',
                      ]"
                    >
                      {{ hacienda.nombre_hda }}
                    </span>

                    <span
                      v-if="haciendaSelected"
                      :class="[
                        'absolute inset-y-0 right-0 flex items-center pr-4',
                        active ? 'text-white' : 'text-indigo-600',
                      ]"
                    >
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </div>
          </Combobox>

          <Combobox as="div" v-model="suerteSelected">
            <ComboboxLabel
              class="block text-sm font-medium leading-6 text-gray-900"
              >Suertes</ComboboxLabel
            >
            <div class="relative mt-2">
              <ComboboxInput
                class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @change="query = $event.target.value"
                :display-value="(suerte) => suerte?.suerte"
              />
              <ComboboxButton
                class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
              >
                <ChevronUpDownIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </ComboboxButton>

              <ComboboxOptions
                v-if="filteredSuertes.length > 0"
                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ComboboxOption
                  v-for="suerte in filteredSuertes"
                  :key="suerte.id_suertes"
                  :value="suerte"
                  as="template"
                  v-slot="{ active, suerteSelected }"
                >
                  <li
                    :class="[
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                    ]"
                  >
                    <span
                      :class="[
                        'block truncate',
                        suerteSelected && 'font-semibold',
                      ]"
                    >
                      {{ suerte.suerte }}
                    </span>

                    <span
                      v-if="suerteSelected"
                      :class="[
                        'absolute inset-y-0 right-0 flex items-center pr-4',
                        active ? 'text-white' : 'text-indigo-600',
                      ]"
                    >
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </div>
          </Combobox>
        </div>
        <div class="leaflet-sidebar-pane" id="layers">
          <h1 class="leaflet-sidebar-header">
            Mapas base y Capas
            <div class="leaflet-sidebar-close">
              <!-- <i class="fa fa-caret-left"></i> -->
            </div>
          </h1>
          <div class="object-left-top object-contain">
            <div id="controls-pane"></div>
          </div>
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

<script lang="ts" setup>
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
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import useLayers from "@/composables/useLayers";
import { onMounted, ref, watch, computed } from "vue";
import { useListStore } from "@/store/listados";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";

let mymap;
let sidebar;
let layercontrol;

const ingenioSelected = ref("");
const haciendaSelected = ref("");
const suerteSelected = ref("");
const lat = 3.3682;
const lon = -76.4854;
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

const store = useListStore();
store.ingenios;

const query = ref("");
const filteredHaciendas = computed(() =>
  query.value === ""
    ? store.haciendas
    : store.haciendas.filter((hacienda) => {
        return hacienda.nombre_hda
          .toLowerCase()
          .includes(query.value.toLowerCase());
      })
);
const filteredSuertes = computed(() =>
  query.value === ""
    ? store.suertes
    : store.suertes.filter((suerte) => {
        return suerte.suerte.toLowerCase().includes(query.value.toLowerCase());
      })
);

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
  const setParent = (elemento?: HTMLElement, newParent?: HTMLElement) => {
    newParent.appendChild(elemento);
  };
  setParent(htmlObjectLayers, layerpane);
  leaflet.control.scale(scaleBarOption).addTo(mymap);

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

  // sidebar.removePanel("userinfo");
  // sidebar.disablePanel("userinfo");
  // sidebar.enablePanel("userinfo");
  sidebar.open("userinfo");
  // sidebar.open("home");
  sidebar.close();
  sidebar.remove();
  sidebar.removeFrom(mymap);
};

watch(ingenioSelected, async (newValue, oldValue) => {
  // console.log(ingenioSelected.value);
  console.log(newValue, oldValue);
  if (ingenioSelected.value !== "") {
    await store.getHaciendas(ingenioSelected.value.codigo_ingenio);
  }
});

watch(haciendaSelected, async () => {
  if (haciendaSelected.value !== "") {
    await store.getSuertes(haciendaSelected.value.ing_hda);
    // console.log(haciendaSelected.value);
  }
});
watch(suerteSelected, async () => {
  if (suerteSelected.value !== "") {
    console.log(suerteSelected.value);
  }
});

onMounted(async () => {
  await store.getIngenios();
  if (!ingenioSelected.value && store.ingenios) {
    ingenioSelected.value = store.ingenios[0];
  }
  createMap();
});
</script>
