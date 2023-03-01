import { useState } from './state'
import { defineStore } from "pinia"

export const useActions = defineStore('repo.actions', () => {
  const state = useState()

  function alertFoo(): void {
    alert(state.foo)
  }

  function incrementBar(amount = 1) {
    state.bar += amount
  }

  // Note you are free to define as many internal functions as you want.
  // You only expose the functions that are returned.
  return {
    alertFoo,
    incrementBar
  }
})