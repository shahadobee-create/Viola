import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Trash2, 
  Bell, 
  Send, 
  Sparkles, 
  Check, 
  Copy,
  Plus,
  Mic,
  MicOff,
  Brain,
  Layers,
  Image as ImageIcon,
  FileText,
  Download,
  Share2,
  RefreshCw,
  Sliders,
  ChevronDown,
  X
} from 'lucide-react';
import { DigitalArtOrb } from './DigitalArtOrb';

interface AIMsg {
  id: string;
  sender: 'viola' | 'user';
  text: string;
  time: string;
  generatedArtUrl?: string;
  artPrompt?: string;
}

interface ViolaAIViewProps {
  onOpenNotifications: () => void;
  unreadNotifCount?: number;
}

const PRESET_SUGGESTIONS = [
  { label: 'Create 3D Iridescent Orb Art', prompt: 'Create 3D iridescent violet orb digital art with twisting spiral ribs for luxury branding' },
  { label: 'Draft luxury boutique guidelines', prompt: 'Draft luxury boutique brand guidelines with typography and tone of voice' },
  { label: 'Suggest cinematic video shotlist', prompt: 'Suggest cinematic video shotlist for our upcoming commercial campaign' },
  { label: 'Generate luxury perfume visual', prompt: 'Generate luxury fragrance bottle 3D rendering with gold accents and dark glass' },
];

const CURATED_GENERATED_ARTS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=85'
];

