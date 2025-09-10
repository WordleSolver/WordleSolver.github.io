# Wordle Solver Chrome Extension

A Chrome extension version of the Wordle Solver that provides AI-powered word suggestions while you play Wordle on any website.

## Features

- 🎯 **AI-Powered Suggestions** - Uses information theory to suggest optimal words
- 📊 **Real-time Analysis** - Automatically tracks your game progress
- 🌐 **Universal Compatibility** - Works on NY Times Wordle, Wordle Unlimited, and other Wordle sites
- ⚙️ **Hard Mode Support** - Toggle hard mode for stricter word filtering
- 🔄 **Live Updates** - Suggestions update automatically as you play

## Installation

### From Chrome Web Store (Coming Soon)
The extension will be available on the Chrome Web Store.

### Manual Installation (For Development)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `chrome-extension` folder
6. The extension will be added to Chrome

## How to Use

1. **Install the extension** using one of the methods above
2. **Visit any Wordle game** (NY Times, Wordle Unlimited, etc.)
3. **Play normally** - the solver appears automatically
4. **Use the suggestions** to make optimal guesses
5. **Toggle settings** like Hard Mode as needed

## Understanding Suggestions

- **🎯 Target words** - These are possible correct answers
- **🔍 Explore words** - These provide maximum information gain
- **Numbers** - Information entropy scores (higher = better for gathering info)

## Strategy Tips

1. **Start strong** - Use high-entropy words like SOARE, TARES, or RALES
2. **Explore early** - Use 🔍 explore words in your first 2-3 guesses
3. **Target late** - Switch to 🎯 target words when few options remain
4. **Use Hard Mode** - Enable if playing with Wordle's hard mode rules

## Supported Sites

- NY Times Wordle (official)
- Wordle Unlimited
- Wordle Game
- Most Wordle clone sites

The extension automatically detects Wordle games and activates itself.

## Privacy

This extension:
- ✅ Only runs on Wordle game pages
- ✅ Processes game data locally in your browser
- ✅ Does not collect or transmit any personal data
- ✅ Does not require account creation or login

## Algorithm

Based on information theory principles from 3Blue1Brown's Wordle analysis. The algorithm:

1. **Calculates entropy** for each possible guess
2. **Filters words** based on previous guesses and feedback
3. **Ranks suggestions** by information value
4. **Updates in real-time** as you play

## Development

### File Structure
```
chrome-extension/
├── manifest.json          # Extension configuration
├── content-script.js      # Main extension logic
├── solver-algorithm.js    # Core Wordle solving algorithm
├── extension-styles.css   # UI styling
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── icons/                # Extension icons
└── README.md             # This file
```

### Building

No build process required - this is a vanilla JavaScript extension.

### Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Test thoroughly on different Wordle sites
5. Submit a pull request

## License

MIT License - see the main repository for details.

## Related Projects

- [Wordle Solver Web App](https://wordlesolver.github.io) - The original web application
- [Main Repository](https://github.com/WordleSolver/WordleSolver.github.io) - Source code and documentation

## Support

If you encounter issues:
1. Check that you're on a supported Wordle site
2. Refresh the page to restart the extension
3. Check the browser console for error messages
4. Report issues on the GitHub repository

---

**Enjoy solving Wordle optimally! 🎯**