import { toast, Bounce } from "react-toastify";

type ToastType = "success" | "error" | "info" | "warning" | "default";

const Notify = (message: string, type: ToastType = "success") => {
    const toastFn = {
        success: toast.success,
        error: toast.error,
        info: toast.info,
        warning: toast.warning,
        default: toast,
    }[type];
    toastFn(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
    });
};

export default Notify;
