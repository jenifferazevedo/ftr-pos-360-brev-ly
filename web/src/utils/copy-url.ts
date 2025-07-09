export async function copyURLToClipboard(url: string) {
    try {
        await navigator.clipboard.writeText(url);
    } catch (err) {
        console.error("Failed to copy: ", err);
    }
}