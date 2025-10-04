// CashHeal - Application de Gestion Financière Intelligente
// Développé avec expertise en psychologie comportementale financière

// Variables globales
let budgetData = {
    monthlyIncome: 0,
    fixedExpenses: 0,
    expenses: 0,
    savings: 0,
    investments: 0
};

let dailyExpenses = [];
let userPersonality = null;
let quizAnswers = [];
let currentQuizQuestion = 0;

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const fab = document.getElementById('fab');
const chatAssistant = document.getElementById('chat-assistant');
const closeChat = document.getElementById('close-chat');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendMessage = document.getElementById('send-message');

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadUserData();
    startAnimations();
});

// Initialisation de l'application
function initializeApp() {
    console.log('💰 CashHeal - Application de Gestion Financière Intelligente');
    console.log('🤖 IA Prédictive activée');
    console.log('📊 Dashboard financier initialisé');
    
    // Afficher le message de bienvenue
    showWelcomeMessage();
    
    // Initialiser les graphiques
    initializeCharts();
    
    // Charger les données de démonstration
    loadDemoData();
}

// Configuration des événements
function setupEventListeners() {
    // Navigation mobile
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }

    // Bouton d'assistant IA
    if (fab) {
        fab.addEventListener('click', toggleChatAssistant);
    }

    // Fermer le chat
    if (closeChat) {
        closeChat.addEventListener('click', closeChatAssistant);
    }

    // Envoyer un message
    if (sendMessage) {
        sendMessage.addEventListener('click', sendChatMessage);
    }

    // Entrée dans le chat
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }

    // Quiz de personnalité
    setupQuizListeners();
    
    // Scroll pour animations
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Redimensionnement de fenêtre
    window.addEventListener('resize', handleResize);
}

// Navigation mobile
function toggleMobileNav() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.classList.toggle('nav-open');
}

// Fermer la navigation mobile
function closeMobileNav() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.classList.remove('nav-open');
}

// Fermer la navigation en cliquant sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
});

// Scroll smooth
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const sectionTop = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Bouton d'assistant IA
function toggleChatAssistant() {
    chatAssistant.classList.toggle('active');
    if (chatAssistant.classList.contains('active')) {
        chatInput.focus();
        addChatMessage('assistant', 'Salut ! 👋 Je suis ton assistant financier personnel. Comment puis-je t\'aider aujourd\'hui ?');
    }
}

function closeChatAssistant() {
    chatAssistant.classList.remove('active');
}

// Système de chat intelligent
function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    addChatMessage('user', message);
    chatInput.value = '';

    // Simuler une réponse de l'IA
    setTimeout(() => {
        const response = generateAIResponse(message);
        addChatMessage('assistant', response);
    }, 1000);
}

function addChatMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = message;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll vers le bas
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Génération de réponses IA intelligentes
function generateAIResponse(message) {
    const responses = {
        budget: [
            "💡 Pour optimiser ton budget, je recommande la règle 50/30/20 : 50% pour les besoins, 30% pour les envies, 20% pour l'épargne !",
            "📊 Ton budget actuel semble équilibré. As-tu pensé à automatiser tes épargnes ?",
            "🎯 Je vois que tu dépenses beaucoup en loisirs. Peut-être peux-tu réduire de 10% et les investir ?"
        ],
        investissement: [
            "📈 Pour commencer à investir, je suggère un portefeuille diversifié : 60% actions, 30% obligations, 10% crypto !",
            "💎 Les ETF sont parfaits pour débuter. Ils sont moins risqués que les actions individuelles !",
            "🚀 Avec un investissement de 200€/mois à 7% de rendement, tu auras 15,000€ dans 5 ans !"
        ],
        épargne: [
            "💰 Commence par un fonds d'urgence de 3-6 mois de dépenses !",
            "🏦 Les livrets A et LDDS sont parfaits pour l'épargne de précaution !",
            "📅 Automatise tes virements d'épargne le jour de ta paie !"
        ],
        dépenses: [
            "📱 Utilise l'app pour tracker tes dépenses en temps réel !",
            "🎯 La règle des 24h : attends 24h avant tout achat > 100€ !",
            "📊 Tes dépenses en nourriture représentent 25% de ton budget. C'est normal !"
        ]
    };

    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('budget') || lowerMessage.includes('argent')) {
        return responses.budget[Math.floor(Math.random() * responses.budget.length)];
    } else if (lowerMessage.includes('investir') || lowerMessage.includes('bourse')) {
        return responses.investissement[Math.floor(Math.random() * responses.investissement.length)];
    } else if (lowerMessage.includes('épargne') || lowerMessage.includes('économiser')) {
        return responses.épargne[Math.floor(Math.random() * responses.épargne.length)];
    } else if (lowerMessage.includes('dépense') || lowerMessage.includes('dépenser')) {
        return responses.dépenses[Math.floor(Math.random() * responses.dépenses.length)];
    } else {
        return "🤔 Intéressant ! Peux-tu me donner plus de détails sur ta situation financière ?";
    }
}

