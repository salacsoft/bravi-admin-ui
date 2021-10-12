
import { API } from '@/API/axios-instance';

export const CLIENT_ENDPOINT = {
   URL: "/v1/clients",
   EXPORT: "/v1/clients/file/export"
}

export const clientAPI = {
   async getList(options) {
      let paginate = options.paginate ? `paginate=${options.paginate}&` : "";
      let orderBy = options.orderBy ? `orderBy=${options.orderBy}&` : "";
      let search = options.search ? `search=${options.search}` : "";
      return await API.get(CLIENT_ENDPOINT.URL + "?" + paginate + orderBy + search)
   },
   async changePage(url) {
      return API.get(url);
   },
   async saveClient(payload) {
      console.log(payload);
      return await API.post(CLIENT_ENDPOINT.URL, payload)
   },
   async updateClient(id, payload) {
      return await API.patch(CLIENT_ENDPOINT.URL + "/" + id, payload);
   }


}