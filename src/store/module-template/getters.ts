import { computed } from 'vue'
import { useState } from './state'
import { defineStore } from "pinia"

export const useGetters = defineStore('repo.getters', () => {
  const state = useState()

  const foobar = computed((): string => {
    return `foo-${state.foo}`
  })

  const doubleBar = computed((): string => {
    return `${state.bar * 2}`
  })

  return {
    foobar,
    doubleBar
  }
})