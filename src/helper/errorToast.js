import { showMessage } from "@/components/alert-toast/toast";

export function showError(error) {
  if (error.response) {
    showMessage(error.response.data.error, "error");
  } else {
    showMessage(error, "error");
  }
}
