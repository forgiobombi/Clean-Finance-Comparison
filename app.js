// Country list with ISO codes for API calls
const countries = [
    { name: 'United States', code: 'US', currency: 'USD' },
    { name: 'United Kingdom', code: 'GB', currency: 'GBP' },
    { name: 'Germany', code: 'DE', currency: 'EUR' },
    { name: 'France', code: 'FR', currency: 'EUR' },
    { name: 'Japan', code: 'JP', currency: 'JPY' },
    { name: 'China', code: 'CN', currency: 'CNY' },
    { name: 'India', code: 'IN', currency: 'INR' },
    { name: 'Canada', code: 'CA', currency: 'CAD' },
    { name: 'Australia', code: 'AU', currency: 'AUD' },
    { name: 'Brazil', code: 'BR', currency: 'BRL' },
    { name: 'Mexico', code: 'MX', currency: 'MXN' },
    { name: 'South Korea', code: 'KR', currency: 'KRW' },
    { name: 'Spain', code: 'ES', currency: 'EUR' },
    { name: 'Italy', code: 'IT', currency: 'EUR' },
    { name: 'Netherlands', code: 'NL', currency: 'EUR' },
    { name: 'Switzerland', code: 'CH', currency: 'CHF' },
    { name: 'Sweden', code: 'SE', currency: 'SEK' },
    { name: 'Poland', code: 'PL', currency: 'PLN' },
    { name: 'Belgium', code: 'BE', currency: 'EUR' },
    { name: 'Norway', code: 'NO', currency: 'NOK' },
];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    populateCountrySelectors();
    setupEventListeners();
});

// Populate country dropdowns
function populateCountrySelectors() {
    const country1Select = document.getElementById('country1');
    const country2Select = document.getElementById('country2');

    countries.forEach(country => {
        const option1 = document.createElement('option');
        option1.value = JSON.stringify(country);
        option1.textContent = country.name;
        country1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = JSON.stringify(country);
        option2.textContent = country.name;
        country2Select.appendChild(option2);
    });
}

// Setup event listeners
function setupEventListeners() {
    const compareBtn = document.getElementById('compareBtn');
    compareBtn.addEventListener('click', handleCompare);
}

// Handle compare button click
async function handleCompare() {
    const country1Data = document.getElementById('country1').value;
    const country2Data = document.getElementById('country2').value;

    if (!country1Data || !country2Data) {
        showError('Please select both countries to compare');
        return;
    }

    const country1 = JSON.parse(country1Data);
    const country2 = JSON.parse(country2Data);

    if (country1.code === country2.code) {
        showError('Please select two different countries');
        return;
    }

    hideError();
    showLoading();
    hideResults();

    try {
        // Fetch data for both countries in parallel
        const [data1, data2] = await Promise.all([
            fetchCountryData(country1),
            fetchCountryData(country2)
        ]);

        displayResults(country1, data1, country2, data2);
        hideLoading();
    } catch (error) {
        console.error('Error fetching data:', error);
        showError('Failed to fetch data. Please try again later.');
        hideLoading();
    }
}

// Fetch all data for a country
async function fetchCountryData(country) {
    const [exchangeRate, worldBankData] = await Promise.all([
        fetchExchangeRate(country.currency),
        fetchWorldBankData(country.code)
    ]);

    return {
        exchangeRate,
        gdp: worldBankData.gdp,
        inflation: worldBankData.inflation,
        population: worldBankData.population
    };
}

// Fetch exchange rate from Frankfurter API
async function fetchExchangeRate(currency) {
    if (currency === 'USD') {
        return 1.0;
    }

    try {
        const response = await fetch(`https://api.frankfurter.app/latest?from=${currency}&to=USD`);
        const data = await response.json();
        return data.rates.USD;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        return null;
    }
}

// Fetch GDP, Inflation, and Population from World Bank API
async function fetchWorldBankData(countryCode) {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5; // Look back 5 years for most recent data

    try {
        // Fetch GDP (current USD)
        const gdpResponse = await fetch(
            `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?date=${startYear}:${currentYear}&format=json&per_page=10`
        );
        const gdpData = await gdpResponse.json();
        const gdp = findLatestValue(gdpData);

        // Fetch Inflation (consumer prices annual %)
        const inflationResponse = await fetch(
            `https://api.worldbank.org/v2/country/${countryCode}/indicator/FP.CPI.TOTL.ZG?date=${startYear}:${currentYear}&format=json&per_page=10`
        );
        const inflationData = await inflationResponse.json();
        const inflation = findLatestValue(inflationData);

        // Fetch Population
        const populationResponse = await fetch(
            `https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.TOTL?date=${startYear}:${currentYear}&format=json&per_page=10`
        );
        const populationData = await populationResponse.json();
        const population = findLatestValue(populationData);

        return { gdp, inflation, population };
    } catch (error) {
        console.error('Error fetching World Bank data:', error);
        return { gdp: null, inflation: null, population: null };
    }
}

// Helper function to find the latest non-null value from World Bank API response
function findLatestValue(data) {
    if (!data || !Array.isArray(data) || data.length < 2) {
        return null;
    }

    const values = data[1];
    if (!Array.isArray(values)) {
        return null;
    }

    // World Bank returns data sorted by date descending
    for (const item of values) {
        if (item.value !== null && item.value !== undefined) {
            return item.value;
        }
    }

    return null;
}

// Display comparison results
function displayResults(country1, data1, country2, data2) {
    // Update country names
    document.getElementById('countryName1').textContent = country1.name;
    document.getElementById('countryName2').textContent = country2.name;

    // Update country 1 data with animations
    document.getElementById('currency1').textContent = country1.currency;
    animateValue('exchangeRate1', 0, data1.exchangeRate, 1000, 4);
    animateValue('gdp1', 0, data1.gdp, 1000, 0, true);
    animateValue('inflation1', 0, data1.inflation, 1000, 2);
    animateValue('population1', 0, data1.population, 1000, 0, true);

    // Update country 2 data with animations
    document.getElementById('currency2').textContent = country2.currency;
    animateValue('exchangeRate2', 0, data2.exchangeRate, 1000, 4);
    animateValue('gdp2', 0, data2.gdp, 1000, 0, true);
    animateValue('inflation2', 0, data2.inflation, 1000, 2);
    animateValue('population2', 0, data2.population, 1000, 0, true);

    // Show results
    showResults();
}

// Animate number counter
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

// UI Helper Functions
function showLoading() {
    document.getElementById('loadingSpinner').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError() {
    document.getElementById('errorMessage').style.display = 'none';
}

function showResults() {
    document.getElementById('comparisonResults').classList.add('show');
}

function hideResults() {
    document.getElementById('comparisonResults').classList.remove('show');
}
