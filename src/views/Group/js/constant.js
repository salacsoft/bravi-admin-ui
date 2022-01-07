export const COLUMNS = ["group_name"];
export const TABLE_HEADERS = ["GROUP NAME"];
export const GROUP_ENDPOINT = process.env.VUE_APP_API_URL + "/v1/groups";
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
      orderBy: "group_name",
   }
};

