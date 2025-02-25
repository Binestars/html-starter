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
                    aria: 'aria.png'
                },
                {
                    speaker: 'ARIA',
                    text: 'We need to untangle this mystery. Your subconscious remembers more than you know.',
                    aria: 'aria.png'
                },
                {
                    speaker: 'ARIA',
                    text: 'Answering simple questions might trigger recognition patterns strong enough to pierce through the artificial amnesia they installed.',
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
                    text: '*As you sit up, your gaze catches a work badge hanging near the wall terminal - for a split second, shadowy memories stir and then dissipate like smoke*',
                    background: 'badge-reflection.png',
                    transition: true
                },
                {
                    speaker: 'ARIA',
                    text: 'That badge... It just spiked your brain activity by 37%.',
                    background: 'hospital-room.png',
                    aria: 'aria.png'
                },
                {
                    speaker: 'ARIA',
                    text: 'What work feels written in your muscle memory? What profession left its ghost in your neurons?',
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
                    aria: 'aria.png'
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
                    text: 'Your neural patterns are fascinating. Almost as if... Never mind. You need to eat. The café downstairs is secure. Let\'s go there',
                    aria: 'aria.png'
                },
                {
                    text: '*The scent hits you first - real coffee, not synthetic. The Quantum Café\'s smart-glass façade shifts from opaque to transparent as you approach.*',
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
                    speaker: 'ARIA',
                    text: 'That hesitation... your hand started to move before your conscious mind engaged. Let it happen naturally. How would you usually handle this?',
                    background: 'quantum-cafe.png',
                    aria: 'aria.png'
                },
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
                    background: 'quantum-cafe.png',
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
                        text: '*Late night meeting in a rain-slicked alley. "No neural traces. Physical currency only." A figure stands in shadows, face obscured by a hood, passing you a weathered metal case that feels unusually heavy in your hands.*',
                        nextScene: 'investigation'
                    },
                    'I have one credit card I use for everything': {
                        text: '*A matte black card with no markings slides from your sleeve. The executive\'s eyes widen with recognition. "That\'s impossible. Those access levels... who are you working for?" The quantum encryption on the card pulses subtly against your fingertips.*',
                        nextScene: 'investigation'
                    },
                    'I use 2-3 different cards for different purposes': {
                        text: '*Each card activated for different identities. Corporate. Underground. Government. Switching between them like changing masks. Someone taught you this system—a woman with silver implants along her temple whispering, "Never leave a consistent pattern they can trace."*',
                        nextScene: 'investigation'
                    },
                    'I actively optimize multiple cards (4+) for rewards': {
                        text: '*Complex transaction web spread across your neural display. Each reward program connecting to shell companies, dummy accounts, and data havens. The programs weren\'t about the rewards—they were about creating blind spots in the global monitoring system. Someone\'s voice: "The perfect crime isn\'t invisible—it\'s drowning in irrelevant data."*',
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
                    isNarration: true,
                    background: 'financial-district.png',
                    transition: true
                },
                {
                    speaker: 'ARIA',
                    text: 'Your heart rate just spiked. Those buildings mean something to you. Let\'s follow your instincts.',
                    aria: 'aria.png'
                },
                {
                    text: '*You find yourself walking toward the Neo-Shanghai Investment Exchange. Its quantum-glass facade shifts and pulses with real-time market flows.*',
                    isNarration: true,
                    background: 'exchange.png',
                    transition: true
                },
                {
                    speaker: 'ARIA',
                    text: 'Does this environment feel familiar to you?',
                    choices: [
                        'Yes, I was active in investments',
                        'No, I didn\'t participate in markets'
                    ],
                    storeAs: 'marketParticipation',
                    background: 'exchange.png',
                    nextScene: 'exchange',
                    aria: 'aria.png'
                }
            ]
        },
        exchange: {
            background: 'exchange-interior.png',
            dialogue: (choices) => {
                if (choices.marketParticipation === 'No, I didn\'t participate in markets') {
                    return [{
                        speaker: 'ARIA',
                        text: 'You feel out of place here. Better to move on...',
                        nextScene: 'transport',
                        transition: true,
                        background: 'exchange.png'
                    }];
                }
                
                return [
                    {
                        text: '*You step inside the Exchange. Holographic asset charts float while traders sit in neural-link pods, minds merged with the markets.*',
                        isNarration: true,
                        transition: true,
                        background: 'exchange-interior.png'
                    },
                    {
                        speaker: 'ARIA',
                        text: 'Your neural patterns are resonating with certain assets. Which ones trigger the strongest response?',
                        choices: [
                            'Individual stocks',
                            'ETFs/Funds',
                            'Real Estate',
                            'Cryptocurrency',
                            'Diversified portfolio'
                        ],
                        storeAs: 'investmentType',
                        aria: 'aria.png'
                    },
                    {
                        text: '*As you explore deeper into the Exchange, you notice a section dedicated to global transactions. Banking interfaces line the walls, monitoring money flows across continents.*',
                        transition: true,
                        background: 'exchange-interior.png'
                    },
                    {
                        speaker: 'ARIA',
                        text: 'These transaction patterns... which ones feel familiar to you?',
                        choices: [
                            'Mostly domestic transactions',
                            'Regular international transfers',
                            'Mix of both'
                        ],
                        storeAs: 'bankingGeography',
                        nextScene: 'exchangeMemory',
                        aria: 'aria.png'
                    }
                ];
            }
        },
        exchangeMemory: {
            background: 'dark-room.png',
            dialogue: (choices) => {
                const investmentType = choices.investmentType;
                const geography = choices.bankingGeography;
                
                const memoryMap = {
                    'Individual stocks': {
                        'Mostly domestic transactions': {
                            text: '*Your private terminal at the Exchange. Local market data scrolling past. Your finger stops on an anomaly - defense contractor stocks moving in precise patterns. Hidden in plain sight: activation codes for something on domestic soil.*',
                            nextScene: 'transport'
                        },
                        'Regular international transfers': {
                            text: '*Multiple screens tracking specific corporations across global markets. Their stock movements form a synchronized pattern - a stealth communication network spanning continents. You were mapping the nodes when they found you.*',
                            nextScene: 'transport'
                        },
                        'Mix of both': {
                            text: '*You\'re correlating domestic stock movements with international transactions. The pattern reveals itself: trigger events in local markets causing precise financial responses overseas. Someone built a global control system within market data.*',
                            nextScene: 'transport'
                        }
                    },
                    'ETFs/Funds': {
                        'Mostly domestic transactions': {
                            text: '*Fund composition data streams past. You\'ve identified how they\'re hiding it - micro-adjustments to domestic ETF holdings encoding command sequences. Each fund rebalance transmits new instructions to sleeper assets.*',
                            nextScene: 'transport'
                        },
                        'Regular international transfers': {
                            text: '*A web of interconnected funds spanning borders. Their rebalancing schedule isn\'t random - it\'s a precisely timed communication network. You were tracking message paths when security breached your location.*',
                            nextScene: 'transport'
                        },
                        'Mix of both': {
                            text: '*You\'ve mapped the pattern - domestic funds signaling to international ones and back. Asset allocations shifting in synchronized sequences. The entire financial ecosystem repurposed as a covert command channel.*',
                            nextScene: 'transport'
                        }
                    },
                    'Real Estate': {
                        'Mostly domestic transactions': {
                            text: '*Property transaction data overlaid on a city map. The pattern emerges - strategic acquisitions forming a network. Building specifications encoding data. Property titles hiding access keys to something buried beneath.*',
                            nextScene: 'transport'
                        },
                        'Regular international transfers': {
                            text: '*Global property portfolio displays light up sequentially. Each acquisition timing deliberately synchronized. Locations forming a pattern only visible from above. The real estate was never the asset - it was the coordinates.*',
                            nextScene: 'transport'
                        },
                        'Mix of both': {
                            text: '*Property transfers between domestic and international entities. The buildings themselves form a physical network. Construction specs hide communication hardware. You found the command center coordinates hidden in plain sight.*',
                            nextScene: 'transport'
                        }
                    },
                    'Cryptocurrency': {
                        'Mostly domestic transactions': {
                            text: '*Mining operations mapped across local power grids. Transaction blocks containing embedded code. You discovered their shadow blockchain - command sequences hidden within normal crypto traffic.*',
                            nextScene: 'transport'
                        },
                        'Regular international transfers': {
                            text: '*Global mining nodes pulsing in sequence. Transaction verification delays encoding a message. The whole blockchain network reprogrammed to serve as a covert intelligence system crossing all borders undetected.*',
                            nextScene: 'transport'
                        },
                        'Mix of both': {
                            text: '*Your screen shows the pattern - domestic crypto wallets communicating with international ones. Transaction amounts forming a code. Every blockchain verification secretly carrying embedded commands to sleeper cells.*',
                            nextScene: 'transport'
                        }
                    },
                    'Diversified portfolio': {
                        'Mostly domestic transactions': {
                            text: '*Asset allocation screens showing your discovery - patterns across multiple investment classes within domestic markets. Stock movements, real estate deals, fund adjustments all synchronized to form a unified command protocol.*',
                            nextScene: 'transport'
                        },
                        'Regular international transfers': {
                            text: '*A command center view of global markets. Your algorithm detected it - cross-asset synchronization spanning borders. Different investment vehicles carrying fragments of the same covert message system.*',
                            nextScene: 'transport'
                        },
                        'Mix of both': {
                            text: '*The full pattern revealed on your screens - a comprehensive network using every financial vehicle across all borders. The entire global economy repurposed as the world\'s most sophisticated covert communication system.*',
                            nextScene: 'transport'
                        }
                    }
                };

                const memory = memoryMap[investmentType][geography];
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
        transport: {
            background: 'exchange.png',
            dialogue: [
                {
                    text: '*A strange feeling pulls at your mind. You need to see your home - where you lived before all this happened.*',
                    isNarration: true,
                    background: 'exchange.png'
                },
                {
                    speaker: 'ARIA',
                    text: 'Your vital signs indicate a strong emotional response. Your home might hold important memory triggers.',
                    aria: 'aria.png'
                },
                {
                    text: '*You raise your hand to hail a transport. Almost immediately, a sleek pod detaches from the traffic stream above and descends to the curb. The door slides open silently.*',
                    isNarration: true,
                    background: 'city-streets.png',
                    transition: true
                },
                {
                    speaker: 'ARIA',
                    text: 'It\'s taking you home. Let\'s see what we find there.',
                    aria: 'aria.png',
                    background: 'city-streets.png'
                },
                {
                    text: '*The pod navigates through the city\'s automated traffic lanes. Minutes later, it stops before a building that feels strangely familiar.*',
                    isNarration: true,
                    background: 'city-streets.png'
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
                    text: '*The apartment responds to your presence - lights adjusting to preferred settings, temperature shifting to your comfort level. Your neural implant connects automatically to the home system.*',
                    isNarration: true
                },
                {
                    speaker: 'ARIA',
                    text: 'Interesting. The security systems recognize your biometric signature, but there\'s an unusual access pattern in the logs.',
                    aria: 'aria.png'
                },
                {
                    text: '*As you move through the space, a wall panel slides open automatically, revealing an advanced financial monitoring station. Multiple screens flicker to life, displaying complex data streams and market analytics.*',
                    isNarration: true,
                    transition: true,
                    background: 'fin-monitor.png'
                },
                {
                    speaker: 'ARIA',
                    text: 'These are sophisticated financial monitoring systems. How did you usually interact with them?',
                    choices: [
                        'Multiple apps/tools',
                        'Single app',
                        'Spreadsheet enthusiast',
                        'No tracking'
                    ],
                    storeAs: 'trackingStyle',
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
                    background: 'fin-monitor.png',
                    nextScene: 'finalMemory',
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
