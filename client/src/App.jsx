import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hey, I'm Relmy! I assist in world-building. What do you need help with?", sender: "bot" }
  ]);
  const [loading, setLoading] = useState(false);

  const changeMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    setLoading(true);

    if (!message.trim()) {
        setLoading(false);
        return;
    };

    const newMessages = [
      ...messages,
      { text: message, sender: "user" },
      { text: "Generating...", sender: "bot" }
    ];

    setMessages(newMessages);

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          text: data.response,
          sender: "bot"
        };
        return updated;
      });
    } catch (err) {
      console.error(err);
    }

    setMessage("");

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="p-4 font-bold text-2xl">Taalmodel</h1>

      {/* Chat-box */}
      <div className="p-4 space-y-2">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={msg.sender === "user" ? "text-right" : "text-left"}
          >
            {msg.text}
          </p>
        ))}
      </div>

      {/* Chat-message */}
      <div className="flex p-4">
        <input type="text" className="flex-1 p-2 border rounded" placeholder="Type something..." value={message} onChange={changeMessage}/>
        <button className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 ml-2" onClick={sendMessage} disabled={loading}>SEND</button>
      </div>
    </div>
  );
}

export default App;