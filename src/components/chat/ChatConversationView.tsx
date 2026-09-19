import React, { useState, useRef, useEffect } from 'react';
import { Conversation, ChatMessage, AttachmentMeta, ReactionAgg, InspirationItem } from '../../types';
import { 
  ArrowLeft, 
  Search, 
  Pin, 
  MoreVertical, 
  Paperclip, 
  Smile, 
  Mic, 
  Send, 
  Check, 
  CheckCheck, 
  Play, 
  Pause, 
  Download, 
  FileText, 
  X, 
  Reply, 
  Copy, 
  Trash2, 
  Clock, 
  Users, 
  VolumeX, 
  Volume2, 
  Share2, 
  Image as ImageIcon,
  Film,
  Calendar,
  Sparkles,
  Lightbulb,
  ExternalLink
} from 'lucide-react';

interface ChatConversationViewProps {
  conversation: Conversation;
  onBack: () => void;
  onSendMessage: (conversationId: string, text: string, attachments?: AttachmentMeta[]) => void;
  onToggleReaction: (conversationId: string, messageId: string, emoji: string) => void;
  onTogglePin: (conversationId: string, messageId: string) => void;
  onDeleteMessage: (conversationId: string, messageId: string) => void;
  onUpdateGroupMute: (conversationId: string, isMuted: boolean) => void;
  onOpenInspiration?: (clientId: string) => void;
  clientInspirations?: InspirationItem[];
}

const EMOJI_LIST = ['❤️', '👍', '🔥', '🎉', '😂', '😎', '💡', '✅', '🚀', '⭐', '🎙️', '📌', '📈', '🤝', '👏', '😍', '👀', '💯'];

