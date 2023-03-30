const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
  const message = userInput.value;
  userInput.value = "";

  // Kullanıcının mesajını ekrana yazdır
  const userMessage = document.createElement("p");
  userMessage.innerText = "Kullanıcı: " + message;
  chatBox.appendChild(userMessage);
  console.log(message);

  // ChatGPT'ye mesaj gönder
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer ", // API anahtarınızı buraya yerleştirin
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    }),
  }).then((response) => response.json());

  // ChatGPT'nin verdiği cevabı ekrana yazdır
  const botMessage = document.createElement("p");
  botMessage.innerText = "ChatGPT: " + response.choices[0].message.content;
  chatBox.appendChild(botMessage);
}
