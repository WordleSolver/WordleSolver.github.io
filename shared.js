// Shared utilities to reduce HTML duplication

// Create keyboard HTML structure
function createKeyboard() {
  return `
    <div id="keyboard-container">
      <div class="keyboard-row">
        <button data-key="q" id="q">q</button>
        <button data-key="w" id="w">w</button>
        <button data-key="e" id="e">e</button>
        <button data-key="r" id="r">r</button>
        <button data-key="t" id="t">t</button>
        <button data-key="y" id="y">y</button>
        <button data-key="u" id="u">u</button>
        <button data-key="i" id="i">i</button>
        <button data-key="o" id="o">o</button>
        <button data-key="p" id="p">p</button>
      </div>
      <div class="keyboard-row">
        <div class="spacer-half"></div>
        <button data-key="a" id="a">a</button>
        <button data-key="s" id="s">s</button>
        <button data-key="d" id="d">d</button>
        <button data-key="f" id="f">f</button>
        <button data-key="g" id="g">g</button>
        <button data-key="h" id="h">h</button>
        <button data-key="j" id="j">j</button>
        <button data-key="k" id="k">k</button>
        <button data-key="l" id="l">l</button>
        <div class="spacer-half"></div>
      </div>
      <div class="keyboard-row">
        <button data-key="enter" class="wide-button">enter</button>
        <button data-key="z" id="z">z</button>
        <button data-key="x" id="x">x</button>
        <button data-key="c" id="c">c</button>
        <button data-key="v" id="v">v</button>
        <button data-key="b" id="b">b</button>
        <button data-key="n" id="n">n</button>
        <button data-key="m" id="m">m</button>
        <button data-key="del" class="wide-button">del</button>
      </div>
    </div>
  `;
}

// Create info modal HTML structure
function createInfoModal(content, extraContent = '') {
  return `
    <div id="info" class="hide">
      <header><h2>Information</h2><i class="icon icon-close" onclick="toggleInfo();" style="font-size: 1.5rem;"></i></header>
      <p>This wordle solver can help you regularly get 3 or 4 in your daily wordles.</p>
      <p>This solver will provide a list of the best words and a list of the best options and a score telling you how useful they are.</p>
      <p>${content}</p>
      ${extraContent}
      <p>Please enjoy the website and for any queries contact me at <a href="mailto:WordleSolver@outlook.com" style="text-decoration: underline;">WordleSolver@outlook.com</a> or raise an issue on my <a href="https://github.com/WordleSolver/WordleSolver.github.io" target="_blank" style="text-decoration: underline;">GitHub</a></p>
      <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="lachydauth" data-color="#FFDD00" data-emoji=""  data-font="Cookie" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#000000" data-coffee-color="#ffffff" ></script>
    </div>
  `;
}

// Create header HTML structure  
function createHeader(title, leftButtons = '', rightButtons = '') {
  return `
    <header>
      <div id="left-buttons">
        ${leftButtons}
      </div>
      <h1 id="title">${title}</h1>
      <div id="right-buttons">
        ${rightButtons}
      </div>
    </header>
  `;
}

// Create board container HTML structure
function createBoardContainer() {
  return `
    <div id="board-container">
      <div id="board"></div>
    </div>
  `;
}

// Create common tracking scripts
function createAnalyticsScripts() {
  return `
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-CS3G16HP6X"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-CS3G16HP6X');
    </script>
    <script type='text/javascript' src='https://platform-api.sharethis.com/js/sharethis.js#property=62ff6806af6eee0019fb97f6&product=sop' async='async'></script>
  `;
}

// Shared JavaScript functions

// Create game board squares (shared across multiple files)
function createSquares() {
  const gameBoard = document.querySelector("#board");

  for (let i = 0; i < 6; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < 5; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("id", i.toString() + j.toString());
      row.appendChild(square);
    }
    gameBoard.appendChild(row);
  }
}

// Toggle info modal (shared across multiple files) 
function toggleInfo() {
  const infoElement = document.querySelector("#info");
  if (infoElement) {
    infoElement.classList.toggle("hide");
    localStorage.setItem("first_time","1");
  }
}

// Initialize components on page load
function initializeSharedComponents() {
  // Insert keyboard if container exists
  const keyboardPlaceholder = document.getElementById('keyboard-placeholder');
  if (keyboardPlaceholder) {
    keyboardPlaceholder.outerHTML = createKeyboard();
  }
  
  // Insert info modal if placeholder exists
  const infoPlaceholder = document.getElementById('info-placeholder');
  if (infoPlaceholder) {
    const content = infoPlaceholder.getAttribute('data-content') || 'To use this solver type in the word you put in to wordle. Then click on the squares to toggle their color until they match what you got in wordle. Then press enter to calculate the next best words.';
    const extraContent = infoPlaceholder.getAttribute('data-extra') || '';
    infoPlaceholder.outerHTML = createInfoModal(content, extraContent);
  }
  
  // Insert header if placeholder exists
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    const title = headerPlaceholder.getAttribute('data-title') || 'Wordle';
    const leftButtons = headerPlaceholder.getAttribute('data-left') || '';
    const rightButtons = headerPlaceholder.getAttribute('data-right') || '';
    headerPlaceholder.outerHTML = createHeader(title, leftButtons, rightButtons);
  }
  
  // Insert board if placeholder exists
  const boardPlaceholder = document.getElementById('board-placeholder');
  if (boardPlaceholder) {
    boardPlaceholder.outerHTML = createBoardContainer();
    // Create squares after board is inserted
    createSquares();
  }
}

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSharedComponents);
} else {
  initializeSharedComponents();
}