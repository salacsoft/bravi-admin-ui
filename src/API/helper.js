export const errorHandler = (error) => {

   let errorType = {
      '422': () => status422(error.data.errors || []),
      '401': () => status401(error.data),
      '500': () => status500(error.data)
   }

   return errorType[error.status]?.() || "Please, check your network connection and contact system Administrator";

}


function status422(errors) {
   let errorMsg = "";
   for (let err in errors) {
      if (Array.isArray(errors[err])) {
         for (let item in errors[err]) {
            errorMsg += err.toUpperCase() + " : " + errors[err][item] + "<br>";
         }
      } else {
         errorMsg += "\n" + errors[err];
      }
   }
   return errorMsg;
}


function status401(error) {
   return error.message || "unAuthorized access - please contact system administrator!";
}


function status500(error) {
   return error.message || "Server Error - please contact system administrator!";
}