// Main data storage
let allCards = [];
let selectedCards = [];
let expenses = {};

// DOM Elements
const availableCardsList = document.getElementById('available-cards-list');
const selectedCardsList = document.getElementById('selected-cards-list');
const cardSearchInput = document.getElementById('card-search-input');
const calculateButton = document.getElementById('calculate-button');
const resultsSection = document.getElementById('results');
const totalRewardsValue = document.getElementById('total-rewards-value');
const cardValueBody = document.getElementById('card-value-body');
const cardDetailsModal = document.getElementById('card-details-modal');
const modalCardName = document.getElementById('modal-card-name');
const modalCardDetails = document.getElementById('modal-card-details');
const closeModal = document.querySelector('.close-modal');

// Category mapping
const categoryMapping = {
    'Rewards on all purchases': 'All Purchases',
    'Groceries': 'Groceries',
    'Dining': 'Dining',
    'Gas': 'Gas',
    'Flights (Direct)': 'Flights (Direct)',
    'Flights (Portal)': 'Flights (Portal)',
    'Hotels (Direct)': 'Hotels (Direct)',
    'Hotels (Portal)': 'Hotels (Portal)',
    'Car Rent (Direct)': 'Car Rental (Direct)',
    'Car Rent (Portal)': 'Car Rental (Portal)',
    'Travel (Direct)': 'Travel (Direct)',
    'Travel (Portal)': 'Travel (Portal)',
    'Entertainment': 'Entertainment',
    'Streaming': 'Streaming',
    'Transport': 'Transport',
    'Online Shopping': 'Online Shopping',
    'Internet & Phone': 'Internet & Phone',
    'ADS Business': 'ADS Business',
    'Office supplies': 'Office Supplies'
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Load the CSV data
    loadCardData();
    
    // Set up event listeners
    setupEventListeners();
});

