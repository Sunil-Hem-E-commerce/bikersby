import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { FaComments, FaPaperPlane, FaTimes, FaWhatsapp } from "react-icons/fa";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatbot_history");
    return saved ? JSON.parse(saved) : [{ sender: "bot", text: "Hi! How can I help you today?" }];
  });

  const quickReplies = useMemo(
    () => [
      "Order status",
      "Product info",
      "Shipping & delivery",
      "Returns & refund",
      "Talk to human",
    ],
    []
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
    if (t.includes("order")) return "Please share your order number to check its status.";
    if (t.includes("status")) return "I can look up your order status. Do you have the order number?";
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
        <Fab onClick={() => setOpen(true)} aria-label="Open support chat">
          <FaComments />
        </Fab>
      )}
      {open && (
        <Panel>
          <Header>
            <span>Support Chat</span>
            <Close onClick={() => setOpen(false)} aria-label="Close chat">
              <FaTimes />
            </Close>
          </Header>
          <Body>
            {messages.map((m, idx) => (
              <Message key={idx} $sender={m.sender}>
                {m.text}
              </Message>
            ))}
          </Body>
          <QuickBar>
            {quickReplies.map((q) => (
              <Quick key={q} onClick={() => sendMessage(q)}>
                {q}
              </Quick>
            ))}
          </QuickBar>
          <InputBar
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <TextInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <Send type="submit" aria-label="Send message">
              <FaPaperPlane />
            </Send>
          </InputBar>
          <WhatsApp onClick={openWhatsApp} aria-label="Chat on WhatsApp">
            <FaWhatsapp />
            <span>WhatsApp</span>
          </WhatsApp>
        </Panel>
      )}
    </>
  );
};

export default ChatbotWidget;

const Fab = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 8rem;
  width: 5.2rem;
  height: 5.2rem;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.btn};
  color: #fff;
  box-shadow: ${({ theme }) => theme.colors.shadowSupport};
  transition: transform 0.2s ease;
  z-index: 1000;
  &:hover {
    transform: translateY(-2px);
  }
`;

const Panel = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 32rem;
  max-width: 85vw;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.6rem;
`;

const Close = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 1.6rem;
`;

const Body = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-height: 28rem;
  overflow-y: auto;
`;

const Message = styled.div`
  align-self: ${({ $sender }) => ($sender === "user" ? "flex-end" : "flex-start")};
  background: ${({ theme, $sender }) =>
    $sender === "user" ? theme.colors.btn : theme.colors.bg};
  color: ${({ $sender }) => ($sender === "user" ? "#fff" : "inherit")};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.8rem 1rem;
  border-radius: 0.8rem;
  max-width: 80%;
  font-size: 1.4rem;
`;

const QuickBar = styled.div`
  display: flex;
  gap: 0.6rem;
  padding: 0.6rem 0.8rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
`;

const Quick = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 1.2rem;
  padding: 0.4rem 0.8rem;
  font-size: 1.2rem;
  cursor: pointer;
`;

const InputBar = styled.form`
  display: flex;
  gap: 0.6rem;
  padding: 0.8rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const TextInput = styled.input`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.6rem;
  padding: 0.6rem 0.8rem;
  font-size: 1.4rem;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
`;

const Send = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.btn};
  color: #fff;
  border-radius: 0.6rem;
  width: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
`;

const WhatsApp = styled.button`
  margin: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border: none;
  background: #25d366;
  color: #fff;
  border-radius: 0.6rem;
  padding: 0.6rem 0.8rem;
  cursor: pointer;
  font-size: 1.4rem;
`;
