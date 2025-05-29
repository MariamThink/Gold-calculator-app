// DOM Elements
const buyModeBtn = document.getElementById('buyMode');
const sellModeBtn = document.getElementById('sellMode');
const goldForm = document.getElementById('goldForm');
const resultsDiv = document.getElementById('results');
const resultDetails = document.getElementById('resultDetails');
const recommendation = document.getElementById('recommendation');

let currentMode = null;

// Event Listeners
buyModeBtn.addEventListener('click', () => setMode('buy'));
sellModeBtn.addEventListener('click', () => setMode('sell'));
goldForm.addEventListener('submit', handleCalculation);

// Set calculation mode
function setMode(mode) {
    currentMode = mode;
    buyModeBtn.classList.toggle('active', mode === 'buy');
    sellModeBtn.classList.toggle('active', mode === 'sell');
    goldForm.classList.remove('hidden');
    resultsDiv.classList.add('hidden');
}

// Format number to Arabic locale
function formatNumber(number) {
    return number.toLocaleString('ar-SA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Handle form submission and calculations
function handleCalculation(e) {
    e.preventDefault();
    
    const weight = parseFloat(document.getElementById('weight').value);
    const currentPrice = parseFloat(document.getElementById('currentPrice').value);
    const offeredPrice = parseFloat(document.getElementById('offeredPrice').value);
    
    if (currentMode === 'sell') {
        calculateSellMode(weight, currentPrice, offeredPrice);
    } else {
        calculateBuyMode(weight, currentPrice, offeredPrice);
    }
    
    resultsDiv.classList.remove('hidden');
}

// Calculate selling scenario
function calculateSellMode(weight, currentPrice, offeredPrice) {
    const actualValue = weight * currentPrice;
    const difference = actualValue - offeredPrice;
    const percentageDiff = (difference / actualValue) * 100;
    
    let recommendationText = '';
    let recommendationClass = '';
    
    if (percentageDiff <= 3) { // Allow up to 3% difference
        recommendationText = 'يمكنك البيع - السعر المعروض مناسب';
        recommendationClass = 'positive';
    } else {
        recommendationText = 'لا ينصح بالبيع - السعر المعروض منخفض';
        recommendationClass = 'negative';
    }
    
    resultDetails.innerHTML = `
        <p>القيمة الفعلية للذهب: ${formatNumber(actualValue)} ريال</p>
        <p>السعر المعروض: ${formatNumber(offeredPrice)} ريال</p>
        <p>الفرق: ${formatNumber(Math.abs(difference))} ريال</p>
    `;
    
    recommendation.className = `recommendation ${recommendationClass}`;
    recommendation.textContent = recommendationText;
}

// Calculate buying scenario
function calculateBuyMode(weight, currentPrice, offeredPrice) {
    const actualPrice = weight * currentPrice;
    const priceWithTax = actualPrice * 1.05; // 5% tax
    const buyerProfit = offeredPrice - priceWithTax;
    const manufacturingPrice = buyerProfit / weight;
    const profitPercentage = (buyerProfit / actualPrice) * 100;
    
    let recommendationText = '';
    let recommendationClass = '';
    
    if (profitPercentage > 10) {
        recommendationText = 'ربح البائع مرتفع (أكثر من 10٪) - يمكنك التفاوض على سعر أفضل';
        recommendationClass = 'negative';
    } else {
        recommendationText = 'السعر معقول - يمكنك الشراء';
        recommendationClass = 'positive';
    }
    
    resultDetails.innerHTML = `
        <p>سعر الذهب بدون الضريبة: ${formatNumber(actualPrice)} ريال</p>
        <p>سعر الذهب مع الضريبة (5٪): ${formatNumber(priceWithTax)} ريال</p>
        <p>ربح البائع: ${formatNumber(buyerProfit)} ريال</p>
        <p>سعر التصنيع للجرام: ${formatNumber(manufacturingPrice)} ريال</p>
    `;
    
    recommendation.className = `recommendation ${recommendationClass}`;
    recommendation.textContent = recommendationText;
}
