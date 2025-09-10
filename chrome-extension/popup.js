// Popup script for Wordle Solver Chrome Extension

document.addEventListener('DOMContentLoaded', function() {
  checkActiveTab();
  setupEventListeners();
});

function setupEventListeners() {
  // Help link
  document.getElementById('help-link').addEventListener('click', function(e) {
    e.preventDefault();
    showHelp();
  });
}

// Check if extension is active on current tab
async function checkActiveTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (isWordlePage(tab.url)) {
      // Try to get status from content script
      try {
        const response = await chrome.tabs.sendMessage(tab.id, { action: 'getStatus' });
        if (response) {
          showActiveStatus(tab.url, response);
        } else {
          showInactive();
        }
      } catch (error) {
        // Content script might not be loaded yet
        showInactive();
      }
    } else {
      showInactive();
    }
  } catch (error) {
    console.error('Error checking active tab:', error);
    showInactive();
  }
}

// Check if URL is a Wordle page
function isWordlePage(url) {
  if (!url) return false;
  
  const wordlePatterns = [
    'nytimes.com/games/wordle',
    'wordlegame.org',
    'wordle.com',
    'wordleunlimited.com',
    'wordleonline.com'
  ];
  
  return wordlePatterns.some(pattern => url.includes(pattern)) || 
         url.toLowerCase().includes('wordle');
}

// Show active status
function showActiveStatus(url, status) {
  document.getElementById('not-active').style.display = 'none';
  document.getElementById('status-section').style.display = 'block';
  
  // Extract site name from URL
  const siteName = extractSiteName(url);
  document.getElementById('current-site').textContent = siteName;
  
  // Update status if available
  if (status.wordCount !== undefined) {
    document.getElementById('word-count').textContent = status.wordCount;
  }
  if (status.guessCount !== undefined) {
    document.getElementById('guess-count').textContent = status.guessCount;
  }
}

// Show inactive status
function showInactive() {
  document.getElementById('not-active').style.display = 'block';
  document.getElementById('status-section').style.display = 'none';
}

// Extract readable site name from URL
function extractSiteName(url) {
  try {
    const hostname = new URL(url).hostname;
    
    if (hostname.includes('nytimes.com')) return 'NY Times Wordle';
    if (hostname.includes('wordlegame.org')) return 'Wordle Game';
    if (hostname.includes('wordleunlimited.com')) return 'Wordle Unlimited';
    if (hostname.includes('wordleonline.com')) return 'Wordle Online';
    
    return hostname.replace('www.', '');
  } catch (error) {
    return 'Wordle Site';
  }
}

// Show help information
function showHelp() {
  const helpContent = `
    <div style="max-height: 300px; overflow-y: auto; padding: 10px;">
      <h3 style="margin-top: 0;">🎯 Wordle Solver Help</h3>
      
      <h4>Understanding Suggestions:</h4>
      <ul>
        <li><strong>🎯 Target words</strong> - Possible correct answers</li>
        <li><strong>🔍 Explore words</strong> - Best for gathering information</li>
        <li><strong>Numbers</strong> - Information value (higher = better)</li>
      </ul>
      
      <h4>Strategy Tips:</h4>
      <ul>
        <li>Start with high-entropy words (SOARE, TARES, RALES)</li>
        <li>Use explore words early in the game</li>
        <li>Switch to target words when few options remain</li>
        <li>Enable Hard Mode if playing with those rules</li>
      </ul>
      
      <h4>Supported Sites:</h4>
      <ul>
        <li>NY Times Wordle (official)</li>
        <li>Wordle Unlimited</li>
        <li>Most Wordle clone sites</li>
      </ul>
      
      <p><small>Algorithm based on information theory principles from 3Blue1Brown's Wordle analysis.</small></p>
    </div>
  `;
  
  // Create modal overlay
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    border-radius: 8px;
    padding: 20px;
    max-width: 400px;
    width: 90%;
    position: relative;
    font-family: inherit;
  `;
  
  content.innerHTML = helpContent + `
    <button id="close-help" style="
      position: absolute;
      top: 10px;
      right: 15px;
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #666;
    ">×</button>
  `;
  
  modal.appendChild(content);
  document.body.appendChild(modal);
  
  // Close handlers
  document.getElementById('close-help').onclick = () => document.body.removeChild(modal);
  modal.onclick = (e) => {
    if (e.target === modal) document.body.removeChild(modal);
  };
}