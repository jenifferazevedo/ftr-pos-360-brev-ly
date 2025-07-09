export const downloadUrl = async (url: string) => {
  try {
    const link = document.createElement("a");
    link.href = url;
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const segments = pathname
      .split("/")
      .filter((segment) => segment.length > 0);
    const filename = segments.length > 0 ? segments[segments.length - 1] : null;

    if (!filename) {
      throw new Error("URL does not contain a valid filename");
    }
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading the file", error);
  }
};