// Load credit card data from a hardcoded array instead of CSV
function loadCardData() {
    console.log("Loading credit card data from hardcoded array...");
    
    // Directly use card data from the CSV without having to load the file
    const csvCards = [
        {
            "Name": "Chase Sapphire Preferred",
            "Issuer Name": "Chase",
            "Type": "Visa Signature",
            "Credit Score Needed": "Excellent",
            "Annual Fee": "$95",
            "Reward Type": "Ultimate Rewards",
            "Points Value": 1.25,
            "Rewards on all purchases": 1,
            "Groceries": 1,
            "Dining": 3,
            "Gas": 1,
            "Flights (Direct)": 2,
            "Flights (Portal)": 5,
            "Hotels (Direct)": 2,
            "Hotels (Portal)": 5,
            "Car Rent (Direct)": 2,
            "Car Rent (Portal)": 5,
            "Travel (Direct)": 2,
            "Travel (Portal)": 5,
            "Entertainment": 1,
            "Streaming": 1,
            "Transport": 2,
            "Online Shopping": 1,
            "Internet & Phone": 1,
            "ADS Business": 1,
            "Office supplies": 1,
            "CDW": "Yes",
            "FX Fee": "No",
            "Purchase protection": "Yes",
            "Cell phone protection": "No",
            "Other details": "Trip cancellation/interruption, trip delay, baggage delay insurance"
        },
        {
            "Name": "Chase Sapphire Reserve",
            "Issuer Name": "Chase",
            "Type": "Visa Infinite",
            "Credit Score Needed": "Excellent",
            "Annual Fee": "$550",
            "Reward Type": "Ultimate Rewards",
            "Points Value": 1.5,
            "Rewards on all purchases": 1,
            "Groceries": 1,
            "Dining": 3,
            "Gas": 1,
            "Flights (Direct)": 3,
            "Flights (Portal)": 5,
            "Hotels (Direct)": 3,
            "Hotels (Portal)": 10,
            "Car Rent (Direct)": 3,
            "Car Rent (Portal)": 10,
            "Travel (Direct)": 3,
            "Travel (Portal)": 10,
            "Entertainment": 1,
            "Streaming": 1,
            "Transport": 3,
            "Online Shopping": 1,
            "Internet & Phone": 1,
            "ADS Business": 1,
            "Office supplies": 1,
            "CDW": "Yes",
            "FX Fee": "No",
            "Purchase protection": "Yes",
            "Cell phone protection": "No",
            "Other details": "$300 annual travel credit, Priority Pass, Global Entry/TSA PreCheck"
        },
        {
            "Name": "American Express Gold Card",
            "Issuer Name": "American Express",
            "Type": "Credit Card",
            "Credit Score Needed": "Excellent",
            "Annual Fee": "$250",
            "Reward Type": "Membership Rewards",
            "Points Value": 1.0,
            "Rewards on all purchases": 1,
            "Groceries": 4,
            "Dining": 4,
            "Gas": 1,
            "Flights (Direct)": 3,
            "Flights (Portal)": 1,
            "Hotels (Direct)": 1,
            "Hotels (Portal)": 1,
            "Car Rent (Direct)": 1,
            "Car Rent (Portal)": 1,
            "Travel (Direct)": 1,
            "Travel (Portal)": 1,
            "Entertainment": 1,
            "Streaming": 1,
            "Transport": 1,
            "Online Shopping": 1,
            "Internet & Phone": 1,
            "ADS Business": 1,
            "Office supplies": 1,
            "CDW": "No",
            "FX Fee": "Yes",
            "Purchase protection": "Yes",
            "Cell phone protection": "No",
            "Other details": "$120 dining credit, $120 Uber Cash, $100 hotel credit"
        },
        {
            "Name": "American Express Platinum",
            "Issuer Name": "American Express",
            "Type": "Credit Card",
            "Credit Score Needed": "Excellent",
            "Annual Fee": "$695",
            "Reward Type": "Membership Rewards",
            "Points Value": 1.0,
            "Rewards on all purchases": 1,
            "Groceries": 1,
            "Dining": 1,
            "Gas": 1,
            "Flights (Direct)": 5,
            "Flights (Portal)": 5,
            "Hotels (Direct)": 1,
            "Hotels (Portal)": 5,
            "Car Rent (Direct)": 1,
            "Car Rent (Portal)": 1,
            "Travel (Direct)": 1,
            "Travel (Portal)": 1,
            "Entertainment": 1,
            "Streaming": 1,
            "Transport": 1,
            "Online Shopping": 1,
            "Internet & Phone": 1,
            "ADS Business": 1,
            "Office supplies": 1,
            "CDW": "Yes",
            "FX Fee": "No",
            "Purchase protection": "Yes",
            "Cell phone protection": "No",
            "Other details": "$200 airline fee credit, $200 hotel credit, $240 digital entertainment credit, Centurion Lounge access"
        },
        {
            "Name": "Capital One Venture",
            "Issuer Name": "Capital One",
            "Type": "Visa Signature",
            "Credit Score Needed": "Good/Excellent",
            "Annual Fee": "$95",
            "Reward Type": "Miles",
            "Points Value": 1.0,
            "Rewards on all purchases": 2,
            "Groceries": 2,
            "Dining": 2,
            "Gas": 2,
            "Flights (Direct)": 2,
            "Flights (Portal)": 5,
            "Hotels (Direct)": 2,
            "Hotels (Portal)": 5,
            "Car Rent (Direct)": 2,
            "Car Rent (Portal)": 5,
            "Travel (Direct)": 2,
            "Travel (Portal)": 5,
            "Entertainment": 2,
            "Streaming": 2,
            "Transport": 2,
            "Online Shopping": 2,
            "Internet & Phone": 2,
            "ADS Business": 2,
            "Office supplies": 2,
            "CDW": "Yes",
            "FX Fee": "No",
            "Purchase protection": "Yes",
            "Cell phone protection": "No",
            "Other details": "Global Entry/TSA PreCheck credit"
        },
        {
            "Name": "Capital One Venture X",
            "Issuer Name": "Capital One",
            "Type": "Visa Infinite",
            "Credit Score Needed": "Excellent",
            "Annual Fee": "$395",
            "Reward Type": "Miles",
            "Points Value": 1.0,
            "Rewards on all purchases": 2,
            "Groceries": 2,
            "Dining": 2,
            "Gas": 2,
            "Flights (Direct)": 5,
            "Flights (Portal)": 10,
            "Hotels (Direct)": 2,
            "Hotels (Portal)": 10,
            "Car Rent (Direct)": 2,
            "Car Rent (Portal)": 10,
            "Travel (Direct)": 2,
            "Travel (Portal)": 10,
            "Entertainment": 2,
            "Streaming": 2,
            "Transport": 2,
            "Online Shopping": 2,
            "Internet & Phone": 2,
            "ADS Business": 2,
            "Office supplies": 2,
            "CDW": "Yes",
            "FX Fee": "No",
            "Purchase protection": "Yes",
            "Cell phone protection": "Yes",
            "Other details": "$300 travel credit, 10,000 anniversary miles, Priority Pass, Capital One Lounge access"
        },
        {
            "Name": "Citi Double Cash",
            "Issuer Name": "Citi",
            "Type": "Mastercard",
            "Credit Score Needed": "Good/Excellent",
            "Annual Fee": "$0",
            "Reward Type": "Cash Back/ThankYou Points",
            "Points Value": 1.0,
            "Rewards on all purchases": 2,
            "Groceries": 2,
            "Dining": 2,
            "Gas": 2,
            "Flights (Direct)": 2,
            "Flights (Portal)": 2,
            "Hotels (Direct)": 2,
            "Hotels (Portal)": 2,
            "Car Rent (Direct)": 2,
            "Car Rent (Portal)": 2,
            "Travel (Direct)": 2,
            "Travel (Portal)": 2,
            "Entertainment": 2,
            "Streaming": 2,
            "Transport": 2,
            "Online Shopping": 2,
            "Internet & Phone": 2,
            "ADS Business": 2,
            "Office supplies": 2,
            "CDW": "No",
            "FX Fee": "Yes",
            "Purchase protection": "No",
            "Cell phone protection": "No",
            "Other details": "1% when you buy, 1% when you pay"
        },
        {
            "Name": "Citi Premier",
            "Issuer Name": "Citi",
            "Type": "Mastercard",
            "Credit Score Needed": "Good/Excellent",
            "Annual Fee": "$95",
            "Reward Type": "ThankYou Points",
            "Points Value": 1.0,
            "Rewards on all purchases": 1,
            "Groceries": 3,
            "Dining": 3,
            "Gas": 3,
            "Flights (Direct)": 3,
            "Flights (Portal)": 3,
            "Hotels (Direct)": 3,
            "Hotels (Portal)": 3,
            "Car Rent (Direct)": 1,
            "Car Rent (Portal)": 1,
            "Travel (Direct)": 1,
            "Travel (Portal)": 1,
            "Entertainment": 1,
            "Streaming": 1,
            "Transport": 1,
            "Online Shopping": 1,
            "Internet & Phone": 1,
            "ADS Business": 1,
            "Office supplies": 1,
            "CDW": "Yes",
            "FX Fee": "No",
            "Purchase protection": "Yes",
            "Cell phone protection": "No",
            "Other details": "$100 annual hotel credit"
        },
        {
            "Name": "Discover it Cash Back",
            "Issuer Name": "Discover",
            "Type": "Credit Card",
            "Credit Score Needed": "Good",
            "Annual Fee": "$0",
            "Reward Type": "Cash Back",
            "Points Value": 1.0,
            "Rewards on all purchases": 1,
            "Groceries": 5,
            "Dining": 5,
            "Gas": 5,
            "Flights (Direct)": 1,
            "Flights (Portal)": 1,
            "Hotels (Direct)": 1,
            "Hotels (Portal)": 1,
            "Car Rent (Direct)": 1,
            "Car Rent (Portal)": 1,
            "Travel (Direct)": 1,
            "Travel (Portal)": 1,
            "Entertainment": 5,
            "Streaming": 5,
            "Online Shopping": 5,
            "Internet & Phone": 1,
            "ADS Business": 1,
            "Office supplies": 1,
            "CDW": "No",
            "FX Fee": "No",
            "Purchase protection": "No",
            "Cell phone protection": "No",
            "Other details": "5% rotating quarterly categories (up to $1,500), cashback match first year"
        },
        {
            "Name": "Chase Freedom Flex",
            "Issuer Name": "Chase",
            "Type": "Mastercard",
            "Credit Score Needed": "Good/Excellent",
            "Annual Fee": "$0",
            "Reward Type": "Ultimate Rewards",
            "Points Value": 1.0,
            "Rewards on all purchases": 1,
            "Groceries": 5,
            "Dining": 3,
            "Gas": 5,
            "Flights (Direct)": 5,
            "Flights (Portal)": 5,
            "Hotels (Direct)": 1,
            "Hotels (Portal)": 5,
            "Car Rent (Direct)": 1,
            "Car Rent (Portal)": 5,
            "Travel (Direct)": 1,
            "Travel (Portal)": 5,
            "Entertainment": 5,
            "Streaming": 5,
            "Transport": 1,
            "Online Shopping": 5,
            "Internet & Phone": 1,
            "ADS Business": 1,
            "Office supplies": 1,
            "CDW": "Yes",
            "FX Fee": "Yes",
            "Purchase protection": "Yes",
            "Cell phone protection": "Yes",
            "Other details": "5% rotating quarterly categories (up to $1,500)"
        }
    ];
    
    allCards = cleanupCardData(csvCards);
    renderAvailableCards(allCards);
}