// Calcul du budget (règle 70/20/10)
function calculateBudget() {
    const monthlyIncome = parseFloat(document.getElementById('monthly-income').value) || 0;
    const fixedExpenses = parseFloat(document.getElementById('fixed-expenses').value) || 0;
    
    if (monthlyIncome <= 0) {
        showNotification('Veuillez entrer un revenu mensuel valide', 'error');
        return;
    }

    // Calculer selon la règle 70/20/10
    const expenses = Math.round(monthlyIncome * 0.70);
    const savings = Math.round(monthlyIncome * 0.20);
    const investments = Math.round(monthlyIncome * 0.10);

    // Mettre à jour l'affichage
    document.getElementById('expenses-amount').textContent = `€${expenses.toLocaleString()}`;
    document.getElementById('savings-amount').textContent = `€${savings.toLocaleString()}`;
    document.getElementById('investments-amount').textContent = `€${investments.toLocaleString()}`;

    // Afficher la visualisation
    document.getElementById('budget-setup').style.display = 'none';
    document.getElementById('budget-visualization').style.display = 'block';

    // Mettre à jour les données
    budgetData = {
        monthlyIncome,
        fixedExpenses,
        expenses,
        savings,
        investments
    };

    // Créer le graphique
    createBudgetChart(expenses, savings, investments);
    
    // Conseils personnalisés
    generateBudgetAdvice(monthlyIncome, fixedExpenses);
    
    showNotification('Budget calculé avec succès ! 🎉', 'success');
}

