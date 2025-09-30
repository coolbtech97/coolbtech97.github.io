
        document.addEventListener('DOMContentLoaded', function() {
            const sourceLang = document.getElementById('source-lang');
            const targetLang = document.getElementById('target-lang');
            const inputText = document.getElementById('input-text');
            const outputText = document.getElementById('output-text');
            const swapBtn = document.getElementById('swap-btn');
            const translateBtn = document.getElementById('translate-btn');
            const charCount = document.getElementById('char-count');
            const sourceFlag = document.getElementById('source-flag');
            const targetFlag = document.getElementById('target-flag');
            
            // Initialize with a translation
            simulateTranslation();
            
            // Character count update
            inputText.addEventListener('input', function() {
                charCount.textContent = inputText.value.length;
            });
            
            // Update flags when languages change
            sourceLang.addEventListener('change', updateFlags);
            targetLang.addEventListener('change', updateFlags);
            
            function updateFlags() {
                const flags = {
                    'auto': '🌐', 'en': '🇺🇸', 'hi': '🇮🇳', 'es': '🇪🇸', 
                    'fr': '🇫🇷', 'de': '🇩🇪', 'it': '🇮🇹', 'ja': '🇯🇵',
                    'ko': '🇰🇷', 'zh': '🇨🇳', 'ar': '🇸🇦', 'ru': '🇷🇺'
                };
                
                sourceFlag.textContent = flags[sourceLang.value];
                targetFlag.textContent = flags[targetLang.value];
            }
            
            // Swap languages
            swapBtn.addEventListener('click', function() {
                const temp = sourceLang.value;
                sourceLang.value = targetLang.value;
                targetLang.value = temp;
                
                // Also swap text content
                const tempText = inputText.value;
                inputText.value = outputText.value;
                outputText.value = tempText;
                
                // Update character count
                charCount.textContent = inputText.value.length;
                
                // Update flags
                updateFlags();
            });
            
            // Translation function
            translateBtn.addEventListener('click', simulateTranslation);
            
            // Simulated translation function
            function simulateTranslation() {
                const text = inputText.value.trim();
                const from = sourceLang.value;
                const to = targetLang.value;
                
                if (!text) {
                    outputText.value = "Please enter some text to translate.";
                    return;
                }
                
                // Show loading state
                outputText.value = "Translating...";
                
                // Simulate API call with timeout
                setTimeout(() => {
                    // In a real application, this would be an API call to a translation service
                    const translatedText = mockTranslation(text, from, to);
                    outputText.value = translatedText;
                }, 800);
            }
            
            // Mock translation function with more examples
            function mockTranslation(text, from, to) {
                // Convert to lowercase for case-insensitive matching
                const lowerText = text.toLowerCase();
                
                // English to Hindi translations
                if ((from === 'en' || from === 'auto') && to === 'hi') {
                    const translations = {
                        'hello': 'नमस्ते',
                        'how are you': 'आप कैसे हैं',
                        'welcome': 'स्वागत हे',
                        'thank you': 'धन्यवाद',
                        'good morning': 'शुभ प्रभात',
                        'good night': 'शुभ रात्रि',
                        'what is your name': 'आपका नाम क्या है',
                        'my name is': 'मेरा नाम है',
                        'i love programming': 'मुझे प्रोग्रामिंग से प्यार है',
                        'language': 'भाषा',
                        'translate': 'अनुवाद',
                        'multilingual translator': 'बहुभाषी अनुवादक',
                        'hello, how are you? welcome to the multilingual translator.': 
                            'नमस्ते, आप कैसे हैं? बहुभाषी अनुवादक में आपका स्वागत है।'
                    };
                    
                    // Check for exact match first
                    if (translations[lowerText]) {
                        return translations[lowerText];
                    }
                    
                    // Check for partial matches and translate word by word
                    const words = text.split(' ');
                    const translatedWords = words.map(word => {
                        const cleanWord = word.replace(/[.,?!]/g, '');
                        return translations[cleanWord.toLowerCase()] || word;
                    });
                    
                    return translatedWords.join(' ');
                }
                
                // Hindi to English translations
                if (from === 'hi' && to === 'en') {
                    const translations = {
                        'नमस्ते': 'Hello',
                        'आप कैसे हैं': 'How are you',
                        'स्वागत हे': 'Welcome',
                        'धन्यवाद': 'Thank you',
                        'शुभ प्रभात': 'Good morning',
                        'शुभ रात्रि': 'Good night',
                        'आपका नाम क्या है': 'What is your name',
                        'मेरा नाम है': 'My name is',
                        'भाषा': 'Language',
                        'अनुवाद': 'Translation'
                    };
                    
                    if (translations[text]) {
                        return translations[text];
                    }
                    
                    return `[English translation of: ${text}]`;
                }
                
                // For other language combinations
                return `[Translated from ${getLanguageName(from)} to ${getLanguageName(to)}] ${text}`;
            }
            
            function getLanguageName(code) {
                const languages = {
                    'auto': 'Detected Language',
                    'en': 'English',
                    'hi': 'Hindi',
                    'es': 'Spanish',
                    'fr': 'French',
                    'de': 'German',
                    'it': 'Italian',
                    'ja': 'Japanese',
                    'ko': 'Korean',
                    'zh': 'Chinese',
                    'ar': 'Arabic',
                    'ru': 'Russian'
                };
                
                return languages[code] || code;
            }
            
            // Initialize flags
            updateFlags();
        });