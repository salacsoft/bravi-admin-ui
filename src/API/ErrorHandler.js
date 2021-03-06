const ErrorHandler = (errors)  => {
    const responseData = errors.response.data ?? {};
    const StatusCode = errors.response.status ?? 500;
    const status = {
        400: "Bad request, Please check your data",
        401: "UnAuthorized",
        403: "Forbidden",
        422: "Invalid data given",
        409: "Conflict, Please check the response message",
        500: "Something went wrong please ask for assistance from system administrator",
        503: "Service Unavailable",
    }

    const error = {
        422: function(data) {
            let messages = "";
            let errors = data.errors;
            Object.keys(errors).map(key => {
                messages += errors[key][0] + " \n ";
            });
            return {title: status[StatusCode], description: messages};
        },
        400: (error) => {
            const message = error.message ?? "Something went wrong";
            return {title: status[StatusCode], description: message};
        },
        401: (error) => {
            const message = error.message ?? "Something went wrong";
            return {title: status[StatusCode], description: message};
        },
        403: (error) => {
            const message = error.message ?? "Something went wrong";
            return {title: status[StatusCode], description: message};
        },
        409: (error) => {
            const message = error.message ?? "Something went wrong";
            return {title: status[StatusCode], description: message};
        },
        500: (error) => {
            const message = error.message ?? "Something went wrong";
            return {title: status[StatusCode], description: message};
        },
        503: (error) => {
            const message = error.message ?? "Something went wrong";
            return {title: status[StatusCode], description: message};
        },
    }
    return error[errors.response.status](responseData);
}

export default ErrorHandler;