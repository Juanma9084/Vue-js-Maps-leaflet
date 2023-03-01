import { extractStore } from '../extractStore'
import { defineStore } from 'pinia'
import { useActions } from './actions'
import { useGetters } from './getters'
import { useState } from './state'

export const useFooStore = defineStore('foo', () => {
  return {
    ...extractStore(useState()),
    ...extractStore(useGetters()),
    ...extractStore(useActions())
  }
})