class MemoryBank {
    constructor() {
        this.currentScene = 'intro';
        this.dialogueIndex = 0;
        this.isTyping = false;
        this.gameStarted = false;
        this.playerChoices = {};
        this.playerName = '';
        this.isTransitioning = false;
        this.dialogueHistory = [];
        this.timer = null;
        this.isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        this.isMusicPlaying = false;
        this.brainPoints = [];
        this.currentBrainPhase = 0;
        this.currentVoice = null;
        
        // Create background music
        this.backgroundMusic = new Audio('audio/music1.mp3');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.011;
        
        // Initialize brain visualization
        this.initBrainVisualization();
        
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
            backButton: document.getElementById('back-button'),
            skipHint: document.createElement('div'),
            musicButton: document.createElement('button')
        };

        // Create skip hint element
        this.elements.skipHint.className = 'skip-hint';
        this.elements.skipHint.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: rgba(255, 255, 255, 0.8);
            font-size: 1.6rem;
            text-align: center;
            pointer-events: none;
            display: none;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            letter-spacing: 1px;
        `;
        this.elements.gameScreen.appendChild(this.elements.skipHint);

        // Create timer element
        this.elements.timer = document.createElement('div');
        this.elements.timer.id = 'game-timer';
        this.elements.timer.className = 'game-timer';
        this.elements.gameScreen.appendChild(this.elements.timer);

        // Create music control button
        this.elements.musicButton.className = 'music-button';
        this.elements.musicButton.innerHTML = '🔈';
        this.elements.musicButton.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            width: 40px;
            height: 40px;
            border: none;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            font-size: 20px;
            cursor: pointer;
            z-index: 1000;
            display: none;
            transition: all 0.3s ease;
        `;
        
        // Only show music button on desktop
        if (!this.isTouchDevice) {
            this.elements.musicButton.style.display = 'block';
        }
        document.body.appendChild(this.elements.musicButton);

        // Event listeners
        document.getElementById('start-button').addEventListener('click', () => {
            this.startGame();
        });
        window.addEventListener('keydown', e => e.code === 'Space' && (e.preventDefault(), this.handleAction()));
        this.elements.gameScreen.addEventListener('click', () => this.handleAction());
        this.elements.backButton.addEventListener('click', () => this.goBack());
        this.elements.musicButton.addEventListener('click', () => this.toggleMusic());
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

