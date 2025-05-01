/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const res = error.response;

    if (!res) toast.error("Network error. Try again later...");

    const { errors, message } = res.data;

    if (Array.isArray(errors)) {
      errors.forEach((e: any) => toast.warning(e.description));
    } else if (typeof errors === "object") {
      Object.values(errors)
        .flat()
        .forEach((e: any) => toast.warning(e));
    } else if (errors || message) {
      toast.warning(errors || message);
    } else if (res.status === 409) {
      toast.warning("Email or Username already in use...");
    }
  } else {
    toast.error("Unexpected error");
  }
};
