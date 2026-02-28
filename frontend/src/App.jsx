import { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    {
      text: "Olá! Sou o teu Tech Interviewer da Cloudflare. Diz-me a que vaga te candidatas para começarmos.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Adiciona a mensagem do utilizador ao chat
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Faz o pedido ao Worker para obter a resposta da IA
      const response = await fetch("https://backend.antoniorfigueiras.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      // Adiciona a resposta da IA ao chat
      setMessages([...newMessages, { text: data.reply, sender: "bot" }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          text: "Erro ao ligar ao servidor. Verifica se o Worker está a correr!",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h1>Cloudflare Tech Interviewer</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="message bot">A pensar...</div>}
      </div>
      <form onSubmit={sendMessage} className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escreve a tua resposta aqui..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Enviar
        </button>
      </form>
    </div>
  );
}

export default App;
