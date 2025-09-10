# GitHub Copilot Instructions for WordleSolver.github.io

## Project Overview

This is a **Wordle Solver** web application built with vanilla HTML, CSS, and JavaScript. The project is deployed as a GitHub Pages site and provides multiple game modes to help users solve Wordle puzzles optimally. The solver is based on concepts from 3Blue1Brown's video about Wordle solving strategies.

## Architecture & Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, and ES6+ JavaScript
- **Deployment**: GitHub Pages (static site hosting)
- **No Build System**: Direct file serving, no compilation or bundling required
- **No Dependencies**: Self-contained application with no external JavaScript libraries

## Project Structure

```
/
├── .github/                 # GitHub configuration and workflows
├── .vscode/                 # VS Code settings
├── data/                    # Word lists and data processing scripts
│   ├── words.txt           # Wordle word list
│   └── python.py           # Script to process word lists
├── game/                    # Regular game mode
│   ├── index.html
│   ├── main.js
│   └── styles.css
├── play-with-hints/         # Hints mode
│   ├── index.html
│   ├── main.js
│   └── styles.css
├── index.html              # Main solver interface
├── menu.html               # Navigation menu
├── hard.html               # Hard mode interface
├── hard.js                 # Hard mode logic
├── main.js                 # Main solver algorithm
├── shared.js               # Shared utilities and components
└── styles.css              # Global styles
```

## Key Components

### 1. Main Solver (`index.html` + `main.js`)
- Primary interface for solving Wordle puzzles
- Implements information theory-based word suggestions
- Interactive grid for inputting guesses and results
- Real-time calculation of optimal next words

### 2. Shared Utilities (`shared.js`)
- Common HTML generation functions (keyboard, modals)
- Reusable UI components across different modes
- Utility functions for DOM manipulation

### 3. Game Modes
- **Regular Mode**: Standard Wordle solving interface
- **Hard Mode**: Stricter rules following Wordle's hard mode
- **Play with Hints**: Guided mode with additional hints
- **Menu**: Navigation between different modes

## Coding Standards & Best Practices

### JavaScript Guidelines
- Use modern ES6+ syntax (const/let, arrow functions, template literals)
- Follow functional programming patterns where possible
- Keep functions small and focused on single responsibilities
- Use descriptive variable and function names
- Prefer `const` over `let`, avoid `var`
- Use template literals for string interpolation

### Code Organization
- Separate concerns: keep HTML structure, CSS styling, and JS logic distinct
- Use semantic HTML5 elements
- Follow BEM methodology for CSS class naming where applicable
- Group related functions together in logical sections

### Performance Considerations
- Minimize DOM manipulations
- Use event delegation for dynamic elements
- Avoid global variables; use module patterns or closures
- Cache DOM queries when elements are accessed multiple times

### Browser Compatibility
- Target modern browsers (ES6+ support)
- Use standard web APIs, avoid experimental features
- Test across different screen sizes (responsive design)

## Word List & Data Handling

- **Word Source**: The `possibleWords` array contains the official Wordle word list
- **Data Processing**: Python script in `/data/` for processing word lists
- **Algorithm**: Uses information theory to calculate word entropy and suggest optimal guesses

## Development Workflow

### Local Development
1. Start a local HTTP server: `python3 -m http.server 8000`
2. Open `http://localhost:8000` in browser
3. Test all game modes and interactions
4. Verify responsive design on different screen sizes

### Testing Approach
- **Manual Testing**: Primary testing method via browser interaction
- **Cross-browser Testing**: Test in Chrome, Firefox, Safari, Edge
- **Mobile Testing**: Verify touch interactions work properly
- **Functionality Testing**: 
  - Enter words and verify color feedback works
  - Test solver algorithm suggestions
  - Verify navigation between modes
  - Test keyboard input (both virtual and physical)

### Deployment
- **Automatic**: GitHub Pages deploys automatically from the main branch
- **No Build Step**: Files are served directly as static assets
- **URL Structure**: Each mode accessible via subdirectories

## UI/UX Guidelines

### Visual Design
- Follow Wordle's familiar color scheme:
  - Green: Correct letter in correct position
  - Yellow: Correct letter in wrong position  
  - Gray: Letter not in the word
- Maintain clean, minimalist interface
- Use animations sparingly for feedback

### Accessibility
- Ensure keyboard navigation works throughout the app
- Use semantic HTML elements
- Provide clear visual feedback for user actions
- Support screen readers with appropriate ARIA labels

### Responsive Design
- Mobile-first approach
- Touch-friendly button sizes
- Readable text on all screen sizes

## Common Patterns

### DOM Manipulation
```javascript
// Preferred: Query once, reuse reference
const gameBoard = document.querySelector("#board");
gameBoard.appendChild(newElement);

// Create elements with template literals
const squareHtml = `<div class="square ${colorClass}">${letter}</div>`;
```

### Event Handling
```javascript
// Use event delegation for dynamic content
document.addEventListener('click', (e) => {
  if (e.target.matches('.square')) {
    handleSquareClick(e.target);
  }
});
```

### State Management
- Use simple object structures for game state
- Avoid complex state management libraries
- Keep state transformations pure and predictable

## Algorithm Details

The solver uses information theory principles:
1. **Entropy Calculation**: Measures how much information each guess provides
2. **Word Filtering**: Eliminates impossible words based on feedback
3. **Optimal Suggestions**: Ranks remaining words by expected information gain

## File Modification Guidelines

- **Shared Components**: Modify `shared.js` for reusable UI elements
- **Styling**: Update `styles.css` for global styles, local CSS files for mode-specific styles
- **Algorithm**: Main solving logic is in `main.js` and `hard.js`
- **Word Lists**: Use the data processing script to update word lists consistently

## Security Considerations

- No server-side code or user data storage
- Client-side only application
- No external API dependencies that could introduce vulnerabilities

## Performance Optimization

- Word list is loaded once and reused
- Minimize array operations in hot paths (solver algorithm)
- Use efficient DOM update patterns
- Lazy load non-critical resources if needed

When working on this project, prioritize code clarity, maintain the existing architecture patterns, and ensure all changes work across the different game modes.