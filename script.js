// DOM Elements
const buyModeBtn = document.getElementById('buyMode');
const sellModeBtn = document.getElementById('sellMode');
const goldForm = document.getElementById('goldForm');
const resultsDiv = document.getElementById('results');
const resultDetails = document.getElementById('resultDetails');
const recommendation = document.getElementById('recommendation');
const paymentSection = document.getElementById('payment-section');
const pwaMessage = document.getElementById('pwa-message');
const taxQuestion = document.getElementById('taxQuestion');

let currentMode = null;

// Check if the app is running as a PWA
function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone || 
           document.referrer.includes('android-app://');
}

// Show/hide payment section based on PWA status
function updatePaymentVisibility() {
    if (paymentSection && pwaMessage) {
        if (isPWA()) {
            paymentSection.style.display = 'block';
            pwaMessage.style.display = 'none';
        } else {
            paymentSection.style.display = 'none';
            pwaMessage.style.display = 'block';
        }
    }
}

// Check on page load and when display mode changes
window.addEventListener('load', updatePaymentVisibility);
window.matchMedia('(display-mode: standalone)').addListener(updatePaymentVisibility);

// Re-check visibility when the page becomes visible (in case of app installation)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        updatePaymentVisibility();
    }
});

// Event Listeners - only add if elements exist (for calculator page)
if (buyModeBtn && sellModeBtn && goldForm) {
    buyModeBtn.addEventListener('click', () => setMode('buy'));
    sellModeBtn.addEventListener('click', () => setMode('sell'));
    goldForm.addEventListener('submit', handleCalculation);
}

// Set calculation mode
function setMode(mode) {
    currentMode = mode;
    buyModeBtn.classList.toggle('active', mode === 'buy');
    sellModeBtn.classList.toggle('active', mode === 'sell');
    goldForm.classList.remove('hidden');
    resultsDiv.classList.add('hidden');
    
    // Show/hide tax question based on mode
    if (mode === 'buy') {
        taxQuestion.style.display = 'block';
    } else {
        taxQuestion.style.display = 'none';
    }
}

// Format number to show in English numerals without currency
function formatNumber(number) {
    return number.toFixed(2);
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
        <p>القيمة الفعلية للذهب: ${formatNumber(actualValue)}</p>
        <p>السعر المعروض: ${formatNumber(offeredPrice)}</p>
        <p>ربح البائع: ${formatNumber(Math.abs(difference))}</p>
    `;
    
    recommendation.className = `recommendation ${recommendationClass}`;
    recommendation.textContent = recommendationText;
}

// Calculate buying scenario - v2024.01
function calculateBuyMode(weight, currentPrice, offeredPrice) {
    console.log("Using updated script v2024.01 - New order applied");
    const actualPrice = weight * currentPrice;
    const taxIncluded = document.querySelector('input[name="taxIncluded"]:checked').value === 'yes';
    
    let buyerProfit, manufacturingPrice, profitPercentage;
    let resultHTML = '';
    
    if (taxIncluded) {
        // السعر المعروض مع الضريبة
        const taxPrice = offeredPrice - (offeredPrice / 1.05); // سعر الضريبة = السعر المعروض - (السعر المعروض ÷ 1.05)
        buyerProfit = offeredPrice - actualPrice - taxPrice; // ربح البائع = السعر المعروض - سعر الذهب - سعر الضريبة
        manufacturingPrice = buyerProfit / weight; // المصنعية = ربح البائع ÷ الوزن
        profitPercentage = (buyerProfit / actualPrice) * 100;
        
        resultHTML = `
            <p>سعر الذهب: ${formatNumber(actualPrice)}</p>
            <p>سعر التصنيع (المصنعية) للجرام: ${formatNumber(manufacturingPrice)}</p>
            <p>سعر الضريبة: ${formatNumber(taxPrice)}</p>
            <p>ربح البائع: ${formatNumber(buyerProfit)}</p>
        `;
    } else {
        // السعر المعروض بدون الضريبة
        buyerProfit = offeredPrice - actualPrice; // ربح البائع = السعر المعروض - سعر الذهب
        manufacturingPrice = buyerProfit / weight; // المصنعية = ربح البائع ÷ الوزن
        profitPercentage = (buyerProfit / actualPrice) * 100;
        
        resultHTML = `
            <p>سعر الذهب: ${formatNumber(actualPrice)}</p>
            <p>سعر التصنيع (المصنعية) للجرام: ${formatNumber(manufacturingPrice)}</p>
            <p>ربح البائع: ${formatNumber(buyerProfit)}</p>
        `;
    }
    
    let recommendationText = '';
    let recommendationClass = '';
    
    if (profitPercentage > 10) {
        recommendationText = 'ربح البائع مرتفع (أكثر من 10%) - يمكنك التفاوض على سعر أفضل';
        recommendationClass = 'negative';
    } else {
        recommendationText = 'يمكنك الشراء في هذه الحالة';
        recommendationClass = 'positive';
    }
    
    resultDetails.innerHTML = resultHTML;
    recommendation.className = `recommendation ${recommendationClass}`;
    recommendation.textContent = recommendationText;
}
