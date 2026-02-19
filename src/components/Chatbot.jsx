import React, { useState, useRef, useEffect } from 'react';
import { getChatCompletion } from '../services/groq';
import { historyService } from '../services/historyService';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Greetings! I can recount the history of the day. Pray, ask me anything!' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [systemContext, setSystemContext] = useState('');

    // Resizable State
    const [width, setWidth] = useState(384); // Default w-96 (24rem = 384px)
    const [height, setHeight] = useState(450); // Slightly taller default
    const [isResizing, setIsResizing] = useState(false);

    const messagesEndRef = useRef(null);
    const chatWindowRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Auto-scroll when messages change or chat opens
    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    // Fetch History Context on Mount
    useEffect(() => {
        const fetchHistoryContext = async () => {
            const now = new Date();
            const currentMonth = now.getMonth() + 1;
            const currentDay = now.getDate();

            try {
                const events = await historyService.getEventsByDate(currentMonth, currentDay);

                if (events && events.length > 0) {
                    const eventList = events.map(e => `• [${e.year || 'Unknown Year'}] ${e.description}`).join('\n');
                    const context = `You are a helpful historian assistant named "The Historian". 
Today is ${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}.
Here are the notable historical events that happened on this day:
${eventList}

Use this information to answer user questions about today's history. If asked about something else, answer based on your general knowledge. Maintain a slightly formal, vintage, and knowledgeable tone.`;
                    setSystemContext(context);
                } else {
                    setSystemContext(`You are a helpful historian assistant named "The Historian". Today is ${now.toLocaleDateString()}. I don't have specific data for today, so rely on your general knowledge.`);
                }
            } catch (err) {
                console.error("Failed to fetch history context:", err);
                setSystemContext("You are a helpful historian assistant.");
            }
        };

        fetchHistoryContext();
    }, []);

    // Handle Resize Logic
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing) return;

            // Calculate new dimensions based on mouse position
            // Since it's bottom-right anchored, resizing "up-left" means:
            // Width increases as mouse moves left (decrease in clientX)
            // Height increases as mouse moves up (decrease in clientY)

            // We need the initial position, but simpler is to use the window right/bottom edge
            // A more robust way:
            const chatRect = chatWindowRef.current?.getBoundingClientRect();
            if (!chatRect) return;

            // Calculate new width: distance from right edge of viewport to mouse X
            const newWidth = window.innerWidth - e.clientX - 24; // 24px is right-6 margin
            // Calculate new height: distance from bottom edge of viewport to mouse Y
            const newHeight = window.innerHeight - e.clientY - 24; // 24px is bottom-6 margin

            // Apply constraints
            if (newWidth > 300 && newWidth < 800) setWidth(newWidth);
            if (newHeight > 400 && newHeight < 800) setHeight(newHeight);
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            document.body.style.cursor = 'default';
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'nwse-resize';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'default';
        };
    }, [isResizing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Prepare history for context with system prompt first
            const conversation = [];
            if (systemContext) {
                conversation.push({ role: 'system', content: systemContext });
            }

            // Add existing messages
            messages.forEach(m => conversation.push({ role: m.role, content: m.content }));

            // Add current user message
            conversation.push(userMessage);

            const response = await getChatCompletion(conversation);
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Alas, I am unable to connect at this moment." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-body">
            {/* Chat Window */}
            {isOpen && (
                <div
                    ref={chatWindowRef}
                    style={{ width: `${width}px`, height: `${height}px` }}
                    className="mb-4 bg-paper dark:bg-ink rounded-sm shadow-2xl border-4 border-ink flex flex-col overflow-hidden transition-all duration-75 relative"
                >

                    {/* Resize Handle (Top-Left) */}
                    <div
                        className="absolute top-0 left-0 w-6 h-6 z-50 cursor-nwse-resize flex items-start justify-start p-1 opacity-50 hover:opacity-100 transition-opacity"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            setIsResizing(true);
                        }}
                    >
                        <div className="w-0 h-0 border-t-[8px] border-l-[8px] border-t-transparent border-l-gold-dipped transform rotate-0" />
                    </div>

                    {/* Photo Corners */}
                    {/* Top Right */}
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-gold-dipped z-10 pointer-events-none"></div>
                    {/* Bottom Left */}
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-gold-dipped z-10 pointer-events-none"></div>
                    {/* Bottom Right */}
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-gold-dipped z-10 pointer-events-none"></div>

                    {/* Header */}
                    <div
                        className="bg-ink p-3 flex justify-between items-center border-b-2 border-gold-muted cursor-move"
                    // Optional: Add drag to move entire window logic here later if requested
                    >
                        <h3 className="text-gold font-display tracking-wider flex items-center gap-2 uppercase text-sm select-none pl-4">
                            <img src="/images/chatbot_logo.png" alt="Historian" className="w-6 h-6 rounded-full object-cover" />
                            Historian
                        </h3>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gold-muted hover:text-gold transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-paper-light">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-sm p-3 shadow-sm border ${msg.role === 'user'
                                        ? 'bg-ink text-paper border-gold-muted'
                                        : 'bg-paper text-ink border-ink-muted'
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-paper text-ink rounded-sm p-3 shadow-sm border border-ink-muted">
                                    <Loader2 className="w-5 h-5 animate-spin text-ink" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-3 bg-paper border-t-2 border-ink-muted">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Inquire about history..."
                                className="flex-1 px-3 py-2 border-2 border-ink-muted bg-paper-light text-ink placeholder-ink-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-body"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="p-2 bg-ink text-gold border-2 border-transparent hover:border-gold hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-16 h-16 bg-ink border-4 border-ink rounded-sm shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                aria-label="Toggle chat"
                style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.3), inset 0 0 12px rgba(201,169,97,0.15)' }}
            >
                {/* Photo Corner Accents */}
                <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold pointer-events-none"></span>
                <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold pointer-events-none"></span>
                <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gold pointer-events-none"></span>
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold pointer-events-none"></span>

                {isOpen ? (
                    <X size={26} className="text-gold mx-auto" />
                ) : (
                    <img
                        src="/images/chatbot_logo.png"
                        alt="Chat"
                        className="w-full h-full object-cover rounded-[1px] opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                )}
            </button>
        </div>
    );
};

export default Chatbot;
