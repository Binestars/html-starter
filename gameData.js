const gameData = {
    scenes: {
        intro: {
            dialogue: [
                {
                    text: '*Neural systems initializing...*',
                    isNarration: true,
                    nextScene: 'wakeUp',
                    transition: true
                }
            ]
        },
        wakeUp: {
            background: 'hospital-room.png',
            dialogue: [
                {
                    speaker: '',
                    text: '*You open your eyes. Medical equipment beeps on the background.*',
                    isNarration: true
                },
                {
                    speaker: 'ARIA',
                    text: 'Neural reboot complete. Good morning. You\'re safe. The year is 2089, and you\'re in New Shanghai Memorial.',
                    background: 'hospital-room.png',
                    aria: 'aria.png'
                },
                {
                    speaker: 'ARIA',
                    text: 'I\'m ARIA, your recovery assistant.',
                    background: 'hospital-room.png',
                    aria: 'aria.png',
                },
                {
                    speaker: 'ARIA',
                    text: 'Your memory was damaged in what we believe was a targeted neural wipe.',
                    background: 'hospital-room.png',
                    aria: 'aria.png'
                },
                {
                    speaker: 'ARIA',
                    text: 'But here\'s the interesting part - they only erased your personal memories. Your procedural memory, skills, and general knowledge are intact.',
                    background: 'hospital-room.png',
                    aria: 'aria.png',
                },
                {
                    speaker: 'ARIA',
                    text: 'There\'s something else. I\'ve detected unusual activity in your accounts.',
                    aria: 'aria.png'
                },
                {
                    speaker: 'ARIA',
                    text: 'You have access to <span style="color: var(--neon-pink)">50 million credits</span>. The transfer happened just before your neural wipe.',
                    aria: 'aria.png'
                },
                {
                    speaker: 'ARIA',
                    text: 'The question is - were these credits already yours? Or did someone send them? And why erase your memory right after?',
                    aria: 'aria.png',
                    nextScene: 'questions'
                }
            ]
        },
        questions: {
            background: 'pod.png',
            dialogue: [
                {
                    text: '*The medical pod\'s cover retracts with a soft hiss. Cool air touches your skin.*',
                    isNarration: true
                },
                {
                    speaker: 'ARIA',
                    text: 'Let\'s start with basic questions. The more honest your responses, the better chance we have of recovering your memories. Even small details might trigger something important.',
                    aria: 'aria.png'
                },
                {
                    speaker: 'ARIA',
                    text: 'First, do you remember your name?',
                    aria: 'aria.png'
                },
                {
                    speaker: 'Enter your name',
                    text: '',
                    requiresInput: true
                },
                {
                    speaker: 'ARIA',
                    text: '[name], now let\'s try to sit up...',
                    aria: 'aria.png'
                },
                {
                    text: '*As you sit up, your eyes catch a work badge hanging on the wall.*',
                    isNarration: true,
                    background: 'badge-reflection.png',
                    transition: true
                },
                {
                    speaker: 'ARIA',
                    text: 'That badge... Did it trigger anything? What kind of work feels familiar to you?',
                    background: 'hospital-room.png',
                    choices: [
                        'Traditional employment\n(9-5)',
                        'Business owner',
                        'Freelance/Self-employed',
                        'Not employed'
                    ],
                    storeAs: 'employment',
                    aria: 'aria.png'
                },
                {
                    speaker: 'ARIA',
                    text: 'Hm...Interesting neural spike there.',
                    background: 'hospital-room.png',
                    aria: 'aria.png',
                    transition: true
                },
                {
                    speaker: 'ARIA',
                    text: ' And was this your only source of income?',
                    choices: [
                        'Single source',
                        'Multiple sources'
                    ],
                    storeAs: 'incomeSource',
                    aria: 'aria.png',
                    background: 'hospital-room.png'
                },
                {
                    text: '*The room dims. Neural monitors pulse rapidly as memories surface...*',
                    isNarration: true,
                    nextScene: 'memoryTransition',
                    transition: true,
                    background: 'black.png'
                }
            ]
        },
        memoryTransition: {
            background: 'black.png',
            dialogue: [
                {
                    text: '*Neural pathways reconstructing memory fragment...*',
                    isNarration: true,
                    nextScene: (choices) => choices.paymentMethod ? 'paymentMemory' : 'memoryFlash',
                    background: 'black.png'
                }
            ]
        },
        memoryFlash: {
            background: 'dark-room.png',
            dialogue: (choices) => {
                const employment = choices.employment;
                const income = choices.incomeSource;
                
                const memoryMap = {
                    'Traditional employment\n(9-5)': {
                        'Single source': {
                            text: '*A pristine corporate office, 200 floors up. You\'re accessing a quantum terminal - standard procedure. But something\'s off. Your security badge is matte black instead of the usual blue. Other employees avoid eye contact. On your terminal: "Protocol BLACKSMITH activated. Maintain cover." Why were you really there?*',
                            nextScene: 'cafe'
                        },
                        'Multiple sources': {
                            text: '*Rapid flashes between day and night. Day: Corporate analyst, normal meetings. Night: Your apartment\'s walls become transparent, revealing a hidden crypto mining farm. A neural message: "Investment gains nominal. Continue laundering sequence." The corporate job was just a front?*',
                            nextScene: 'cafe'
                        }
                    },
                    'Business owner': {
                        'Single source': {
                            text: '*Your business looks ordinary. Too ordinary. Behind the counter, your fingers dance across a hidden scanner. The whole space shifts - customers freeze mid-motion. A holographic message: "Identity confirmed. Welcome back, Handler." Your business wasn\'t really selling anything, was it?*',
                            nextScene: 'cafe'
                        },
                        'Multiple sources': {
                            text: '*A network of businesses, each legitimate on the surface. In your private office, walls display multiple data streams. Cryptocurrency flows, property deeds, shipping manifests. A secure message arrives: "All fronts operational. Begin final phase." The businesses were pieces of a larger puzzle.*',
                            nextScene: 'cafe'
                        }
                    },
                    'Freelance/Self-employed': {
                        'Single source': {
                            text: '*You\'re in different high-security locations each day. "Consulting work" your official story. But your neural implant keeps scanning for surveillance. A client hands you a quantum-encrypted drive: "The only copy. Make it disappear." This wasn\'t regular freelancing.*',
                            nextScene: 'cafe'
                        },
                        'Multiple sources': {
                            text: '*Your home office transforms at night. Walls project different identities: IT consultant, financial advisor, security specialist. Each identity accessing different accounts, moving different assets. A message flashes: "Contingency accounts prepared. Awaiting final authorization." How many lives were you really living?*',
                            nextScene: 'cafe'
                        }
                    },
                    'Not employed': {
                        'Single source': {
                            text: '*No job, but your apartment rivals a corporate command center. Quantum computers line the walls. Someone trusted you with enormous resources. On the main screen: "Asset allocation complete. Ghost Protocol active." Being \'unemployed\' was your most important job.*',
                            nextScene: 'cafe'
                        },
                        'Multiple sources': {
                            text: '*A underground facility. Multiple terminals tracking automated systems - shell companies, AI traders, ghost accounts. Your fingerprints are nowhere, but you control everything. Warning message: "Pattern detection imminent. Initiate displacement sequence." Is this why they erased your memory?*',
                            nextScene: 'cafe'
                        }
                    }
                };

                const memory = memoryMap[employment][income];
                return [{
                    text: '*MEMORY RECONSTRUCTED*',
                    isNarration: true
                },
                {
                    isNarration: true,
                    text: memory.text,
                    nextScene: memory.nextScene,
                    transition: true
                }];
            }
        },
        cafe: {
            background: 'hospital-room.png',
            dialogue: [
                {
                    text: '*The memory fades. Your heart rate has increased.*',
                    isNarration: true
                },
                {
                    speaker: 'ARIA',
                    text: 'Your neural patterns are fascinating. Almost as if... Never mind. You need to eat. The café downstairs is secure. And familiar - your biosignatures show you\'ve been there before.',
                    aria: 'aria.png'
                },
                {
                    text: '*The hospital room door whispers open. The corridor beyond gleams with soft, recessed lighting. As you walk, your legs feel steady - muscle memory intact.*',
                    isNarration: true,
                    nextScene: 'corridor',
                    transition: true,
                    background: 'corridor.png'
                }
            ]
        },
        corridor: {
            background: 'lift.png',
            dialogue: [
                {
                    text: '*The lift responds to your presence, descending smoothly to the commercial level.*',
                    isNarration: true,
                    transition: false
                },
                {
                    text: '*The scent hits you first - real coffee, not synthetic. The Quantum Café\'s smart-glass façade shifts from opaque to transparent as you approach. *',
                    isNarration: true,
                    background: 'quantum-cafe.png',
                    transition: true
                },
                {
                    text: '*Inside, conversations blend with the subtle hum of holoprojectors. Groups of people cluster around tables that shift and resize to accommodate their gatherings.*',
                    isNarration: true,
                    background: 'quantum-cafe.png'
                },
                {
                    speaker: 'ARIA',
                    text: 'Watch the other patrons for a moment. See how they interact. Does any of it feel familiar?',
                    background: 'quantum-cafe.png',
                    aria: 'aria.png'
                },
                {
                    text: '*Different groups catch your eye: A lively celebration in one corner, a quiet business meeting in another, someone dining alone while interfacing with neural-net projections.*',
                    isNarration: true,
                    background: 'quantum-cafe.png'
                },
                {
                    speaker: 'ARIA',
                    text: 'How often did you find yourself in places like this?',
                    background: 'quantum-cafe.png',
                    choices: [
                        'Very often, multiple times per week',
                        'About once a week',
                        'A few times a month',
                        'Rarely or never'
                    ],
                    storeAs: 'socialFrequency',
                    aria: 'aria.png'
                },
                {
                    text: '*After observing, you settle at a table. The surface illuminates with a soft blue glow, and a holographic menu materializes.*',
                    isNarration: true,
                    background: 'quantum-cafe.png'
                },
                {
                    speaker: 'ARIA',
                    text: 'Order whatever feels right. Sometimes muscle memory knows things we don\'t.',
                    background: 'quantum-cafe.png',
                    aria: 'aria.png'
                },
                {
                    text: '*You select a few items. The food arrives quickly - the service drones are efficient. As you finish your meal, the table\'s surface shifts to display payment options. Your hand moved instinctively, but then hesitates...*',
                    isNarration: true,
                    background: 'quantum-cafe.png'
                },
                {
                    text: '*Multiple payment interfaces flicker in the air: Physical currency slot, neural-link transfer, credit authentication. Each triggering faint echoes of memory.*',
                    isNarration: true,
                    background: 'quantum-cafe.png'
                },
                {
                    speaker: 'ARIA',
                    text: 'That hesitation... your hand started to move before your conscious mind engaged. Let it happen naturally. How would you usually handle this?',
                    background: 'quantum-cafe.png',
                    nextScene: 'payment',
                    transition: false,
                    aria: 'aria.png'
                }
            ]
        },
        payment: {
            background: 'quantum-cafe.png',
            dialogue: [
                {
                    speaker: 'ARIA',
                    text: 'Which payment method feels most natural?',
                    choices: [
                        'I prefer using cash or debit',
                        'I have one credit card I use for everything',
                        'I use 2-3 different cards for different purposes',
                        'I actively optimize multiple cards (4+) for rewards'
                    ],
                    storeAs: 'paymentMethod',
                    aria: 'aria.png'
                },
                {
                    text: '*Your choice triggers another surge of memories...*',
                    isNarration: true,
                    background: 'black.png',
                    nextScene: 'memoryTransition',
                    transition: true
                }
            ]
        },
        paymentMemory: {
            background: 'dark-room.png',
            dialogue: (choices) => {
                const paymentMethod = choices.paymentMethod;
                
                const memoryMap = {
                    'I prefer using cash or debit': {
                        text: '*Late night meeting. "No neural traces. Physical currency only." Someone\'s face in shadows.*',
                        nextScene: 'investigation'
                    },
                    'I have one credit card I use for everything': {
                        text: '*A special card, quantum-encrypted. Access levels that shouldn\'t exist.*',
                        nextScene: 'investigation'
                    },
                    'I use 2-3 different cards for different purposes': {
                        text: '*Each card connected to different accounts, different identities. Building a pattern. But why?*',
                        nextScene: 'investigation'
                    },
                    'I actively optimize multiple cards (4+) for rewards': {
                        text: '*Complex transaction web. Each reward program a piece of a larger puzzle. Data flowing through hidden channels.*',
                        nextScene: 'investigation'
                    }
                };

                return [{
                    text: '*MEMORY RECONSTRUCTED*',
                    isNarration: true
                },
                {
                    isNarration: true,
                    text: memoryMap[paymentMethod].text,
                    nextScene: memoryMap[paymentMethod].nextScene,
                    transition: true
                }];
            }
        },
        investigation: {
            background: 'financial-district.png',
            dialogue: [
                {
                    text: '*As you leave the café, your neural implant suddenly vibrates. Your eyes are drawn to the towering financial district ahead - quantum-glass skyscrapers reflecting the afternoon light, their surfaces alive with flowing market data.*',
                    isNarration: true
                },
                {
                    speaker: 'ARIA',
                    text: 'Your heart rate just spiked. Those buildings mean something to you. Let\'s follow your instincts.',
                    aria: 'aria.png'
                },
                {
                    text: '*You find yourself walking toward a specific intersection. Banking terminals line the street, their interfaces pulsing with different currencies - both traditional and crypto.*',
                    isNarration: true,
                    background: 'terminals.png',
                    transition: true
                },
                {
                    speaker: 'ARIA',
                    background: 'terminals.png',
                    text: 'Look at the currency displays. Which ones feel familiar?',
                    choices: [
                        'Mostly domestic transactions',
                        'Regular international transfers',
                        'Mix of both'
                    ],
                    storeAs: 'bankingGeography',
                    aria: 'aria.png',
                    transition: false
                },
                {
                    speaker: 'ARIA',
                    background: 'terminals.png',
                    text: 'And what about different currencies? Any experience there?',
                    choices: [
                        'Single currency',
                        'Multiple currencies',
                        'Heavy crypto usage'
                    ],
                    storeAs: 'currencyExposure',
                    nextScene: 'bankingMemory',
                    aria: 'aria.png'
                }
            ]
        },
        bankingMemory: {
            background: 'dark-room.png',
            dialogue: (choices) => {
                const geography = choices.bankingGeography;
                const currency = choices.currencyExposure;
                
                const memoryMap = {
                    'Mostly domestic transactions': {
                        'Single currency': {
                            text: '*A secure terminal room. Local banks only. But the amounts... billions moving through seemingly normal accounts. A voice: "Keep it in-system. They\'re watching international channels."*',
                            nextScene: 'transport'
                        },
                        'Multiple currencies': {
                            text: '*Underground exchange hub. Converting massive sums between currencies without leaving domestic servers. Someone saying: "The conversion patterns are the real message."*',
                            nextScene: 'transport'
                        },
                        'Heavy crypto usage': {
                            text: '*Hidden mining farm in an abandoned subway station. Domestic power grid only. Message: "Local infrastructure is compromised. Proceed with extraction."*',
                            nextScene: 'transport'
                        }
                    },
                    'Regular international transfers': {
                        'Single currency': {
                            text: '*Global banking network access point. Everything converted to one specific currency. Encrypted message: "Single stream protocol active. Begin data burst."*',
                            nextScene: 'transport'
                        },
                        'Multiple currencies': {
                            text: '*Virtual financial command center. Walls covered in exchange rates. Your hands orchestrating a complex dance of international transfers. "Currency fluctuations will mask the signal."*',
                            nextScene: 'transport'
                        },
                        'Heavy crypto usage': {
                            text: '*A network of quantum computers spanning continents. Each mining operation hiding something in the blockchain. Warning: "Pattern detected in Singapore node. Initiate blackout protocol."*',
                            nextScene: 'transport'
                        }
                    },
                    'Mix of both': {
                        'Single currency': {
                            text: '*Seamless transitions between local and international systems. Everything funneling to a single currency endpoint. "Convergence point established. Begin final sequence."*',
                            nextScene: 'transport'
                        },
                        'Multiple currencies': {
                            text: '*A masterful web of domestic and international transfers. Each currency conversion adding a layer of complexity. "Perfect chaos achieved. They\'ll never trace it."*',
                            nextScene: 'transport'
                        },
                        'Heavy crypto usage': {
                            text: '*Your systems bridging traditional and crypto markets worldwide. Each transaction a piece of a larger code. "The blockchain never forgets, but it can be made to lie."*',
                            nextScene: 'transport'
                        }
                    }
                };

                return [{
                    text: '*MEMORY RECONSTRUCTED*',
                    isNarration: true
                },
                {
                    isNarration: true,
                    text: memoryMap[geography][currency].text,
                    nextScene: memoryMap[geography][currency].nextScene,
                    transition: true
                }];
            }
        },
        transport: {
            background: 'city-streets.png',
            dialogue: [
                {
                    text: '*The memory fades as a private transport pod arrives, responding to some deeply embedded command in your neural signature.*',
                    isNarration: true
                },
                {
                    speaker: 'ARIA',
                    text: 'It\'s taking you home. Let\'s see what we find there.',
                    aria: 'aria.png'
                },
                {
                    text: '*The pod glides through the city, finally stopping at a building.*',
                    isNarration: true
                },
                {
                    speaker: 'ARIA',
                    text: 'This residence... what type of place feels right?',
                    choices: [
                        'High-security apartment complex',
                        'Suburban smart-house',
                        'Luxury penthouse'
                    ],
                    storeAs: 'residenceType',
                    nextScene: 'residence',
                    transition: true,
                    aria: 'aria.png',
                    background: 'black.png'
                }
            ]
        },
        residence: {
            background: function(choices) {
                switch (choices.residenceType) {
                    case 'High-security apartment complex':
                        return 'high-security.png';
                    case 'Suburban smart-house':
                        return 'smart-house.png';
                    case 'Luxury penthouse':
                        return 'penthouse.png';
                    default:
                        return 'apartment.png';
                }
            },
            dialogue: [
                {
                    text: '*As you enter, the space feels both familiar and wrong. Security systems scan you, accepting old credentials that you don\'t consciously remember.*',
                    isNarration: true
                },
                {
                    speaker: 'ARIA',
                    text: 'The systems recognize you, but there are some interesting access patterns. Tell me, did you share this space?',
                    choices: [
                        'Single',
                        'Married',
                        'Separated/Divorced'
                    ],
                    storeAs: 'relationshipStatus',
                    aria: 'aria.png'
                },
                {
                    text: '*You\'ve entered your home. It\'s a bit messy, but you remember it well.*',
                    isNarration: true
                },
                {
                    speaker: 'ARIA',
                    text: 'And here are your financial monitoring systems. How did you usually interact with them?',
                    choices: [
                        'Multiple apps/tools',
                        'Single app',
                        'Spreadsheet enthusiast',
                        'No tracking'
                    ],
                    storeAs: 'trackingStyle',
                    transition: true,
                    background: 'fin-monitor.png',
                    aria: 'aria.png'
                },
                {
                    speaker: 'ARIA',
                    text: 'And how often did you check these systems?',
                    choices: [
                        'Daily monitoring',
                        'Weekly review',
                        'Monthly check',
                        'Rarely check'
                    ],
                    storeAs: 'checkFrequency',
                    nextScene: 'finalMemory',
                    background: 'fin-monitor.png',
                    aria: 'aria.png'
                }
            ]
        },
        finalMemory: {
            background: 'dark-room.png',
            dialogue: [
                {
                    text: '*As you answer, the screens flicker. Neural monitors spike dramatically.*',
                    isNarration: true
                },
                {
                    text: '*You\'re sitting at this same terminal, 48 hours ago. Markets are crashing worldwide. Your screens show a massive pattern emerging - not in the prices, but in the data hidden within the transactions. *',
                    isNarration: true
                },
                {
                    text: 'Someone has buried code in the global financial network. Your fingers flew across neural interfaces, following the pattern. Then you saw it: Launch codes. Military protocols. Someone\'s using the entire banking system as a covert command network.',
                    isNarration: true
                },
                {
                    text: '*A message appeared: "Memory extraction complete. You know too much. Initiating neural wipe in 3...2..."*',
                    isNarration: true
                },
                {
                    text: '*You quickly typed one final command, transferring everything to a secure account. 50 million credits. But it\'s not about the money - it\'s about what\'s hidden in the transaction data...*',
                    isNarration: true
                },
                {
                    text: '*The memory cut off as all screens suddenly went dark. A message flashed in your neural interface:*',
                    isNarration: true
                },
                {
                    text: '"UNAUTHORIZED MEMORY RECOVERY DETECTED"\n"INITIATING EMERGENCY PROTOCOL"\n"IDENTITY CONFIRMATION REQUIRED"',
                    isNarration: true
                },
                {
                    speaker: '',
                    text: 'Someone\'s trying to access your neural link. They know you\'re awake.',
                    choices: [
                        'Accept Connection',
                        'Reject Connection',
                        'Trace Connection'
                    ],
                    storeAs: 'connectionChoice',
                    transition: true
                },
                {
                    text: `<div class="cyber-loading">
                        <div class="status">SYSTEM BREACH DETECTED</div>
                        <div class="progress"></div>
                        <div class="details">Analyzing neural patterns...</div>
                        <div class="details">Scanning memory fragments...</div>
                        <div class="details">Initiating emergency protocols...</div>
                        <div class="details">Establishing secure connection...</div>
                    </div>`,
                    isNarration: true
                },
                {
                    text: 'To be continued...',
                    isNarration: true
                },
                {
                    speaker: 'Enter your email to join the waitlist and continue the investigation',
                    text: '',
                    requiresInput: true,
                    storeAs: 'userEmail',
                }
            ]
        },
        ending: {
            background: 'black.png',
            dialogue: [
                {
                    text: `<div class="title-container">
                        <h1 class="game-title">NEURAL LINK SECURE</h1>
                        <p class="skip-hint">We will contact you when it's safe to proceed</p>
                    </div>`,
                    isNarration: true,
                    nextScene: null
                }
            ]
        }
    }
};
