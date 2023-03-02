import { defineStore } from 'pinia'
import { ref } from 'vue';


export const useTematico2Store = defineStore('tematico2', () => {
  const foo2 = ref(0);
  const bar2 = ref(0);

  const alertFoo = (): void =>  {
    alert(foo2)
  };

  const incrementBar = (amount = 1): void => {
    bar2.value += amount
  };
 
  return {
    foo2,
    bar2,
    alertFoo,
    incrementBar,
  }
})