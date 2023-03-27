// import { ref } from 'vue';

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