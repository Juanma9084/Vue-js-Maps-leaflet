import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { useTematico2Store } from './tematico2';

const tematico2Store = useTematico2Store();

export const useTematicoStore = defineStore('tematico', () => {
  const foo = ref(0);
  const bar = ref(0);

  const foobar = computed((): string => {
    tematico2Store.foo2 = 1;
    return `foo-${foo.value}`
  });

  const doubleBar = computed((): string => {
    return `${bar.value * 2}`
  });

  return {
    foo,
    bar,
    foobar,
    doubleBar,
  }
})