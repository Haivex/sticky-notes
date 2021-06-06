const focusLastLine = (element: HTMLElement): void => {
  const range = document.createRange();
  const selection = window.getSelection();
  const lastLineIndex = element.childNodes.length - 1;
  const lastLine = element.childNodes[lastLineIndex];

  range.setStart(lastLine, lastLine.textContent?.length || 0);
  range.collapse(true);
  selection?.removeAllRanges();
  selection?.addRange(range);
  element.focus();
};

export default focusLastLine;
