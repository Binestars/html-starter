const gameData = {
    scenes: {
        intro: {
            dialogue: [
                {
                    text: '*Neural systems initializing...*',
                    isNarration: true,
                    nextScene: 'wakeUp',
                    isTimedSequence: true,
                    timerDuration: 150 // 3 minutes in seconds
                }
            ]
        },
        wakeUp: {
            background: 'dark-room.png',
            dialogue: [
                {
                    text: '*You open your eyes. A fox-faced AI appears on a holographic display.*',
                    isNarration: true
                },
                {
                    text: "Congratulations! You're not DEAD. Well, technically you WERE dead, but that's just a Tuesday around here. Welcome back to the land of the living, meat puppet!",
                    speaker: 'KOVI',
                },
                {
                    text: "I'm KOVI! GREAT NEWS, champ! Your wishlist application is COMPLETE! BUT WAIT...",
                    speaker: 'KOVI'
                },
                {
                    text: "OH NO, your money memories didn't survive the body swap! We gotta fix your brain to complete the application.",
                    speaker: 'KOVI'
                },
                {
                    text: '*KOVI notices you looking at the timer.*',
                    isNarration: true
                },
                {
                    text: "Oh, that countdown? It's just tracking how long until you DIE - like, permanently die - if we don't recover your financial memories. TICK TOCK!",
                    speaker: 'KOVI'
                },
                {
                    text: '*A neural map appears, showing a human brain with flashing red areas.*',
                    isNarration: true,
                    brain: true,
                    brainPhase: 1
                },
                {
                    text: "Look, it's simple - I ask questions, you answer honestly, we recover your financial identity, you don't die horribly. WIN-WIN! Let's roll this dice of destiny!",
                    speaker: 'KOVI'
                },
                {
                    text: "Lets start with basics.",
                    speaker: 'KOVI',
                },
                {
                    text: "What's your name, digital meat-puppet?",
                    speaker: 'KOVI',
                    requiresInput: true
                },
                {
                    text: '*A section of the brain map stabilizes.*',
                    isNarration: true,
                    brain: true,
                    brainPhase: 2
                },
                {
                    text: "Perfect! Your neurons just did a little happy dance. Now for the meaty stuff.",
                    speaker: 'KOVI',
                    brain: true,
                    brainPhase: 2
                },
                {
                    text: "What paid for your existence before everything went BONKERS?",
                    speaker: 'KOVI'
                },
                {
                    text: "Where did you work?",
                    choices: [
                        {
                            text: 'Corporate job',
                            response: "Corporate drone, huh? Your neurons have permanent keyboard imprints and tiny digital PTSD from all those Monday morning meetings."
                        },
                        {
                            text: 'Freelance',
                            response: "Freelancer! I would've guessed from the malnourished look of your neurons."
                        },
                        {
                            text: 'Business owner',
                            response: "A boss! Your neurons definitely have tiny ties and superiority complexes."
                        },
                        {
                            text: 'Not employed',
                            response: "Professionally mysterious. Your neurons are wearing sunglasses indoors and refuse to tell me what they actually do all day."
                        }
                    ],
                    storeAs: 'employment'
                },
                {
                    text: function(choices) {
                        const responses = {
                        };
                    },
                    speaker: 'KOVI'
                },
                {
                    text: '*KOVI checks the timer and winces dramatically.*',
                    isNarration: true
                },
                {
                    text: "Now your banking geography. Confined to one sad little country, or plotting global economic domination?",
                    speaker: 'KOVI'
                },
                {
                    text: "Bank accounts - domestic or international?",
                    choices: [
                        {
                            text: 'Domestic accounts only',
                            response: "Local banking? More like financial missionary position - boring, predictable, and less inspiring than a corporate team-building seminar."
                        },
                        {
                            text: 'International accounts too',
                            response: "Ooh, international player! Your neurons have tiny passports with embarrassing photos. Even in your brain, passport photos look terrible."
                        }
                    ],
                    storeAs: 'bankAccounts'
                },
                {
                    text: function(choices) {
                        const responses = {
                        };
                        return responses[choices.bankAccounts];
                    },
                    speaker: 'KOVI'
                },
                {
                    text: "Look, your financial memories are slowly reconstructing, piece by sad, broken piece.",
                    speaker: 'KOVI',
                    brain: true,
                    brainPhase: 4
                },
                {
                    text: "Anyway, investment patterns! Quick, before your eyeballs melt!",
                    speaker: 'KOVI'
                },
                {
                    text: "Investment preferences? Select all that apply:",
                    choices: [
                        {
                            text: 'Stocks',
                            isMultiChoice: true
                        },
                        {
                            text: 'ETFs',
                            isMultiChoice: true
                        },
                        {
                            text: 'Cryptocurrency',
                            isMultiChoice: true
                        },
                        {
                            text: 'Real estate',
                            isMultiChoice: true
                        },
                        {
                            text: 'No investments',
                            isExclusive: true
                        }
                    ],
                    storeAs: 'investments',
                    isMultiChoice: true,
                    doneButtonText: "That's all my investments"
                },
                {
                    text: function(choices) {
                        const investments = choices.investments || [];
                        if (investments.includes('No investments')) {
                            return "Zero investments: Where 'hope' is your primary financial strategy.";
                        }
                        
                        if (investments.length > 0) {
                            // Check for specific combinations
                            const hasStocks = investments.includes('Stocks');
                            const hasETFs = investments.includes('ETFs');
                            const hasCrypto = investments.includes('Cryptocurrency');
                            const hasRealEstate = investments.includes('Real estate');
                            
                            // Handle combinations
                            if (hasStocks && hasETFs && hasCrypto && hasRealEstate) {
                                return "Stocks, ETFs, crypto, AND real estate? Playing ALL sides of capitalism's fucked-up game, aren't we?";
                            }
                            
                            // Three-choice combinations
                            if (hasETFs && hasCrypto && hasRealEstate) {
                                return "The 'I want revolution but also retirement and rental income' combo. Your neurons are wearing both a cyberpunk jacket AND khakis, you magnificent confused bastard!";
                            }
                            
                            if (hasStocks && hasCrypto && hasRealEstate) {
                                return "The unholy trinity of 'I want it ALL'! Traditional markets, digital chaos, AND physical assets? Your neurons are greedier than a corp exec at a free buffet!";
                            }
                            
                            if (hasStocks && hasETFs && hasRealEstate) {
                                return "Ah, stocks, ETFs, real estate - a strategy so solid, it's almost like you know what you're doing. Almost.";
                            }
                            
                            if (hasStocks && hasETFs && hasCrypto) {
                                return "Stocks, ETFs, and crypto? Financial schizophrenia at its finest! Your neurons can't decide if they want to be a Wall Street suit, a retirement-planning dad, or a digital rebel. Why choose when you can have an IDENTITY CRISIS!";
                            }
                            
                            // Two-choice combinations
                            if (hasStocks && hasETFs) {
                                return "Stocks AND ETFs? Holy shit, how GROUNDBREAKING. Did you also invent breathing?";
                            }
                            
                            if (hasStocks && hasCrypto) {
                                return "Stocks and Crypto? Your neurons are screaming economic REBELLION! One hand strangling the stock market, the other breakdancing on the blockchain! ECONOMIC REVOLUTION, BABY!";
                            }
                            
                            if (hasETFs && hasCrypto) {
                                return "Index funds AND blockchain? Playing it safe while pretending to be edgy—like a suburban dad with a secret tattoo that says 'mild rebellion'!";
                            }
                            
                            if (hasRealEstate && hasCrypto) {
                                return "Property AND crypto? Your neurons are living in the 1800s AND 2077 simultaneously! Collecting rent while jacking into the blockchain — the timeline is fucking BROKEN!";
                            }
                            
                            if (hasStocks && hasRealEstate) {
                                return "Real estate AND stocks? Wow, playing financial Mad Libs with ONLY the most obvious answers. Fucking revolutionary!";
                            }
                            
                            if (hasETFs && hasRealEstate) {
                                return "ETFs AND Real Estate? The 'I read ONE finance book and now I'm Warren fucking Buffett' combo. Groundbreaking shit right here!";
                            }

                            // Single investment responses
                            if (investments.length === 1) {
                                const responses = {
                                    'Stocks': "STOCKS only? Christ, could you BE more mainstream? Your neurons are reading the Wall Street Journal while sipping overpriced coffee and pretending to understand capitalism!",
                                    'ETFs': "ETFs only? The 'I read exactly ONE finance book' strategy! Your neurons are the most boring fuckers at the investment party—sipping water and leaving by 9!",
                                    'Cryptocurrency': "Only digital currency? Traditional finance is too BORING for your brain cells—they need that digital dopamine rush!",
                                    'Real estate': "JUST real estate? Old school as fuck! Your neurons are wearing powdered wigs and collecting rent like it's 1822! Digital revolution? Never heard of her!."
                                };
                                return responses[investments[0]];
                            }
                        }
                        return "Your financial neurons are waking up!";
                    },
                    speaker: 'KOVI'
                },
                {
                    text: '*A statistical readout appears showing a death probability chart with wildly fluctuating numbers that KOVI quickly minimizes*',
                    isNarration: true,
                    brain: true,
                    brainPhase: 5
                },
                {
                    text: "Progress is fucking AMAZING! Only a 70% chance of catastrophic neural collapse now! Down from 95%! I'm basically a miracle worker!",
                    speaker: 'KOVI',
                    brain: true,
                    brainPhase: 5
                },
                {
                    text: '*KOVI glitches, revealing a moment of panic before returning to manic cheerfulness.*',
                    isNarration: true
                },
                {
                    text: "Oh wait! Nearly forgot something critical. Social interaction frequency!",
                    speaker: 'KOVI'
                },
                {
                    text: "Is this relevant to financial identity? No idea! The protocol says to ask it. Don't question me, I don't know why either!",
                    speaker: 'KOVI' 
                },
                {
                    text: "How often do you socialize with other humans?",
                    choices: [
                        {
                            text: 'Very often',
                            response: "A people JUNKIE! Your brain cells get separation anxiety if left alone for more than 20 minutes."
                        },
                        {
                            text: 'About once a week',
                            response: "Ohhhh, look who allocates specific days for human contact! Bet you schedule your bathroom breaks too, you magnificent control freak!"
                        },
                        {
                            text: 'Few times a month',
                            response: "Your neurons hold fucking AUDITIONS before deciding which humans deserve your limited social energy. Pretentious little assholes!"
                        },
                        {
                            text: 'Rarely',
                            response: "Fascinating. Your brain has adapted to isolation like a test subject in a forgotten chamber. Except less interesting."
                        }
                    ],
                    storeAs: 'socialFrequency'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Very often': "Social butterfly! Your neurons have tiny party hats permanently attached.",
                            'About once a week': "Balanced socializer! Your brain cells know moderation, how boring.",
                            'Few times a month': "Selective socializer! Your neurons are picky about their friends.",
                            'Rarely': "Lone wolf! Your brain cells are introverts who never answer their neural doorbells."
                        };
                        return responses[choices.socialFrequency];
                    },
                    speaker: 'KOVI'
                },
                {
                    text: "Now, financial tracking habits. How did you keep tabs on your precious credits?",
                    speaker: 'KOVI'
                },
                {
                    text: "Financial tracking style?",
                    choices: [
                        {
                            text: 'Multiple apps',
                            response: "Look at Captain Max-Tech over here! Your neurons are like kids with ADHD in a digital candy store. 'Ooh, this one has GRAPHS! This one goes PING!"
                        },
                        {
                            text: 'Single app',
                            response: "ONE app? Look at your neurons in their black turtlenecks hosting TED talks about 'digital simplicity' while secretly feeling superior to EVERYONE!"
                        },
                        {
                            text: 'Spreadsheet enthusiast',
                            response: "You built your own tracking system. How charmingly archaic. Your neurons have achieved peak boringness while thinking they're being clever."
                        },
                        {
                            text: 'No tracking',
                            response: "No tracking? Your brain's financial strategy is 'vibes-based accounting.' Money comes, money goes, who the FUCK knows where it went!"
                        }
                    ],
                    storeAs: 'trackingStyle'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Multiple apps': "App-aholic! Your neurons have tiny smartphone addictions.",
                            'Single app': "Minimalist! Your brain cells are wearing black turtlenecks and judging everyone.",
                            'Spreadsheet enthusiast': "Spreadsheet junkie! Your neurons arrange themselves in rows and columns for fun.",
                            'No tracking': "Financial free spirit! Your brain cells don't believe in calendars either, do they?"
                        };
                        return responses[choices.trackingStyle];
                    },
                    speaker: 'KOVI'
                },
                {
                    text: '*Even more neural pathways stabilize.*',
                    isNarration: true,
                    brain: true,
                    brainPhase: 6
                },
                {
                    text: "We're down to the wire! And I mean that literally - your neural wires are about to short-circuit!",
                    speaker: 'KOVI'
                },
                {
                    text: "Last question! How did you pay for stuff? This is crucial, like choosing-the-right-wire-to-cut-in-a-bomb crucial!",
                    speaker: 'KOVI'
                },
                {
                    text: "Payment methods?",
                    choices: [
                        {
                            text: 'Cash/debit',
                            response: "Cash carrier? What millennium is this? Your neurons are wearing tiny fanny packs and complaining about 'kids these days' while refusing to learn new technology!"
                        },
                        {
                            text: 'A card, maybe two',
                            response: "One or two cards? Your neurons have achieved the BARE MINIMUM of modern financial evolution!"
                        },
                        {
                            text: 'Multiple cards for max rewards',
                            response: "Ah, a rewards strategist. Your neurons are like extreme couponers but for credit card points! They get dopamine hits from free airline miles that you'll NEVER ACTUALLY USE!"
                        }
                    ],
                    storeAs: 'paymentMethod'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Cash/debit': "Old school! Your neurons have tiny wallets with pictures of other neurons in them.",
                            'A card, maybe two': "Modest plastic user! Your neurons enjoy occasional swipe therapy.",
                            'Multiple cards': "Rewards optimizer! Your brain contains a tiny accountant who never sleeps."
                        };
                        return responses[choices.paymentMethod];
                    },
                    speaker: 'KOVI'
                },
                {
                    text: '*The neural network erupts with blue energy as the countdown timer freezes.*',
                    isNarration: true,
                    stopTimer: true,
                    brain: true,
                    brainPhase: 7
                },
                {
                    text: "HOLY SHIT, WE DID IT! Your brain's on board with keeping you alive - a goddamn miracle if you ask me! Now about that wishlist you were dying for - literally. Need your email to seal the deal.",
                    speaker: 'KOVI',
                    voice: 'voice/1.mp3'
                },
                {
                    text: "Enter your email to join the waitlist",
                    requiresInput: true,
                    storeAs: 'userEmail'
                },
                {
                    text: "Email verified! Hey, fun fact - I wasn't actually talking before. Your dying consciousness was translating repair protocols into this 'KOVI' entity while your brain rebuilt itself. NOW we're having our first real conversation!",
                    speaker: 'KOVI',
                    voice: 'voice/2.mp3'
                },
                {
                    text: "Anyway, congratulations on not dying today! Set yourself a calendar reminder for next time - dying is such an inconvenience, especially for my schedule.",
                    speaker: 'KOVI',
                    voice: 'voice/3.mp3'
                },
                {
                    text: '*KOVI winks before the screen fades to black.*',
                    isNarration: true,
                    nextScene: null
                }
            ]
        }
    }
};
