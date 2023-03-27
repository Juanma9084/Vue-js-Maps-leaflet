// import { ref } from 'vue';

import { defineStore } from 'pinia'
import ceniApi from '@/services/ceniApi'
import { ref } from 'vue'
import type { Comunas, Barrios } from '@/services/types'

export const useListStore = defineStore("list", () => {
  const comunas = ref<Comunas[]>([]);
  const barrios = ref<Barrios[]>([]);

    const getComunas = async () => {
    try {
      const data = await ceniApi.get('listados/comunas')
      comunas.value = data.data
      }
      catch (error) {
        console.log(error)
    }
  };
    const getBarrios = async (codigoComuna:string) => {
    try {
      const data = await ceniApi.get(`listados/barrios/?comuna=${codigoComuna}`)
      barrios.value = data.data
      }
      catch (error) {
        console.log(error)
    }
  };
  return {
    comunas,
    getComunas,
    barrios,
    getBarrios,
  }
})