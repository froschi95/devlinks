const validateUrl = (url: string) => /^https?:\/\/.+\..+/.test(url);

export { validateUrl };