export const ViolaAIView: React.FC<ViolaAIViewProps> = ({
  onOpenNotifications,
  unreadNotifCount = 3,
}) => {
  // Chat & Stream State
  const [messages, setMessages] = useState<AIMsg[]>([
    {
      id: 'm_welcome',
      sender: 'viola',
      text: 'Welcome to Viola AI Studio. I specialize in luxury brand architectures, generative 3D digital art, high-conversion commercial campaign shotlists, and bespoke visual identities. What would you like to create today?',
      time: '12:00 PM',
    },
  ]);

  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('Please stand by...');
  
  // Interactive Box Controls
  const [isThinkActive, setIsThinkActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isWaveActive, setIsWaveActive] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'Gemini 2.5 Flash' | 'Gemini 2.5 Pro' | 'Viola Art Engine'>('Gemini 2.5 Flash');
  const [showModelPicker, setShowModelPicker] = useState(false);

  // Active View Tab: 'studio' (Hero Motion + Input) or 'stream' (Chat History)
  const [viewMode, setViewMode] = useState<'studio' | 'stream'>('studio');
  const [lastCreatedArt, setLastCreatedArt] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  // Voice recording mock simulation
  const handleToggleMic = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setInput('Draft 4K holographic digital art for Viola Studio...');
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  };

  // Waveform Audio Mode Toggle
  const handleToggleVoiceWave = () => {
    setIsWaveActive(!isWaveActive);
    if (!isWaveActive) {
      setInput('Create a 3D iridescent violet orb digital art with twisting spiral ribs...');
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `m_${Date.now()}`,
        sender: 'viola',
        text: 'Studio canvas reset. What visual directive shall we formulate next?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setLastCreatedArt(null);
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isGenerating) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: AIMsg = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      time: now,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    // Progressive generation steps
    setGenerationStep('Synthesizing Kurdish luxury geometry...');
    setTimeout(() => {
      setGenerationStep('Computing iridescent volumetric lighting & spiral harmonics...');
    }, 900);
    setTimeout(() => {
      setGenerationStep('Finalizing 4K digital art rendering...');
    }, 1800);

    setTimeout(() => {
      let reply = '';
      let generatedArt: string | undefined = undefined;
      const lower = query.toLowerCase();

      const isArtRequest = 
        lower.includes('art') || 
        lower.includes('orb') || 
        lower.includes('render') || 
        lower.includes('create') || 
        lower.includes('generate') ||
        lower.includes('visual') ||
        lower.includes('3d');

      if (isArtRequest) {
        const artIndex = Math.floor(Math.random() * CURATED_GENERATED_ARTS.length);
        generatedArt = CURATED_GENERATED_ARTS[artIndex];
        setLastCreatedArt(generatedArt);

        reply = `**Digital Art Synthesized:** "${query}"\n\n• **Style:** Iridescent Parametric 3D Torus\n• **Palette:** Violet Noir (#0A0518), Royal Indigo (#7026ED), Electric Lilac (#D8B4FE)\n• **Volumetric Lighting:** 360° Anamorphic Fresnel Glare with internal rib luminescence\n• **Engine:** ${selectedModel}${isThinkActive ? ' (Deep Reasoning Mode Active)' : ''}\n\nYour 4K asset is ready for deployment across Viola agency client presentations and billboard sequences.`;
      } else if (lower.includes('boutique') || lower.includes('brand') || lower.includes('guidelines')) {
        reply = `**Viola Brand Directive Blueprint:**\n\n1. **Core Philosophy:** Understated grandeur. Every visual asset must embody negative space as an intentional luxury token.\n2. **Typographic Hierarchy:**\n   • Display: \`Viola Display Black\` at 1.333 scale ratio.\n   • Body: \`Viola Sans Light\` with 1.65 line height.\n3. **Color Palette:** Pure Noir (#0C0812), Warm Amber (#F59E0B), and Pearl White (#FAF7FC).\n4. **Deliverable:** Full vector manual logged to your Client Assets portal.`;
      } else if (lower.includes('cinematic') || lower.includes('shotlist') || lower.includes('video')) {
        reply = `**Commercial Video Shotlist (60s Master):**\n\n• **Scene 01 [0:00 - 0:08]:** Extreme close-up of tactile materials under 3200K warm tungsten key light. Anamorphic lens flare, 60fps slow ramp.\n• **Scene 02 [0:08 - 0:24]:** Architectural macro dolly in. Ultra-minimalist geometric curves.\n• **Scene 03 [0:24 - 0:45]:** Talented artisan in motion. Sub-bass audio sweep with gentle cello crescendo.\n• **Scene 04 [0:45 - 1:00]:** Viola emblem reveal on onyx slate, ending on gold foil tag.`;
      } else {
        reply = `I have processed your directive for "${query}". Cross-referencing our brand repository with ${selectedModel}, I have formulated a dual-phase creative execution plan with tailored moodboards and typography specifications.`;
      }

      const aiMessage: AIMsg = {
        id: `ai_${Date.now()}`,
        sender: 'viola',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        generatedArtUrl: generatedArt,
        artPrompt: isArtRequest ? query : undefined,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsGenerating(false);
      setGenerationStep('Please stand by...');
    }, 2500);
  };

  const handleCopyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#05030A] overflow-hidden text-white font-sans antialiased relative">
      
      {/* Top Header */}
      <header className="px-5 sm:px-7 pt-4 pb-3 flex items-center justify-between border-b border-white/5 bg-[#080410]/80 backdrop-blur-md shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#181128] border border-[#7026ED]/40 flex items-center justify-center text-[#A78BFA] shadow-sm shadow-[#7026ED]/20">
            <Sparkles size={17} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white font-display">
                Viola AI
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-[#7026ED]/20 border border-[#7026ED]/50 text-[#C4B5FD] text-[9.5px] font-mono font-bold tracking-wider uppercase">
                STUDIO v3.8
              </span>
            </div>
          </div>
        </div>

        {/* View Switcher & Action Controls */}
        <div className="flex items-center gap-2">
          {/* Studio vs Chat toggle pills */}
          <div className="bg-[#151022] p-0.5 rounded-full border border-white/10 flex items-center text-xs">
            <button
              onClick={() => setViewMode('studio')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                viewMode === 'studio'
                  ? 'bg-[#7026ED] text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Studio
            </button>
            <button
              onClick={() => setViewMode('stream')}
              className={`px-3 py-1 rounded-full font-medium transition-all flex items-center gap-1 ${
                viewMode === 'stream'
                  ? 'bg-[#7026ED] text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span>Chat</span>
              {messages.length > 1 && (
                <span className="w-4 h-4 rounded-full bg-white/20 text-[10px] flex items-center justify-center font-bold">
                  {messages.length}
                </span>
              )}
            </button>
          </div>

          <button
            onClick={handleClearHistory}
            className="w-9 h-9 rounded-full bg-[#151022] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Reset canvas & history"
          >
            <Trash2 size={15} />
          </button>

          <button
            onClick={onOpenNotifications}
            className="w-9 h-9 rounded-full bg-[#151022] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white relative transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell size={16} />
            {unreadNotifCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow-md">
                {unreadNotifCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content View */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pb-32">
        {viewMode === 'studio' ? (
          
          /* ========================================================================= */
          /* DIGITAL ART STUDIO (Exact Match to Video Motion + Uploaded Input Box) */
          /* ========================================================================= */
          <div className="max-w-xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-300">
            
            {/* Top Headline from Video */}
            <div className="space-y-1 select-none">
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-white font-sans">
                We are creating your digital art.
              </h2>
            </div>

            {/* Central Animated 3D Iridescent Ribbed Orb Motion from Video */}
            <div className="relative my-2 flex items-center justify-center">
              <DigitalArtOrb 
                isGenerating={isGenerating} 
                size={270} 
              />

              {/* Glowing halo pulse */}
              <div className="absolute inset-0 rounded-full bg-[#7026ED]/15 blur-2xl pointer-events-none -z-10" />
            </div>

            {/* Sub-label from Video: "Please stand by..." */}
            <div className="h-6 flex items-center justify-center">
              <p className={`text-sm sm:text-[15px] font-light tracking-wide transition-all ${
                isGenerating 
                  ? 'text-[#C4B5FD] animate-pulse font-medium' 
                  : 'text-zinc-400/90'
              }`}>
                {generationStep}
              </p>
            </div>

            {/* Space divider before the input section */}
            <div className="w-full pt-4 space-y-3">
              
              {/* Centered Heading from Uploaded Image: "What's on your mind today?" */}
              <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-white font-sans select-none">
                What’s on your mind today?
              </h3>

              {/* Pill Prompt Box from Uploaded Image */}
              <div className="relative w-full max-w-2xl mx-auto">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className={`w-full rounded-full bg-[#18171F] border transition-all duration-200 shadow-2xl flex items-center px-2 sm:px-3 py-1.5 ${
                    isGenerating
                      ? 'border-[#7026ED] ring-2 ring-[#7026ED]/30'
                      : isThinkActive
                      ? 'border-purple-500/50 ring-1 ring-purple-500/20'
                      : 'border-white/10 hover:border-white/20 focus-within:border-[#7026ED]/70 focus-within:ring-2 focus-within:ring-[#7026ED]/20'
                  }`}
                >
                  
                  {/* Left: Plus (+) Icon Button */}
                  <div className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowAttachMenu(!showAttachMenu)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer active:scale-95"
                      title="Attach resources or style tokens"
                    >
                      <Plus size={19} strokeWidth={2.2} />
                    </button>

                    {/* Popover Menu for (+) */}
                    {showAttachMenu && (
                      <div className="absolute left-0 bottom-12 w-56 rounded-2xl bg-[#1D1A27] border border-white/10 p-2 shadow-2xl z-30 space-y-1 text-left animate-in fade-in slide-in-from-bottom-2 duration-150">
                        <span className="text-[10px] font-bold text-zinc-400 px-2 py-1 block uppercase tracking-wider">
                          Context & Art Directives
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setInput('Generate 3D luxury perfume bottle digital art with iridescent violet glass');
                            setShowAttachMenu(false);
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg text-xs text-zinc-300 hover:text-white hover:bg-white/10 flex items-center gap-2 text-left"
                        >
                          <ImageIcon size={14} className="text-[#8B5CF6]" />
                          <span>3D Product Render</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setInput('Synthesize Kurdish geometric patterns into minimalist vector branding');
                            setShowAttachMenu(false);
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg text-xs text-zinc-300 hover:text-white hover:bg-white/10 flex items-center gap-2 text-left"
                        >
                          <Layers size={14} className="text-emerald-400" />
                          <span>Kurdish Geometry</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setInput('Draft luxury boutique brand guidelines with typography and tone of voice');
                            setShowAttachMenu(false);
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg text-xs text-zinc-300 hover:text-white hover:bg-white/10 flex items-center gap-2 text-left"
                        >
                          <FileText size={14} className="text-amber-400" />
                          <span>Brand Brief Tokens</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Center: "Ask anything" Input Text Field */}
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything"
                    className="flex-1 bg-transparent border-none text-xs sm:text-sm text-white placeholder-zinc-400 px-2.5 py-2 focus:outline-none focus:ring-0 min-w-0"
                  />

                  {/* Right Side Controls matching the Image */}
                  <div className="flex items-center gap-1 sm:gap-2 shrink-0 pr-1">
                    
                    {/* (G) Gemini Model Selector Badge */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowModelPicker(!showModelPicker)}
                        className="w-7 h-7 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 flex items-center justify-center text-white shadow-xs cursor-pointer active:scale-95 transition-all"
                        title={`Model: ${selectedModel}`}
                      >
                        <span className="font-extrabold text-[12px] font-sans">G</span>
                      </button>

                      {showModelPicker && (
                        <div className="absolute right-0 bottom-11 w-52 rounded-2xl bg-[#1D1A27] border border-white/10 p-2 shadow-2xl z-30 space-y-1 text-left animate-in fade-in slide-in-from-bottom-2 duration-150">
                          <span className="text-[10px] font-bold text-zinc-400 px-2 py-1 block uppercase tracking-wider">
                            Select Model
                          </span>
                          {(['Gemini 2.5 Flash', 'Gemini 2.5 Pro', 'Viola Art Engine'] as const).map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => {
                                setSelectedModel(m);
                                setShowModelPicker(false);
                              }}
                              className={`w-full px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                                selectedModel === m
                                  ? 'bg-[#7026ED] text-white font-bold'
                                  : 'text-zinc-300 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              <span>{m}</span>
                              {selectedModel === m && <Check size={13} />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* {🧠} Think Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setIsThinkActive(!isThinkActive)}
                      className={`px-2.5 py-1 rounded-full text-[11.5px] font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                        isThinkActive
                          ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50 shadow-xs shadow-purple-500/20'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
                      }`}
                      title="Toggle Deep Reasoning Mode"
                    >
                      <Brain size={14} className={isThinkActive ? 'text-purple-400 animate-pulse' : 'text-zinc-400'} />
                      <span className="hidden xs:inline">Think</span>
                    </button>

                    {/* Microphone Icon Button */}
                    <button
                      type="button"
                      onClick={handleToggleMic}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                        isListening
                          ? 'bg-rose-500 text-white animate-bounce shadow-md shadow-rose-500/30'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                      title={isListening ? 'Listening...' : 'Voice Input'}
                    >
                      <Mic size={16} />
                    </button>

                    {/* Blue Circular Waveform Button from Image */}
                    <button
                      type="button"
                      onClick={handleToggleVoiceWave}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95 ${
                        isWaveActive || isGenerating
                          ? 'bg-[#0070F3] ring-2 ring-[#0070F3]/40'
                          : 'bg-[#0284C7] hover:bg-[#0369A1]'
                      }`}
                      title="Audio Waveform / Live Mode"
                    >
                      <div className="flex items-center gap-[2.5px] h-3.5">
                        <span className={`w-[2px] bg-white rounded-full ${isGenerating || isWaveActive ? 'animate-pulse h-3.5' : 'h-2'}`} />
                        <span className={`w-[2px] bg-white rounded-full ${isGenerating || isWaveActive ? 'animate-pulse h-4' : 'h-3.5'}`} style={{ animationDelay: '100ms' }} />
                        <span className={`w-[2px] bg-white rounded-full ${isGenerating || isWaveActive ? 'animate-pulse h-2.5' : 'h-2.5'}`} style={{ animationDelay: '200ms' }} />
                        <span className={`w-[2px] bg-white rounded-full ${isGenerating || isWaveActive ? 'animate-pulse h-3.5' : 'h-3'}`} style={{ animationDelay: '300ms' }} />
                      </div>
                    </button>

                  </div>
                </form>
              </div>

              {/* Think Mode Active Badge */}
              {isThinkActive && (
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-purple-400/90 font-mono animate-in fade-in">
                  <Brain size={12} className="animate-spin" />
                  <span>Deep Reasoning & Style Token Formulation active</span>
                </div>
              )}

              {/* Preset Suggestion Chips */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
                {PRESET_SUGGESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.prompt)}
                    className="px-3 py-1.5 rounded-full bg-[#161220] hover:bg-[#201B30] border border-white/5 hover:border-white/15 text-[11px] text-zinc-300 hover:text-white transition-all cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

            </div>

            {/* Generated Art Showcase (if any artwork was generated in this session) */}
            {lastCreatedArt && (
              <div className="w-full pt-6 space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#A78BFA]" />
                    Latest Generated 4K Asset
                  </span>
                  <button
                    onClick={() => setViewMode('stream')}
                    className="text-xs text-[#A78BFA] hover:underline"
                  >
                    View in Chat Stream →
                  </button>
                </div>

                <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#120E1C] relative group shadow-2xl">
                  <img
                    src={lastCreatedArt}
                    alt="Synthesized 4K Digital Art"
                    className="w-full h-56 sm:h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-white/70 uppercase">
                        VIOLA GENERATIVE ENGINE
                      </span>
                      <p className="text-xs font-bold text-white">
                        4K Iridescent Digital Art Master
                      </p>
                    </div>

                    <a
                      href={lastCreatedArt}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-white text-zinc-950 font-bold text-xs shadow-md hover:bg-zinc-200 transition-colors"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            )}

          </div>

        ) : (

          /* ========================================================================= */
          /* CHAT STREAM & CONSULTANT HISTORY */
          /* ========================================================================= */
          <div className="max-w-xl mx-auto px-4 sm:px-6 pt-4 space-y-4">
            
            {/* Header Mini Orb Banner */}
            <div className="p-4 rounded-3xl bg-[#141022] border border-white/10 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-black/40 shrink-0 flex items-center justify-center border border-[#7026ED]/30">
                <DigitalArtOrb isGenerating={isGenerating} size={56} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Viola Intelligence Studio</h3>
                <p className="text-xs text-zinc-400">
                  Model: {selectedModel} {isThinkActive ? '• Deep Think Mode' : ''}
                </p>
              </div>
            </div>

            {/* Conversation Bubbles */}
            <div className="space-y-4 pt-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 items-start ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'viola' && (
                    <div className="w-8 h-8 rounded-full bg-[#1E1730] border border-[#7026ED]/40 flex items-center justify-center text-[#A78BFA] shrink-0 mt-0.5">
                      <Bot size={16} />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-3xl p-4 text-xs sm:text-[13px] leading-relaxed shadow-lg relative ${
                      msg.sender === 'user'
                        ? 'bg-[#7026ED] text-white rounded-br-xs'
                        : 'bg-[#151020] border border-white/10 text-zinc-200 rounded-bl-xs'
                    }`}
                  >
                    {/* Generated Art Card inside the message */}
                    {msg.generatedArtUrl && (
                      <div className="mb-3 rounded-2xl overflow-hidden border border-white/10 shadow-md">
                        <img
                          src={msg.generatedArtUrl}
                          alt="Generated Digital Art"
                          className="w-full h-44 object-cover"
                        />
                      </div>
                    )}

                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mt-2.5 pt-1 border-t border-white/5">
                      <span>{msg.time}</span>
                      {msg.sender === 'viola' && (
                        <button
                          onClick={() => handleCopyText(msg.text)}
                          className="hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          {copiedText ? <Check size={11} /> : <Copy size={11} />}
                          <span>{copiedText ? 'Copied' : 'Copy'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isGenerating && (
                <div className="flex gap-3 items-start animate-in fade-in">
                  <div className="w-8 h-8 rounded-full bg-[#1E1730] border border-[#7026ED]/40 flex items-center justify-center text-[#A78BFA] shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="bg-[#151020] border border-white/10 rounded-2xl p-3.5 flex items-center gap-2 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-xs text-zinc-400 ml-1">{generationStep}</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat View Input Bar */}
            <div className="pt-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="w-full rounded-full bg-[#18171F] border border-white/10 px-3 py-1.5 flex items-center shadow-xl"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent border-none text-xs text-white placeholder-zinc-400 px-3 py-2 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isGenerating}
                  className="w-8 h-8 rounded-full bg-[#7026ED] hover:bg-[#5E1ECD] text-white flex items-center justify-center disabled:opacity-40 transition-colors"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
