// import { ref } from 'vue';

import { defineStore } from 'pinia'
import ceniApi from '@/services/ceniApi'
import { ref } from 'vue'
import type { Ingenios, Haciendas, Suertes } from '@/services/types'

export const useListStore = defineStore("list", () => {
  const ingenios = ref<Ingenios[]>([]);
  const haciendas = ref<Haciendas[]>([]);
  const suertes = ref<Suertes[]>([]);

    const getIngenios = async () => {
    try {
      const data = await ceniApi.get('listados/ingenios')
        ingenios.value = data.data
      }
      catch (error) {
        console.log(error)
    }
  };
    const getHaciendas = async (codigoIngenio:string) => {
    try {
      const data = await ceniApi.get(`listados/haciendas/?ing=${codigoIngenio}`)
      haciendas.value = data.data
      }
      catch (error) {
        console.log(error)
    }
  };
    const getSuertes = async (codigoIngenioHacienda:string) => {
    try {
      const data = await ceniApi.get(`listados/suertes/?ing_hda=${codigoIngenioHacienda}`)
      suertes.value = data.data
      }
      catch (error) {
        console.log(error)
    }
  };
  return {
    ingenios,
    getIngenios,
    haciendas,
    getHaciendas,
    suertes,
    getSuertes,
  }
})