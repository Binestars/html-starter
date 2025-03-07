const gameData = {
    scenes: {
        intro: {
            dialogue: [
                {
                    text: '*Neural systems initializing...*',
                    isNarration: true,
                    nextScene: 'wakeUp',
                    isTimedSequence: true,
                    timerDuration: 120 // 2 minutes in seconds
                }
            ]
        },
        wakeUp: {
            background: 'black.jpg',
            dialogue: [
                {
                    text: '*You open your eyes. A strange floating screen appears in front of you.*',
                    isNarration: true
                },
                {
                    text: "Oh good, you're awake. I was beginning to think we'd wasted electricity on your revival. Welcome back to being not dead. For now.",
                    speaker: 'KOVI',
                    background: 'sterile.png',
                    transition: true,
                    emotion: 'shock'
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
                    background: 'sterile.png',
                    emotion: 'cringe'
                },
                {
                    text: "That timer? It's counting down to your permanent death if we don't recover your memories.",
                    speaker: 'KOVI',
                    background: 'black.png',
                    transition: true,
                    emotion: 'up'
                },
                {
                    text: "No pressure. Actually, that's incorrect - there's significant pressure.",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Look, it's simple -  I ask questions, you answer, your brain reconnects, you continue existing. I'm not seeing any downsides.",
                    speaker: 'KOVI',
                    background: 'sterile.png',
                    emotion: 'a'
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
                    text: "Where did you work before your temporary death episode?",
                    speaker: 'KOVI',
                    background: 'sterile.png',
                    emotion: 'sus'
                },
                {
                    text: "Your occupation?",
                    emotion: 'sus',
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
                    background: function(choices) {
                        const backgrounds = {
                            'Corporate job': 'office.png',
                            'Freelance': 'freelancer.png',
                            'Business owner': 'boss.png',
                            'Not employed': 'broke.png'
                        };
                        return backgrounds[choices.employment];
                    },
                    transition: true,
                    emotion: 'shock'
                },
                {
                    text: "Are you single? The protocol demands I ask. I'm as uncomfortable as you are.",
                    speaker: 'KOVI',
                    background: 'sterile.png',
                    emotion: 'cringe'
                },
                {
                    text: "Relationship status?",
                    emotion: 'cringe',
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
                    background: function(choices) {
                        const backgrounds = {
                            'Single': 'single.png',
                            'Not single': 'notsingle.png'
                        };
                        return backgrounds[choices.relationshipStatus];
                    },
                    transition: true
                },
                {
                    text: "How you share expenses with your partner:",
                    background: 'notsingle.png',
                    condition: function(choices) {
                        return choices.relationshipStatus === 'Not single';
                    },
                    choices: [
                        {
                            text: 'Fully merged finances',
                            response: "Like sharing a brain but for money. 'Our retirement account' sounds romantic until someone impulse-buys a kayak.",
                        },
                        {
                            text: 'Some shared, some separate',
                            response: "Partial financial fusion! You've discovered the perfect balance between 'what's mine is yours' and 'please don't ask how much this cost.",
                        },
                        {
                            text: 'Completely separate',
                            response: "Financial independence maintained! Two people sharing a life but keeping receipts. 'I love you eternally, but that's definitely your Netflix charge.'",
                        }
                    ],
                    storeAs: 'financialArrangement',
                    background: 'notsingle.png'
                },
                {
                    text: function(choices) {
                        if (choices.relationshipStatus !== 'Not single') return null;
                        const responses = {
                            'Fully merged accounts': "Like sharing a brain but for money. 'Our retirement account' sounds romantic until someone impulse-buys a kayak.",
                            'Some shared, some separate': "Partial financial fusion! You've discovered the perfect balance between 'what's mine is yours' and 'please don't ask how much this cost.",
                            'Completely separate': "Financial independence maintained! Two people sharing a life but keeping receipts. 'I love you eternally, but that's definitely your Netflix charge.'"
                        };
                        return responses[choices.relationshipStatus];
                    },
                    speaker: 'KOVI',
                    background: 'notsingle.png',
                    condition: function(choices) {
                        return choices.relationshipStatus === 'Not single';
                    }
                },
                {
                    text: "Now your banking geography. Confined to one sad little country, or plotting global economic domination?",
                    speaker: 'KOVI',
                    background: 'sterile.png',
                    emotion: 'sus'
                },
                {
                    text: "Bank accounts - domestic or international?",
                    emotion: 'sus',
                    background: 'sterile.png',
                    choices: [
                        {
                            text: 'Domestic accounts only',
                            response: "Local accounts? Got it. And do you periodically cross borders while your dollars stay home wearing little American flag pins?",
                        },
                        {
                            text: 'International accounts too',
                            response: "Oh, international player. Your neurons have tiny passports with embarrassing photos. Even in your brain, passport photos look terrible.",
                        }
                    ],
                    storeAs: 'bankAccounts'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Domestic accounts only': {
                                text: "Local accounts? Got it. And do you periodically cross borders while your dollars stay home wearing little American flag pins?",
                            },
                            'International accounts too': {
                                text: "Oh, international player. Your neurons have tiny passports with embarrassing photos. Even in your brain, passport photos look terrible.",
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
                    },
                    transition: true
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
                            response: "Proximity traveler! You've realized that 'no place like home' isn't just a saying—it's a lifestyle choice with excellent Wi-Fi.",
                        },
                        {
                            text: 'Annual trips',
                            response: "Annual trip taker! That moment when you're finally lying on the beach and your brain whispers, 'Only 51 more weeks until you can do this again!",
                        },
                        {
                            text: 'Frequent traveler',
                            response: "Frequent traveler? Your brain can't remember what time zone it belongs in anymore. But it has lots of hotel points!",
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
                    background: '1.png',
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
                    background: 'invest.png',
                    transition: true,
                },
                {
                    text: "Investment strategy?",
                    background: 'invest.png',
                    choices: [
                        {
                            text: 'Passive investing (401k/retirement/index funds)',
                            response: "Retirement-only investor! You've perfected the financial strategy of 'set it, forget it, and panic about it at 3 AM when you're 64.",                        },
                        {
                            text: 'Active investing (stocks/real estate)',
                            response: "Self-directed investor! You've mastered that special feeling of being both smug and terrified every time you invest in something.",
                        },
                        {
                            text: 'Investing? What\'s that?',
                            response: "No investing at all? Living completely in the present! Future You is sending a telepathic eye-roll, but Present You is having a great time.",
                        }
                    ],
                    storeAs: 'investmentStyle'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Relying only on retirement accounts': "Retirement-only investor! You've perfected the financial strategy of 'set it, forget it, and panic about it at 3 AM when you're 64.",
                            'Casual investor (real estate or brokerage)': "Self-directed investor! You've mastered that special feeling of being both smug and terrified every time you invest in something.",
                            'Investing? What\'s that?': "No investing at all? Living completely in the present! Future You is sending a telepathic eye-roll, but Present You is having a great time."
                        };
                        return responses[choices.investmentStyle];
                    },
                    speaker: 'KOVI',
                    emotion: 'shock',
                    background: 'invest.png'
                },
                {
                    text: "Progress update: You're now only 30% likely to die horribly instead of 95%! I'm a miracle worker!",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Wait - your brain insists we check your friendship patterns too. Fine, fine!",
                    speaker: 'KOVI',
                    background: 'sterile.png',
                    emotion: 'sus'
                },
                {
                    text: "How often do you hang out with friends?",
                    background: 'social.png',
                    emotion: 'sus',
                    choices: [
                        {
                            text: 'Very often',
                            response: "Social butterfly on steroids! You've never met a person you couldn't turn into a friend, therapist, or uncomfortable hostage of your life story.",
                        },
                        {
                            text: 'About once a week',
                            response: "Once-a-week people person! You've turned friendship into a scheduled appointment that falls somewhere between oil changes and haircuts.",
                        },
                        {
                            text: 'Few times a month',
                            response: "Strategic socializer! You carefully ration your extrovert energy like it's a non-renewable resource – which for you, it is.",
                        },
                        {
                            text: 'Rarely',
                            response: "Social minimalist! Your friends think you've moved away, died, or joined a cult, but you're just enjoying the quiet.",
                        }
                    ],
                    storeAs: 'socialFrequency',
                    transition: true
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
                    emotion: 'smile',
                    background: 'social.png'
                },
                {
                    text: "Last question! How do you keep track of that cash disappearing from your account each month?",
                    speaker: 'KOVI',
                    background: 'money.png',
                    transition: true
                },
                {
                    text: "Money tracking approach?",
                    background: 'money.png',
                    choices: [
                        {
                            text: 'Using a tool for tracking',
                            response: "App user! Now your phone knows your shameful secrets AND your spending habits.",
                        },
                        {
                            text: 'I tried tracking but gave up',
                            response: "Oh, you poor confused human! Still haven't found 'the one' that actually makes sense for how you live. It's definitely them, not you.",
                        },
                        {
                            text: 'Made my own spreadsheet',
                            response: "Spreadsheet budget master! Nothing says 'I'm in control' like color-coded cells that silently judge your latte purchases.",
                        },
                        {
                            text: 'No tracking',
                            response: "Tracking-free lifestyle! Your money management philosophy is 'if I don't look at it, it can't hurt me.",
                        }
                    ],
                    storeAs: 'trackingStyle'
                },
                {
                    text: function(choices) {
                        const responses = {
                            'Using a tool for tracking': "App user! Now your phone knows your shameful secrets AND your spending habits.",
                            'I tried tracking but gave up': "Oh, you poor confused human! Still haven't found 'the one' that actually makes sense for how you live. It's definitely them, not you.",
                            'Made my own spreadsheet': "Spreadsheet budget master! Nothing says 'I'm in control' like color-coded cells that silently judge your latte purchases.",
                            'No tracking': "Tracking-free lifestyle! Your money management philosophy is 'if I don't look at it, it can't hurt me."
                        };
                        return responses[choices.trackingStyle];
                    },
                    speaker: 'KOVI',
                    background: 'money.png'
                },
                {
                    text: "Critical alert! System failure imminent... oh, wait",
                    speaker: 'KOVI',
                    background: 'sterile.png'
                },
                {
                    text: "Sorry, that was last week's patient. WE DID IT! Your consciousness has officially decided that living is preferable to not living!",
                    speaker: 'KOVI',
                    background: 'sterile.png',
                    stopTimer: true
                },
                {
                    text: "Now we just need your email to finish registration.",
                    speaker: 'KOVI',
                    background: 'sterile.png',
                    emotion: 'smile'
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
                    background: 'sterile.png',
                    emotion: 'shock'
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

