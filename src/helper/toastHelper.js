import { toast } from "react-toastify";

const displaySuccess = (message = "Success") => {
	toast.success(message, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
		toastId: "success",
	});
};
const displayError = (message = "Something went wrong") => {
	toast.error(message, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
		toastId: "error",
	});
};

export { displaySuccess, displayError };
