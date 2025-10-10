import type { ToasterProps } from "react-hot-toast";

const toasterOptions: ToasterProps = {
  position: "bottom-center",
  toastOptions: {
    className: "!bg-card !text-foreground !px-5 !border-primary !border",
    error: {
      className:
        "!bg-card !text-destructive-foreground !border-destructive !border",
    },
  },
};

export default toasterOptions;
