<template>
  <div class="h-screen relative">
    <slot name="listas" />
    <!-- Map -->
    <div id="mapid" class="h-5/6 z-[10] relative"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useListStore } from "@/store/listados";
import { useMapStore } from "@/store/mapa";

const lat = 3.3682;
const lon = -76.4854;
const zoom = 11;

const storeList = useListStore();
const mapStore = useMapStore();

storeList.ingenios;

onMounted(async () => {
  await storeList.getIngenios();
  mapStore.createMap(lat, lon, zoom);
});
</script>
