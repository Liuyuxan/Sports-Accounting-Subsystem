import { defineStore } from 'pinia'

const useDownload = defineStore('download', {
  state: () => ({
    sportUid: "1"
  }),
  actions: {
    changeSportId(id) {
      this.sportUid = id
    }
  }

})

export default useDownload
