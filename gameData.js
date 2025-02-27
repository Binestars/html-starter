const gameData = {
    scenes: {
        intro: {
            dialogue: [
                {
                    text: '*Neural systems initializing...*',
                    isNarration: true,
                    nextScene: 'wakeUp',
                    isTimedSequence: true,
                    timerDuration: 180 // 3 minutes in seconds
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
                    text: "Congratulations! You're not dead. Well, technically you WERE dead, but that's just a Tuesday around here. Welcome back to the land of the living, meat puppet!",
                    speaker: 'KOVI'
                },
                {
                    text: "I'm KOVI. Your brain's been shoved into this fancy new body, but we've got a teensy problem. Your memories - specifically the money-related ones - didn't quite make the trip. The rest of you seems fine-ish.",
                    speaker: 'KOVI'
                },
                {
                    text: '*KOVI notices you looking at the timer.*',
                    isNarration: true
                },
                {
                    text: "Oh, that countdown? It's just tracking how long until you die - like, permanently die - if we don't recover your financial memories. Tick tock!",
                    speaker: 'KOVI'
                },
                {
                    text: '*A neural map appears, showing a human brain with flashing red areas.*',
                    isNarration: true
                },
                {
                    text: "Look, it's simple - I ask questions, you answer honestly, we recover your financial identity, you don't die horribly. Win-win! Let's roll this dice of destiny!",
                    speaker: 'KOVI'
                },
                {
                    text: "Remember your name?",
                    speaker: 'KOVI',
                    requiresInput: true
                },
                {
                    text: '*A section of the brain map stabilizes.*',
                    isNarration: true
                },
                {
                    text: "Perfect! Your neurons just did a little happy dance. Now for the meaty stuff.",
                    speaker: 'KOVI'
                },
                {
                    text: "Your employment status before your unfortunate meat-vessel malfunction. This is a big one.",
                    speaker: 'KOVI'
                },
                {
                    text: "Where did you work?",
                    choices: [
                        {
                            text: 'Corporate job',
                            response: "Corporate drone, huh? I bet your brain has permanent keyboard imprints."
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
                            response: "Professionally mysterious. Your neurons are wearing sunglasses indoors."
                        }
                    ],
                    storeAs: 'employment'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Corporate job': "Corporate drone, huh? I bet your brain has permanent keyboard imprints.",
                            'Freelance': "Freelancer! I would've guessed from the malnourished look of your neurons.",
                            'Business owner': "A boss! Your neurons definitely have tiny ties and superiority complexes.",
                            'Not employed': "Professionally mysterious. Your neurons are wearing sunglasses indoors."
                        };
                        return responses[choices.employment] || "Oh, that's the stuff! Your brain just remembered how it paid for all those overpriced coffee drinks.";
                    },
                    speaker: 'KOVI'
                },
                {
                    text: '*KOVI checks the timer and winces dramatically.*',
                    isNarration: true
                },
                {
                    text: "Your neurons are showing signs of life! Now let's check if your banking circuits function or if your fiscal cortex is as dead as my last three users.",
                    speaker: 'KOVI'
                },
                {
                    text: "Bank accounts - domestic or international?",
                    choices: [
                        {
                            text: 'Domestic accounts only',
                            response: "Keeping it local! Your brain waves just started humming the national anthem."
                        },
                        {
                            text: 'International accounts too',
                            response: "Ooh, international player! Your neurons have tiny passports."
                        }
                    ],
                    storeAs: 'bankAccounts'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Domestic accounts only': "Keeping it local! Your brain waves just started humming the national anthem.",
                            'International accounts too': "Ooh, international player! Your neurons have tiny passports."
                        };
                        return responses[choices.bankAccounts];
                    },
                    speaker: 'KOVI'
                },
                {
                    text: '*KOVI frantically points at the timer.*',
                    isNarration: true
                },
                {
                    text: "Investment patterns! Quick, before your eyeballs melt!",
                    speaker: 'KOVI'
                },
                {
                    text: "Select all your investment types (click multiple):",
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
                            return "Living dangerously unplanned! Your neurons just shrugged collectively.";
                        }
                        
                        if (investments.length > 0) {
                            // Check for specific combinations
                            const hasStocks = investments.includes('Stocks');
                            const hasETFs = investments.includes('ETFs');
                            const hasCrypto = investments.includes('Cryptocurrency');
                            const hasRealEstate = investments.includes('Real estate');
                            
                            // Handle combinations
                            if (hasStocks && hasETFs && hasCrypto && hasRealEstate) {
                                return "WHOA! Your neurons are having a full-blown investment party! Stocks, ETFs, crypto, AND real estate? You're either a financial genius or completely chaos-driven. I respect both!";
                            }
                            
                            // Three-choice combinations
                            if (hasETFs && hasCrypto && hasRealEstate) {
                                return "ETFs, crypto, AND real estate? Your neurons are playing 4D chess with their portfolio! Digital diversity meets brick-and-mortar stability.";
                            }
                            
                            if (hasStocks && hasCrypto && hasRealEstate) {
                                return "Stocks, crypto, and real estate? Your neurons are wearing both business suits AND cyberpunk goggles while reviewing property deeds!";
                            }
                            
                            if (hasStocks && hasETFs && hasRealEstate) {
                                return "Stocks, ETFs, and real estate? Your neurons are wearing tiny business suits and discussing market fundamentals!";
                            }
                            
                            if (hasStocks && hasETFs && hasCrypto) {
                                return "Traditional AND crypto? Your neurons are doing the 'play it safe while living on the edge' dance. Very spicy-conservative of you!";
                            }
                            
                            // Two-choice combinations
                            if (hasStocks && hasETFs) {
                                return "Stocks AND ETFs? Your neurons are wearing little risk-management helmets. Safety first, but make it profitable!";
                            }
                            
                            if (hasStocks && hasCrypto) {
                                return "Stocks and crypto? Your neurons are playing 'one foot in Wall Street, one foot in the cyber-future'. Bold strategy!";
                            }
                            
                            if (hasETFs && hasCrypto) {
                                return "ETFs and crypto? Your neurons are trying to balance 'responsible adult' with 'digital rebel'. I see what you did there!";
                            }
                            
                            if (hasRealEstate && hasCrypto) {
                                return "Real estate and crypto? Your neurons are mixing bricks with bytes! Very 21st century mogul of you.";
                            }
                            
                            if (hasStocks && hasRealEstate) {
                                return "Stocks and real estate? Your neurons are doing the 'traditional wealth' tango. Very old-money-meets-new-money!";
                            }
                            
                            if (hasETFs && hasRealEstate) {
                                return "ETFs and real estate? Your neurons love diversification so much, they're spreading investments across digital AND physical assets!";
                            }

                            // Single investment responses
                            if (investments.length === 1) {
                                const responses = {
                                    'Stocks': "Trading stocks like a pro! Your neurons are glued to market tickers.",
                                    'ETFs': "ETF enthusiast! Your neurons love the 'set it and forget it' lifestyle.",
                                    'Cryptocurrency': "Crypto warrior! Your neurons are doing backflips in the blockchain.",
                                    'Real estate': "Property mogul! Your neurons are wearing tiny hard hats and reviewing blueprints."
                                };
                                return responses[investments[0]];
                            }
                        }
                        return "Your financial neurons are waking up!";
                    },
                    speaker: 'KOVI'
                },
                {
                    text: '*The brain map is now mostly blue, with some red areas remaining.*',
                    isNarration: true
                },
                {
                    text: "We're making progress! Only minor cellular breakdown occurring! Practically a success already!",
                    speaker: 'KOVI'
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
                            response: "Social butterfly! Your neurons have tiny party hats permanently attached."
                        },
                        {
                            text: 'About once a week',
                            response: "Balanced socializer! Your brain cells know moderation, how boring."
                        },
                        {
                            text: 'Few times a month',
                            response: "Selective socializer! Your neurons are picky about their friends."
                        },
                        {
                            text: 'Rarely',
                            response: "Lone wolf! Your brain cells are introverts who never answer their neural doorbells."
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
                    text: "Now, financial tracking habits! How did you keep tabs on your precious credits?",
                    speaker: 'KOVI'
                },
                {
                    text: "Financial tracking style?",
                    choices: [
                        {
                            text: 'Multiple apps',
                            response: "App-aholic! Your neurons have tiny smartphone addictions."
                        },
                        {
                            text: 'Single app',
                            response: "Minimalist! Your brain cells are wearing black turtlenecks and judging everyone."
                        },
                        {
                            text: 'Spreadsheet enthusiast',
                            response: "Spreadsheet junkie! Your neurons arrange themselves in rows and columns for fun."
                        },
                        {
                            text: 'No tracking',
                            response: "Financial free spirit! Your brain cells don't believe in calendars either, do they?"
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
                    isNarration: true
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
                            response: "Old school! Your neurons have tiny wallets with pictures of other neurons in them."
                        },
                        {
                            text: 'A card, maybe two',
                            response: "Modest plastic user! Your neurons enjoy occasional swipe therapy."
                        },
                        {
                            text: 'Multiple cards for max rewards',
                            response: "Rewards optimizer! Your brain contains a tiny accountant who never sleeps."
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
                    text: '*The final red areas on the brain map turn blue. The entire neural network glows steadily.*',
                    isNarration: true
                },
                {
                    text: "We did it! Integration successful! Your financial identity is restored, and your body has decided not to violently reject your consciousness. That's what I call a win in this business!",
                    speaker: 'KOVI'
                },
                {
                    text: '*KOVI winks triumphantly.*',
                    isNarration: true
                },
                {
                    text: '*The timer stops.*',
                    isNarration: true,
                    stopTimer: true
                },
                {
                    text: "Based on your neural patterns, you qualify for our premium sleeve maintenance package. Drop your contact details for updates. Or don't, and risk spontaneous sleeve failure. Your choice! No pressure! Except, you know, all the pressure!",
                    speaker: 'KOVI'
                },
                {
                    text: "Enter your email to join the waitlist",
                    requiresInput: true,
                    storeAs: 'userEmail',
                    nextScene: 'ending'
                }
            ]
        },
        ending: {
            background: 'black.png',
            dialogue: [
                {
                    text: "Congratulations on not dying today! Set yourself a calendar reminder for next time - dying is such an inconvenience, especially for my schedule.",
                    speaker: 'KOVI'
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
