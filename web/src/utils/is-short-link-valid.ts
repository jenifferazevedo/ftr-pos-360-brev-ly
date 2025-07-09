export const isShortLinkValid = (shortLink: string) => {
    const shortLinkRegex = /^[a-z0-9-]+$/;
    
    if (!shortLinkRegex.test(shortLink)) {
        return false;
    }
    
    return true;
};