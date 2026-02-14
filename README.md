# Clean Finance Snapshot

A beautiful, Apple-style web application for comparing financial and economic indicators between two countries.

## Features

- 🌍 **Country Comparison**: Compare key economic metrics between any two countries
- 💱 **Currency Rates**: Real-time exchange rates via Frankfurter API
- 📊 **Economic Data**: GDP, inflation, and population data from World Bank API
- ✨ **Smooth Animations**: Beautiful animated number counters
- 🎨 **Apple-style Design**: Clean, modern interface with large typography
- 📱 **Responsive**: Works on desktop, tablet, and mobile devices

## Data Sources

- **Frankfurter API**: Provides real-time currency exchange rates
  - Endpoint: `https://api.frankfurter.app/`
- **World Bank API**: Provides economic indicators
  - GDP (current USD)
  - Inflation (consumer prices annual %)
  - Population (total)

## How to Use

### Option 1: Open Locally

Simply open `index.html` in your web browser. No build process or server required!

```bash
# Clone the repository
git clone https://github.com/forgiobombi/Clean-Finance-Comparison.git
cd Clean-Finance-Comparison

# Open in browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### Option 2: Use a Local Server

For development or testing, you can use a simple HTTP server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (npx)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open http://localhost:8000 in your browser.

## Usage Instructions

1. Select the first country from the dropdown menu
2. Select the second country from the second dropdown menu
3. Click the "Compare Countries" button
4. View the animated comparison showing:
   - Currency code
   - Exchange rate to USD
   - GDP (Gross Domestic Product)
   - Inflation rate
   - Population

## Supported Countries

The app supports 20 major countries including:
- United States, United Kingdom, Germany, France, Japan
- China, India, Canada, Australia, Brazil
- Mexico, South Korea, Spain, Italy, Netherlands
- Switzerland, Sweden, Poland, Belgium, Norway

## Design Features

- **Large Typography**: Easy-to-read, Apple-inspired font sizes
- **Side-by-Side Cards**: Clean comparison layout
- **Gradient Background**: Beautiful purple gradient
- **Smooth Animations**: Number counters animate from 0 to final value
- **Glass Morphism**: Semi-transparent cards with backdrop blur
- **Responsive Design**: Adapts to all screen sizes

## Technical Details

- **No Dependencies**: Pure HTML, CSS, and JavaScript
- **No Build Process**: Works directly in the browser
- **API Integration**: Fetches real-time data from public APIs
- **Error Handling**: Graceful error messages for API failures
- **Accessibility**: Semantic HTML and proper labeling

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - see LICENSE file for details