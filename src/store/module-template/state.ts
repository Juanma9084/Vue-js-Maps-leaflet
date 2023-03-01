import { defineStore } from "pinia"

export interface State {
    foo: string
    bar: number
  }
  
  export const useState = defineStore({
    id: 'repo.state',
  
    state: (): State => {
      return {
        foo: 'bar',
        bar: 7
      }
    }
  })