// Création du graphique de budget
function createBudgetChart(expenses, savings, investments) {
    const ctx = document.getElementById('budget-chart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Dépenses', 'Épargne', 'Investissements'],
            datasets: [{
                data: [expenses, savings, investments],
                backgroundColor: [
                    '#ef4444',
                    '#10b981',
                    '#f59e0b'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// Génération de conseils budgétaires
function generateBudgetAdvice(income, fixedExpenses) {
    const adviceContainer = document.querySelector('.financial-advice');
    if (!adviceContainer) return;

    const advice = [];
    
    if (fixedExpenses > income * 0.5) {
        advice.push({
            icon: '⚠️',
            text: 'Tes charges fixes représentent plus de 50% de tes revenus. Considère réduire certains coûts.'
        });
    }
    
    if (income > 5000) {
        advice.push({
            icon: '💎',
            text: 'Avec ce revenu, tu peux envisager des investissements plus agressifs !'
        });
    }
    
    if (fixedExpenses < income * 0.3) {
        advice.push({
            icon: '🎉',
            text: 'Excellent ! Tes charges fixes sont bien maîtrisées. Tu peux augmenter tes investissements !'
        });
    }

    // Afficher les conseils
    adviceContainer.innerHTML = advice.map(item => `
        <div class="advice-item">
            <div class="advice-icon">${item.icon}</div>
            <div class="advice-text">${item.text}</div>
        </div>
    `).join('');
}

// Calcul des projections d'investissement
function calculateProjection() {
    const initialAmount = parseFloat(document.getElementById('initial-amount').value) || 0;
    const monthlyInvestment = parseFloat(document.getElementById('monthly-investment').value) || 0;
    const duration = parseFloat(document.getElementById('duration').value) || 0;
    const annualReturn = parseFloat(document.getElementById('annual-return').value) || 0;

    if (initialAmount <= 0 || duration <= 0) {
        showNotification('Veuillez entrer des valeurs valides', 'error');
        return;
    }

    const monthlyReturn = annualReturn / 100 / 12;
    const totalMonths = duration * 12;
    
    let totalInvested = initialAmount;
    let currentValue = initialAmount;
    
    // Calculer mois par mois
    for (let month = 1; month <= totalMonths; month++) {
        currentValue = currentValue * (1 + monthlyReturn) + monthlyInvestment;
        totalInvested += monthlyInvestment;
    }

    const totalGains = currentValue - totalInvested;

    // Mettre à jour l'affichage
    document.getElementById('total-invested').textContent = `€${Math.round(totalInvested).toLocaleString()}`;
    document.getElementById('final-value').textContent = `€${Math.round(currentValue).toLocaleString()}`;
    document.getElementById('total-gains').textContent = `€${Math.round(totalGains).toLocaleString()}`;

    // Afficher les résultats
    document.getElementById('projection-results').style.display = 'block';

    // Créer le graphique de projection
    createProjectionChart(initialAmount, monthlyInvestment, duration, annualReturn);
    
    showNotification('Projection calculée ! 📈', 'success');
}

// Création du graphique de projection
function createProjectionChart(initialAmount, monthlyInvestment, duration, annualReturn) {
    const ctx = document.getElementById('projection-chart');
    if (!ctx) return;

    const monthlyReturn = annualReturn / 100 / 12;
    const totalMonths = duration * 12;
    
    const labels = [];
    const investedData = [];
    const valueData = [];
    
    let totalInvested = initialAmount;
    let currentValue = initialAmount;
    
    for (let month = 0; month <= totalMonths; month++) {
        labels.push(`Mois ${month}`);
        investedData.push(totalInvested);
        valueData.push(currentValue);
        
        if (month < totalMonths) {
            currentValue = currentValue * (1 + monthlyReturn) + monthlyInvestment;
            totalInvested += monthlyInvestment;
        }
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Investi',
                data: investedData,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: false
            }, {
                label: 'Valeur',
                data: valueData,
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '€' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Configuration du quiz de personnalité
function setupQuizListeners() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.addEventListener('click', handleQuizAnswer);
    });
}

function handleQuizAnswer(event) {
    const selectedOption = event.target;
    const value = selectedOption.dataset.value;
    
    // Désélectionner les autres options
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Sélectionner l'option actuelle
    selectedOption.classList.add('selected');
    
    // Enregistrer la réponse
    quizAnswers.push(value);
    
    // Passer à la question suivante après 1 seconde
    setTimeout(() => {
        nextQuizQuestion();
    }, 1000);
}

function nextQuizQuestion() {
    currentQuizQuestion++;
    
    if (currentQuizQuestion < 5) {
        updateQuizQuestion();
    } else {
        completeQuiz();
    }
}

function updateQuizQuestion() {
    const questions = [
        {
            question: "Comment gérez-vous vos dépenses imprévues ?",
            options: [
                { text: "Je les évite autant que possible", value: "conservative" },
                { text: "Je les planifie dans mon budget", value: "balanced" },
                { text: "Je les finance avec mes investissements", value: "aggressive" }
            ]
        },
        {
            question: "Quel est votre objectif financier principal ?",
            options: [
                { text: "Sécurité et stabilité", value: "conservative" },
                { text: "Croissance modérée", value: "balanced" },
                { text: "Croissance maximale", value: "aggressive" }
            ]
        },
        {
            question: "Comment réagissez-vous aux fluctuations du marché ?",
            options: [
                { text: "Je panique et je vends", value: "conservative" },
                { text: "Je reste calme et j'attends", value: "balanced" },
                { text: "J'achète plus d'actions", value: "aggressive" }
            ]
        },
        {
            question: "Quel pourcentage de votre revenu investissez-vous ?",
            options: [
                { text: "Moins de 5%", value: "conservative" },
                { text: "5-15%", value: "balanced" },
                { text: "Plus de 15%", value: "aggressive" }
            ]
        },
        {
            question: "Quel est votre horizon d'investissement ?",
            options: [
                { text: "1-3 ans", value: "conservative" },
                { text: "3-10 ans", value: "balanced" },
                { text: "Plus de 10 ans", value: "aggressive" }
            ]
        }
    ];

    const currentQ = questions[currentQuizQuestion];
    const questionElement = document.getElementById('quiz-question');
    
    questionElement.innerHTML = `
        <h4>Question ${currentQuizQuestion + 1}/5</h4>
        <p>${currentQ.question}</p>
        <div class="quiz-options">
            ${currentQ.options.map(option => `
                <button class="quiz-option" data-value="${option.value}">${option.text}</button>
            `).join('')}
        </div>
    `;
    
    // Mettre à jour la barre de progression
    const progress = ((currentQuizQuestion + 1) / 5) * 100;
    document.getElementById('quiz-progress').style.width = `${progress}%`;
    
    // Reconfigurer les événements
    setupQuizListeners();
}

function completeQuiz() {
    // Analyser les réponses
    const personality = analyzePersonality(quizAnswers);
    userPersonality = personality;
    
    // Afficher les résultats
    showPersonalityResults(personality);
    
    // Générer des conseils personnalisés
    generatePersonalizedAdvice(personality);
}

function analyzePersonality(answers) {
    const counts = answers.reduce((acc, answer) => {
        acc[answer] = (acc[answer] || 0) + 1;
        return acc;
    }, {});
    
    const maxCount = Math.max(...Object.values(counts));
    const dominantType = Object.keys(counts).find(key => counts[key] === maxCount);
    
    return {
        type: dominantType,
        traits: getPersonalityTraits(dominantType),
        riskTolerance: getRiskTolerance(dominantType),
        investmentStrategy: getInvestmentStrategy(dominantType)
    };
}

function getPersonalityTraits(type) {
    const traits = {
        conservative: ['Prudent', 'Sécuritaire', 'Méthodique'],
        balanced: ['Équilibré', 'Réfléchi', 'Modéré'],
        aggressive: ['Audacieux', 'Optimiste', 'Dynamique']
    };
    return traits[type] || traits.balanced;
}

function getRiskTolerance(type) {
    const riskLevels = {
        conservative: 'Faible',
        balanced: 'Modéré',
        aggressive: 'Élevé'
    };
    return riskLevels[type] || 'Modéré';
}

function getInvestmentStrategy(type) {
    const strategies = {
        conservative: 'Portefeuille défensif : 70% obligations, 30% actions',
        balanced: 'Portefeuille équilibré : 50% actions, 50% obligations',
        aggressive: 'Portefeuille offensif : 80% actions, 20% obligations'
    };
    return strategies[type] || strategies.balanced;
}

function showPersonalityResults(personality) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div class="personality-results">
            <h3>🎯 Votre Profil Financier</h3>
            <div class="personality-card">
                <div class="personality-type">${personality.type.toUpperCase()}</div>
                <div class="personality-traits">
                    ${personality.traits.map(trait => `<span class="trait">${trait}</span>`).join('')}
                </div>
                <div class="personality-details">
                    <div class="detail-item">
                        <strong>Tolérance au risque :</strong> ${personality.riskTolerance}
                    </div>
                    <div class="detail-item">
                        <strong>Stratégie recommandée :</strong> ${personality.investmentStrategy}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generatePersonalizedAdvice(personality) {
    const advice = {
        conservative: [
            "💡 Focus sur les livrets A et obligations d'État pour la sécurité",
            "📊 Créez un fonds d'urgence de 6 mois de dépenses",
            "🏦 Diversifiez avec des ETF obligataires"
        ],
        balanced: [
            "⚖️ Mélangez actions et obligations selon votre âge",
            "📈 Investissez régulièrement avec des ETF diversifiés",
            "🎯 Rééquilibrez votre portefeuille chaque année"
        ],
        aggressive: [
            "🚀 Maximisez les actions et ETF de croissance",
            "💎 Considérez les crypto-monnaies (max 5% du portefeuille)",
            "📊 Investissez dans des secteurs innovants"
        ]
    };

    const personalizedAdvice = advice[personality.type] || advice.balanced;
    
    // Afficher les conseils dans le chat
    setTimeout(() => {
        addChatMessage('assistant', `Basé sur votre profil ${personality.type}, voici mes conseils personnalisés :`);
        personalizedAdvice.forEach(advice => {
            setTimeout(() => {
                addChatMessage('assistant', advice);
            }, 1000);
        });
    }, 2000);
}

// Système de notifications
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Animer l'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-suppression
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Bouton de fermeture
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Gestion des animations au scroll
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .budget-card, .course-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Gestion du redimensionnement
function handleResize() {
    // Recalculer les graphiques si nécessaire
    if (window.innerWidth < 768) {
        // Ajuster les graphiques pour mobile
        adjustChartsForMobile();
    }
}

// Ajustement des graphiques pour mobile
function adjustChartsForMobile() {
    // Logique d'ajustement des graphiques
    console.log('📱 Ajustement des graphiques pour mobile');
}

// Chargement des données de démonstration
function loadDemoData() {
    // Données de démonstration pour les dépenses quotidiennes
    dailyExpenses = [
        { category: 'Nourriture', amount: 20, icon: '🍕', time: '12:30' },
        { category: 'Loisirs', amount: 50, icon: '🎮', time: '18:45' },
        { category: 'Transport', amount: 15, icon: '🚗', time: '09:15' }
    ];
    
    // Mettre à jour l'affichage des dépenses
    updateDailyExpensesDisplay();
}

// Mise à jour de l'affichage des dépenses quotidiennes
function updateDailyExpensesDisplay() {
    const expenseList = document.querySelector('.daily-expenses');
    if (!expenseList) return;
    
    expenseList.innerHTML = dailyExpenses.map(expense => `
        <div class="expense-item">
            <span class="expense-icon">${expense.icon}</span>
            <span class="expense-details">€${expense.amount} - ${expense.category}</span>
        </div>
    `).join('');
}

// Initialisation des graphiques
function initializeCharts() {
    // Graphique des dépenses par catégorie
    const spendingCtx = document.getElementById('spending-chart');
    if (spendingCtx) {
        createSpendingChart();
    }
}

// Création du graphique des dépenses
function createSpendingChart() {
    const ctx = document.getElementById('spending-chart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Logement', 'Nourriture', 'Transport', 'Divertissement', 'Autres'],
            datasets: [{
                data: [350, 200, 150, 100, 50],
                backgroundColor: [
                    '#10b981',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6',
                    '#06b6d4'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// Message de bienvenue
function showWelcomeMessage() {
    setTimeout(() => {
        showNotification('Bienvenue sur CashHeal ! 🎉 Commencez par configurer votre budget.', 'success');
    }, 2000);
}

// Démarrage des animations
function startAnimations() {
    // Animation des éléments au chargement
    const animatedElements = document.querySelectorAll('.feature-card, .budget-card, .course-card');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Chargement des données utilisateur
function loadUserData() {
    // Charger depuis le localStorage
    const savedBudget = localStorage.getItem('cashheal-budget');
    if (savedBudget) {
        budgetData = JSON.parse(savedBudget);
    }
    
    const savedPersonality = localStorage.getItem('cashheal-personality');
    if (savedPersonality) {
        userPersonality = JSON.parse(savedPersonality);
    }
}

// Sauvegarde des données utilisateur
function saveUserData() {
    localStorage.setItem('cashheal-budget', JSON.stringify(budgetData));
    if (userPersonality) {
        localStorage.setItem('cashheal-personality', JSON.stringify(userPersonality));
    }
}

// Fonction de démonstration
function openDemo() {
    showNotification('Mode démonstration activé ! 🎮', 'success');
    
    // Simuler des données de démonstration
    document.getElementById('monthly-income').value = '5000';
    document.getElementById('fixed-expenses').value = '2000';
    
    // Calculer automatiquement
    setTimeout(() => {
        calculateBudget();
    }, 1000);
}

// Export des fonctions globales
window.scrollToSection = scrollToSection;
window.calculateBudget = calculateBudget;
window.calculateProjection = calculateProjection;
window.openDemo = openDemo;

// Sauvegarde automatique
setInterval(saveUserData, 30000); // Toutes les 30 secondes

console.log('🚀 CashHeal - Application initialisée avec succès !');
console.log('💡 Fonctionnalités disponibles :');
console.log('   - Calcul de budget intelligent');
console.log('   - Projections d\'investissement');
console.log('   - Quiz de personnalité financière');
console.log('   - Assistant IA conversationnel');
console.log('   - Animations Kawai');