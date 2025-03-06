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
            background: 'black.jpg',
            dialogue: [
                {
                    text: '*You open your eyes. A strange robot appears in front of you.*',
                    isNarration: true
                },
                {
                    text: "Oh good, you're awake. I was beginning to think we'd wasted electricity on your revival. Welcome back to being not dead. For now.",
                    speaker: 'KOVI',
                    background: 'sterile.png',
                    transition: true
                },
                {
                    text: "I'm KOVI. I run this place where we undie people and fix their finances.",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Good news: your money management application has been approved. Bad news: everything else.",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Your brain appears to have misplaced all financial data during transfer. This is unfortunate. For you specifically, not for me. I'm fine.",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "That timer? It's counting down to your permanent death if we don't recover your memories.",
                    speaker: 'KOVI',
                    background: 'black.png',
                    transition: true
                },
                {
                    text: "No pressure. Actually, that's incorrect - there's significant pressure.",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Look, it's simple -  I ask questions, you answer, your brain reconnects, you continue existing. I'm not seeing any downsides.",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Lets start with basics.",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Your name:",
                    speaker: 'KOVI',
                    requiresInput: true,
                    background: 'sterile.png'
                },
                {
                    text: "Excellent. Your neurons actually remember something. Progress already.",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "What paid for your existence before your temporary death episode?",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Where did you work?",
                    background: 'sterile.png',
                    choices: [
                        {
                            text: 'Corporate job',
                            response: "Ah, corporate life! The daily adventure of pretending to pay attention in meetings while mentally redecorating your apartment.",
                            background: 'sterile.png'
                        },
                        {
                            text: 'Freelance',
                            response: "Ah, freelancing! Where pajamas are business attire and 'flexible hours' means working at 3 AM because you procrastinated all day.",
                            background: 'sterile.png'
                        },
                        {
                            text: 'Business owner',
                            response: "Oh, business owner! Where every day is a new episode of 'I Have No Idea What I'm Doing But I'm Doing It Confidently'.",
                            background: 'sterile.png'
                        },
                        {
                            text: 'Not employed',
                            response: "Not traditionally employed! You've mastered the art of explaining your situation at family gatherings with increasingly creative descriptions.",
                            background: 'sterile.png'
                        }
                    ],
                    storeAs: 'employment'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Corporate job': {
                                text: "Ah, corporate life! The daily adventure of pretending to pay attention in meetings while mentally redecorating your apartment.",
                                background: 'sterile.png'
                            },
                            'Freelance': {
                                text: "Ah, freelancing! Where pajamas are business attire and 'flexible hours' means working at 3 AM because you procrastinated all day.",
                                background: 'sterile.png'
                            },
                            'Business owner': {
                                text: "Oh, business owner! Where every day is a new episode of 'I Have No Idea What I'm Doing But I'm Doing It Confidently: The Series'.",
                                background: 'sterile.png'
                            },
                            'Not employed': {
                                text: "Not traditionally employed! You've mastered the art of explaining your situation at family gatherings with increasingly creative descriptions.",
                                background: 'sterile.png'
                            }
                        };
                        const response = responses[choices.employment];
                        return response.text;
                    },
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "I need to ask about your cohabitation status. Not because I care about your personal life. It's relevant to financial patterns. And slightly amusing.",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Relationship status?",
                    background: 'sterile.png',
                    choices: [
                        {
                            text: 'Single',
                            response: "Solo financial operator. All the impulse purchases you want with none of the relationship arguments - just silent self-judgment at 3 AM.",
                            background: 'sterile.png'
                        },
                        {
                            text: 'Not single',
                            response: "In a relationship! Where 'I'm fine with whatever you want' is both the most common phrase and the biggest lie in shared decision-making.",
                            background: 'sterile.png'
                        }
                    ],
                    storeAs: 'relationshipStatus'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Single': "Solo financial operator. All the impulse purchases you want with none of the relationship arguments - just silent self-judgment at 3 AM.",
                            'Not single': "In a relationship! Where 'I'm fine with whatever you want' is both the most common phrase and the biggest lie in shared decision-making."
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
                            response: "Like sharing a brain but for money. 'Our retirement account' sounds romantic until someone impulse-buys a kayak.",
                            background: 'sterile.png'
                        },
                        {
                            text: 'Some shared, some separate',
                            response: "Partial financial fusion! You've discovered the perfect balance between 'what's mine is yours' and 'please don't ask how much this cost.",
                            background: 'sterile.png'
                        },
                        {
                            text: 'Completely separate',
                            response: "Financial independence maintained! Two people sharing a life but keeping receipts. 'I love you eternally, but that's definitely your Netflix charge.'",
                            background: 'sterile.png'
                        }
                    ],
                    storeAs: 'financialArrangement'
                },
                {
                    text: function(choices) {
                        if (choices.relationshipStatus !== 'Not single') return null;
                        const responses = {
                            'Fully merged accounts': "Like sharing a brain but for money. 'Our retirement account' sounds romantic until someone impulse-buys a kayak.",
                            'Some shared, some separate': "Partial financial fusion! You've discovered the perfect balance between 'what's mine is yours' and 'please don't ask how much this cost.",
                            'Completely separate': "Financial independence maintained! Two people sharing a life but keeping receipts. 'I love you eternally, but that's definitely your Netflix charge.'"
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
                            response: "Local accounts? Got it. And do you periodically cross borders while your dollars stay home wearing little American flag pins?",
                            background: 'sterile.png'
                        },
                        {
                            text: 'International accounts too',
                            response: "Oh, international player. Your neurons have tiny passports with embarrassing photos. Even in your brain, passport photos look terrible.",
                            background: 'sterile.png'
                        }
                    ],
                    storeAs: 'bankAccounts'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Domestic accounts only': {
                                text: "Local accounts? Got it. And do you periodically cross borders while your dollars stay home wearing little American flag pins?",
                                background: 'sterile.png'
                            },
                            'International accounts too': {
                                text: "Oh, international player. Your neurons have tiny passports with embarrassing photos. Even in your brain, passport photos look terrible.",
                                background: 'sterile.png'
                            }
                        };
                        return responses[choices.bankAccounts].text;
                    },
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Travel frequency?",
                    background: 'sterile.png',
                    condition: function(choices) {
                        return choices.bankAccounts === 'Domestic accounts only';
                    },
                    choices: [
                        {
                            text: 'Homebody',
                            response: "Proximity traveler! You've realized that 'no place like home' isn't just a saying—it's a lifestyle choice with excellent Wi-Fi.",
                            background: 'sterile.png'
                        },
                        {
                            text: 'Annual trips',
                            response: "Annual trip taker! That moment when you're finally lying on the beach and your brain whispers, 'Only 51 more weeks until you can do this again!",
                            background: 'sterile.png'
                        },
                        {
                            text: 'Frequent traveler',
                            response: "Frequent traveler? Your brain can't remember what time zone it belongs in anymore. But it has lots of hotel points!",
                            background: 'sterile.png'
                        }
                    ],
                    storeAs: 'travelFrequency'
                },
                {
                    text: function(choices) {
                        if (choices.bankAccounts !== 'Domestic accounts only') return null;
                        const responses = {
                            'Homebody': "Proximity traveler! You've realized that 'no place like home' isn't just a saying—it's a lifestyle choice with excellent Wi-Fi.",
                            'Annual trips': "Annual trip taker! That moment when you're finally lying on the beach and your brain whispers, 'Only 51 more weeks until you can do this again!",
                            'Frequent traveler': "Frequent traveler? Your brain can't remember what time zone it belongs in anymore. But it has lots of hotel points!"
                        };
                        return responses[choices.travelFrequency];
                    },
                    speaker: 'KOVI',
                    background: 'sterile.png',
                    condition: function(choices) {
                        return choices.bankAccounts === 'Domestic accounts only';
                    }
                },
                {
                    text: "Your financial memories are slowly reconstructing, piece by sad, broken piece.",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Let's scan your wealth-building approach - assuming your plan isn't just 'win the lottery eventually.'",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "When it comes to financial future planning, are you team 'let my employer figure it out,' team 'I've got this handled,' or team 'bold of you to assume I have extra money'?",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Investment strategy?",
                    background: 'sterile.png',
                    choices: [
                        {
                            text: 'I invest through my employer',
                            response: "Retirement-only investor! You've perfected the financial strategy of 'set it, forget it, and panic about it at 3 AM when you're 64.",
                            background: 'sterile.png'
                        },
                        {
                            text: 'I also invest on my own',
                            response: "Self-directed investor! You've mastered that special feeling of being both smug and terrified every time you invest in something.",
                            background: 'sterile.png'
                        },
                        {
                            text: 'What investments?',
                            response: "No investing at all? Living completely in the present! Future You is sending a telepathic eye-roll, but Present You is having a great time.",
                            background: 'sterile.png'
                        }
                    ],
                    storeAs: 'investmentStyle'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'I invest through my employer': "Retirement-only investor! You've perfected the financial strategy of 'set it, forget it, and panic about it at 3 AM when you're 64.",
                            'I also invest on my own': "Self-directed investor! You've mastered that special feeling of being both smug and terrified every time you buy a stock.",
                            'What investments?': "No investing at all? Living completely in the present! Future You is sending a telepathic eye-roll, but Present You is having a great time."
                        };
                        return responses[choices.investmentStyle];
                    },
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Progress update: You're now only 30% likely to die horribly instead of 95%! I'm a miracle worker!",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Wait - your brain insists we check your friendship patterns too. Fine, fine!",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "How often do you hang out with friends?",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Friends?",
                    background: 'sterile.png',
                    choices: [
                        {
                            text: 'Very often',
                            response: "Social butterfly on steroids! You've never met a person you couldn't turn into a friend, therapist, or uncomfortable hostage of your life story.",
                            background: 'sterile.png'
                        },
                        {
                            text: 'About once a week',
                            response: "Once-a-week people person! You've turned friendship into a scheduled appointment that falls somewhere between oil changes and haircuts.",
                            background: 'sterile.png'
                        },
                        {
                            text: 'Few times a month',
                            response: "Strategic socializer! You carefully ration your extrovert energy like it's a non-renewable resource – which for you, it is.",
                            background: 'sterile.png'
                        },
                        {
                            text: 'Rarely',
                            response: "Social minimalist! Your friends think you've moved away, died, or joined a cult, but you're just enjoying the quiet.",
                            background: 'sterile.png'
                        }
                    ],
                    storeAs: 'socialFrequency'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Very often': "Social butterfly on steroids! You've never met a person you couldn't turn into a friend, therapist, or uncomfortable hostage of your life story.",
                            'About once a week': "Once-a-week people person! You've turned friendship into a scheduled appointment that falls somewhere between oil changes and haircuts.",
                            'Few times a month': "Strategic socializer! You carefully ration your extrovert energy like it's a non-renewable resource – which for you, it is.",
                            'Rarely': "Social minimalist! Your friends think you've moved away, died, or joined a cult, but you're just enjoying the quiet."
                        };
                        return responses[choices.socialFrequency];
                    },
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Now, financial tracking habits. How do you keep track of that cash disappearing from your account each month?",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Money tracking approach?",
                    background: 'sterile.png',
                    choices: [
                        {
                            text: 'Use tracking apps',
                            response: "App tracker! You've downloaded shiny financial apps that promised organization but mostly excel at sending notifications to remind you how much you spent on coffee this week.",
                            background: 'sterile.png'
                        },
                        {
                            text: 'I tried tracking but gave up',
                            response: "Oh, you poor confused human! Still haven't found 'the one' that actually makes sense for how you live. It's definitely them, not you.",
                            background: 'sterile.png'
                        },
                        {
                            text: 'I made my own spreadsheet',
                            response: "Spreadsheet budget master! Nothing says 'I'm in control' like color-coded cells that silently judge your latte purchases.",
                            background: 'sterile.png'
                        },
                        {
                            text: 'No tracking',
                            response: "Tracking-free lifestyle! Your money management philosophy is 'if I don't look at it, it can't hurt me.",
                            background: 'sterile.png'
                        }
                    ],
                    storeAs: 'trackingStyle'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Use tracking apps': "App tracker! You've downloaded shiny financial apps that promised organization but mostly excel at sending notifications to remind you how much you spent on coffee this week.",
                            'I tried tracking but gave up': "Oh, you poor confused human! Still haven't found 'the one' that actually makes sense for how you live. It's definitely them, not you.",
                            'I made my own spreadsheet': "Spreadsheet budget master! Nothing says 'I'm in control' like color-coded cells that silently judge your latte purchases.",
                            'No tracking': "Tracking-free lifestyle! Your money management philosophy is 'if I don't look at it, it can't hurt me."
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
                            text: 'Cash or debit',
                            response: "Anti-credit card crusader! You've taken a moral stand against borrowing money at 29.99% interest. How unreasonably reasonable of you.",
                            background: 'sterile.png'
                        },
                        {
                            text: 'Basic credit card',
                            response: "Credit card minimalist! You've mastered the art of building credit without needing a spreadsheet to remember which card to use on Tuesdays at gas stations.",
                            background: 'sterile.png'
                        },
                        {
                            text: 'Special dining credit card',
                            response: "Rewards card junkie! The only person who gets genuinely aroused by the phrase '5% cash back on rotating quarterly categories.'",
                            background: 'sterile.png'
                        }
                    ],
                    storeAs: 'paymentMethod'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Cash or debit': "Old school! Your neurons have tiny wallets with pictures of other neurons in them.",
                            'Basic credit card': "Modest plastic user! Your neurons enjoy occasional swipe therapy.",
                            'Special dining credit card': "Rewards optimizer! Your brain contains a tiny accountant who never sleeps."
                        };
                        return responses[choices.paymentMethod];
                    },
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Critical alert! System failure imminent... wait, no",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Sorry, that was last week's patient. WE DID IT! Your consciousness has officially decided that living is preferable to not living!",
                    speaker: 'KOVI',
                    background: 'sterile.png',
                },
                {
                    text: "Now we just need your email for the warranty registration.",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Enter your email to join the waitlist",
                    speaker: 'KOVI',
                    requiresInput: true,
                    storeAs: 'userEmail',
                    background: 'sterile.png'
                },
                {
                    text: "Email verified! Fun fact - I wasn't actually talking before. Your dying consciousness was translating repair protocols into this 'KOVI' entity while your brain rebuilt itself.",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Anyway, congrats on the whole not-being-dead thing! In the future, please die more conveniently. I had to cancel my virtual poker night to bring you back, and those byte-sized chips don't win themselves.",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    nextScene: null,
                    text: "Thank you for playing, we'll contact you soon (but that's not a promise).",
                    background: 'black.png'
                }
            ]
        }
    }
};

