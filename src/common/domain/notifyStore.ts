import { defineStore } from "pinia";
import { useQuasar } from "quasar";
import axios, { AxiosError } from "axios";
import { ExceptionError } from "@/common/common/ExceptionError";

export const useNotifyStore = defineStore("notify", () => {
  const $q = useQuasar();

  function notifySuccess(message: string, caption?: string): void {
    $q.notify({
      message: message,
      caption: caption ? caption.slice(0, 500) + (caption.length > 500 ? "..." : "") : undefined,
      type: "positive",
      iconSize: "2rem",
    });
  }

  function notifyInfo(message: string, caption?: string): void {
    $q.notify({
      message: message,
      caption: caption ? caption.slice(0, 500) + (caption.length > 500 ? "..." : "") : undefined,
      type: "info",
      iconSize: "2rem",
    });
  }

  function notifyError(message: string, caption?: string): void {
    $q.notify({
      message: message,
      caption: caption ? caption.slice(0, 500) + (caption.length > 500 ? "..." : "") : undefined,
      type: "negative",
      iconSize: "2rem",
    });
  }

  function notifySystemError(err: Error): void {
    notifyError("Oops! Something went wrong.");
    console.error(err);
  }

  function notifyAxiosError(err: AxiosError<ExceptionError> | Error): void {
    if (axios.isAxiosError(err)) {
      if (err.response?.status == 400) {
        notifyError("Bad Request Error", err.response?.data.data.errorMessage);
      } else if (err.response?.status == 401) {
        notifyError("Unauthorized Error", err.response?.data.data.errorMessage);
      } else if (err.response?.status == 404) {
        notifyError("Not Found Error", err.response?.data.data.errorMessage);
      } else if (err.response?.status == 500) {
        notifyError(
          "Internal Server Error",
          err.response?.data.data.errorMessage
        );
      } else if (err.code !== "ERR_CANCELED") {
        notifyError(err.message);
      }
    } else {
      notifySystemError(err);
    }
  }

  return {
    success: notifySuccess,
    info: notifyInfo,
    error: notifyError,
    systemError: notifySystemError,
    axiosError: notifyAxiosError
  };
});
