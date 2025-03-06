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
            background: 'black.jpg',
            dialogue: [
                {
                    text: '*You open your eyes. A strange robot appears in front of you.*',
                    isNarration: true
                },
                {
                    text: "Congratulations! You're not DEAD. Well, technically you WERE dead, but that's just a Tuesday around here. Welcome back to the land of the living, meat puppet!",
                    speaker: 'KOVI',
                    background: 'sterile.png',
                    transition: true
                },
                {
                    text: "I'm KOVI! I've got GREAT NEWS! Your spot in our elite money management beta is CONFIRMED! BUT WAIT...",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "OH NO, your money memories didn't survive the body swap! We gotta fix your brain to complete the application.",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "The countdown? It's just tracking how long until you DIE - like, permanently die - if we don't recover your financial memories. TICK TOCK!",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Look, it's simple - I ask questions, you answer honestly, we recover your financial identity, you don't die horribly. WIN-WIN!",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Lets start with basics.",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "What's your name, digital meat-puppet?",
                    speaker: 'KOVI',
                    requiresInput: true,
                    background: 'sterile.png'
                },
                {
                    text: "Perfect! Your neurons just did a little happy dance. Now for the meaty stuff.",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "What paid for your existence before everything went BONKERS?",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Where did you work?",
                    background: 'sterile.png',
                    choices: [
                        {
                            text: 'Corporate job',
                            response: "Corporate drone, huh? Your neurons have permanent keyboard imprints and tiny digital PTSD from all those Monday morning meetings.",
                            nextBackground: 'office.png',
                            transition: true
                        },
                        {
                            text: 'Freelance',
                            response: "Freelancer! I would've guessed from the malnourished look of your neurons.",
                            nextBackground: 'freelancer.png',
                            transition: true
                        },
                        {
                            text: 'Business owner',
                            response: "A boss! Your neurons definitely have tiny ties and superiority complexes.",
                            nextBackground: 'boss.png',
                            transition: true
                        },
                        {
                            text: 'Not employed',
                            response: "Professionally mysterious. Your neurons are wearing sunglasses indoors and refuse to tell me what they actually do all day.",
                            nextBackground: 'broke.png',
                            transition: true
                        }
                    ],
                    storeAs: 'employment'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Corporate job': {
                                text: "Corporate drone, huh? Your neurons have permanent keyboard imprints and tiny digital PTSD from all those Monday morning meetings.",
                                background: 'office.png'
                            },
                            'Freelance': {
                                text: "Freelancer! I would've guessed from the malnourished look of your neurons.",
                                background: 'freelancer.png'
                            },
                            'Business owner': {
                                text: "A boss! Your neurons definitely have tiny ties and superiority complexes.",
                                background: 'boss.png'
                            },
                            'Not employed': {
                                text: "Professionally mysterious. Your neurons are wearing sunglasses indoors and refuse to tell me what they actually do all day.",
                                background: 'broke.png'
                            }
                        };
                        const response = responses[choices.employment];
                        return response.text;
                    },
                    speaker: 'KOVI',
                    background: function(choices) {
                        const backgrounds = {
                            'Corporate job': 'office.png',
                            'Freelance': 'freelancer.png',
                            'Business owner': 'boss.png',
                            'Not employed': 'broke.png'
                        };
                        return backgrounds[choices.employment];
                    },
                    transition: true
                },
                {
                    text: "Look, it's awkward, but your brain needs to know whether you're sharing your life with another meat puppet or operating as a standalone unit.",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Don't give me that look - it's in the protocol!",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Relationship status?",
                    background: 'sterile.png',
                    choices: [
                        {
                            text: 'Single',
                            response: "One-person financial shitshow! Making money decisions with ZERO relationship oversight - both terrifying and liberating!"
                        },
                        {
                            text: 'Not single',
                            response: "Two meat puppets, one financial equation! Now we need to know if your money mingles as much as your bodies do. TOO PERSONAL? Blame your dying brain!"
                        }
                    ],
                    storeAs: 'relationshipStatus'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Single': "One-person financial shitshow! Making money decisions with ZERO relationship oversight - both terrifying and liberating!",
                            'Not single': "Two meat puppets, one financial equation! Now we need to know if your money mingles as much as your bodies do. TOO PERSONAL? Blame your dying brain!"
                        };
                        return responses[choices.relationshipStatus];
                    },
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Money sharing status:",
                    background: 'sterile.png',
                    condition: function(choices) {
                        return choices.relationshipStatus === 'Not single';
                    },
                    choices: [
                        {
                            text: 'Fully merged finances',
                            response: "Financial soulmates! What's mine is yours until the inevitable argument about unnecessary purchases!"
                        },
                        {
                            text: 'Some shared, some separate',
                            response: "Half committed! Sharing some expenses while maintaining your RIGHT to blow money on stupid shit without permission!"
                        },
                        {
                            text: 'Completely separate',
                            response: "FINANCIAL BORDER WALL! You share bodily fluids but GOD FORBID you share a bank account! Priorities STRAIGHT!"
                        }
                    ],
                    storeAs: 'financialArrangement'
                },
                {
                    text: function(choices) {
                        if (choices.relationshipStatus !== 'Not single') return null;
                        const responses = {
                            'Fully merged accounts': "Financial soulmates! What's mine is yours until the inevitable argument about unnecessary purchases!",
                            'Some shared, some separate': "Half committed! Sharing some expenses while maintaining your RIGHT to blow money on stupid shit without permission!",
                            'Completely separate': "FINANCIAL BORDER WALL! You share bodily fluids but GOD FORBID you share a bank account! Priorities STRAIGHT!"
                        };
                        return responses[choices.financialArrangement];
                    },
                    speaker: 'KOVI',
                    background: 'sterile.png',
                    condition: function(choices) {
                        return choices.relationshipStatus === 'Not single';
                    }
                },
                {
                    text: "Now your banking geography. Confined to one sad little country, or plotting global economic domination?",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Bank accounts - domestic or international?",
                    background: 'sterile.png',
                    choices: [
                        {
                            text: 'Domestic accounts only',
                            response: "LOCAL ACCOUNTS ONLY?! Fine, but we need to know if YOUR ASS ever leaves the country while your money stays home!",
                            nextBackground: '1.png'
                        },
                        {
                            text: 'International accounts too',
                            response: "Ooh, international player! Your neurons have tiny passports with embarrassing photos. Even in your brain, passport photos look terrible.",
                            nextBackground: '2.png'
                        }
                    ],
                    storeAs: 'bankAccounts'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Domestic accounts only': {
                                text: "LOCAL ACCOUNTS ONLY?! Fine, but we need to know if YOUR ASS ever leaves the country while your money stays home!",
                                background: '1.png'
                            },
                            'International accounts too': {
                                text: "Ooh, international player! Your neurons have tiny passports with embarrassing photos. Even in your brain, passport photos look terrible.",
                                background: '2.png'
                            }
                        };
                        return responses[choices.bankAccounts].text;
                    },
                    speaker: 'KOVI',
                    background: function(choices) {
                        const backgrounds = {
                            'Domestic accounts only': '1.png',
                            'International accounts too': '2.png'
                        };
                        return backgrounds[choices.bankAccounts];
                    }
                },
                {
                    text: "Travel frequency?",
                    background: '1.png',
                    condition: function(choices) {
                        return choices.bankAccounts === 'Domestic accounts only';
                    },
                    choices: [
                        {
                            text: 'Homebody',
                            response: "Your body is allergic to foreign SOIL! Your idea of international travel is ordering ETHNIC TAKEOUT from across town!"
                        },
                        {
                            text: 'Annual trips',
                            response: "Once-a-year TOURIST! You spend 51 weeks planning and 1 week complaining that it's not like the brochure promised!"
                        },
                        {
                            text: 'Frequent traveler',
                            response: "TRAVEL ADDICT! You have jet lag so frequently your body no longer knows what fucking TIME ZONE it belongs in!"
                        }
                    ],
                    storeAs: 'travelFrequency'
                },
                {
                    text: function(choices) {
                        if (choices.bankAccounts !== 'Domestic accounts only') return null;
                        const responses = {
                            'Homebody': "Your body is allergic to foreign SOIL! Your idea of international travel is ordering ETHNIC TAKEOUT from across town!",
                            'Annual trips': "Once-a-year TOURIST! You spend 51 weeks planning and 1 week complaining that it's not like the brochure promised!",
                            'Frequent traveler': "TRAVEL ADDICT! You have jet lag so frequently your body no longer knows what fucking TIME ZONE it belongs in!"
                        };
                        return responses[choices.travelFrequency];
                    },
                    speaker: 'KOVI',
                    background: '1.png',
                    condition: function(choices) {
                        return choices.bankAccounts === 'Domestic accounts only';
                    }
                },
                {
                    text: "Look, your financial memories are slowly reconstructing, piece by sad, broken piece.",
                    speaker: 'KOVI'
                },
                {
                    text: "Time to scan your financial gambling habits! I mean... 'investment strategies'!",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Does your brain actively CHOOSE where to throw money, or just let those sad retirement accounts sit there?",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Investment style?",
                    background: 'sterile.png',
                    choices: [
                        {
                            text: 'Just retirement accounts',
                            response: "Boring as SHIT! Your brain left its financial future to COMPLETE STRANGERS!"
                        },
                        {
                            text: 'Casual investor',
                            response: "Occasional GAMBLER! Your neurons think they're clever for doing the BARE MINIMUM!"
                        },
                        {
                            text: 'Active day-trading',
                            response: "Trade-aholic! Your brain would SELL ITS OWN CELLS for one more market dopamine hit!"
                        }
                    ],
                    storeAs: 'investmentStyle'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Just retirement accounts': "Boring as SHIT! Your brain left its financial future to COMPLETE STRANGERS!",
                            'Casual investor': "Occasional GAMBLER! Your neurons think they're clever for doing the BARE MINIMUM!",
                            'Active day-trading': "Trade-aholic! Your brain would SELL ITS OWN CELLS for one more market dopamine hit!"
                        };
                        return responses[choices.investmentStyle];
                    },
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Progress is AMAZING! Only a 70% chance of catastrophic neural collapse now! Down from 95%! I'm basically a miracle worker!",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "DAMMIT! Your brain's getting all pissy about skipping the friendship scan. Fine, FINE!",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "How frequently do you waste time with your so-called 'friends'?",
                    speaker: 'KOVI',
                    background: 'social.png'
                },
                {
                    text: "Friends?",
                    background: 'social.png',
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
                    speaker: 'KOVI',
                    background: 'social.png'
                },
                {
                    text: "Now, financial tracking habits. How did you keep tabs on your precious credits?",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Financial tracking style?",
                    background: 'sterile.png',
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
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "We're down to the wire! And I mean that literally - your neural wires are about to short-circuit!",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Last question! You're at a fancy restaurant with friends. The bill arrives. What's your FIRST instinct to pay with?",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Payment methods?",
                    background: 'sterile.png',
                    choices: [
                        {
                            text: 'Cash or debit - credit cards are evil',
                            response: "Cash carrier? What millennium is this? Your neurons are wearing tiny fanny packs and complaining about 'kids these days' while refusing to learn new technology!"
                        },
                        {
                            text: 'Basic credit card - need it for my damn credit score',
                            response: "One or two cards? Your neurons have achieved the BARE MINIMUM of modern financial evolution!"
                        },
                        {
                            text: 'My special dining credit card – maximum rewards on restaurants',
                            response: "Ah, a rewards strategist. Your neurons are like extreme couponers but for credit card points! They get dopamine hits from free airline miles that you'll NEVER ACTUALLY USE!"
                        }
                    ],
                    storeAs: 'paymentMethod'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Cash or debit - credit cards are evil': "Old school! Your neurons have tiny wallets with pictures of other neurons in them.",
                            'Basic credit card - need it for my damn credit score': "Modest plastic user! Your neurons enjoy occasional swipe therapy.",
                            'My special dining credit card – maximum rewards on restaurants': "Rewards optimizer! Your brain contains a tiny accountant who never sleeps."
                        };
                        return responses[choices.paymentMethod];
                    },
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "HOLY SHIT, WE DID IT! Your brain's on board with keeping you alive - a goddamn miracle if you ask me! Now about that application you were dying for - literally. Need your email to seal the deal.",
                    speaker: 'KOVI',
                    background: 'sterile.png',
                    voice: 'voice/1342.mp3'
                },
                {
                    text: "Enter your email to join the waitlist",
                    requiresInput: true,
                    storeAs: 'userEmail',
                    background: 'sterile.png'
                },
                {
                    text: "Email verified! Hey, fun fact - I wasn't actually talking before. Your dying consciousness was translating repair protocols into this 'KOVI' entity while your brain rebuilt itself. NOW we're having our first real conversation!",
                    speaker: 'KOVI',
                    voice: 'voice/2.mp3',
                    background: 'sterile.png'
                },
                {
                    text: "Anyway, congratulations on not dying today! Set yourself a calendar reminder for next time - dying is such an inconvenience, especially for my schedule.",
                    speaker: 'KOVI',
                    voice: 'voice/3.mp3',
                    background: 'sterile.png'
                },
                {
                    text: '*KOVI winks before the screen fades to black.*',
                    isNarration: true,
                    nextScene: null,
                    background: 'sterile.png'
                }
            ]
        }
    }
};
