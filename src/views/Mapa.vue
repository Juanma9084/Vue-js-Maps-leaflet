<template>
  <leaflet-map>
    <template v-slot:listas>
      <list-map> </list-map>
    </template>
  </leaflet-map>
</template>

<script lang="ts">
import leafletMap from "@/components/LeafletMap.vue";
import listMap from "@/components/ListMap.vue";

export default {
  components: {
    leafletMap,
    listMap,
  },
};
</script>
