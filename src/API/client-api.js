
import { API } from '@/API/axios-instance';

export const CLIENT_ENDPOINT = {
   URL: "/v1/clients",
   EXPORT: "/v1/clients/file/export"
}

export const clientAPI = {
   getList(options) {
      let paginate = options.paginate ? `paginate=${options.paginate}&` : "";
      let orderBy = options.orderBy ? `orderBy=${options.orderBy}&` : "";
      let search = options.search ? `search=${options.search}` : "";
      return API.get(CLIENT_ENDPOINT.URL + "?" + paginate + orderBy + search)
   },
   find(id) {
      return API.get(CLIENT_ENDPOINT.URL + "/" + id);
   },
   changePage(url) {
      return API.get(url);
   },
   save(payload) {
      console.log(payload);
      return API.post(CLIENT_ENDPOINT.URL, payload)
   },
   update(id, payload) {
      return API.patch(CLIENT_ENDPOINT.URL + "/" + id, payload);
   },
   delete(id) {
      return API.delete(CLIENT_ENDPOINT.URL + "/" + id);
   }


}