import axios from 'axios';
import { defineStore } from 'pinia'
import { ref } from 'vue';


export const useListadoIngenios = defineStore('listadoIngenios', () => {
  const ingenios = ref([]);

  const getIngenios = async() => {
    const data = await axios.get('http://127.0.0.1:8000/listados/ingenios',{
      headers: {
        "Access-Control-Allow-Origin": "*",
        'origin':'x-requested-with',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Content-Type': 'application/json',
      },
      proxy: {
        host: '127.0.0.1',
        port: 8000
      },
      // responseType: "json",
    });
    const response = data
    console.log(response)
    if(data.data.length > 0 ){
      ingenios.value = data.data
    }
  };
  
  getIngenios()

  return {
    ingenios
  }
})