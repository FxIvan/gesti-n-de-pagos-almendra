import { toast } from "react-toastify";
import "./toast.css";

const MyToast = ({ variant = "primary", children }) => {
  const htmlChildren =
    children && children.message ? children.message : children;
  //const htmlChildren = children;
  const style = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    className: `toastify--custom`,
  };

  toast.dismiss();

  switch (variant) {
    case "success":
      toast.success(htmlChildren, style);
      break;
    case "error":
      toast.error(htmlChildren, style);
      break;
    case "danger":
      toast.error(htmlChildren, style);
      break;
    case "warning":
      toast.warn(htmlChildren, style);
      break;
    case "info":
      toast.info(htmlChildren, style);
      break;
    default:
      toast.info(htmlChildren, style);
      break;
  }
};

export default MyToast;
