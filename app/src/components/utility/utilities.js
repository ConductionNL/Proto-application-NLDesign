import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function copyToClipboard(text, throwToast = true) {
  let tempInput = document.createElement("input");
  tempInput.id = 'copyInput';
  tempInput.value = text;
  document.body.appendChild(tempInput);

  let copyText = document.getElementById("copyInput");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  if (throwToast) {
    toast.dark("Copied: " + text + " to clipboard!", {
      position: "bottom-right"
    });
  }
}
