<template>
  <l-map>
    <template v-slot:listas>
      <list-map> </list-map>
    </template>
  </l-map>
</template>

<script lang="ts">
import LMap from "@/components/LeafletMap.vue";
import listMap from "@/components/ListMap.vue";

export default {
  components: {
    LMap,
    listMap,
  },
};
</script>