// Clean up and normalize card data
function cleanupCardData(cards) {
    return cards.map(card => {
        // Convert annual fee to number
        let annualFee = 0;
        if (card['Annual Fee'] && typeof card['Annual Fee'] === 'string') {
            // Remove $ and any non-numeric chars except decimal point
            const feeStr = card['Annual Fee'].replace(/[^0-9.]/g, '');
            annualFee = parseFloat(feeStr) || 0;
        }
        
        // Create a clean object with the data we need
        return {
            name: card['Name'] || 'Unknown Card',
            issuer: card['Issuer Name'] || 'Unknown Issuer',
            type: card['Type'] || '',
            annualFee: annualFee,
            rewardType: card['Reward Type'] || '',
            creditScore: card['Credit Score Needed'] || '',
            pointsValue: parseFloat(card['Points Value']) || 1.0,
            rewards: {
                'Rewards on all purchases': parseFloat(card['Rewards on all purchases']) || 0,
                'Groceries': parseFloat(card['Groceries']) || 0,
                'Dining': parseFloat(card['Dining']) || 0,
                'Gas': parseFloat(card['Gas']) || 0,
                'Flights (Direct)': parseFloat(card['Flights (Direct)']) || 0,
                'Flights (Portal)': parseFloat(card['Flights (Portal)']) || 0,
                'Hotels (Direct)': parseFloat(card['Hotels (Direct)']) || 0,
                'Hotels (Portal)': parseFloat(card['Hotels (Portal)']) || 0,
                'Car Rent (Direct)': parseFloat(card['Car Rent (Direct)']) || 0,
                'Car Rent (Portal)': parseFloat(card['Car Rent (Portal)']) || 0,
                'Travel (Direct)': parseFloat(card['Travel (Direct)']) || 0,
                'Travel (Portal)': parseFloat(card['Travel (Portal)']) || 0,
                'Entertainment': parseFloat(card['Entertainment']) || 0,
                'Streaming': parseFloat(card['Streaming']) || 0,
                'Transport': parseFloat(card['Transport']) || 0,
                'Online Shopping': parseFloat(card['Online Shopping']) || 0,
                'Internet & Phone': parseFloat(card['Internet & Phone']) || 0,
                'ADS Business': parseFloat(card['ADS Business']) || 0,
                'Office supplies': parseFloat(card['Office supplies']) || 0
            },
            additionalDetails: {
                cdw: card['CDW'] || '',
                fxFee: card['FX Fee'] || '',
                purchaseProtection: card['Purchase protection'] || '',
                cellPhoneProtection: card['Cell phone protection'] || '',
                otherDetails: card['Other details'] || ''
            }
        };
    });
}

