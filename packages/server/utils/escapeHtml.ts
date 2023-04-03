const matchHtmlRegExp = /['&<>]/;

export const escapeHtml = (rawHtml: string) => {
  const match = matchHtmlRegExp.exec(rawHtml);

  if (!match) {
    return rawHtml;
  }

  let html = '';
  let index: number;
  let lastIndex = 0;

  const htmlSymbols = new Map([
    [34, '&quot;'],
    [38, '&amp;'],
    [60, '&lt;'],
    [62, '&gt;'],
  ]);

  for (index = match.index; index < rawHtml.length; index++) {
    const charCode = rawHtml.charCodeAt(index);
    const escapedSymbol = htmlSymbols.get(charCode);

    if (escapedSymbol) {
      if (lastIndex !== index) {
        html += rawHtml.substring(lastIndex, index);
      }

      lastIndex = index + 1;
      html += escapedSymbol;
    }
  }

  return lastIndex !== index
    ? html + rawHtml.substring(lastIndex, index)
    : html;
};
