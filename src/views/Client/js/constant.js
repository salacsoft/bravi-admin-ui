export const COLUMNS = [
   "client_code",
   "client_name",
   "client_address"
];

export const TABLE_HEADERS = ["Client Code", "Owner /Client Name", "Address"];
export const CLIENT_ENDPOINT = process.env.VUE_APP_API_URL + "/v1/clients";

export const ACTION_BUTTONS = [{
   icon: "EditIcon",
   color: "text-white",
   action: "edit"
}, {
   icon: "RemoveIcon",
   color: "text-white",
   action: "remove"
}];

export const HAVE_ACTION_BUTTON = true;

export const API_OPTION = {
   params: {
      paginate: 10,
      search: "",
      orderBy: ["client_name"]
   }
};