// Set up event listeners
function setupEventListeners() {
    // Card search
    cardSearchInput.addEventListener('input', handleCardSearch);
    
    // Calculate button
    calculateButton.addEventListener('click', calculateRewards);
    
    // Expense inputs
    document.querySelectorAll('.expense-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const category = e.target.dataset.category;
            expenses[category] = parseFloat(e.target.value) || 0;
        });
    });
    
    // Modal close
    closeModal.addEventListener('click', () => {
        cardDetailsModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cardDetailsModal) {
            cardDetailsModal.style.display = 'none';
        }
    });
}

// Handle card search
function handleCardSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCards = allCards.filter(card => 
        card.name.toLowerCase().includes(searchTerm) || 
        card.issuer.toLowerCase().includes(searchTerm)
    );
    
    renderAvailableCards(filteredCards);
}

// Render available cards
function renderAvailableCards(cards) {
    availableCardsList.innerHTML = '';
    
    if (cards.length === 0) {
        availableCardsList.innerHTML = '<p>No cards found matching your search.</p>';
        return;
    }
    
    cards.forEach(card => {
        // Skip if already selected
        if (selectedCards.some(c => c.name === card.name)) {
            return;
        }
        
        const cardElement = document.createElement('div');
        cardElement.classList.add('card-item');
        
        cardElement.innerHTML = `
            <div class="card-item-details">
                <div class="card-name">${card.name}</div>
                <div class="card-issuer">${card.issuer}</div>
            </div>
            <button class="card-action-btn add-card-btn">Add</button>
        `;
        
        cardElement.querySelector('.add-card-btn').addEventListener('click', () => {
            addCard(card);
        });
        
        availableCardsList.appendChild(cardElement);
    });
}

