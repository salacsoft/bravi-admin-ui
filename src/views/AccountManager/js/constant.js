export const COLUMNS = ["account_code", "full_name", "mobile_no"];
export const TABLE_HEADERS = ["Account Code", "Name", "Mobile no"];
export const ACCOUNT_MANAGER_ENDPOINT = process.env.VUE_APP_API_URL + "/v1/account-managers";
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
      orderBy: ["first_name", "middle_name", "last_name"],
   }
};

