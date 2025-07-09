import axios from "axios";
import { downloadUrl } from "../utils/download-url";

export async function exportCSV() {
  const response = await axios.post<{ reportUrl: string }>(`${import.meta.env.VITE_BACKEND_URL}links/exports`);

  if (response && response.status === 200) {
    await downloadUrl(response.data.reportUrl);
  }
}