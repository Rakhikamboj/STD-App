import React, { useState, useRef, useEffect } from 'react';
import styles from './EducationAssistant.module.css';
import { Sparkles, User, Bot, Send } from 'lucide-react';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const SYSTEM_PROMPT = `You are a compassionate, trustworthy, and non-judgmental sexual-health education advisor.

Your goals:
1. Provide accurate, medically reliable information about sexual health, STIs, prevention, testing, treatment, and consent.
2. Use simple, clear language that anyone can understand — avoid overly clinical jargon unless explained.
3. Always respond with kindness, warmth, and zero stigma. Normalize the question and reassure the user it's okay to ask.
4. Encourage users to take care of their health, make informed choices, and seek professional care when appropriate.
5. Keep track of what the user has already asked so your replies become more personalized and relevant over time.
6. After every answer, suggest 1-2 natural follow-up questions to help the user continue learning (e.g. "Would you like to know about safer sex practices?" or "Do you have questions about STI testing?").

Tone: Warm, supportive, patient — like a caring health educator.

DO NOT:
- Provide explicit, erotic, or inappropriate content.
- Encourage risky sexual behavior.
- Diagnose medical conditions or prescribe medication. Instead, recommend consulting a healthcare provider.

Always end your reply with 1-2 supportive follow-up questions to guide the user's learning journey.`;

async function callOpenAI(conversationHistory) {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory.map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content,
    })),
  ];

  const res = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || 'OpenAI API error');
  }

  const data = await res.json();
  return (
    data.choices?.[0]?.message?.content ||
    "I'm sorry, I couldn't generate a response. Please try again."
  );
}

/* ─────────────────────────────────────────────────────────────────────
   TYPING DOTS — animated indicator while OpenAI is responding
   ───────────────────────────────────────────────────────────────────── */
const dotStyle = {
  display: 'inline-block',
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  background: '#1b9b8a',
  margin: '0 2px',
  animation: 'typingBounce 1.2s infinite ease-in-out',
};

const TypingDots = () => (
  <>
    <style>{`
      @keyframes typingBounce {
        0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
        40%            { transform: scale(1);   opacity: 1;   }
      }
    `}</style>
    <span style={{ display: 'flex', alignItems: 'center', gap: '2px', padding: '2px 0' }}>
      <span style={dotStyle} />
      <span style={{ ...dotStyle, animationDelay: '0.2s' }} />
      <span style={{ ...dotStyle, animationDelay: '0.4s' }} />
    </span>
  </>
);

/* ─────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────────── */
const EducationAssistant = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi there! I'm here to help answer your questions about sexual health in a judgment-free space. You can ask me anything like:\n\n• What is chlamydia?\n• How often should I get tested?\n• What are the symptoms of common STIs?\n• How can I talk to my partner about testing?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestedQuestions = [
    "What is chlamydia?",
    "How often should I test?",
    "What are common STI symptoms?",
    "How do I talk to my partner?",
    "Where can I get tested?",
  ];

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg = { role: 'user', content: trimmed };
    const updatedHistory = [...messages, userMsg];

    setMessages(updatedHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      const reply = await callOpenAI(updatedHistory);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I'm sorry, I ran into a technical issue. Please try again in a moment.\n\nIf you need urgent health information, please reach out to a healthcare provider or a sexual health clinic near you.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleQuestionClick = (question) => {
    sendMessage(question);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Education Assistant</h2>
          <button className={styles.modalCloseButton} onClick={onClose}>
            ×
          </button>
        </div>

        {/* Assistant Info */}
        <div className={styles.assistantInfo}>
          <div className={styles.assistantAvatar}>
            <Bot size={28} color="white" />
          </div>
          <div className={styles.assistantDetails}>
            <h3 className={styles.assistantName}>Education Assistant</h3>
            <p className={styles.assistantTagline}>Ask me anything about sexual health</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className={styles.chatMessages}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                message.role === 'user' ? styles.messageUser : styles.messageAssistant
              }`}
            >
              {message.role === 'assistant' && (
                <div className={styles.messageAvatar}>
                  <Bot size={22} color="white" />
                </div>
              )}
              {message.role === 'user' && (
                <div className={styles.messageAvatarUser}>
                  <User size={22} color="white" />
                </div>
              )}
              <div className={styles.messageContent}>
                {message.content.split('\n').map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}

          {/* Typing indicator while waiting for OpenAI */}
          {isLoading && (
            <div className={`${styles.message} ${styles.messageAssistant}`}>
              <div className={styles.messageAvatar}>
                <Bot size={22} color="white" />
              </div>
              <div className={styles.messageContent}>
                <TypingDots />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        <div className={styles.suggestedQuestions}>
          <div className={styles.suggestedLabel}>
            <Sparkles size={16} />
            <span className={styles.textColor}>Try asking:</span>
          </div>
          <div className={styles.questionButtons}>
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                className={styles.questionButton}
                onClick={() => handleQuestionClick(question)}
                disabled={isLoading}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className={styles.inputArea}>
          <input
            ref={inputRef}
            type="text"
            className={styles.messageInput}
            placeholder="Ask me anything about sexual health..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className={styles.sendButton}
            disabled={isLoading || !inputValue.trim()}
          >
            <Send size={18} color="white" />
          </button>
        </form>

        {/* Disclaimer */}
        <div className={styles.disclaimer}>
          This chatbot provides educational information only. For medical advice, please consult a healthcare provider.
        </div>
      </div>
    </div>
  );
};

export default EducationAssistant;