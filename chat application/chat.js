const sendButton = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');
const chatBox = document.getElementById('chat-box');

sendButton.addEventListener('click', sendMessage);
 
messageInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const messageText = messageInput.value.trim();
  
  if (messageText !== '') {
 
    addMessage(messageText, 'sent');
 
    messageInput.value = '';

    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
      const reply = getBotReply(messageText);
      addMessage(reply, 'received');
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
  }
}

function addMessage(text, type) {
  const messageBox = document.createElement('div');
  messageBox.classList.add('message', type);
  messageBox.textContent = text;
  chatBox.appendChild(messageBox);
}

function getBotReply(userMessage) {
  const message = userMessage.toLowerCase();
  if (message === 'hi' || message === 'hello') {
    return 'Hello! How can I help you?';
  } else if (message === 'how are you') {
    return 'I am doing great, thank you for asking!';
  } else if (message === 'bye') {
    return 'Goodbye! Have a great day!';
  } else {
    return 'Sorry, I don\'t understand what you are asking?';
  }
}
