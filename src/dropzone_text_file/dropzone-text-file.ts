const createTextareaDropzone = (
  textarea: HTMLInputElement,
): HTMLInputElement => {
  const givenElement = textarea;
  textarea.addEventListener('drop', (e) => {
    if (!e.dataTransfer || !e.dataTransfer.files) return;

    const { item, length } = e.dataTransfer.files;

    if (length > 1 || item(0) == null) return;

    const file = item(0) as File;

    file.text().then((extractedText) => {
      givenElement.value = extractedText;
    });
  });

  return givenElement;
};
export default createTextareaDropzone;
