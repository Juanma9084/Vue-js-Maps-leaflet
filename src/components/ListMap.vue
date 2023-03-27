<template>
  <div id="sidebar" class="leaflet-sidebar">
    Nav tabs
    <div class="leaflet-sidebar-tabs">
      <ul role="tablist">
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

      <ul role="tablist"></ul>
    </div>

    <div class="leaflet-sidebar-content">
      <div class="leaflet-sidebar-pane active" id="home">
        <h1 class="leaflet-sidebar-header">
          Consulta por:
          <div class="leaflet-sidebar-close"></div>
        </h1>

        <Combobox as="div" v-model="comunaSelected">
          <ComboboxLabel
            class="block text-sm font-medium leading-6 text-gray-900"
            >Comunas</ComboboxLabel
          >
          <div class="relative mt-2">
            <ComboboxInput
              class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              @change="query = $event.target.value"
              :display-value="(comuna) => comuna?.id_comuna"
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
              v-if="filteredComunas.length > 0"
              class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <ComboboxOption
                v-for="comuna in filteredComunas"
                :key="comuna.id_comuna"
                :value="comuna"
                as="template"
                v-slot="{ active, comunaSelected }"
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
                      comunaSelected && 'font-semibold',
                    ]"
                  >
                    {{ comuna.id_comuna }}
                  </span>

                  <span
                    v-if="comunaSelected"
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

        <Combobox as="div" v-model="barrioSelected">
          <ComboboxLabel
            class="block text-sm font-medium leading-6 text-gray-900"
            >Barrios</ComboboxLabel
          >
          <div class="relative mt-2">
            <ComboboxInput
              class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              @change="query = $event.target.value"
              :display-value="(barrio) => barrio?.nombre"
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
              v-if="filteredBarrios.length > 0"
              class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <ComboboxOption
                v-for="barrio in filteredBarrios"
                :key="barrio.id_barrio"
                :value="barrio"
                as="template"
                v-slot="{ active, barrioSelected }"
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
                      barrioSelected && 'font-semibold',
                    ]"
                  >
                    {{ barrio.nombre }}
                  </span>

                  <span
                    v-if="barrioSelected"
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
          <div class="leaflet-sidebar-close"></div>
        </h1>
        <div class="object-left-top object-contain">
          <div id="controls-pane"></div>
        </div>
      </div>

      <div class="leaflet-sidebar-pane" id="tools">
        <h1 class="leaflet-sidebar-header">
          Herramientas
          <div class="leaflet-sidebar-close"></div>
        </h1>
      </div>

      <div class="leaflet-sidebar-pane" id="profile">
        <h1 class="leaflet-sidebar-header">
          Seccion de usuario
          <div class="leaflet-sidebar-close"></div>
        </h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-spin";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { ref, watch, computed } from "vue";
import { useListStore } from "@/store/listados";
import { useGeometryStore } from "@/store/geometrias";
import { useMapStore } from "@/store/mapa";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";
import {
  MagnifyingGlassIcon,
  Square3Stack3DIcon,
  WrenchIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";

const comunaSelected = ref("");
const barrioSelected = ref("");

const storeList = useListStore();
const storeGeo = useGeometryStore();
const mapStore = useMapStore();

storeList.comunas;

const query = ref("");

const filteredComunas = computed(() =>
  query.value === ""
    ? storeList.comunas
    : storeList.comunas.filter((comuna) => {
      return comuna.id_comuna.toLowerCase().includes(query.value.toLowerCase());
      })
);
const filteredBarrios = computed(() =>
  query.value === ""
    ? storeList.barrios
    : storeList.barrios.filter((barrio) => {
        return barrio.nombre.toLowerCase().includes(query.value.toLowerCase());
      })
);

let capa: leaflet.GeoJSON = leaflet.geoJSON();
let data: JSON;

watch(comunaSelected, async (newValue, oldValue) => {
  mapStore.spinMap(true);
  console.log(newValue, oldValue);
  if (comunaSelected.value !== "") {
    await storeList.getBarrios(comunaSelected.value.id_comuna);
    await storeGeo.getComunasGeo(comunaSelected.value.id_comuna);
  }
  data = storeGeo.comunas;
  mapStore.spatialQuery(mapStore.mymap, data, capa);
  mapStore.spinMap(false);
});

watch(barrioSelected, async () => {
  mapStore.spinMap(true);
  if (barrioSelected.value !== "") {
    await storeGeo.getBarriosGeo(barrioSelected.value.id_barrio);
  }
  data = storeGeo.barrios;
  mapStore.spatialQuery(mapStore.mymap, data, capa);
  mapStore.spinMap(false);
});
</script>

<style></style>