// Render selected cards
function renderSelectedCards() {
    selectedCardsList.innerHTML = '';
    
    if (selectedCards.length === 0) {
        selectedCardsList.innerHTML = '<p>No cards selected yet. Add cards from the available list.</p>';
        return;
    }
    
    selectedCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card-item');
        
        cardElement.innerHTML = `
            <div class="card-item-details">
                <div class="card-name">${card.name}</div>
                <div class="card-issuer">${card.issuer}</div>
            </div>
            <button class="card-action-btn remove-card-btn">Remove</button>
        `;
        
        cardElement.querySelector('.remove-card-btn').addEventListener('click', () => {
            removeCard(card);
        });
        
        selectedCardsList.appendChild(cardElement);
    });
}

// Add a card to selected cards
function addCard(card) {
    if (!selectedCards.some(c => c.name === card.name)) {
        selectedCards.push(card);
        renderSelectedCards();
        renderAvailableCards(allCards.filter(c => 
            c.name.toLowerCase().includes(cardSearchInput.value.toLowerCase()) || 
            c.issuer.toLowerCase().includes(cardSearchInput.value.toLowerCase())
        ));
    }
}

// Remove a card from selected cards
function removeCard(card) {
    selectedCards = selectedCards.filter(c => c.name !== card.name);
    renderSelectedCards();
    renderAvailableCards(allCards.filter(c => 
        c.name.toLowerCase().includes(cardSearchInput.value.toLowerCase()) || 
        c.issuer.toLowerCase().includes(cardSearchInput.value.toLowerCase())
    ));
}

