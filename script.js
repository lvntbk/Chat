const chats = ["levent", "asya", "umut"];
const chatItems = document.querySelectorAll(".chat-item");
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Sidebar chat seçimi
chatItems.forEach(item => {
  item.addEventListener("click", () => {
    chatItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    chats.forEach(chatId => {
      const chatDiv = document.getElementById(chatId);
      if(chatId === item.dataset.chat) chatDiv.style.display = "flex";
      else chatDiv.style.display = "none";
    });
  });
});

// Mesaj gönderme ve otomatik cevap
chats.forEach(chatId => {
  const chatDiv = document.getElementById(chatId);
  const input = chatDiv.querySelector("input");
  const btn = chatDiv.querySelector("button");
  const messagesDiv = chatDiv.querySelector(".chat-messages");

  btn.addEventListener("click", () => {
    sendMessage(input, messagesDiv);
  });

  input.addEventListener("keypress", (e) => {
    if(e.key === "Enter") sendMessage(input, messagesDiv);
  });
});

function sendMessage(input, messagesDiv){
  const text = input.value.trim();
  if(text === "") return;

  const now = new Date();
  const time = now.getHours().toString().padStart(2,'0') + ":" + now.getMinutes().toString().padStart(2,'0');

  // Kendi mesajı
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", "sent");
  msgDiv.innerHTML = `${text}<span class="time">${time}</span>`;
  messagesDiv.appendChild(msgDiv);
  input.value = "";
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  // Karşı taraf mesajı (otomatik cevap)
  setTimeout(() => {
    const replyTime = new Date();
    const rTime = replyTime.getHours().toString().padStart(2,'0') + ":" + replyTime.getMinutes().toString().padStart(2,'0');
    const reply = document.createElement("div");
    reply.classList.add("message", "received");
    reply.innerHTML = `<strong>${messagesDiv.parentElement.querySelector(".chat-header").textContent.split(" ")[0]}:</strong> Otomatik cevap ✅<span class="time">${rTime}</span>`;
    messagesDiv.appendChild(reply);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, 1000);
}

// Karanlık mod toggle
darkModeToggle.addEventListener("change", () => {
  body.classList.toggle("dark-mode");
});
