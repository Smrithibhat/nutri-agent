import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { isGeminiEnabled } from '../config';
import { MOCK_CHAT_RESPONSES } from '../data/mockData';
import { generateLiveChatResponse } from '../services/geminiService';

export default function NutritionAgent({ chatHistory, setChatHistory, profile }) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Check if AI is active based on environment variable
  const isAiActive = isGeminiEnabled();

  const suggestionPills = [
    "High protein meals under $3",
    "Substitute for eggs in baking",
    "Substitutes for peanut allergy",
    "Frugal meal prepping tips"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  const idRef = useRef(1);

  const handleSend = async (textToSend) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = {
      id: `u-${idRef.current++}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...chatHistory, userMsg];
    setChatHistory(updatedHistory);
    setInput('');
    setIsTyping(true);

    try {
      let matchedResponse = "";
      
      if (isAiActive) {
        // Live Gemini Call (using Key injected privately at build-time or in Netlify)
        matchedResponse = await generateLiveChatResponse(textToSend, chatHistory, profile);
      } else {
        // Fallback Mock Local Call
        await new Promise(resolve => setTimeout(resolve, 900)); // Simulate delay
        matchedResponse = getMockResponse(textToSend);
      }
      
      const agentMsg = {
        id: `a-${idRef.current++}`,
        sender: 'agent',
        text: matchedResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory(prev => [...prev, agentMsg]);
    } catch (error) {
      const errorMsg = {
        id: `e-${idRef.current++}`,
        sender: 'agent',
        text: `*System Note: Direct Gemini API query encountered an error.*\n\n⚠️ **Error details:** ${error.message}\n\nPlease verify that your Netlify Environment Variable \`VITE_GEMINI_API_KEY\` is configured correctly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const getMockResponse = (query) => {
    const q = query.toLowerCase();
    
    // Scan matching keywords
    const found = MOCK_CHAT_RESPONSES.find(item => 
      item.keywords.some(keyword => q.includes(keyword))
    );

    if (found) {
      return found.response;
    }

    if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
      return "Hello! I am your AI Nutrition Agent. How can I help you optimize your health goals or slash your grocery budget today?";
    }

    if (q.includes("thank") || q.includes("cool") || q.includes("awesome")) {
      return "You are very welcome! Remember, small substitutions in your weekly plan add up to huge savings. Let me know if you need any other swaps!";
    }

    return `I've analyzed your question about "${query}". While I compile a custom nutritional model for you, here are three general rules to follow:
    
1. **Prioritize Frozen Vegetables**: Frozen spinach and broccoli cost ~70% less than fresh, have identical nutrients, and eliminate waste.
2. **Combine Rice & Beans**: A classic pairing that forms a complete amino acid profile (protein) at less than $0.50/serving.
3. **Double-check the "Swap & Save" Tab**: Swapping fresh meats/fish for canned mackerel or tofu cuts costs by over 60% with equal macros.

*Can you specify if you are looking for recipe ideas, allergen substitutes, or macro balances?*`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  const formatMessageText = (text) => {
    return text.split('\n').map((paragraph, index) => {
      
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(paragraph)) !== null) {
        if (match.index > lastIndex) {
          parts.push(paragraph.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} style={{ color: 'var(--primary-light)' }}>{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < paragraph.length) {
        parts.push(paragraph.substring(lastIndex));
      }
      
      const content = parts.length > 0 ? parts : paragraph;

      if (paragraph.trim().startsWith('*') && paragraph.trim().endsWith('*')) {
        return <p key={index} style={{ fontStyle: 'italic', color: 'var(--text-warning)', marginTop: '0.5rem' }}>{paragraph.replace(/\*/g, '')}</p>;
      }
      
      if (paragraph.trim().startsWith('-') || paragraph.trim().startsWith('*')) {
        return <li key={index} style={{ marginLeft: '1.25rem', marginBottom: '0.25rem' }}>{content}</li>;
      }
      
      if (/^\d+\./.test(paragraph.trim())) {
        return <div key={index} style={{ margin: '0.5rem 0 0.5rem 0.5rem' }}>{content}</div>;
      }

      return <p key={index} style={{ marginBottom: '0.5rem' }}>{content}</p>;
    });
  };

  return (
    <div className="agent-view animate-slide-up">
      <div className="glass-panel chat-window">
        {/* Chat Messages */}
        <div className="chat-messages">
          {chatHistory.map((msg) => (
            <div key={msg.id} className={`chat-bubble-container ${msg.sender}`}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', maxWidth: '80%' }}>
                {msg.sender === 'agent' && (
                  <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', background: 'var(--primary-glow)', border: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Bot size={16} style={{ color: 'var(--primary-light)' }} />
                  </div>
                )}
                <div className="chat-bubble">
                  {formatMessageText(msg.text)}
                  <span className="chat-bubble-time">{msg.timestamp}</span>
                </div>
                {msg.sender === 'user' && (
                  <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <User size={16} />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="chat-bubble-container agent">
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', background: 'var(--primary-glow)', border: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={16} style={{ color: 'var(--primary-light)' }} />
                </div>
                <div className="chat-bubble" style={{ display: 'flex', gap: '4px', padding: '0.75rem 1rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-secondary)', display: 'inline-block', animation: 'bounce 1.4s infinite ease-in-out both' }}></span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-secondary)', display: 'inline-block', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.2s' }}></span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-secondary)', display: 'inline-block', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.4s' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Pills */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="chat-pills-row">
            {suggestionPills.map((pill, idx) => (
              <button key={idx} className="chat-pill" onClick={() => handleSend(pill)}>
                {pill}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="chat-input-bar">
            <input
              type="text"
              className="chat-input"
              placeholder={isAiActive ? "Chat with live Google Gemini..." : "Ask about meal plans, swaps, or allergen substitutes..."}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button className="btn btn-primary" onClick={() => handleSend(input)} style={{ padding: '0.8rem 1.5rem' }}>
              <Send size={18} />
              Send
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
      `}} />
    </div>
  );
}
