// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const buyModeBtn = document.getElementById('buyMode');
    const sellModeBtn = document.getElementById('sellMode');
    const goldForm = document.getElementById('goldForm');
    const resultsDiv = document.getElementById('results');
    const resultDetails = document.getElementById('resultDetails');
    const recommendation = document.getElementById('recommendation');

    let currentMode = null;

    // Initialize event listeners
    buyModeBtn.addEventListener('click', () => setMode('buy'));
    sellModeBtn.addEventListener('click', () => setMode('sell'));
    goldForm.addEventListener('submit', handleCalculation);

    // Set calculation mode
    function setMode(mode) {
        currentMode = mode;
        buyModeBtn.classList.toggle('active', mode === 'buy');
        sellModeBtn.classList.toggle('active', mode === 'sell');
        
        // Clear form and results
        goldForm.reset();
        resultDetails.innerHTML = '';
        recommendation.textContent = '';
        recommendation.className = 'recommendation';
        
        // Show the form and hide results
        goldForm.style.display = 'block';
        goldForm.classList.remove('hidden');
        resultsDiv.classList.add('hidden');
        resultsDiv.style.display = 'none';
    }

    // Format number to use English numerals
    function formatNumber(number) {
        return number.toLocaleString('en-US', {
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
        
        if (isNaN(weight) || isNaN(currentPrice) || isNaN(offeredPrice)) {
            alert('الرجاء إدخال قيم صحيحة');
            return;
        }
        
        if (currentMode === 'sell') {
            calculateSellMode(weight, currentPrice, offeredPrice);
        } else {
            calculateBuyMode(weight, currentPrice, offeredPrice);
        }
        
        // Show results
        resultsDiv.style.display = 'block';
        resultsDiv.classList.remove('hidden');
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }

    // Calculate selling scenario
    function calculateSellMode(weight, currentPrice, offeredPrice) {
        const actualValue = weight * currentPrice;
        const difference = actualValue - offeredPrice;
        const percentageDiff = (difference / actualValue) * 100;
        
        let recommendationText = '';
        let recommendationClass = '';
        
        if (percentageDiff <= 5) {
            recommendationText = 'يمكنك البيع - السعر المعروض مناسب';
            recommendationClass = 'positive';
        } else {
            recommendationText = 'لا ينصح بالبيع - السعر المعروض منخفض';
            recommendationClass = 'negative';
        }
        
        resultDetails.innerHTML = `
            <p>القيمة الفعلية للذهب: ${formatNumber(actualValue)} درهم إماراتي</p>
            <p>السعر المعروض: ${formatNumber(offeredPrice)} درهم إماراتي</p>
            <p>الفرق: ${formatNumber(Math.abs(difference))} درهم إماراتي</p>
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
            recommendationText = 'ربح البائع مرتفع (10% أكثر من سعر الذهب بدون ضريبة) - يمكنك التفاوض على سعر أفضل';
            recommendationClass = 'negative';
        } else {
            recommendationText = 'السعر معقول - يمكنك الشراء';
            recommendationClass = 'positive';
        }
        
        resultDetails.innerHTML = `
            <p>سعر الذهب بدون الضريبة: ${formatNumber(actualPrice)} درهم إماراتي</p>
            <p>سعر الذهب مع الضريبة (5٪): ${formatNumber(priceWithTax)} درهم إماراتي</p>
            <p>ربح البائع (10% أكثر من سعر الذهب بدون ضريبة): ${formatNumber(buyerProfit)} درهم إماراتي</p>
            <p>سعر التصنيع للجرام: ${formatNumber(manufacturingPrice)} درهم إماراتي</p>
        `;
        
        recommendation.className = `recommendation ${recommendationClass}`;
        recommendation.textContent = recommendationText;
    }
});
