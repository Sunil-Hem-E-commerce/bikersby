import React, { useEffect, useMemo, useState } from "react";
import { FaComments, FaPaperPlane, FaTimes, FaWhatsapp } from "react-icons/fa";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatbot_history");
    return saved
      ? JSON.parse(saved)
      : [{ sender: "bot", text: "Hi! How can I help you today?" }];
  });

  const quickReplies = useMemo(
    () => [
      "Order status",
      "Product info",
      "Shipping & delivery",
      "Returns & refund",
      "Talk to human",
    ],
    [],
  );

  useEffect(() => {
    localStorage.setItem("chatbot_history", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 400);
    setInput("");
  };

  const getBotReply = (text) => {
    const t = text.toLowerCase();
    if (t.includes("order"))
      return "Please share your order number to check its status.";
    if (t.includes("status"))
      return "I can look up your order status. Do you have the order number?";
    if (t.includes("product"))
      return "Tell me which product you're interested in and what you want to know.";
    if (t.includes("ship") || t.includes("delivery"))
      return "Standard delivery takes 3–5 business days. Express options are available at checkout.";
    if (t.includes("return") || t.includes("refund"))
      return "You can return items within 14 days if unused and in original packaging.";
    if (t.includes("human") || t.includes("agent") || t.includes("support"))
      return "You can start a WhatsApp chat with our support team using the green button below.";
    return "I’m here to help with orders, products, shipping, returns, or connecting you to support.";
  };

  const openWhatsApp = () => {
    const phone = "9779800000000";
    const message = encodeURIComponent("Hello! I need support.");
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open support chat"
          className="fixed right-[2rem] bottom-[8rem] w-[5.2rem] h-[5.2rem] border-none rounded-full flex items-center justify-center text-[2rem] cursor-pointer bg-[#6254F3] text-white shadow-lg transition-transform duration-200 z-[1000] hover:-translate-y-[2px]"
        >
          <FaComments />
        </button>
      )}
      {open && (
        <div className="fixed right-[2rem] bottom-[2rem] w-[32rem] max-w-[85vw] bg-white border border-gray-200 rounded-[1rem] shadow-lg flex flex-col overflow-hidden z-[1000]">
          <div className="flex justify-between items-center px-[1.2rem] py-[1rem] border-b border-gray-200 text-[#1d1d1d] text-[1.6rem]">
            <span>Support Chat</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="border-none bg-transparent text-gray-500 cursor-pointer text-[1.6rem]"
            >
              <FaTimes />
            </button>
          </div>
          <div className="p-[1rem] flex flex-col gap-[0.8rem] max-h-[28rem] overflow-y-auto">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] text-[1.4rem] px-[1rem] py-[0.8rem] rounded-[0.8rem] border border-gray-200 ${
                  m.sender === "user"
                    ? "self-end bg-[#6254F3] text-white"
                    : "self-start bg-[#F6F8FA] text-inherit"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex gap-[0.6rem] px-[0.8rem] py-[0.6rem] border-t border-gray-200 flex-wrap">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="bg-[#F6F8FA] border border-gray-200 rounded-[1rem] px-[0.8rem] py-[0.4rem] text-[1.2rem] cursor-pointer hover:bg-gray-200"
              >
                {q}
              </button>
            ))}
          </div>
          <form
            className="flex items-center p-[0.8rem] border-t border-gray-200"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-[0.4rem] px-[0.8rem] py-[0.6rem] text-[1.4rem] outline-none"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="ml-[0.8rem] text-[#6254F3] text-[1.6rem] cursor-pointer bg-transparent border-none"
            >
              <FaPaperPlane />
            </button>
          </form>
          <button
            onClick={openWhatsApp}
            aria-label="Chat on WhatsApp"
            className="bg-[#25D366] text-white flex items-center justify-center gap-[0.8rem] p-[1rem] text-[1.4rem] font-medium cursor-pointer"
          >
            <FaWhatsapp />
            <span>WhatsApp</span>
          </button>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