export const ChatConversationView: React.FC<ChatConversationViewProps> = ({
  conversation,
  onBack,
  onSendMessage,
  onToggleReaction,
  onTogglePin,
  onDeleteMessage,
  onUpdateGroupMute,
  onOpenInspiration,
  clientInspirations = [],
}) => {
  const [inputText, setInputText] = useState('');
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiTab, setEmojiTab] = useState<'emoji' | 'gifs' | 'stickers'>('emoji');
  const [showAttachmentsMenu, setShowAttachmentsMenu] = useState(false);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [groupInfoTab, setGroupInfoTab] = useState<'members' | 'inspiration' | 'media' | 'files' | 'voice'>('members');
  const [showPinnedSheet, setShowPinnedSheet] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('2026-09-15');
  const [scheduleTime, setScheduleTime] = useState('11:00');
  
  // Search in chat
  const [showInChatSearch, setShowInChatSearch] = useState(false);
  const [inChatSearchQuery, setInChatSearchQuery] = useState('');

  // Voice note player state
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [voiceProgress, setVoiceProgress] = useState(0);
  const [voiceSpeed, setVoiceSpeed] = useState<number>(1);

  // Voice recording simulation
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // Lightbox preview
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages.length]);

  // Voice recording timer simulation
  useEffect(() => {
    let timer: any;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  // Voice playback simulation
  useEffect(() => {
    let interval: any;
    if (playingVoiceId) {
      interval = setInterval(() => {
        setVoiceProgress((prev) => {
          if (prev >= 100) {
            setPlayingVoiceId(null);
            return 0;
          }
          return prev + (5 * voiceSpeed);
        });
      }, 300);
    } else {
      setVoiceProgress(0);
    }
    return () => clearInterval(interval);
  }, [playingVoiceId, voiceSpeed]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(conversation.id, inputText);
    setInputText('');
    setReplyingTo(null);
    setShowEmojiPicker(false);
  };

  const handleSendVoiceNote = () => {
    setIsRecording(false);
    const durationStr = `0:${recordingSeconds < 10 ? '0' : ''}${recordingSeconds || 24}`;
    const voiceAttachment: AttachmentMeta = {
      name: `Voice-Message-${Date.now().toString().slice(-4)}.m4a`,
      type: 'voice',
      size: durationStr,
      durationMs: (recordingSeconds || 24) * 1000,
    };
    onSendMessage(conversation.id, `🎙️ Voice note (${durationStr})`, [voiceAttachment]);
  };

  const handleAddAttachment = (type: 'photo' | 'video' | 'doc') => {
    setShowAttachmentsMenu(false);
    if (type === 'photo') {
      const att: AttachmentMeta = {
        name: 'Studio_Proof_ColorGrade.jpg',
        type: 'image',
        size: '2.8 MB',
        uri: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
      };
      onSendMessage(conversation.id, 'Color-graded still frame from studio export.', [att]);
    } else if (type === 'video') {
      const att: AttachmentMeta = {
        name: 'Master_Teaser_Vertical.mp4',
        type: 'video',
        size: '34.5 MB',
        durationMs: 30000,
      };
      onSendMessage(conversation.id, 'Commercial cut rendered at 60fps.', [att]);
    } else {
      const att: AttachmentMeta = {
        name: 'Viola_Deliverables_Summary.pdf',
        type: 'pdf',
        size: '1.4 MB',
      };
      onSendMessage(conversation.id, 'Here is the specifications document.', [att]);
    }
  };

  const handleToggleVoiceSpeed = () => {
    setVoiceSpeed((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1));
  };

  // Filter messages by search if active
  const displayedMessages = inChatSearchQuery.trim()
    ? conversation.messages.filter((m) =>
        m.content.toLowerCase().includes(inChatSearchQuery.toLowerCase())
      )
    : conversation.messages;

  const pinnedItems = conversation.messages.filter((m) => m.isPinned);
  const primaryPinned = pinnedItems[0];

  return (
    <div className="flex flex-col h-full bg-[#0A0A0B] text-zinc-100 relative">
      {/* Top Header */}
      <div className="h-16 px-3 sm:px-4 border-b border-zinc-800 bg-[#141819]/90 backdrop-blur-md flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-300 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>

          <div
            onClick={() => setShowGroupInfo(true)}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity min-w-0"
          >
            <div className="relative shrink-0">
              <img
                src={conversation.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'}
                alt={conversation.name}
                className="w-10 h-10 rounded-2xl object-cover border border-zinc-700"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[#141819]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-bold text-sm text-white truncate max-w-[160px] sm:max-w-[240px]">
                  {conversation.name}
                </h3>
                {conversation.isMuted && (
                  <VolumeX size={12} className="text-amber-500 shrink-0" />
                )}
              </div>
              <p className="text-[11px] font-mono text-zinc-400 truncate">
                {conversation.typingStatus ? (
                  <span className="text-amber-400 animate-pulse font-bold">
                    {conversation.typingStatus}
                  </span>
                ) : conversation.type === 'group' ? (
                  `${conversation.participants.length} members`
                ) : (
                  'Online'
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-1">
          {/* Client Inspiration Quick Trigger */}
          {onOpenInspiration && (
            <button
              onClick={() => onOpenInspiration(conversation.id)}
              title={`View Inspiration Board for ${conversation.name} (${clientInspirations.length} references)`}
              className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors relative"
            >
              <Lightbulb size={15} />
              <span className="hidden sm:inline">Inspiration</span>
              <span className="px-1 py-0.2 rounded bg-amber-500/20 text-[10px]">
                {clientInspirations.length}
              </span>
            </button>
          )}

          <button
            onClick={() => setShowInChatSearch(!showInChatSearch)}
            title="Search in conversation"
            className={`p-2 rounded-xl transition-colors ${
              showInChatSearch ? 'bg-amber-500/20 text-amber-400' : 'text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            <Search size={17} />
          </button>

          {pinnedItems.length > 0 && (
            <button
              onClick={() => setShowPinnedSheet(true)}
              title={`${pinnedItems.length} Pinned Messages`}
              className="p-2 rounded-xl text-amber-500 hover:bg-zinc-800 transition-colors relative"
            >
              <Pin size={17} className="fill-amber-500/20" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-zinc-950 font-mono text-[9px] font-bold flex items-center justify-center">
                {pinnedItems.length}
              </span>
            </button>
          )}

          <button
            onClick={() => setShowGroupInfo(true)}
            title="Conversation Details"
            className="p-2 rounded-xl text-zinc-400 hover:bg-zinc-800 transition-colors"
          >
            <MoreVertical size={17} />
          </button>
        </div>
      </div>

      {/* In-Chat Search Bar */}
      {showInChatSearch && (
        <div className="px-4 py-2 border-b border-zinc-800 bg-[#141819] flex items-center gap-2 z-20">
          <Search size={15} className="text-zinc-400" />
          <input
            type="text"
            value={inChatSearchQuery}
            onChange={(e) => setInChatSearchQuery(e.target.value)}
            placeholder="Filter messages in this chat..."
            autoFocus
            className="flex-1 bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none"
          />
          {inChatSearchQuery && (
            <button
              onClick={() => setInChatSearchQuery('')}
              className="text-xs text-zinc-400 hover:text-white"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => {
              setShowInChatSearch(false);
              setInChatSearchQuery('');
            }}
            className="p-1 text-zinc-400 hover:text-white"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Pinned Message Banner (Exact match from window_dump.xml!) */}
      {primaryPinned && (
        <div 
          onClick={() => setShowPinnedSheet(true)}
          className="px-4 py-2 bg-[#171c1e] hover:bg-[#1c2224] cursor-pointer border-b border-zinc-800/80 flex items-center justify-between gap-2.5 transition-colors z-10"
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-1 h-8 rounded-full bg-amber-500 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-wide">
                  Pinned Message
                </span>
                {pinnedItems.length > 1 && (
                  <span className="text-[9px] font-mono text-zinc-400">
                    (+{pinnedItems.length - 1} more)
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-300 truncate font-medium">
                {primaryPinned.content}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-zinc-400 shrink-0">
            <Pin size={13} className="text-amber-400" />
          </div>
        </div>
      )}

      {/* Messages Timeline */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-3">
        {/* Day separator */}
        <div className="flex items-center justify-center my-3">
          <span className="px-3 py-1 rounded-full bg-zinc-800/70 border border-zinc-700/60 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
            Today
          </span>
        </div>

        {displayedMessages.map((msg) => {
          const isMine = msg.isMine;

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 group ${
                isMine ? 'flex-row-reverse self-end' : 'flex-row self-start'
              }`}
            >
              {/* Sender Avatar */}
              {!isMine && (
                <img
                  src={msg.senderAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80'}
                  alt={msg.senderName}
                  className="w-7 h-7 rounded-xl object-cover shrink-0 border border-zinc-700"
                />
              )}

              {/* Bubble Box */}
              <div className={`max-w-[85%] sm:max-w-[70%] flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                {!isMine && (
                  <span className="text-[11px] font-bold text-zinc-400 mb-1 px-1">
                    {msg.senderName}
                  </span>
                )}

                <div
                  className={`p-3.5 rounded-2xl relative shadow-md transition-all ${
                    isMine
                      ? 'bg-amber-500 text-zinc-950 rounded-br-xs'
                      : 'bg-[#181D27] border border-zinc-800/80 text-zinc-100 rounded-bl-xs'
                  }`}
                >
                  {/* Reply Banner if applicable */}
                  {msg.replyToId && (
                    <div className={`mb-2 pl-2 border-l-2 py-1 text-xs rounded ${
                      isMine ? 'border-zinc-950/40 bg-black/10 text-zinc-900' : 'border-indigo-400 bg-black/20 text-zinc-300'
                    }`}>
                      <span className="font-bold block text-[10px]">Replying to message</span>
                    </div>
                  )}

                  {/* Main Text Content */}
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap select-text font-normal">
                    {msg.content}
                  </p>

                  {/* Attachments rendering */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="mt-2.5 space-y-2">
                      {msg.attachments.map((att, index) => {
                        if (att.type === 'voice') {
                          const isPlaying = playingVoiceId === msg.id;
                          return (
                            <div
                              key={index}
                              className={`p-2.5 rounded-xl border flex items-center gap-3 min-w-[200px] sm:min-w-[240px] ${
                                isMine
                                  ? 'bg-black/10 border-black/15 text-zinc-950'
                                  : 'bg-[#10131A] border-zinc-700/60 text-zinc-100'
                              }`}
                            >
                              <button
                                onClick={() => {
                                  if (isPlaying) {
                                    setPlayingVoiceId(null);
                                  } else {
                                    setPlayingVoiceId(msg.id);
                                  }
                                }}
                                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform active:scale-90 ${
                                  isMine ? 'bg-zinc-950 text-white' : 'bg-indigo-600 text-white'
                                }`}
                              >
                                {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
                              </button>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                                  <span>{isPlaying ? 'Playing' : 'Voice note'}</span>
                                  <span>{att.size || '0:38'}</span>
                                </div>
                                {/* Waveform bar */}
                                <div className="h-1.5 rounded-full bg-zinc-700/40 overflow-hidden">
                                  <div
                                    style={{ width: `${isPlaying ? voiceProgress : 0}%` }}
                                    className={`h-full transition-all duration-300 rounded-full ${
                                      isMine ? 'bg-zinc-950' : 'bg-indigo-400'
                                    }`}
                                  />
                                </div>
                              </div>

                              <button
                                onClick={handleToggleVoiceSpeed}
                                className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border ${
                                  isMine ? 'border-zinc-950/30' : 'border-zinc-700 text-zinc-300'
                                }`}
                              >
                                {voiceSpeed}x
                              </button>
                            </div>
                          );
                        }

                        if (att.type === 'image') {
                          return (
                            <div key={index} className="rounded-xl overflow-hidden cursor-pointer group/img relative">
                              <img
                                src={att.uri}
                                alt={att.name}
                                onClick={() => setLightboxImage(att.uri || null)}
                                className="w-full max-h-56 object-cover rounded-xl"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="px-3 py-1.5 rounded-lg bg-black/80 text-white text-xs font-bold flex items-center gap-1.5">
                                  <ImageIcon size={14} /> Full View
                                </span>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={index}
                            className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 ${
                              isMine ? 'bg-black/10 border-black/15' : 'bg-[#10131A] border-zinc-700/60'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <FileText size={18} className="shrink-0" />
                              <div className="min-w-0">
                                <p className="text-xs font-bold truncate">{att.name}</p>
                                <span className="text-[10px] font-mono opacity-70">{att.size}</span>
                              </div>
                            </div>
                            <button
                              title="Download attachment"
                              onClick={() => alert(`Downloading: ${att.name}`)}
                              className="p-1.5 rounded-lg hover:bg-black/10 transition-colors"
                            >
                              <Download size={14} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Message Bottom Metadata */}
                  <div className="flex items-center justify-end gap-1.5 mt-1.5 text-[10px] font-mono opacity-75">
                    <span>
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {isMine && (
                      msg.deliveryStatus === 'read' ? (
                        <CheckCheck size={13} className="text-blue-600 dark:text-blue-400 stroke-[2.5]" />
                      ) : msg.deliveryStatus === 'delivered' ? (
                        <CheckCheck size={13} className="stroke-[2]" />
                      ) : (
                        <Check size={12} className="stroke-[2.5]" />
                      )
                    )}
                  </div>
                </div>

                {/* Reactions Pill Display */}
                {msg.reactions && msg.reactions.length > 0 && (
                  <div className="flex items-center gap-1 mt-1 -ml-1">
                    {msg.reactions.map((r) => (
                      <button
                        key={r.emoji}
                        onClick={() => onToggleReaction(conversation.id, msg.id, r.emoji)}
                        className={`px-2 py-0.5 rounded-full border text-[11px] flex items-center gap-1 transition-all ${
                          r.userReacted
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 font-bold'
                            : 'bg-zinc-800/80 border-zinc-700 text-zinc-300'
                        }`}
                      >
                        <span>{r.emoji}</span>
                        <span className="font-mono text-[10px]">{r.count}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Hover Quick Actions */}
                <div className="hidden group-hover:flex items-center gap-1 mt-1 opacity-90 transition-opacity">
                  <button
                    onClick={() => setReplyingTo(msg)}
                    title="Reply"
                    className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Reply size={12} />
                  </button>
                  <button
                    onClick={() => onToggleReaction(conversation.id, msg.id, '❤️')}
                    title="Heart reaction"
                    className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                  >
                    ❤️
                  </button>
                  <button
                    onClick={() => onToggleReaction(conversation.id, msg.id, '🔥')}
                    title="Fire reaction"
                    className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                  >
                    🔥
                  </button>
                  <button
                    onClick={() => onTogglePin(conversation.id, msg.id)}
                    title={msg.isPinned ? "Unpin message" : "Pin message"}
                    className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Pin size={12} className={msg.isPinned ? "text-amber-400" : ""} />
                  </button>
                  {isMine && (
                    <button
                      onClick={() => onDeleteMessage(conversation.id, msg.id)}
                      title="Delete message"
                      className="p-1 rounded bg-zinc-800 hover:bg-rose-900/60 text-zinc-400 hover:text-rose-300 transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply Preview Banner */}
      {replyingTo && (
        <div className="px-4 py-2 bg-[#171c1e] border-t border-zinc-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <Reply size={14} className="text-amber-500 shrink-0" />
            <div className="min-w-0">
              <span className="font-bold text-amber-500 block truncate">
                Replying to {replyingTo.senderName}
              </span>
              <p className="text-zinc-400 truncate">{replyingTo.content}</p>
            </div>
          </div>
          <button
            onClick={() => setReplyingTo(null)}
            className="p-1 text-zinc-400 hover:text-white"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Audio Recording Active Bar */}
      {isRecording && (
        <div className="px-4 py-3 bg-rose-500/10 border-t border-rose-500/30 flex items-center justify-between z-30">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-rose-400">Recording Voice Note</span>
              <span className="font-mono text-xs text-white font-bold">
                0:{recordingSeconds < 10 ? '0' : ''}{recordingSeconds}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRecording(false)}
              className="px-3 py-1 rounded-xl bg-zinc-800 text-zinc-300 text-xs hover:bg-zinc-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSendVoiceNote}
              className="px-4 py-1 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400"
            >
              Send Note
            </button>
          </div>
        </div>
      )}

      {/* Attachments Popup Menu */}
      {showAttachmentsMenu && (
        <div className="absolute bottom-16 left-4 bg-[#181D27] border border-zinc-800 rounded-2xl p-2 shadow-2xl z-30 w-52 space-y-1">
          <button
            onClick={() => handleAddAttachment('photo')}
            className="w-full p-2.5 rounded-xl hover:bg-zinc-800 text-left text-xs font-semibold text-zinc-200 flex items-center gap-2.5 transition-colors"
          >
            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <ImageIcon size={16} />
            </div>
            <span>Photo from Library</span>
          </button>
          <button
            onClick={() => handleAddAttachment('video')}
            className="w-full p-2.5 rounded-xl hover:bg-zinc-800 text-left text-xs font-semibold text-zinc-200 flex items-center gap-2.5 transition-colors"
          >
            <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
              <Film size={16} />
            </div>
            <span>Video Reel (MP4)</span>
          </button>
          <button
            onClick={() => handleAddAttachment('doc')}
            className="w-full p-2.5 rounded-xl hover:bg-zinc-800 text-left text-xs font-semibold text-zinc-200 flex items-center gap-2.5 transition-colors"
          >
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <FileText size={16} />
            </div>
            <span>Document / PDF</span>
          </button>
          {onOpenInspiration && (
            <button
              onClick={() => {
                setShowAttachmentsMenu(false);
                onOpenInspiration(conversation.id);
              }}
              className="w-full p-2.5 rounded-xl hover:bg-zinc-800 text-left text-xs font-semibold text-zinc-200 flex items-center gap-2.5 transition-colors border-t border-zinc-800/80 pt-2"
            >
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <Lightbulb size={16} />
              </div>
              <span>Inspiration Reference</span>
            </button>
          )}
        </div>
      )}

      {/* Emoji & Stickers Drawer (matching window_dump.xml bottom drawer!) */}
      {showEmojiPicker && (
        <div className="border-t border-zinc-800 bg-[#141819] p-3 z-30 shadow-2xl max-h-56 overflow-y-auto">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEmojiTab('emoji')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  emojiTab === 'emoji' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Emoji
              </button>
              <button
                onClick={() => setEmojiTab('stickers')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  emojiTab === 'stickers' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Stickers
              </button>
              <button
                onClick={() => setEmojiTab('gifs')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  emojiTab === 'gifs' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                GIFs
              </button>
            </div>
            <button
              onClick={() => setShowEmojiPicker(false)}
              className="p-1 text-zinc-400 hover:text-white"
            >
              <X size={15} />
            </button>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-9 gap-2 py-1">
            {EMOJI_LIST.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setInputText((prev) => prev + emoji)}
                className="h-10 rounded-xl hover:bg-zinc-800 text-xl flex items-center justify-center transition-transform hover:scale-125"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Composer Dock */}
      <div className="p-3 border-t border-zinc-800 bg-[#141819]/90 backdrop-blur-md flex items-center gap-2 z-20 shrink-0">
        <button
          onClick={() => {
            setShowAttachmentsMenu(!showAttachmentsMenu);
            setShowEmojiPicker(false);
          }}
          title="Attach asset"
          className="w-10 h-10 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center transition-colors shrink-0"
        >
          <Paperclip size={18} />
        </button>

        <div className="flex-1 relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Message"
            className="w-full pl-4 pr-11 py-2.5 rounded-full border border-zinc-800 bg-[#0A0A0B] text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          />
          <button
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker);
              setShowAttachmentsMenu(false);
            }}
            title="Emoji & Stickers"
            className="absolute right-3 p-1 text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <Smile size={18} />
          </button>
        </div>

        {/* Schedule modal trigger */}
        {inputText.trim() && (
          <button
            onClick={() => setShowScheduleModal(true)}
            title="Schedule message"
            className="w-9 h-9 rounded-full bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 flex items-center justify-center transition-colors shrink-0"
          >
            <Clock size={16} />
          </button>
        )}

        {/* Send or Voice Record */}
        {inputText.trim() ? (
          <button
            onClick={handleSend}
            title="Send message"
            className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold flex items-center justify-center shadow-lg transition-transform active:scale-90 shrink-0"
          >
            <Send size={16} strokeWidth={2.5} />
          </button>
        ) : (
          <button
            onClick={() => {
              if (isRecording) {
                handleSendVoiceNote();
              } else {
                setIsRecording(true);
              }
            }}
            title="Record voice note"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${
              isRecording
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300'
            }`}
          >
            <Mic size={18} />
          </button>
        )}
      </div>

      {/* Group Info Modal / Sheet */}
      {showGroupInfo && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#141819] border border-zinc-800 rounded-t-[32px] sm:rounded-3xl w-full sm:max-w-md max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="font-display font-black text-lg text-white">
                {conversation.type === 'group' ? 'Group Information' : 'Chat Information'}
              </h3>
              <button
                onClick={() => setShowGroupInfo(false)}
                className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Avatar & Title */}
              <div className="flex flex-col items-center text-center">
                <img
                  src={conversation.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80'}
                  alt={conversation.name}
                  className="w-20 h-20 rounded-3xl object-cover border-2 border-zinc-700 mb-3"
                />
                <h4 className="font-display font-extrabold text-base text-white">
                  {conversation.name}
                </h4>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  {conversation.type === 'group' ? `${conversation.participants.length} members` : 'Direct messaging'}
                </p>

                {/* Quick actions */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => onUpdateGroupMute(conversation.id, !conversation.isMuted)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                      conversation.isMuted
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {conversation.isMuted ? <Volume2 size={15} /> : <VolumeX size={15} />}
                    <span>{conversation.isMuted ? 'Unmute' : 'Mute'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowGroupInfo(false);
                      setShowInChatSearch(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-bold flex items-center gap-1.5 hover:bg-zinc-700"
                  >
                    <Search size={15} />
                    <span>Search</span>
                  </button>
                </div>
              </div>

              {/* Tabs navigation */}
              <div className="flex border-b border-zinc-800 gap-1 pb-1 overflow-x-auto no-scrollbar">
                {(['members', 'inspiration', 'media', 'files', 'voice'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setGroupInfoTab(tab)}
                    className={`px-3 py-1.5 text-xs font-bold capitalize transition-colors border-b-2 whitespace-nowrap ${
                      groupInfoTab === tab
                        ? 'border-amber-500 text-amber-400'
                        : 'border-transparent text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {tab === 'inspiration' ? `Inspiration (${clientInspirations.length})` : tab}
                  </button>
                ))}
              </div>

              {/* Inspiration Tab */}
              {groupInfoTab === 'inspiration' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                      Client References ({clientInspirations.length})
                    </span>
                    {onOpenInspiration && (
                      <button
                        onClick={() => {
                          setShowGroupInfo(false);
                          onOpenInspiration(conversation.id);
                        }}
                        className="text-[11px] font-mono text-amber-400 hover:underline flex items-center gap-1 font-bold"
                      >
                        <span>Open Board</span>
                        <ExternalLink size={12} />
                      </button>
                    )}
                  </div>

                  {clientInspirations.length === 0 ? (
                    <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center space-y-2">
                      <p className="text-xs text-zinc-400">No inspiration references saved yet.</p>
                      {onOpenInspiration && (
                        <button
                          onClick={() => {
                            setShowGroupInfo(false);
                            onOpenInspiration(conversation.id);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-amber-500 text-zinc-950 text-xs font-bold"
                        >
                          Save First Reference
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {clientInspirations.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setShowGroupInfo(false);
                            if (onOpenInspiration) onOpenInspiration(conversation.id);
                          }}
                          className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/50 cursor-pointer transition-colors space-y-1.5 group"
                        >
                          <img
                            src={item.images?.[0] || 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=400&q=80'}
                            alt={item.title}
                            className="w-full aspect-video rounded-lg object-cover border border-zinc-700"
                          />
                          <p className="text-[11px] font-bold text-white truncate group-hover:text-amber-400 transition-colors">
                            {item.title}
                          </p>
                          <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500">
                            <span>{item.category}</span>
                            {item.sourceDomain && <span>{item.sourceDomain}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Members Tab */}
              {groupInfoTab === 'members' && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Active Members ({conversation.participants.length})
                  </span>
                  {conversation.participants.map((p) => (
                    <div
                      key={p.id}
                      className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={p.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80'}
                          alt={p.displayName}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">{p.displayName}</p>
                          <span className="text-[10px] font-mono text-zinc-500">@{p.username}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                        p.role === 'owner'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : p.role === 'admin'
                          ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {p.role}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Media Tab */}
              {groupInfoTab === 'media' && (
                <div className="grid grid-cols-3 gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=400&q=80"
                    alt="Media 1"
                    onClick={() => setLightboxImage('https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80')}
                    className="aspect-square object-cover rounded-xl border border-zinc-800 cursor-pointer"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"
                    alt="Media 2"
                    onClick={() => setLightboxImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')}
                    className="aspect-square object-cover rounded-xl border border-zinc-800 cursor-pointer"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80"
                    alt="Media 3"
                    onClick={() => setLightboxImage('https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80')}
                    className="aspect-square object-cover rounded-xl border border-zinc-800 cursor-pointer"
                  />
                </div>
              )}

              {/* Files Tab */}
              {groupInfoTab === 'files' && (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-amber-400" />
                      <div>
                        <p className="text-xs font-bold text-white">SmartCity_Campaign_Master_v2.pdf</p>
                        <span className="text-[10px] font-mono text-zinc-500">8.4 MB · Today</span>
                      </div>
                    </div>
                    <button onClick={() => alert('Downloading file...')} className="p-1 text-zinc-400 hover:text-white">
                      <Download size={15} />
                    </button>
                  </div>
                </div>
              )}

              {/* Voice Notes Tab */}
              {groupInfoTab === 'voice' && (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Studio Plan Voice Note</p>
                      <span className="text-[10px] font-mono text-zinc-500">0:38 · Bejar</span>
                    </div>
                    <button
                      onClick={() => setPlayingVoiceId('sample_voice')}
                      className="p-2 rounded-lg bg-indigo-600 text-white"
                    >
                      <Play size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Pinned Messages Full Sheet */}
      {showPinnedSheet && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#141819] border border-zinc-800 rounded-t-[32px] sm:rounded-3xl w-full sm:max-w-md max-h-[80vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pin size={17} className="text-amber-500 fill-amber-500/20" />
                <h3 className="font-display font-black text-base text-white">Pinned Messages</h3>
              </div>
              <button
                onClick={() => setShowPinnedSheet(false)}
                className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 space-y-3 overflow-y-auto">
              {pinnedItems.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">{p.senderName}</span>
                    <button
                      onClick={() => onTogglePin(conversation.id, p.id)}
                      className="text-[11px] font-mono text-zinc-500 hover:text-rose-400"
                    >
                      Unpin
                    </button>
                  </div>
                  <p className="text-xs text-zinc-200 leading-relaxed">{p.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Schedule Message Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141819] border border-zinc-800 rounded-3xl w-full max-w-sm p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400">
                <Clock size={18} />
                <h3 className="font-display font-bold text-sm text-white">Schedule Delivery</h3>
              </div>
              <button onClick={() => setShowScheduleModal(false)} className="text-zinc-400 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Message will be held in the secure outbox and dispatched automatically at the scheduled local time.
            </p>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold">Delivery Date</label>
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#0A0A0B] border border-zinc-800 text-xs text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold">Delivery Time</label>
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#0A0A0B] border border-zinc-800 text-xs text-white"
              />
            </div>

            <button
              onClick={() => {
                setShowScheduleModal(false);
                alert(`Message scheduled for ${scheduleDate} at ${scheduleTime}`);
                handleSend();
              }}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              Confirm Schedule
            </button>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 text-zinc-300 hover:text-white"
          >
            <X size={20} />
          </button>
          <img
            src={lightboxImage}
            alt="Expanded view"
            className="max-h-[85vh] max-w-[95vw] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
