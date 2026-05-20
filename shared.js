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
      <header><h2>Information</h2><i class="icon icon-close" onclick="toggleInfo();" style="font-size: 1.5rem;">×</i></header>
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

// Cookie consent and GA tracking
const GA_MEASUREMENT_ID = "G-CS3G16HP6X";
const GA_CONSENT_STORAGE_KEY = "cookie_consent_ga";

function loadGoogleAnalytics() {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);

  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(gaScript);
}

function hideCookieBanner() {
  const banner = document.getElementById("cookie-consent-banner");
  if (banner) {
    banner.remove();
  }
}

function setCookieConsent(consent) {
  localStorage.setItem(GA_CONSENT_STORAGE_KEY, consent);
  hideCookieBanner();
  if (consent === "accepted") {
    loadGoogleAnalytics();
  }
}

function createCookieBanner() {
  const banner = document.createElement("div");
  banner.id = "cookie-consent-banner";
  banner.innerHTML = `
    <p>We use Google Analytics cookies to understand site usage. You can accept or reject analytics cookies.</p>
    <div class="cookie-consent-actions">
      <button type="button" id="cookie-consent-accept">Accept</button>
      <button type="button" id="cookie-consent-reject">Reject</button>
    </div>
  `;

  const style = document.createElement("style");
  style.id = "cookie-consent-style";
  style.textContent = `
    #cookie-consent-banner {
      position: fixed;
      left: 1rem;
      right: 1rem;
      bottom: 1rem;
      z-index: 9999;
      background: #1f1f1f;
      color: #fff;
      border-radius: 8px;
      padding: 0.9rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.8rem;
      box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
    }
    #cookie-consent-banner p {
      margin: 0;
      font-size: 0.95rem;
      line-height: 1.3;
      flex: 1 1 260px;
    }
    .cookie-consent-actions {
      display: flex;
      gap: 0.5rem;
      flex-shrink: 0;
    }
    .cookie-consent-actions button {
      border: 0;
      border-radius: 4px;
      padding: 0.45rem 0.75rem;
      font-weight: 600;
      cursor: pointer;
    }
    #cookie-consent-accept {
      background: #6aaa64;
      color: #fff;
    }
    #cookie-consent-reject {
      background: #3a3a3c;
      color: #fff;
      border: 1px solid #6b6b6b;
    }
  `;

  if (!document.getElementById("cookie-consent-style")) {
    document.head.appendChild(style);
  }
  document.body.appendChild(banner);

  const acceptButton = document.getElementById("cookie-consent-accept");
  const rejectButton = document.getElementById("cookie-consent-reject");
  if (acceptButton) acceptButton.addEventListener("click", () => setCookieConsent("accepted"));
  if (rejectButton) rejectButton.addEventListener("click", () => setCookieConsent("rejected"));
}

function initializeCookieConsent() {
  const consent = localStorage.getItem(GA_CONSENT_STORAGE_KEY);
  if (consent === "accepted") {
    loadGoogleAnalytics();
    return;
  }
  if (consent === "rejected") {
    return;
  }
  createCookieBanner();
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
  document.addEventListener('DOMContentLoaded', () => {
    initializeSharedComponents();
    initializeCookieConsent();
  });
} else {
  initializeSharedComponents();
  initializeCookieConsent();
}
