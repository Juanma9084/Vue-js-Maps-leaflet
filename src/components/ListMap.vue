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
        <!-- <slot name="listIngenios"> -->
        <Combobox as="div" v-model="ingenioSelected">
          <ComboboxLabel
            class="block text-sm font-medium leading-6 text-gray-900"
            >Ingenios</ComboboxLabel
          >
          <div class="relative mt-2">
            <ComboboxInput
              class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              @change="query = $event.target.value"
              :display-value="(ingenio) => ingenio?.nombre_ingenio"
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
              v-if="filteredIngenios.length > 0"
              class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <ComboboxOption
                v-for="ingenio in filteredIngenios"
                :key="ingenio.id_ingenio"
                :value="ingenio"
                as="template"
                v-slot="{ active, ingenioSelected }"
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
                      ingenioSelected && 'font-semibold',
                    ]"
                  >
                    {{ ingenio.nombre_ingenio }}
                  </span>

                  <span
                    v-if="ingenioSelected"
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

const ingenioSelected = ref("");
const haciendaSelected = ref("");
const suerteSelected = ref("");

const storeList = useListStore();
const storeGeo = useGeometryStore();
const mapStore = useMapStore();

storeList.ingenios;

const query = ref("");

const filteredIngenios = computed(() =>
  query.value === ""
    ? storeList.ingenios
    : storeList.ingenios.filter((ingenio) => {
        return ingenio.nombre_ingenio
          .toLowerCase()
          .includes(query.value.toLowerCase());
      })
);
const filteredHaciendas = computed(() =>
  query.value === ""
    ? storeList.haciendas
    : storeList.haciendas.filter((hacienda) => {
        return hacienda.nombre_hda
          .toLowerCase()
          .includes(query.value.toLowerCase());
      })
);
const filteredSuertes = computed(() =>
  query.value === ""
    ? storeList.suertes
    : storeList.suertes.filter((suerte) => {
        return suerte.suerte.toLowerCase().includes(query.value.toLowerCase());
      })
);

let capa: leaflet.GeoJSON = leaflet.geoJSON();
let data: JSON;

watch(ingenioSelected, async (newValue, oldValue) => {
  mapStore.spinMap(true);
  console.log(newValue, oldValue);
  if (ingenioSelected.value !== "") {
    await storeList.getHaciendas(ingenioSelected.value.codigo_ingenio);
    await storeGeo.getIngeniosGeo(ingenioSelected.value.codigo_ingenio);
  }
  data = storeGeo.ingenios;
  mapStore.spatialQuery(mapStore.mymap, data, capa);
  mapStore.spinMap(false);
});

watch(haciendaSelected, async () => {
  mapStore.spinMap(true);
  if (haciendaSelected.value !== "") {
    await storeList.getSuertes(haciendaSelected.value.ing_hda);
    await storeGeo.getHaciendasGeo(haciendaSelected.value.ing_hda);
  }
  data = storeGeo.haciendas;
  mapStore.spatialQuery(mapStore.mymap, data, capa);
  mapStore.spinMap(false);
});

watch(suerteSelected, async () => {
  mapStore.spinMap(true);
  if (suerteSelected.value !== "") {
    await storeGeo.getSuertesGeo(
      suerteSelected.value.ing_hda + suerteSelected.value.suerte
    );
  }
  data = storeGeo.suertes;
  mapStore.spatialQuery(mapStore.mymap, data, capa);
  mapStore.spinMap(false);
});
</script>

<style></style>
