
import { API } from '@/API/axios-instance';

const clientService = {
   getList: (url) => {
      return API.get(url)
         .then(response => {
            return response.data
         })
      // .catch(errors => {
      //    console.log("get List error", errors.response.data);
      //    return errors.response.data;
      // })
   },
   changePage(url) {
      console.log("url " + url);
      return API.get(url)
         .then(response => {
            return response.data;
         })
      // .catch(errors => {
      //    console.log("change page error", errors.response.data);
      //    return errors.response.data;
      // });
   },
   search(url) {
      console.log("search url " + url);
      return API.get(url)
         .then(response => {
            return response.data;
         })
      // .catch(errors => {
      //    console.log("change page error", errors.response.data);
      //    return errors.response.data;
      // });
   }

}

export default clientService;