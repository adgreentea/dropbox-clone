"use client";
import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: userMessage.content }),
    });
    if (res.ok) {
      const data = await res.json();
      const assistantMessage: Message = { role: "assistant", content: data.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } else {
      const assistantMessage: Message = {
        role: "assistant",
        content: "Error getting answer.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4 space-y-4">
      <div className="flex-1 overflow-y-auto border rounded p-4 space-y-2">
        {messages.map((m, idx) => (
          <div key={idx} className={m.role === "user" ? "text-right" : "text-left"}>
            <span
              className={
                m.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }
              style={{ padding: "4px 8px", borderRadius: "4px", display: "inline-block" }}
            >
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded p-2"
          placeholder="Ask a question about your documents..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
