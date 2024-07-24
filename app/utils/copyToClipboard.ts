const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => console.log("Copy to clipboard successful!"),
    (err) => console.error("Could not copy text: ", err)
  );
};

export default copyToClipboard;
