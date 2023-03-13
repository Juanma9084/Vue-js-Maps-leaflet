// import { ref } from 'vue';

import { defineStore } from 'pinia'
import ceniApi from '@/services/ceniApi'
import { ref } from 'vue'
// import type { Ingenios, Haciendas, Suertes } from '@/services/types'

export const useGeometryStore = defineStore("geometry", () => {
  const ingenios = ref([]);
  const haciendas = ref([]);
  const suertes = ref([]);

    const getIngeniosGeo = async (codigoIngenio:string) => {
    try {
      const data = await ceniApi.get(`geometrias/ingenios/?ing=${codigoIngenio}`)
        ingenios.value = data.data
      }
      catch (error) {
        console.log(error)
    }
  };
    const getHaciendasGeo = async (codigoIngenioHacienda:string) => {
    try {
      const data = await ceniApi.get(`geometrias/haciendas/?inghda=${codigoIngenioHacienda}`)
      haciendas.value = data.data
      }
      catch (error) {
        console.log(error)
    }
  };
    const getSuertesGeo = async (codigoSuerte:string) => {
    try {
      const data = await ceniApi.get(`geometrias/suertes/?cod_unico=${codigoSuerte}`)
      suertes.value = data.data
      }
      catch (error) {
        console.log(error)
    }
  };
  return {
    ingenios,
    getIngeniosGeo,
    haciendas,
    getHaciendasGeo,
    suertes,
    getSuertesGeo,
  }
})