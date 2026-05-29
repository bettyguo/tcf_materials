/* MathJax 3 configuration for mkdocs-material + pymdownx.arithmatex.
 * Re-typeset on Material's instant-nav page swap.
 */
window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true,
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex",
  },
};

if (typeof document$ !== "undefined" && document$.subscribe) {
  document$.subscribe(function () {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetClear && window.MathJax.typesetClear();
      window.MathJax.typesetPromise();
    }
  });
}
