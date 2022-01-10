export const COLUMNS = ["branch_code", "branch_name", "client_name", "branch_address"];
export const TABLE_HEADERS = ["Branch Code", "Branch Name", "Owner/Client", "Address"];
export const BRANCHES_ENDPOINT = process.env.VUE_APP_API_URL + "/v1/branches";

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
      orderBy: ["branch_name"],
   }
};

