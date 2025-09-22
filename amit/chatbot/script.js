
        const chatMessages = document.getElementById('chatMessages');
        const userInput = document.getElementById('userInput');
        const sendButton = document.getElementById('sendButton');
        
        // Predefined bot responses
        const botResponses = [
            "I understand. Can you tell me more?",
            "That's interesting! How can I assist you with that?",
            "I'm here to help. What else would you like to know?",
            "Thanks for sharing. Is there anything specific you need?",
            "I see. Let me know if you need more information.",
            "Great question! I can help with that.",
            "I'm designed to work on all devices - mobile, tablet, and desktop!",
            "This interface uses responsive design principles to adapt to any screen size."
        ];
        
        // Function to add a message to the chat
        function addMessage(text, isUser) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
            messageDiv.textContent = text;
            chatMessages.appendChild(messageDiv);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Function to show typing indicator
        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.classList.add('typing-indicator');
            typingDiv.id = 'typingIndicator';
            
            for (let i = 0; i < 3; i++) {
                const dot = document.createElement('div');
                dot.classList.add('typing-dot');
                typingDiv.appendChild(dot);
            }
            
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Function to remove typing indicator
        function removeTypingIndicator() {
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }
        
        // Function to get a random bot response
        function getBotResponse() {
            const randomIndex = Math.floor(Math.random() * botResponses.length);
            return botResponses[randomIndex];
        }
        
        // Function to handle user message
        function handleUserMessage() {
            const message = userInput.value.trim();
            
            if (message) {
                addMessage(message, true);
                userInput.value = '';
                
                // Show typing indicator
                showTypingIndicator();
                
                // Simulate bot thinking and response
                setTimeout(() => {
                    removeTypingIndicator();
                    addMessage(getBotResponse(), false);
                }, 1500);
            }
        }
        
        // Event listeners
        sendButton.addEventListener('click', handleUserMessage);
        
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleUserMessage();
            }
        });
 