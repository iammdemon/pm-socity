import { useEffect } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";

const SiaAI = () => {
  useEffect(() => {
    createChat({
      webhookUrl:
        "https://n8n.thepmsociety.com/webhook/a629d8ec-cebd-41c2-b286-5feabdaa3a2d/chat",
      webhookConfig: {
        method: "POST",
        headers: {},
      },
      target: "#n8n-chat",
      mode: "window",
      chatInputKey: "chatInput",
      chatSessionKey: "sessionId",
      loadPreviousSession: true,
      metadata: {},
      showWelcomeScreen: false,
      defaultLanguage: "en",
      initialMessages: [
        "Hi there! 👋",
        "My name is SIA. How can I assist you today?",
      ],
      i18n: {
        en: {
          title: "Hello, I’m SIA 🤝",
          subtitle:
            "Your Society Intelligent Assistant. Ask me anything about your journey, community, or resources.",
          footer: "Powered by The PM Society",
          getStarted: "Start a New Exchange",
          inputPlaceholder: "Type your question for SIA...",
          closeButtonTooltip: "Close chat with SIA",
        },
      },
      enableStreaming: false,
    });
  }, []);

  return <div id="n8n-chat"></div>;
};

export default SiaAI;
