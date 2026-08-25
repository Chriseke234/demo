'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, X, ArrowRight } from 'lucide-react';
import WhatsAppButton from '../WhatsAppButton';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isLeadCapture?: boolean;
}

interface ConciergePanelProps {
  onClose: () => void;
  isFullScreen?: boolean;
}

export default function ConciergePanel({ onClose, isFullScreen = false }: ConciergePanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Good evening. I\'m Aurelia, your digital concierge. Whether you are planning your stay or already with us, I\'m here to help make your time at Aurelia Grand extraordinary.'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [context, setContext] = useState<any>({});
  
  // Lead Capture State
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCaptured, setLeadCaptured] = useState(false);

  // Questionnaire State
  const [qStep, setQStep] = useState(0); // 0 = off, 1 = guests, 2 = view, 3 = occasion
  const [qAnswers, setQAnswers] = useState({
    who: '',
    importance: '',
    celebrating: ''
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize Session ID
  useEffect(() => {
    let sid = sessionStorage.getItem('aurelia_session_id');
    if (!sid) {
      sid = 'session-' + Math.random().toString(36).substring(2, 11);
      sessionStorage.setItem('aurelia_session_id', sid);
    }
    setSessionId(sid);

    // Call API once to log entry event
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({ eventName: 'concierge_opened', sessionId: sid }),
      headers: { 'Content-Type': 'application/json' }
    }).catch(err => {});
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, qStep, showLeadForm]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsgId = 'msg-' + Date.now();
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', content: text }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId })
      });
      const data = await res.json();

      if (res.ok) {
        setMessages(prev => [...prev, { id: 'reply-' + Date.now(), role: 'assistant', content: data.reply }]);
        setContext(data.context || {});

        // Trigger lead form if booking intent detected
        if (data.status === 'booking_intent' && !leadCaptured) {
          setShowLeadForm(true);
        }
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: 'error-' + Date.now(),
          role: 'assistant',
          content: 'I\'m having a little trouble connecting right now. You can continue speaking with our team on WhatsApp if you\'d like.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleStartQuestionnaire = () => {
    setQStep(1);
  };

  const handleQOptionSelect = (key: string, value: string) => {
    setQAnswers(prev => ({ ...prev, [key]: value }));
    setQStep(prev => prev + 1);
  };

  // Compile Questionnaire Answers
  useEffect(() => {
    if (qStep === 4) {
      setQStep(0);
      const text = `Help me choose a room. I am travelling with ${qAnswers.who}. What is most important to me is ${qAnswers.importance}. We are celebrating ${qAnswers.celebrating}. What would you recommend?`;
      handleSendMessage(text);
    }
  }, [qStep, qAnswers]);

  // Handle Lead Form Submission
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) return;

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          name: leadName,
          email: leadEmail,
          phone: leadPhone,
          interest: context.roomInterest || 'Stay inquiry',
          checkIn: context.checkIn || null,
          checkOut: context.checkOut || null,
          guests: context.guests || null
        })
      });
      if (res.ok) {
        setLeadCaptured(true);
        setShowLeadForm(false);
        setMessages(prev => [
          ...prev,
          {
            id: 'lead-success-' + Date.now(),
            role: 'assistant',
            content: `Thank you, ${leadName}. I have shared your details with our reservations team. You can also click the button below to transition this conversation directly to WhatsApp.`
          }
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Compile pre-filled WhatsApp message
  const getWhatsAppMessage = () => {
    const nameStr = context.guestName ? `I'm ${context.guestName}. ` : "";
    const datesStr = context.checkIn && context.checkOut ? `planning a stay from ${context.checkIn} to ${context.checkOut} ` : "";
    const guestsStr = context.guests ? `for ${context.guests} guests` : "";
    const roomStr = context.roomInterest ? `interest in ${context.roomInterest}` : "planning my stay";
    
    return `Hi Aurelia Grand, ${nameStr}I am ${datesStr}${guestsStr}. Aurelia recommended the ${roomStr} and I'd like to continue discussing availability.`;
  };

  const suggestions = [
    "Plan a 3-day stay",
    "Tell me about dining",
    "What can we do nearby?",
    "Do you offer airport transfers?"
  ];

  return (
    <div className={`flex flex-col bg-aurelia-bg shadow-2xl border border-aurelia-sandDark/40 transition-all duration-300 ${
      isFullScreen 
        ? 'w-full h-full' 
        : 'w-full max-w-[460px] h-[650px] rounded-lg overflow-hidden'
    }`}>
      
      {/* Header */}
      <div className="bg-aurelia-charcoal text-white px-6 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full border border-aurelia-gold/30 flex items-center justify-center bg-aurelia-charcoal">
              <span className="font-serif text-lg text-aurelia-gold font-light">A</span>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-aurelia-charcoal" />
          </div>
          <div>
            <h3 className="font-serif text-sm tracking-wider uppercase">Aurelia</h3>
            <p className="text-[10px] text-white/60 tracking-widest uppercase">Digital Concierge · Online</p>
          </div>
        </div>
        {!isFullScreen && (
          <button 
            onClick={onClose} 
            className="text-white/60 hover:text-white transition-colors focus:outline-none"
            aria-label="Close concierge"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-aurelia-bg">
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            {msg.role !== 'user' && (
              <div className="w-8 h-8 rounded-full border border-aurelia-gold/20 flex items-center justify-center bg-aurelia-sand text-aurelia-gold text-xs mr-3 mt-1 flex-shrink-0">
                A
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 text-xs md:text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-aurelia-charcoal text-white rounded-l-lg rounded-tr-lg'
                  : 'bg-aurelia-sand text-aurelia-text rounded-r-lg rounded-tl-lg border border-aurelia-sandDark/40'
              }`}
              dangerouslySetInnerHTML={{ __html: msg.content }}
            />
          </div>
        ))}

        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex justify-start items-center space-x-2 animate-pulse pl-11">
            <div className="w-2 h-2 rounded-full bg-aurelia-gold" />
            <div className="w-2 h-2 rounded-full bg-aurelia-gold/70" />
            <div className="w-2 h-2 rounded-full bg-aurelia-gold/45" />
          </div>
        )}

        {/* Conversational Room Questionnaire Step 1: Who */}
        {qStep === 1 && (
          <div className="bg-aurelia-sand p-5 border border-aurelia-gold/30 rounded-lg space-y-4 animate-fade-in ml-11">
            <h4 className="font-serif text-xs md:text-sm text-aurelia-charcoal tracking-wide">Who are you travelling with?</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Myself', val: 'myself' },
                { label: 'A Couple', val: 'a couple' },
                { label: 'With Children', val: 'my family' },
                { label: 'Business Partner', val: 'a business associate' }
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => handleQOptionSelect('who', opt.val)}
                  className="p-3 text-left border border-aurelia-sandDark bg-aurelia-bg hover:border-aurelia-gold hover:bg-aurelia-sand transition-all text-xs"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Questionnaire Step 2: Priority */}
        {qStep === 2 && (
          <div className="bg-aurelia-sand p-5 border border-aurelia-gold/30 rounded-lg space-y-4 animate-fade-in ml-11">
            <h4 className="font-serif text-xs md:text-sm text-aurelia-charcoal tracking-wide">What is most important to you?</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Beautiful View', val: 'a breathtaking view' },
                { label: 'Generous Space', val: 'extra room and space' },
                { label: 'Complete Privacy', val: 'privacy and seclusion' },
                { label: 'Convenient Desk', val: 'work conveniences' }
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => handleQOptionSelect('importance', opt.val)}
                  className="p-3 text-left border border-aurelia-sandDark bg-aurelia-bg hover:border-aurelia-gold hover:bg-aurelia-sand transition-all text-xs"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Questionnaire Step 3: Occasion */}
        {qStep === 3 && (
          <div className="bg-aurelia-sand p-5 border border-aurelia-gold/30 rounded-lg space-y-4 animate-fade-in ml-11">
            <h4 className="font-serif text-xs md:text-sm text-aurelia-charcoal tracking-wide">Are you celebrating an occasion?</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Anniversary / Honeymoon', val: 'our anniversary' },
                { label: 'A Birthday', val: 'a birthday' },
                { label: 'Relaxed Getaway', val: 'a relaxed getaway' },
                { label: 'Business Trip', val: 'a professional trip' }
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => handleQOptionSelect('celebrating', opt.val)}
                  className="p-3 text-left border border-aurelia-sandDark bg-aurelia-bg hover:border-aurelia-gold hover:bg-aurelia-sand transition-all text-xs"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Lead Capture Modal / Panel */}
        {showLeadForm && (
          <div className="bg-aurelia-sand p-5 border border-aurelia-gold/30 rounded-lg space-y-4 animate-fade-in ml-11">
            <div className="space-y-1">
              <h4 className="font-serif text-xs md:text-sm text-aurelia-charcoal tracking-wide uppercase">Connect with Reservations</h4>
              <p className="text-[10px] text-aurelia-text/75 leading-relaxed">
                To explore booking availability or finalize plans, please provide your contact details:
              </p>
            </div>
            <form onSubmit={handleLeadSubmit} className="space-y-3">
              <div>
                <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full bg-aurelia-bg border border-aurelia-sandDark/60 p-2 text-xs focus:outline-none focus:border-aurelia-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="w-full bg-aurelia-bg border border-aurelia-sandDark/60 p-2 text-xs focus:outline-none focus:border-aurelia-gold"
                  />
                </div>
                <div>
                  <label className="block text-[9px] tracking-widest uppercase font-semibold text-aurelia-charcoal mb-1">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="w-full bg-aurelia-bg border border-aurelia-sandDark/60 p-2 text-xs focus:outline-none focus:border-aurelia-gold"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-aurelia-charcoal text-white hover:bg-aurelia-gold py-2.5 text-[10px] tracking-widest uppercase transition-colors"
              >
                Send Request
              </button>
            </form>
          </div>
        )}

        {/* WhatsApp Link Continuity Banner */}
        {context.roomInterest && !showLeadForm && (
          <div className="p-4 bg-[#25d366]/10 border border-[#25d366]/20 rounded-lg space-y-2 ml-11 text-xs text-aurelia-text">
            <p className="text-[11px]">
              Carry this request directly to WhatsApp for rapid check-in assistance and personalized room booking:
            </p>
            <WhatsAppButton 
              message={getWhatsAppMessage()} 
              text="Send Details to WhatsApp"
              variant="primary" 
              className="w-full text-[10px] py-2"
            />
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Prompts Section */}
      {messages.length === 1 && qStep === 0 && (
        <div className="px-6 pb-2 space-y-2">
          <button
            onClick={handleStartQuestionnaire}
            className="w-full flex items-center justify-between p-3 border border-aurelia-gold/30 bg-aurelia-sand hover:bg-aurelia-sandDark transition-colors text-xs text-left group"
          >
            <span className="font-serif text-aurelia-charcoal font-medium">Help me choose a room</span>
            <ArrowRight className="w-3.5 h-3.5 text-aurelia-gold group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="grid grid-cols-2 gap-2">
            {suggestions.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handlePromptClick(prompt)}
                className="p-2 border border-aurelia-sandDark bg-white hover:border-aurelia-gold hover:bg-aurelia-sand text-left text-[11px] text-aurelia-text/90 line-clamp-1 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputValue);
        }}
        className="p-4 bg-white border-t border-aurelia-sandDark/40 flex items-center space-x-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading || qStep > 0}
          placeholder={qStep > 0 ? "Please make a selection above..." : "Ask about suites, dining, spa, etc..."}
          className="flex-1 bg-aurelia-sand border border-aurelia-sandDark/60 p-3 text-xs md:text-sm focus:outline-none focus:border-aurelia-gold disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim() || qStep > 0}
          className="p-3 bg-aurelia-charcoal text-white hover:bg-aurelia-gold disabled:opacity-30 disabled:hover:bg-aurelia-charcoal transition-colors focus:outline-none"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Powered brand label */}
      <div className="bg-aurelia-sand py-2 text-center border-t border-aurelia-sandDark/20">
        <span className="text-[8px] tracking-[0.2em] uppercase text-aurelia-gold font-medium">
          Powered by Aurelia Grand Concierge
        </span>
      </div>

    </div>
  );
}
