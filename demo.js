// Demo script with mock data to show animations

// Mock data for demo
const mockData = {
    us: {
        name: 'United States',
        currency: 'USD',
        exchangeRate: 1.0,
        gdp: 25462700000000,
        inflation: 4.12,
        population: 331893745
    },
    uk: {
        name: 'United Kingdom',
        currency: 'GBP',
        exchangeRate: 1.2678,
        gdp: 3070668000000,
        inflation: 7.92,
        population: 67026292
    },
    jp: {
        name: 'Japan',
        currency: 'JPY',
        exchangeRate: 0.0074,
        gdp: 4940877000000,
        inflation: 2.48,
        population: 125681593
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const compareBtn = document.getElementById('compareBtnDemo');
    compareBtn.addEventListener('click', handleDemoCompare);
    
    // Trigger animation on page load after a short delay
    setTimeout(() => {
        animateDemoValues();
    }, 500);
});

function handleDemoCompare() {
    const country1Code = document.getElementById('country1-demo').value;
    const country2Code = document.getElementById('country2-demo').value;

    if (!country1Code || !country2Code) {
        alert('Please select both countries');
        return;
    }

    const country1 = mockData[country1Code];
    const country2 = mockData[country2Code];

    // Update country names
    document.querySelector('#card1-demo .country-name').textContent = country1.name;
    document.querySelector('#card2-demo .country-name').textContent = country2.name;

    // Update currencies
    document.querySelector('#card1-demo .metric-value').textContent = country1.currency;
    document.querySelector('#card2-demo .metric-value').textContent = country2.currency;

    // Animate all values
    animateValue('exchangeRate1-demo', 0, country1.exchangeRate, 1000, 4);
    animateValue('gdp1-demo', 0, country1.gdp, 1000, 0, true);
    animateValue('inflation1-demo', 0, country1.inflation, 1000, 2);
    animateValue('population1-demo', 0, country1.population, 1000, 0, true);

    animateValue('exchangeRate2-demo', 0, country2.exchangeRate, 1000, 4);
    animateValue('gdp2-demo', 0, country2.gdp, 1000, 0, true);
    animateValue('inflation2-demo', 0, country2.inflation, 1000, 2);
    animateValue('population2-demo', 0, country2.population, 1000, 0, true);
}

function animateDemoValues() {
    // Animate initial values on page load
    animateValue('exchangeRate1-demo', 0, 1.0, 1200, 4);
    animateValue('gdp1-demo', 0, 25462700000000, 1200, 0, true);
    animateValue('inflation1-demo', 0, 4.12, 1200, 2);
    animateValue('population1-demo', 0, 331893745, 1200, 0, true);

    animateValue('exchangeRate2-demo', 0, 1.2678, 1200, 4);
    animateValue('gdp2-demo', 0, 3070668000000, 1200, 0, true);
    animateValue('inflation2-demo', 0, 7.92, 1200, 2);
    animateValue('population2-demo', 0, 67026292, 1200, 0, true);
}

// Animate number counter (same as in app.js)
function animateValue(elementId, start, end, duration, decimals = 0, useCommas = false) {
    const element = document.getElementById(elementId);
    
    if (end === null || end === undefined) {
        element.textContent = 'N/A';
        return;
    }

    const startTime = performance.now();
    const range = end - start;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (range * easeOutQuart);

        let displayValue;
        if (useCommas) {
            displayValue = Math.floor(current).toLocaleString();
        } else {
            displayValue = current.toFixed(decimals);
        }

        element.textContent = displayValue;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // Final value with exact precision
            if (useCommas) {
                element.textContent = Math.floor(end).toLocaleString();
            } else {
                element.textContent = end.toFixed(decimals);
            }
        }
    }

    requestAnimationFrame(update);
}
