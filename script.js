class MemoryBank {
    constructor() {
        this.currentScene = 'intro';
        this.dialogueIndex = 0;
        this.isTyping = false;
        this.gameStarted = false;
        this.playerChoices = {};
        this.playerName = '';
        this.isTransitioning = false;
        this.dialogueHistory = [];  // Add history tracking
        
        // Cache DOM elements
        this.elements = {
            startScreen: document.getElementById('start-screen'),
            gameScreen: document.getElementById('game-screen'),
            dialogueBox: document.getElementById('dialogue-box'),
            dialogueText: document.getElementById('dialogue-text'),
            speaker: document.getElementById('speaker'),
            background: document.getElementById('background'),
            choices: document.getElementById('choices-container'),
            transitionOverlay: document.getElementById('transition-overlay'),
            aria: document.getElementById('aria-sprite'),
            backButton: document.getElementById('back-button')
        };

        // Event listeners
        document.getElementById('start-button').addEventListener('click', () => this.startGame());
        window.addEventListener('keydown', e => e.code === 'Space' && (e.preventDefault(), this.handleAction()));
        this.elements.gameScreen.addEventListener('click', () => this.handleAction());
        this.elements.backButton.addEventListener('click', () => this.goBack());
    }

    async transitionToScene(nextScene, useTransition = true) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        if (useTransition) {
            this.elements.transitionOverlay.classList.add('dimming');
            await new Promise(resolve => setTimeout(resolve, 800));
        }

        // Change scene
        this.currentScene = nextScene;
        this.dialogueIndex = 0;

        // Set up new scene
        await this.showNextDialogue();
        
        // Remove dimming after scene is set up
        this.elements.transitionOverlay.classList.remove('dimming');
        this.isTransitioning = false;
    }

    handleAction() {
        if (!this.gameStarted) {
            this.startGame();
            return;
        }

        const currentScene = gameData.scenes[this.currentScene];
        if (!currentScene) return;

        let dialogue;
        if (typeof currentScene.dialogue === 'function') {
            dialogue = currentScene.dialogue(this.playerChoices)[this.dialogueIndex];
        } else {
            dialogue = currentScene.dialogue[this.dialogueIndex];
        }

        // Prevent skipping during the cyber-loading sequence
        if (this.currentScene === 'finalMemory' && 
            dialogue && 
            dialogue.text.includes('cyber-loading')) {
            return; // Don't allow any action during these sequences
        }

        if (!dialogue || dialogue.choices || dialogue.requiresInput) return;

        if (this.isTyping) {
            this.completeTyping();
        } else {
            this.nextDialogue();
        }
    }

    nextDialogue() {
        const currentScene = gameData.scenes[this.currentScene];
        let dialogue;
        
        if (typeof currentScene.dialogue === 'function') {
            const dialogueArray = currentScene.dialogue(this.playerChoices);
            if (this.dialogueIndex < dialogueArray.length - 1) {
                this.dialogueIndex++;
                this.showNextDialogue();
            } else if (dialogueArray[this.dialogueIndex].nextScene) {
                const nextScene = dialogueArray[this.dialogueIndex].nextScene;
                const useTransition = dialogueArray[this.dialogueIndex].transition !== false;
                this.transitionToScene(nextScene, useTransition);
            }
        } else {
            if (this.dialogueIndex < currentScene.dialogue.length - 1) {
                this.dialogueIndex++;
                this.showNextDialogue();
            } else if (currentScene.dialogue[this.dialogueIndex].nextScene) {
                const nextScene = currentScene.dialogue[this.dialogueIndex].nextScene;
                const useTransition = currentScene.dialogue[this.dialogueIndex].transition !== false;
                if (typeof nextScene === 'function') {
                    this.transitionToScene(nextScene(this.playerChoices), useTransition);
                } else {
                    this.transitionToScene(nextScene, useTransition);
                }
            }
        }
    }

    startGame() {
        if (this.gameStarted) return;
        this.gameStarted = true;
        this.elements.startScreen.classList.remove('active');
        this.elements.gameScreen.classList.add('active');
        this.showNextDialogue();
    }

    showNextDialogue() {
        const currentScene = gameData.scenes[this.currentScene];
        if (!currentScene) return;

        // Save current state to history
        this.dialogueHistory.push({
            scene: this.currentScene,
            index: this.dialogueIndex,
            choices: {...this.playerChoices}
        });

        // Limit history size to prevent memory issues
        if (this.dialogueHistory.length > 50) {
            this.dialogueHistory.shift();
        }

        let dialogue;
        if (typeof currentScene.dialogue === 'function') {
            dialogue = currentScene.dialogue(this.playerChoices)[this.dialogueIndex];
        } else {
            dialogue = currentScene.dialogue[this.dialogueIndex];
        }
        
        if (!dialogue) return;

        // Handle background with transition if specified
        const background = dialogue.background || currentScene.background;
        if (background) {
            let backgroundPath = background;
            if (typeof background === 'function') {
                backgroundPath = background(this.playerChoices);
            }
            
            // Skip transition if the background isn't actually changing
            const currentBg = this.elements.background.style.backgroundImage;
            const newBg = `url('assets/${backgroundPath}')`;
            if (currentBg === newBg) {
                return;
            }
            
            if (dialogue.transition) {
                // Preload the image first
                const img = new Image();
                img.src = `assets/${backgroundPath}`;
                
                this.elements.transitionOverlay.classList.add('dimming');
                
                img.onload = () => {
                    setTimeout(() => {
                        this.elements.background.style.backgroundImage = newBg;
                        this.elements.transitionOverlay.classList.remove('dimming');
                    }, 800);
                };
            } else {
                this.elements.background.style.backgroundImage = newBg;
            }
        }

        // Handle ARIA's sprite
        if (dialogue.aria) {
            this.elements.aria.style.backgroundImage = `url('assets/${dialogue.aria}')`;
            this.elements.aria.style.display = 'block';
        } else {
            this.elements.aria.style.display = 'none';
        }

        // Handle name input
        if (dialogue.requiresInput) {
            this.elements.speaker.textContent = dialogue.speaker;
            this.elements.dialogueText.textContent = dialogue.text;
            
            // Create name input form
            const nameForm = document.createElement('form');
            nameForm.className = 'name-input-container';
            nameForm.innerHTML = `
                <input type="text" class="name-input" placeholder="" required>
                <button type="submit" class="choice-button">Continue</button>
            `;
            
            // Clear choices and append form to dialogue text
            this.elements.choices.innerHTML = '';
            this.elements.dialogueText.appendChild(nameForm);
            
            // Auto-focus the input field
            nameForm.querySelector('.name-input').focus();
            
            // Handle form submission
            nameForm.onsubmit = (e) => {
                e.preventDefault();
                const nameInput = nameForm.querySelector('.name-input');
                if (dialogue.storeAs === 'userEmail') {
                    this.playerChoices[dialogue.storeAs] = nameInput.value;
                    if (dialogue.nextScene) {
                        this.transitionToScene(dialogue.nextScene, true);
                    } else {
                        this.transitionToScene('ending', true);
                    }
                } else {
                    this.playerName = nameInput.value || 'Player';
                    this.nextDialogue();
                }
            };
            
            return;
        }

        // Handle choices
        if (dialogue.choices) {
            this.elements.speaker.textContent = dialogue.speaker;
            this.elements.dialogueText.textContent = dialogue.text.replace('[name]', this.playerName);
            this.showChoices(dialogue.choices, dialogue.storeAs);
            return;
        }

        // Clear any existing choices
        this.elements.choices.innerHTML = '';

        // Show dialogue
        this.elements.speaker.textContent = dialogue.speaker || '';
        if (dialogue.isNarration) {
            // For narration, show text with typing effect and wait for user input
            if (dialogue.text.includes('cyber-loading')) {
                // For cyber-loading sequence, show immediately and auto-advance
                this.elements.dialogueText.innerHTML = dialogue.text;
                
                setTimeout(() => {
                    if (this.currentScene === 'finalMemory' && 
                        this.dialogueIndex === this.dialogueHistory[this.dialogueHistory.length - 1].index) {
                        this.nextDialogue();
                    }
                }, 7000); // Wait for all animations to complete (6s + buffer)
            } else if (dialogue.text.includes('Screen glitches')) {
                // Add 3 second delay before showing glitch text
                this.elements.dialogueText.innerHTML = '';
                setTimeout(() => {
                    this.typeText(`<em>${dialogue.text.replace('[name]', this.playerName)}</em>`);
                }, 3000);
            } else {
                this.typeText(`<em>${dialogue.text.replace('[name]', this.playerName)}</em>`);
            }
        } else {
            // For regular dialogue, use typing animation
            this.typeText(dialogue.text.replace('[name]', this.playerName));
        }
    }

    showChoices(choices, storeAs) {
        console.log("Current dialogue index:", this.dialogueIndex);
        this.elements.choices.innerHTML = choices
            .map(choice => `<button class="choice-button">${choice}</button>`)
            .join('');

        // Add timer for the critical choice
        if (this.currentScene === 'finalMemory' && choices.includes('Accept Connection')) {
            // Add timer element
            const timer = document.createElement('div');
            timer.className = 'choice-timer';
            this.elements.choices.classList.add('timed');
            this.elements.choices.appendChild(timer);

            // Auto advance after 5 seconds
            setTimeout(() => {
                if (this.currentScene === 'finalMemory') {  // Check if we're still on the same scene
                    this.playerChoices[storeAs] = 'Time Expired';
                    this.elements.choices.innerHTML = '';
                    this.nextDialogue();
                }
            }, 5000);
        }

        this.elements.choices.querySelectorAll('.choice-button').forEach(button => {
            button.onclick = () => {
                if (storeAs) {
                    this.playerChoices[storeAs] = button.textContent;
                } else {
                    const choiceKey = `${this.currentScene}_${this.dialogueIndex}`;
                    this.playerChoices[choiceKey] = button.textContent;
                }
                console.log("Player choices:", this.playerChoices);
                this.elements.choices.innerHTML = '';
                this.nextDialogue();
            };
        });
    }

    typeText(text) {
        this.isTyping = true;
        this.elements.dialogueText.innerHTML = '';
        let index = 0;
        
        // For narration text, wrap in em tags after typing is complete
        const isNarration = text.includes('<em>');
        const cleanText = isNarration ? text.replace('<em>', '').replace('</em>', '') : text;
        
        const type = () => {
            if (!this.isTyping) return this.completeTyping(text);
            if (index < cleanText.length) {
                this.elements.dialogueText.innerHTML = isNarration ? 
                    `<em>${cleanText.substring(0, ++index)}</em>` : 
                    cleanText.substring(0, ++index);
                setTimeout(type, 20);
            } else {
                this.isTyping = false;
            }
        };
        type();
    }

    completeTyping(text) {
        this.isTyping = false;
        this.elements.dialogueText.innerHTML = text || 
            gameData.scenes[this.currentScene].dialogue[this.dialogueIndex].text;
    }

    goBack() {
        if (this.dialogueHistory.length <= 1) return; // Need at least 2 entries to go back
        
        // Remove current state
        this.dialogueHistory.pop();
        // Get previous state
        const previousState = this.dialogueHistory[this.dialogueHistory.length - 1];
        
        // Restore previous state
        this.currentScene = previousState.scene;
        this.dialogueIndex = previousState.index;
        
        // Handle background
        const currentScene = gameData.scenes[this.currentScene];
        if (currentScene.background) {
            if (typeof currentScene.background === 'function') {
                this.elements.background.style.backgroundImage = `url('assets/${currentScene.background(this.playerChoices)}')`;
            } else {
                this.elements.background.style.backgroundImage = `url('assets/${currentScene.background}')`;
            }
        }

        // Show the dialogue without adding to history
        const dialogue = typeof currentScene.dialogue === 'function' 
            ? currentScene.dialogue(this.playerChoices)[this.dialogueIndex]
            : currentScene.dialogue[this.dialogueIndex];

        // Handle ARIA's sprite
        if (dialogue.aria) {
            this.elements.aria.style.backgroundImage = `url('assets/${dialogue.aria}')`;
            this.elements.aria.style.display = 'block';
        } else {
            this.elements.aria.style.display = 'none';
        }

        // Show dialogue text
        this.elements.speaker.textContent = dialogue.speaker || '';
        if (dialogue.isNarration) {
            this.typeText(`<em>${dialogue.text.replace('[name]', this.playerName)}</em>`);
        } else {
            this.typeText(dialogue.text.replace('[name]', this.playerName));
        }

        // Handle choices if present
        if (dialogue.choices) {
            this.showChoices(dialogue.choices, dialogue.storeAs);
        } else {
            this.elements.choices.innerHTML = '';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => window.game = new MemoryBank());