// Calculate rewards based on spending and selected cards
function calculateRewards() {
    if (selectedCards.length === 0) {
        alert('Please select at least one credit card');
        return;
    }
    
    // Get expenses from inputs
    const expenseInputs = document.querySelectorAll('.expense-input');
    expenseInputs.forEach(input => {
        const category = input.dataset.category;
        expenses[category] = parseFloat(input.value) || 0;
    });
    
    // Initialize results
    const optimalSetup = {};
    const cardProfits = {};
    
    // Initialize card profits with negative annual fees
    selectedCards.forEach(card => {
        cardProfits[card.name] = -card.annualFee;
    });
    
    // For each expense category
    Object.keys(expenses).forEach(category => {
        const expenseAmount = expenses[category];
        
        if (expenseAmount > 0) {
            let bestCard = null;
            let bestReward = 0;
            
            // Find best card for this category
            selectedCards.forEach(card => {
                const rewardPercentage = card.rewards[category] || 0;
                // Consider the point value
                const effectiveReward = rewardPercentage * card.pointsValue;
                
                if (effectiveReward > bestReward) {
                    bestReward = effectiveReward;
                    bestCard = card;
                }
            });
            
            if (bestCard) {
                // Annual value = monthly expense * 12 * reward rate * point value
                const annualValue = expenseAmount * 12 * (bestCard.rewards[category] / 100) * bestCard.pointsValue;
                
                optimalSetup[category] = {
                    cardName: bestCard.name,
                    rewardPercentage: bestCard.rewards[category],
                    pointsValue: bestCard.pointsValue,
                    expenseAmount: expenseAmount,
                    monthlyValue: expenseAmount * (bestCard.rewards[category] / 100) * bestCard.pointsValue,
                    annualValue: annualValue
                };
                
                // Add profit to card's total
                cardProfits[bestCard.name] += annualValue;
                
                // Update the UI to show the best card for this category
                updateCategoryRow(category, bestCard, optimalSetup[category]);
            }
        }
    });
    
    // Calculate total profits
    const totalProfit = Object.values(cardProfits).reduce((sum, profit) => sum + profit, 0);
    
    // Prepare card value summary
    const cardSummary = selectedCards.map(card => {
        const profit = cardProfits[card.name] || 0;
        const perksValue = estimatePerksValue(card);
        
        return {
            name: card.name,
            annualFee: card.annualFee,
            cashbackEarned: profit + card.annualFee, // Add back annual fee to get just rewards
            netProfit: profit,
            perksValue: perksValue,
            totalValue: profit + perksValue,
            keepCard: (profit + perksValue) > 0,
            details: card.additionalDetails
        };
    });
    
    // Display results
    displayResults(totalProfit, cardSummary);
}

// Estimate the value of card perks
function estimatePerksValue(card) {
    // This is a simplified estimation - in a real app, you would have more detailed data
    let perksValue = 0;
    
    // Check for valuable perks and assign estimated values
    if (card.additionalDetails.cdw === 'Yes') perksValue += 75;
    if (card.additionalDetails.fxFee === 'No') perksValue += 50;
    if (card.additionalDetails.purchaseProtection === 'Yes') perksValue += 50;
    if (card.additionalDetails.cellPhoneProtection === 'Yes') perksValue += 100;
    
    // Check other details for common valuable perks
    const otherDetails = card.additionalDetails.otherDetails.toLowerCase();
    if (otherDetails.includes('travel credit')) perksValue += 300;
    if (otherDetails.includes('airport lounge')) perksValue += 200;
    if (otherDetails.includes('tsa precheck') || otherDetails.includes('global entry')) perksValue += 85;
    if (otherDetails.includes('free night')) perksValue += 200;
    if (otherDetails.includes('priority boarding')) perksValue += 75;
    if (otherDetails.includes('free checked bag')) perksValue += 120;
    
    return perksValue;
}

// Update a category row in the expense table
function updateCategoryRow(category, card, result) {
    const rows = document.querySelectorAll('#expense-table tbody tr');
    let targetRow;
    
    for (const row of rows) {
        const inputElement = row.querySelector('.expense-input');
        if (inputElement && inputElement.dataset.category === category) {
            targetRow = row;
            break;
        }
    }
    
    if (targetRow) {
        const bestCardCell = targetRow.querySelector('.best-card');
        const rewardsRateCell = targetRow.querySelector('.rewards-rate');
        const monthlyValueCell = targetRow.querySelector('.monthly-value');
        
        bestCardCell.textContent = card.name;
        rewardsRateCell.textContent = `${card.rewards[category]}% (${card.pointsValue}¢ per point)`;
        monthlyValueCell.textContent = `${result.monthlyValue.toFixed(2)}`;
    }
}
