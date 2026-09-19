import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  Layers, 
  ChevronDown, 
  FileText, 
  MessageSquare, 
  Calendar, 
  Folder 
} from 'lucide-react';

interface AIAssistantModalProps {
  onClose: () => void;
}

interface AIMsg {
  role: 'user' | 'assistant';
  content: string;
}

const MODELS = [
  { id: 'viola-3.8', name: 'Viola Ultra-3.8 Studio', desc: 'Creative strategy & Kurdish localized branding' },
  { id: 'gemini-flash', name: 'Gemini 2.5 Flash Production', desc: 'Rapid technical asset analysis & summaries' },
  { id: 'claude-sonnet', name: 'Claude 3.7 Sonnet Agency', desc: 'Long-form editorial & copywriting' },
];

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ onClose }) => {
  const [activeModel, setActiveModel] = useState(MODELS[0]);
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [selectedContext, setSelectedContext] = useState<string[]>(['Smart City Brief', 'Recent Chats']);
  const [messages, setMessages] = useState<AIMsg[]>([
    {
      role: 'assistant',
      content: 'Welcome to Viola Intelligence. I have direct authorized access to your active client briefs, uploaded 4K media assets, and scheduled deadlines. How can I assist your creative squad today?',
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const promptSuggestions = [
    'Analyze Smart City deliverables & milestones',
    'Draft Instagram caption for Autumn Dusk Reel',
    'Suggest Kurdish typography pairing for Haji Yaseen',
    'Generate video shooting checklist for Erbil Studio',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    const userMsg: AIMsg = { role: 'user', content: query.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Dynamic contextual response
    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      if (lower.includes('smart city')) {
        reply = `**Smart City Strategic Analysis:**\n\n1. **Current Deliverables:** Q3 Commercial Teaser (60s) is approved for sound sync. Billboard key art dusk master passed client review.\n2. **Timeline:** Final broadcast delivery is scheduled for Sep 16 at 5:00 PM.\n3. **Recommendation:** Ensure Kurdish subtitle burn-in utilizes our \`ViolaKrd-Bold\` glyph package with 42px bottom margin clearance for road viewing.`;
      } else if (lower.includes('caption') || lower.includes('reel') || lower.includes('instagram')) {
        reply = `**Autumn Campaign 2026 / Teaser Caption:**\n\n"When modern architecture meets the golden dusk of Kurdistan. 🌇✨\n\nDirect from the Viola color suite: our newly graded 60-second teaser for the Smart City brand reveal. Crafted with anamorphic optics and custom 35mm warmth.\n\n#ViolaStudio #KurdistanArchitecture #Erbil #Cinematography #BrandDesign #Production"`;
      } else if (lower.includes('typography') || lower.includes('haji')) {
        reply = `**Kurdish Typography Pairing:**\n\n• **Display / Headings:** \`ViolaKrd-Bold\` — custom geometric terminals, high optical contrast.\n• **Body / Subtitles:** \`ViolaEng-Medium\` paired with optimized Arabic Naskh ligatures.\n• **Tokens:** Set baseline ratio to 1.333 (Perfect Fourth) with 1.6 line height for legibility in print and digital billboard sequences.`;
      } else {
        reply = `I have cross-referenced your **${selectedContext.join(' and ')}** across Viola nodes. The creative parameters align with our minimalist luxury directives, and all revisions are logged to version history. What specific output should I draft next?`;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#141819] border border-zinc-800 rounded-3xl w-full max-w-xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-amber-500 text-white shadow-md">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-black text-sm text-white">Viola AI Assistant</h3>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-indigo-500/20 text-indigo-300">
                  NODE 3.8
                </span>
              </div>
              <button
                onClick={() => setShowModelPicker(!showModelPicker)}
                className="text-[11px] font-mono text-zinc-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
              >
                <span>{activeModel.name}</span>
                <ChevronDown size={12} />
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Model Picker Sheet */}
        {showModelPicker && (
          <div className="p-3 border-b border-zinc-800 bg-[#10131A] space-y-1.5 z-20">
            <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold px-1">
              Select Neural Core
            </span>
            {MODELS.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setActiveModel(m);
                  setShowModelPicker(false);
                }}
                className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                  activeModel.id === m.id
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <div>
                  <p className="text-xs font-bold">{m.name}</p>
                  <p className="text-[10px] text-zinc-500">{m.desc}</p>
                </div>
                {activeModel.id === m.id && (
                  <span className="text-xs text-amber-400 font-bold font-mono">Active</span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Context Source Selector Chips */}
        <div className="px-4 py-2 border-b border-zinc-800/80 bg-[#10131A]/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider shrink-0 mr-1">
            Context:
          </span>
          {['Smart City Brief', 'Haji Yaseen Branding', 'Recent Chats', 'Q3 Deadlines'].map((ctx) => {
            const isSelected = selectedContext.includes(ctx);
            return (
              <button
                key={ctx}
                onClick={() => {
                  setSelectedContext((prev) =>
                    prev.includes(ctx) ? prev.filter((x) => x !== ctx) : [...prev, ctx]
                  );
                }}
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                }`}
              >
                {isSelected ? `✓ ${ctx}` : `+ ${ctx}`}
              </button>
            );
          })}
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Bot size={15} />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%] whitespace-pre-wrap select-text ${
                  msg.role === 'user'
                    ? 'bg-amber-500 text-zinc-950 font-medium rounded-br-xs shadow-md'
                    : 'bg-[#181D27] border border-zinc-800 text-zinc-200 rounded-bl-xs'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono pl-9">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Viola Intelligence thinking...</span>
            </div>
          )}
        </div>

        {/* Prompt Suggestions */}
        <div className="px-4 py-2 border-t border-zinc-800 bg-[#10131A] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {promptSuggestions.map((sugg, i) => (
            <button
              key={i}
              onClick={() => handleSend(sugg)}
              className="px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 text-[11px] font-medium whitespace-nowrap transition-colors"
            >
              {sugg}
            </button>
          ))}
        </div>

        {/* Message Input Dock */}
        <div className="p-3 border-t border-zinc-800 bg-[#141819] flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Ask Viola AI about strategy, copy, Kurdish typography, or briefs..."
            className="flex-1 px-4 py-2.5 rounded-full border border-zinc-800 bg-[#0A0A0B] text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="p-2.5 rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-zinc-950 font-bold transition-all shadow-md"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
