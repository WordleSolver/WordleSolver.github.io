// Wordle Solver Chrome Extension - Content Script
// Integrates with Wordle game pages to provide solving assistance

(function() {
  'use strict';

  let solver = null;
  let extensionUI = null;
  let isGameDetected = false;

  // Initialize the extension
  function initialize() {
    // Check if we're on a Wordle page
    if (detectWordlePage()) {
      console.log('Wordle Solver: Game detected!');
      isGameDetected = true;
      solver = new window.WordleSolver();
      createExtensionUI();
      observeGameChanges();
    }
  }

  // Detect if we're on a Wordle game page
  function detectWordlePage() {
    // Check for common Wordle game indicators
    const indicators = [
      // NYTimes Wordle
      '[data-testid="game-app"]',
      '.Game-container',
      '#wordle-app-game',
      // Other Wordle sites
      '.board',
      '.game-board',
      '#game',
      '.wordle-board'
    ];

    for (const indicator of indicators) {
      if (document.querySelector(indicator)) {
        return true;
      }
    }

    // Check URL patterns
    return window.location.href.includes('wordle') || 
           window.location.href.includes('/games/wordle') ||
           document.title.toLowerCase().includes('wordle');
  }

  // Create the extension UI overlay
  function createExtensionUI() {
    // Create container
    extensionUI = document.createElement('div');
    extensionUI.id = 'wordle-solver-extension';
    extensionUI.innerHTML = `
      <div class="ws-header">
        <h3>🎯 Wordle Solver</h3>
        <button id="ws-toggle" title="Minimize">−</button>
      </div>
      <div class="ws-content">
        <div class="ws-status">
          <span id="ws-remaining">2315 words remaining</span>
          <label class="ws-hard-mode">
            <input type="checkbox" id="ws-hard-mode"> Hard Mode
          </label>
        </div>
        <div class="ws-suggestions">
          <h4>💡 Best Words:</h4>
          <ol id="ws-suggestion-list">
            <li class="ws-loading">Analyzing game state...</li>
          </ol>
        </div>
        <div class="ws-controls">
          <button id="ws-reset">🔄 Reset</button>
          <button id="ws-help">❓ Help</button>
        </div>
      </div>
    `;

    // Add to page
    document.body.appendChild(extensionUI);

    // Add event listeners
    setupEventListeners();

    // Position the UI
    positionUI();

    // Initial suggestions
    updateSuggestions();
  }

  // Position the UI to avoid interfering with the game
  function positionUI() {
    // Try to position next to the game board
    const gameContainer = document.querySelector('[data-testid="game-app"], .Game-container, #game, .board');
    
    if (gameContainer) {
      const rect = gameContainer.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      
      // Position to the right if there's space, otherwise to the left
      if (rect.right + 320 < windowWidth) {
        extensionUI.style.left = `${rect.right + 10}px`;
      } else {
        extensionUI.style.right = '10px';
      }
      
      extensionUI.style.top = `${Math.max(10, rect.top)}px`;
    }
  }

  // Setup event listeners for the UI
  function setupEventListeners() {
    // Toggle minimize/maximize
    document.getElementById('ws-toggle').addEventListener('click', () => {
      const content = document.querySelector('.ws-content');
      const toggle = document.getElementById('ws-toggle');
      
      if (content.style.display === 'none') {
        content.style.display = 'block';
        toggle.textContent = '−';
        toggle.title = 'Minimize';
      } else {
        content.style.display = 'none';
        toggle.textContent = '+';
        toggle.title = 'Expand';
      }
    });

    // Hard mode toggle
    document.getElementById('ws-hard-mode').addEventListener('change', (e) => {
      solver.setHardMode(e.target.checked);
      updateSuggestions();
    });

    // Reset button
    document.getElementById('ws-reset').addEventListener('click', () => {
      solver.reset();
      updateSuggestions();
      console.log('Wordle Solver: Reset');
    });

    // Help button
    document.getElementById('ws-help').addEventListener('click', showHelp);
  }

  // Update suggestions display
  function updateSuggestions() {
    const suggestions = solver.getSuggestions(8);
    const suggestionList = document.getElementById('ws-suggestion-list');
    const remainingSpan = document.getElementById('ws-remaining');

    // Update remaining count
    remainingSpan.textContent = `${solver.getRemainingWordCount()} words remaining`;

    // Update suggestions list
    if (suggestions.length === 0) {
      suggestionList.innerHTML = '<li class="ws-no-suggestions">No suggestions available</li>';
      return;
    }

    suggestionList.innerHTML = suggestions.map((suggestion, index) => {
      const icon = suggestion.inWordList ? '🎯' : '🔍';
      const className = suggestion.inWordList ? 'ws-in-list' : 'ws-explore';
      return `<li class="${className}">
        <span class="ws-rank">${index + 1}.</span>
        <span class="ws-word">${suggestion.word.toUpperCase()}</span>
        <span class="ws-entropy">${suggestion.entropy}</span>
        <span class="ws-icon">${icon}</span>
      </li>`;
    }).join('');
  }

  // Extract game state from the Wordle board
  function extractGameState() {
    const guesses = [];
    
    try {
      // Try NYTimes Wordle format
      const rows = document.querySelectorAll('[data-testid="row"]');
      
      for (const row of rows) {
        const tiles = row.querySelectorAll('[data-testid="tile"]');
        if (tiles.length !== 5) continue;

        let word = '';
        let colourMap = [];
        let isComplete = true;

        for (const tile of tiles) {
          const letter = tile.textContent.toLowerCase();
          if (!letter) {
            isComplete = false;
            break;
          }
          
          word += letter;
          
          // Determine color from classes or aria-label
          const evaluation = tile.getAttribute('data-state') || 
                           tile.getAttribute('aria-label') || 
                           tile.className;

          if (evaluation.includes('correct') || evaluation.includes('green')) {
            colourMap.push(2);
          } else if (evaluation.includes('present') || evaluation.includes('yellow')) {
            colourMap.push(1);
          } else if (evaluation.includes('absent') || evaluation.includes('gray') || evaluation.includes('grey')) {
            colourMap.push(0);
          } else {
            isComplete = false;
            break;
          }
        }

        if (isComplete && word.length === 5) {
          guesses.push({ word, colourMap });
        } else {
          break; // Stop at first incomplete row
        }
      }
    } catch (error) {
      console.log('Wordle Solver: Error extracting game state:', error);
    }

    return guesses;
  }

  // Observe changes to the game board
  function observeGameChanges() {
    const gameContainer = document.querySelector('[data-testid="game-app"], .Game-container, #game, .board') || document.body;
    
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      
      for (const mutation of mutations) {
        // Look for changes that might indicate a new guess
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'data-state' || 
             mutation.attributeName === 'aria-label' ||
             mutation.attributeName === 'class')) {
          shouldUpdate = true;
          break;
        }
        
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldUpdate = true;
          break;
        }
      }
      
      if (shouldUpdate) {
        // Debounce updates
        setTimeout(updateFromGameState, 100);
      }
    });

    observer.observe(gameContainer, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-state', 'aria-label', 'class']
    });
  }

  // Update solver state from game
  function updateFromGameState() {
    const currentGuesses = extractGameState();
    
    // Check if we have new guesses
    if (currentGuesses.length > solver.guesses.length) {
      // Reset solver and replay all guesses
      solver.reset();
      
      for (const guess of currentGuesses) {
        solver.addGuess(guess.word, guess.colourMap);
      }
      
      updateSuggestions();
      console.log('Wordle Solver: Updated with', currentGuesses.length, 'guesses');
    }
  }

  // Show help modal
  function showHelp() {
    const helpModal = document.createElement('div');
    helpModal.id = 'ws-help-modal';
    helpModal.innerHTML = `
      <div class="ws-modal-content">
        <div class="ws-modal-header">
          <h3>🎯 Wordle Solver Help</h3>
          <button id="ws-close-help">×</button>
        </div>
        <div class="ws-modal-body">
          <h4>How it works:</h4>
          <ul>
            <li>🎯 <strong>Target words</strong> are possible answers</li>
            <li>🔍 <strong>Explore words</strong> give maximum information</li>
            <li>Numbers show <strong>information value</strong> (higher = better)</li>
          </ul>
          
          <h4>Tips:</h4>
          <ul>
            <li>Start with high-entropy words like SOARE or TARES</li>
            <li>Use explore words early to gather information</li>
            <li>Switch to target words when few remain</li>
            <li>Enable Hard Mode if playing with Wordle's hard mode rules</li>
          </ul>
          
          <p><small>Based on information theory principles from 3Blue1Brown</small></p>
        </div>
      </div>
    `;

    document.body.appendChild(helpModal);

    document.getElementById('ws-close-help').addEventListener('click', () => {
      document.body.removeChild(helpModal);
    });

    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) {
        document.body.removeChild(helpModal);
      }
    });
  }

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getStatus') {
      if (isGameDetected && solver) {
        sendResponse({
          wordCount: solver.getRemainingWordCount(),
          guessCount: solver.guesses.length,
          active: true
        });
      } else {
        sendResponse({ active: false });
      }
    }
  });

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  // Also try to initialize after a delay in case the game loads dynamically
  setTimeout(initialize, 1000);

})();