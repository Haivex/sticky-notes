const createTextareaDropzone = (
  textarea: HTMLTextAreaElement,
): HTMLTextAreaElement => {
  const givenElement = textarea;
  givenElement.addEventListener('drop', (e) => {
    e.preventDefault();
    if (!e.dataTransfer || !e.dataTransfer.files) return;

    const fileList = e.dataTransfer.files;

    if (fileList.length > 1) return;

    const file = fileList.item(0) as File;

    file.text().then((extractedText) => {
      givenElement.value = extractedText;
    });
  });

  return givenElement;
};
export default createTextareaDropzone;