        // Prevent skipping if there's a voice clip and text is still typing
        if (dialogue && dialogue.voice && this.isTyping) {
            return; // Don't allow skipping during voiced dialogue typing
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
            // Get current dialogue
            const currentDialogue = currentScene.dialogue[this.dialogueIndex];
            
            // If current dialogue is a choice with a response function
            if (currentDialogue.choices && typeof currentDialogue.text === 'function') {
                // Show the response text
                const responseText = currentDialogue.text(this.playerChoices);
                this.elements.speaker.textContent = 'KOVI';
                this.typeText(responseText);
                
                // Move to next dialogue after response is shown and clicked
                const handleResponseClick = () => {
                    this.elements.gameScreen.removeEventListener('click', handleResponseClick);
                    if (this.dialogueIndex < currentScene.dialogue.length - 1) {
                        this.dialogueIndex++;
                        this.showNextDialogue();
                    } else if (currentDialogue.nextScene) {
                        const nextScene = currentDialogue.nextScene;
                        const useTransition = currentDialogue.transition !== false;
                        this.transitionToScene(nextScene, useTransition);
                    }
                };
                
                this.elements.gameScreen.addEventListener('click', handleResponseClick);
            } else {
                // Normal dialogue progression
                if (this.dialogueIndex < currentScene.dialogue.length - 1) {
                    this.dialogueIndex++;
                    this.showNextDialogue();
                } else if (currentDialogue.nextScene) {
                    const nextScene = currentDialogue.nextScene;
                    const useTransition = currentDialogue.transition !== false;
                    if (typeof nextScene === 'function') {
                        this.transitionToScene(nextScene(this.playerChoices), useTransition);
                    } else {
                        this.transitionToScene(nextScene, useTransition);
                    }
                }
            }
        }
    }

    startBackgroundMusic() {
        this.backgroundMusic.play()
            .then(() => {
                this.isMusicPlaying = true;
                this.elements.musicButton.innerHTML = '🔊';
                console.log('Background music started successfully');
            })
            .catch(error => {
                console.log('Failed to play background music:', error);
                // Keep the button visible on desktop even if autoplay fails
                if (!this.isTouchDevice) {
                    this.elements.musicButton.style.display = 'block';
                }
            });
    }

    toggleMusic() {
        if (this.isMusicPlaying) {
            this.backgroundMusic.pause();
            this.elements.musicButton.innerHTML = '🔈';
            this.isMusicPlaying = false;
        } else {
            this.backgroundMusic.play()
                .then(() => {
                    this.elements.musicButton.innerHTML = '🔊';
                    this.isMusicPlaying = true;
                })
                .catch(error => console.log('Failed to resume music:', error));
        }
    }

    startGame() {
        if (this.gameStarted) return;
        this.gameStarted = true;
        this.elements.startScreen.classList.remove('active');
        this.elements.gameScreen.classList.add('active');
        this.showNextDialogue();
    }

    startTimer(duration) {
        let timeLeft = duration;
        this.elements.timer.style.display = 'block';
        
        this.timer = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            this.elements.timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            if (--timeLeft < 0) {
                clearInterval(this.timer);
                this.elements.timer.style.display = 'none';
                this.nextDialogue();
            }
        }, 1000);
    }

    showNextDialogue() {
        const currentScene = gameData.scenes[this.currentScene];
        if (!currentScene) return;

        // Stop any currently playing voice when showing next dialogue
        if (this.currentVoice) {
            this.currentVoice.pause();
            this.currentVoice = null;
        }

        let dialogue;
        if (typeof currentScene.dialogue === 'function') {
            dialogue = currentScene.dialogue(this.playerChoices)[this.dialogueIndex];
        } else {
            dialogue = currentScene.dialogue[this.dialogueIndex];
        }
        
        if (!dialogue) return;

        // Add skip condition check here
        if (dialogue.condition && typeof dialogue.condition === 'function' && !dialogue.condition(this.playerChoices)) {
            this.dialogueIndex++;
            this.showNextDialogue();
            return;
        }

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

        // Handle brain phase if specified
        if (dialogue.brain && typeof dialogue.brainPhase === 'number') {
            this.setBrainPhase(dialogue.brainPhase);
        } else if (!dialogue.brain) {
            this.setBrainPhase(0); // Hide brain if not needed
        }

        // Show/hide skip hint based on scene
        if (this.currentScene === 'intro') {
            this.elements.skipHint.textContent = this.isTouchDevice ? 'Tap to skip' : 'Press space or click to skip';
            this.elements.skipHint.style.display = 'block';
        } else {
            this.elements.skipHint.style.display = 'none';
        }

        // Start timer if it's a timed sequence
        if (dialogue.isTimedSequence && dialogue.timerDuration) {
            this.startTimer(dialogue.timerDuration);
        }

        // Stop timer if specified
        if (dialogue.stopTimer) {
            clearInterval(this.timer);
            this.elements.timer.style.display = 'none';
        }

        // Handle background with transition if specified
        const background = dialogue.background || currentScene.background;
        if (background) {
            let backgroundPath = background;
            if (typeof background === 'function') {
                backgroundPath = background(this.playerChoices);
            }
            
            console.log('Attempting to set background:', backgroundPath, 'isTransitioning:', this.isTransitioning);
            
            // Skip transition if the background isn't actually changing
            const currentBg = this.elements.background.style.backgroundImage;
            const newBg = `url('assets/${backgroundPath}')`;
            if (currentBg === newBg) {
                console.log('Skipping - same background');
                return;
            }
            
            // If we're transitioning, force complete the previous transition
            if (this.isTransitioning) {
                this.elements.transitionOverlay.classList.remove('dimming');
                this.isTransitioning = false;
            }
            
            // Check if the background image exists
            const img = new Image();
            img.onerror = () => {
                // If image fails to load (like black.png), set black background
                if (dialogue.transition) {
                    this.elements.transitionOverlay.classList.add('dimming');
                    this.isTransitioning = true;
                    
                    setTimeout(() => {
                        this.elements.background.style.backgroundImage = 'none';
                        this.elements.background.style.backgroundColor = '#000000';
                        this.elements.background.style.opacity = '1';
                        console.log('Set black background after transition');
                        this.elements.transitionOverlay.classList.remove('dimming');
                        this.isTransitioning = false;
                    }, 800);
                } else {
                    this.elements.background.style.backgroundImage = 'none';
                    this.elements.background.style.backgroundColor = '#000000';
                    this.elements.background.style.opacity = '1';
                }
            };
            
            // Always preload the image first
            img.src = `assets/${backgroundPath}`;
            
            // Set a loading state while the image loads
            this.elements.background.style.opacity = '0.5';
            img.onload = () => {
                if (dialogue.transition) {
                    this.elements.transitionOverlay.classList.add('dimming');
                    this.isTransitioning = true;
                    
                    setTimeout(() => {
                        this.elements.background.style.backgroundImage = newBg;
                        this.elements.background.style.opacity = '1';
                        console.log('Set background after transition:', backgroundPath);
                        this.elements.transitionOverlay.classList.remove('dimming');
                        this.isTransitioning = false;
                    }, 800);
                } else {
                    this.elements.background.style.backgroundImage = newBg;
                    this.elements.background.style.opacity = '1';
                    console.log('Set background immediately after preload:', backgroundPath);
                }
            };
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
            
            // Show KOVI's sprite if he's the speaker
            if (dialogue.speaker === 'KOVI') {
                this.elements.aria.style.backgroundImage = `url('assets/kovi.png')`;
                this.elements.aria.style.display = 'block';
            } else {
                this.elements.aria.style.display = 'none';
            }
            
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
                    this.nextDialogue();
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
        if ((dialogue.speaker === 'KOVI' || dialogue.isNarration) && this.currentScene !== 'intro') {
            this.elements.aria.style.backgroundImage = `url('assets/kovi.png')`;
            this.elements.aria.style.display = 'block';
        } else {
            this.elements.aria.style.display = 'none';
        }

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
            if (dialogue.voice) {
                this.currentVoice = new Audio(dialogue.voice);
                this.currentVoice.volume = 0.3; // Set voice volume to 20%
                this.currentVoice.play();
            }
            this.typeText(dialogue.text.replace('[name]', this.playerName));
        }
    }

    showChoices(choices, storeAs) {
        console.log("Current dialogue index:", this.dialogueIndex);
        
        // Get the current dialogue entry
        const currentScene = gameData.scenes[this.currentScene];
        const dialogue = currentScene.dialogue[this.dialogueIndex];
        
        // Never show KOVI in intro scene
        if (this.currentScene !== 'intro') {
            this.elements.aria.style.backgroundImage = `url('assets/kovi.png')`;
            this.elements.aria.style.display = 'block';
        } else {
            this.elements.aria.style.display = 'none';
        }
        
        // Create container for selected choices if this is a multi-choice question
        const isMultiChoice = dialogue.isMultiChoice || false;
        const selectedChoices = new Set();
        
        // Create choice buttons
        this.elements.choices.innerHTML = choices
            .map(choice => {
                const choiceText = typeof choice === 'string' ? choice : choice.text;
                return `<button class="choice-button" data-exclusive="${choice.isExclusive || false}">${choiceText}</button>`;
            })
            .join('');
            
        // Add done button for multi-choice
        if (isMultiChoice) {
            const doneButton = document.createElement('button');
            doneButton.className = 'choice-button done-button';
            doneButton.textContent = dialogue.doneButtonText || "Done";
            doneButton.style.display = 'none';
            this.elements.choices.appendChild(doneButton);
            
            // Handle done button click
            doneButton.onclick = () => {
                if (selectedChoices.size > 0) {
                    if (storeAs) {
                        this.playerChoices[storeAs] = Array.from(selectedChoices);
                    }
                    
                    this.elements.choices.innerHTML = '';
                    
                    // Get the next dialogue entry which contains the response function
                    const nextDialogue = currentScene.dialogue[this.dialogueIndex + 1];
                    if (nextDialogue && typeof nextDialogue.text === 'function') {
                        const response = nextDialogue.text(this.playerChoices);
                        this.elements.speaker.textContent = 'KOVI';
                        this.elements.dialogueText.textContent = '';
                        this.typeText(response);
                        
                        const handleResponseClick = () => {
                            this.elements.gameScreen.removeEventListener('click', handleResponseClick);
                            this.nextDialogue();
                        };
                        
                        this.elements.gameScreen.addEventListener('click', handleResponseClick);
                    } else {
                        this.nextDialogue();
                    }
                }
            };
        }

        // Handle choice button clicks
        this.elements.choices.querySelectorAll('.choice-button:not(.done-button)').forEach((button, index) => {
            button.onclick = () => {
                const choice = choices[index];
                const choiceText = typeof choice === 'string' ? choice : choice.text;
                const isExclusive = choice.isExclusive || false;
                
                if (isMultiChoice) {
                    // Handle exclusive choice (like 'No investments')
                    if (isExclusive) {
                        selectedChoices.clear();
                        this.elements.choices.querySelectorAll('.choice-button:not(.done-button)').forEach(btn => {
                            btn.classList.remove('selected');
                        });
                    } else {
                        // Remove exclusive choices when selecting non-exclusive ones
                        selectedChoices.forEach(selected => {
                            const selectedChoice = choices.find(c => c.text === selected);
                            if (selectedChoice && selectedChoice.isExclusive) {
                                selectedChoices.delete(selected);
                                this.elements.choices.querySelectorAll('.choice-button').forEach(btn => {
                                    if (btn.textContent === selected) {
                                        btn.classList.remove('selected');
                                    }
                                });
                            }
                        });
                    }
                    
                    // Toggle selection
                    if (selectedChoices.has(choiceText)) {
                        selectedChoices.delete(choiceText);
                        button.classList.remove('selected');
                    } else {
                        selectedChoices.add(choiceText);
                        button.classList.add('selected');
                    }
                    
                    // Show/hide done button based on selections
                    const doneButton = this.elements.choices.querySelector('.done-button');
                    if (doneButton) {
                        doneButton.style.display = selectedChoices.size > 0 ? 'block' : 'none';
                    }
                } else {
                    // Single choice handling
                    if (storeAs) {
                        this.playerChoices[storeAs] = choiceText;
                    }
                    
                    this.elements.choices.innerHTML = '';
                    
                    if (choice.response) {
                        this.elements.speaker.textContent = 'KOVI';
                        this.typeText(choice.response);
                        
                        const handleResponseClick = () => {
                            this.elements.gameScreen.removeEventListener('click', handleResponseClick);
                            this.nextDialogue();
                        };
                        
                        this.elements.gameScreen.addEventListener('click', handleResponseClick);
                    } else {
                        this.nextDialogue();
                    }
                }
            };
        });
    }

    typeText(text) {
        return new Promise((resolve) => {
            this.isTyping = true;
            this.elements.dialogueText.innerHTML = '';
            let index = 0;
            
            // For narration text, wrap in em tags after typing is complete
            const isNarration = text.includes('<em>');
            const cleanText = isNarration ? text.replace('<em>', '').replace('</em>', '') : text;
            
            // Add KOVI's name if he's the speaker
            const isKovi = this.elements.speaker.textContent === 'KOVI';
            const koviPrefix = isKovi ? '<span class="speaker-name">KOVI</span>' : '';
            
            // Create a temporary div to parse HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = cleanText;
            const textContent = tempDiv.textContent;
            
            // Add KOVI's name before starting the typing animation
            if (isKovi) {
                this.elements.dialogueText.innerHTML = koviPrefix;
            }
            
            const type = () => {
                if (!this.isTyping) {
                    this.completeTyping(text);
                    resolve();
                    return;
                }
                if (index < textContent.length) {
                    const displayText = textContent.slice(0, index + 1);
                    this.elements.dialogueText.innerHTML = isNarration ? 
                        `<em>${displayText}</em>` : 
                        `${koviPrefix}${displayText}`;
                    
                    index++;
                    setTimeout(type, 20);
                } else {
                    this.isTyping = false;
                    resolve();
                }
            };
            type();
        });
    }

    completeTyping(text) {
        this.isTyping = false;
        // Stop any currently playing voice when completing typing
        if (this.currentVoice) {
            this.currentVoice.pause();
            this.currentVoice = null;
        }
        const currentDialogue = gameData.scenes[this.currentScene].dialogue[this.dialogueIndex];
        
        if (!text) {
            text = currentDialogue.text;
        }
        
        // Handle colored text while preserving HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        let displayText = tempDiv.innerHTML;
        
        // Add KOVI's name if he's the speaker
        const isKovi = this.elements.speaker.textContent === 'KOVI';
        const koviPrefix = isKovi ? '<span class="speaker-name">KOVI</span>' : '';
        
        // Handle narration text
        if (currentDialogue.isNarration || text.includes('<em>')) {
            displayText = displayText.includes('<em>') ? displayText : `<em>${displayText}</em>`;
        }
        
        this.elements.dialogueText.innerHTML = `${koviPrefix}${displayText}`.replace('[name]', this.playerName);
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

    initBrainVisualization() {
        const container = document.querySelector('.brain-container .container');
        const numberOfPoints = 40;
        const numberOfConnections = 30;
        
        // Create neural points with diamond shape
        for (let i = 0; i < numberOfPoints; i++) {
            const point = document.createElement('div');
            point.className = 'neural-point';
            
            // Diamond shape sizing
            const size = 8 + Math.random() * 8;
            point.style.width = `${size}px`;
            point.style.height = `${size}px`;
            
            let x, y;
            let isInside = false;
            
            while (!isInside) {
                if (Math.random() < 0.9) {
                    const angle = Math.random() * Math.PI * 2;
                    const a = 140 + Math.random() * 40;
                    const b = 100 + Math.random() * 50;
                    
                    x = 200 + Math.cos(angle) * a * (0.5 + Math.random() * 0.5);
                    y = 180 + Math.sin(angle) * b * (0.5 + Math.random() * 0.5);
                    
                    const dx = (x - 200) / a;
                    const dy = (y - 180) / b;
                    
                    if (dx*dx + dy*dy <= 1) {
                        isInside = true;
                    }
                } else {
                    x = 200 + (Math.random() * 80 - 40);
                    y = 180 + (Math.random() * 80 - 40);
                    isInside = true;
                }
            }
            
            point.style.left = `${x}px`;
            point.style.top = `${y}px`;
            point.style.animationDelay = `${Math.random() * 2}s`;
            
            container.appendChild(point);
            this.brainPoints.push({
                element: point,
                x, y,
                phaseTime: Math.floor(Math.random() * 7)
            });
        }
        
        // Create circuit pattern lines with data pulses
        for (let i = 0; i < numberOfConnections; i++) {
            const startPoint = this.brainPoints[Math.floor(Math.random() * this.brainPoints.length)];
            const endPoint = this.brainPoints[Math.floor(Math.random() * this.brainPoints.length)];
            
            if (startPoint !== endPoint) {
                const line = document.createElement('div');
                line.className = 'connecting-line';
                
                const dx = endPoint.x - startPoint.x;
                const dy = endPoint.y - startPoint.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                
                line.style.width = `${length}px`;
                line.style.left = `${startPoint.x}px`;
                line.style.top = `${startPoint.y}px`;
                line.style.transform = `rotate(${angle}deg)`;
                line.style.animationDelay = `${Math.random() * 3}s`;
                
                // Add circuit node at intersection
                const circuitNode = document.createElement('div');
                circuitNode.className = 'circuit-node';
                circuitNode.style.width = '4px';
                circuitNode.style.height = '4px';
                circuitNode.style.left = `${startPoint.x}px`;
                circuitNode.style.top = `${startPoint.y}px`;
                
                container.appendChild(line);
                container.appendChild(circuitNode);
                startPoint.line = line;
                startPoint.circuitNode = circuitNode;
            }
        }
    }

    setBrainPhase(phaseNumber) {
        this.currentBrainPhase = phaseNumber;
        const brainContainer = document.querySelector('.brain-container');
        
        if (phaseNumber === 0) {
            brainContainer.classList.remove('visible');
            return;
        }
        
        // Show brain container if not already visible
        if (!brainContainer.classList.contains('visible')) {
            brainContainer.classList.add('visible');
        }
        
        // Reset all points first
        this.brainPoints.forEach(point => {
            point.element.classList.remove('blue');
            if (point.line) {
                point.line.classList.remove('blue');
            }
            if (point.circuitNode) {
                point.circuitNode.classList.remove('blue');
            }
        });
        
        // Apply blue to appropriate points for the current phase
        if (phaseNumber > 0) {
            this.brainPoints.forEach(point => {
                if (point.phaseTime < phaseNumber) {
                    point.element.classList.add('blue');
                    if (point.line) {
                        if (phaseNumber === 7) {
                            point.line.classList.add('blue');
                        } else if (point.phaseTime < phaseNumber) {
                            point.line.classList.add('blue');
                        }
                    }
                    if (point.circuitNode) {
                        if (phaseNumber === 7) {
                            point.circuitNode.classList.add('blue');
                        } else if (point.phaseTime < phaseNumber) {
                            point.circuitNode.classList.add('blue');
                        }
                    }
                }
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => window.game = new MemoryBank());