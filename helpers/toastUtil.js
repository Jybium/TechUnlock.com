
import { toast } from "react-hot-toast";

export const showSuccessToast = (message) => {
  toast.success(message, {
    duration: 4000,
    position: "top-right",
    style: {
      background: "#4caf50",
      color: "#fff",
    },
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    duration: 4000,
    position: "top-right",
    style: {
      background: "#f44336",
      color: "#fff",
    },
  });
};
