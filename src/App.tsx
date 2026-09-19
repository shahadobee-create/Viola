import React, { useState, useEffect } from 'react';
import { 
  TabType, 
  Conversation, 
  FeedItem, 
  ClientFile, 
  CalendarEvent, 
  ClientBriefData, 
  ViolaNotification, 
  AttachmentMeta,
  InspirationItem 
} from './types';
import { 
  CURRENT_USER, 
  INITIAL_CONVERSATIONS, 
  INITIAL_FEED_ITEMS, 
  INITIAL_CLIENT_FILES, 
  INITIAL_CALENDAR_EVENTS, 
  INITIAL_CLIENT_BRIEF, 
  INITIAL_NOTIFICATIONS,
  INITIAL_INSPIRATION_ITEMS 
} from './data/mockData';
import { TopHeader, BottomTabBar } from './components/Navigation';
import { ChatListView } from './components/chat/ChatListView';
import { ChatConversationView } from './components/chat/ChatConversationView';
import { FeedView } from './components/feed/FeedView';
import { ToolsView } from './components/tools/ToolsView';
import { ContactsView } from './components/contacts/ContactsView';
import { ProfileView } from './components/profile/ProfileView';
import { ViolaAgencyView } from './components/viola/ViolaAgencyView';
import { ViolaAIView } from './components/ai/ViolaAIView';
import { OnboardingScreen, OnboardingData } from './components/onboarding/OnboardingScreen';

// Modals
import { ClientBriefModal } from './components/tools/ClientBriefModal';
import { ClientAssetsModal } from './components/tools/ClientAssetsModal';
import { UDriveView } from './components/udrive/UDriveView';
import { CalendarModal } from './components/tools/CalendarModal';
import { AIAssistantModal } from './components/tools/AIAssistantModal';
import { ClientInspirationModal } from './components/tools/ClientInspirationModal';
import { UniversalSearchModal } from './components/overlays/UniversalSearchModal';
import { NotificationCenterModal } from './components/overlays/NotificationCenterModal';
import { ViolaSocialModal } from './components/overlays/ViolaSocialModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('feed');
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  // Core domain states
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [feedItems, setFeedItems] = useState<FeedItem[]>(INITIAL_FEED_ITEMS);
  const [clientFiles, setClientFiles] = useState<ClientFile[]>(INITIAL_CLIENT_FILES);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(INITIAL_CALENDAR_EVENTS);
  const [clientBrief, setClientBrief] = useState<ClientBriefData>(INITIAL_CLIENT_BRIEF);
  const [notifications, setNotifications] = useState<ViolaNotification[]>(INITIAL_NOTIFICATIONS);
  const [inspirationItems, setInspirationItems] = useState<InspirationItem[]>(INITIAL_INSPIRATION_ITEMS);

  // Overlay states
  const [showBriefModal, setShowBriefModal] = useState(false);
  const [showAssetsModal, setShowAssetsModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showInspirationModal, setShowInspirationModal] = useState(false);
  const [activeInspirationClientId, setActiveInspirationClientId] = useState<string>('chat_viola_chatting');
  const [showUniversalSearch, setShowUniversalSearch] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);

  // Onboarding state: first-time visitors see the 5-step onboarding flow
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    try {
      return localStorage.getItem('viola_onboarding_completed') === 'true';
    } catch {
      return false;
    }
  });

  const handleCompleteOnboarding = (data: OnboardingData) => {
    try {
      localStorage.setItem('viola_onboarding_completed', 'true');
      localStorage.setItem('viola_user_persona', data.persona);
      localStorage.setItem('viola_user_interests', JSON.stringify(data.interests));
      localStorage.setItem('viola_user_challenge', data.challenge);
      localStorage.setItem('viola_user_services', JSON.stringify(data.services));
    } catch (e) {
      console.warn('LocalStorage not available', e);
    }
    setHasCompletedOnboarding(true);
  };

  const handleSkipOnboarding = () => {
    try {
      localStorage.setItem('viola_onboarding_completed', 'true');
    } catch (e) {
      console.warn('LocalStorage not available', e);
    }
    setHasCompletedOnboarding(true);
  };

  // Dark/Light document class synchronization
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Derived counts
  const totalUnreadChats = conversations.reduce((sum, c) => sum + c.unreadCount, 0);
  const totalUnreadNotifs = notifications.filter((n) => !n.readAt).length;

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  // Message Sending
  const handleSendMessage = (conversationId: string, text: string, attachments?: AttachmentMeta[]) => {
    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: CURRENT_USER.id,
      senderName: CURRENT_USER.displayName,
      senderUsername: CURRENT_USER.username,
      senderAvatar: CURRENT_USER.avatar,
      content: text,
      createdAt: new Date().toISOString(),
      isMine: true,
      deliveryStatus: 'read' as const,
      attachments,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            updatedAt: new Date().toISOString(),
            lastMessageContent: text,
            lastMessageSenderId: CURRENT_USER.id,
            lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
  };

  // Toggle Reactions
  const handleToggleReaction = (conversationId: string, messageId: string, emoji: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          messages: c.messages.map((m) => {
            if (m.id !== messageId) return m;
            const existing = (m.reactions || []).find((r) => r.emoji === emoji);
            let updatedReactions;
            if (existing) {
              if (existing.userReacted) {
                // remove user reaction
                updatedReactions = (m.reactions || [])
                  .map((r) => r.emoji === emoji ? { ...r, count: r.count - 1, userReacted: false } : r)
                  .filter((r) => r.count > 0);
              } else {
                // add user reaction to existing emoji
                updatedReactions = (m.reactions || []).map((r) =>
                  r.emoji === emoji ? { ...r, count: r.count + 1, userReacted: true } : r
                );
              }
            } else {
              // new emoji reaction
              updatedReactions = [...(m.reactions || []), { emoji, count: 1, userReacted: true }];
            }
            return { ...m, reactions: updatedReactions };
          }),
        };
      })
    );
  };

  // Toggle Pinned
  const handleTogglePin = (conversationId: string, messageId: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;
        const msg = c.messages.find((m) => m.id === messageId);
        if (!msg) return c;
        const isPinnedNow = !msg.isPinned;
        return {
          ...c,
          messages: c.messages.map((m) => m.id === messageId ? { ...m, isPinned: isPinnedNow } : m),
          pinnedMessages: isPinnedNow 
            ? [...c.pinnedMessages, messageId] 
            : c.pinnedMessages.filter((id) => id !== messageId),
        };
      })
    );
  };

  // Delete Message
  const handleDeleteMessage = (conversationId: string, messageId: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          messages: c.messages.filter((m) => m.id !== messageId),
        };
      })
    );
  };

  // Group Mute Toggle
  const handleUpdateGroupMute = (conversationId: string, isMuted: boolean) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, isMuted } : c))
    );
  };

  // Feed handlers
  const handleToggleFeedLike = (itemId: string) => {
    setFeedItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const isLiked = !item.viewerLiked;
          return {
            ...item,
            viewerLiked: isLiked,
            likeCount: item.likeCount + (isLiked ? 1 : -1),
          };
        }
        return item;
      })
    );
  };

  const handleAddFeedComment = (itemId: string, body: string) => {
    const newComment = {
      id: `comm_${Date.now()}`,
      authorName: CURRENT_USER.displayName,
      authorUsername: CURRENT_USER.username,
      body,
      createdAt: new Date().toISOString(),
    };

    setFeedItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            commentCount: item.commentCount + 1,
            comments: [newComment, ...(item.comments || [])],
          };
        }
        return item;
      })
    );
  };

  const handlePublishFeed = (newItem: Omit<FeedItem, 'id' | 'likeCount' | 'commentCount' | 'viewerLiked' | 'comments'>) => {
    const created: FeedItem = {
      ...newItem,
      id: `feed_${Date.now()}`,
      likeCount: 1,
      commentCount: 0,
      viewerLiked: true,
      comments: [],
    };
    setFeedItems([created, ...feedItems]);
  };

  // Tools handlers
  const handleUploadFile = (newFile: ClientFile) => {
    setClientFiles([newFile, ...clientFiles]);
  };

  const handleUploadNewVersion = (fileId: string, note: string) => {
    setClientFiles((prev) =>
      prev.map((f) => {
        if (f.id === fileId) {
          const nextVersion = f.version + 1;
          return {
            ...f,
            version: nextVersion,
            updatedAt: new Date().toISOString(),
            versions: [
              { version: nextVersion, author: CURRENT_USER.displayName, date: 'Just now', note },
              ...(f.versions || [])
            ]
          };
        }
        return f;
      })
    );
  };

  const handleToggleArchiveFile = (fileId: string) => {
    setClientFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, archived: !f.archived } : f))
    );
  };

  const handleAddCalendarEvent = (newEvent: CalendarEvent) => {
    setCalendarEvents([...calendarEvents, newEvent]);
  };

  const handleDeleteCalendarEvent = (eventId: string) => {
    setCalendarEvents(calendarEvents.filter((ev) => ev.id !== eventId));
  };

  const handleSaveBrief = (updatedBrief: ClientBriefData) => {
    setClientBrief(updatedBrief);
  };

  // Inspiration Handlers
  const handleOpenInspiration = (clientId?: string) => {
    if (clientId) {
      setActiveInspirationClientId(clientId);
    } else if (activeConversationId) {
      setActiveInspirationClientId(activeConversationId);
    } else if (conversations.length > 0) {
      setActiveInspirationClientId(conversations[0].id);
    }
    setShowInspirationModal(true);
  };

  const handleAddInspiration = (newItem: InspirationItem) => {
    setInspirationItems((prev) => [newItem, ...prev]);
  };

  const handleUpdateInspiration = (updatedItem: InspirationItem) => {
    setInspirationItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteInspiration = (itemId: string) => {
    setInspirationItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleTogglePinInspiration = (itemId: string) => {
    setInspirationItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isPinned: !item.isPinned } : item
      )
    );
  };

  const handleToggleLikeInspiration = (itemId: string) => {
    setInspirationItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const viewerLiked = !item.viewerLiked;
        return {
          ...item,
          viewerLiked,
          likeCount: viewerLiked ? item.likeCount + 1 : Math.max(0, item.likeCount - 1),
        };
      })
    );
  };

  const handleShareInspirationToChat = (clientId: string, item: InspirationItem) => {
    // Send a message into the specified client conversation referencing this inspiration
    const shareMessageText = `💡 Shared Inspiration Reference: "${item.title}"\n${item.note}${item.sourceUrl ? `\n🔗 ${item.sourceUrl}` : ''}`;
    const attachments: AttachmentMeta[] = item.images && item.images.length > 0 ? [
      {
        name: `${item.title} Reference`,
        type: 'image',
        uri: item.images[0],
        size: '1.2 MB',
      }
    ] : [];

    handleSendMessage(clientId, shareMessageText, attachments.length > 0 ? attachments : undefined);
    
    // Notify user with feedback
    const targetConv = conversations.find(c => c.id === clientId);
    const clientName = targetConv ? targetConv.name : 'client workspace';
    
    // Add local notification
    const newNotif: ViolaNotification = {
      id: `notif_share_${Date.now()}`,
      kind: 'message',
      title: 'Inspiration Shared to Workspace',
      body: `"${item.title}" reference was dispatched into ${clientName} chat.`,
      createdAt: new Date().toISOString(),
      targetChatId: clientId,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, readAt: new Date().toISOString() }))
    );
  };

  const handleSelectNotification = (notif: ViolaNotification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, readAt: new Date().toISOString() } : n))
    );
    setShowNotificationCenter(false);
    if (notif.targetChatId) {
      setActiveConversationId(notif.targetChatId);
      setActiveTab('chats');
    }
  };

  // Start DM from Contacts
  const handleStartChatFromContact = (userId: string, name: string) => {
    // find existing DM or create one
    const existing = conversations.find((c) => c.type === 'dm' && c.otherUser?.displayName === name);
    if (existing) {
      setActiveConversationId(existing.id);
    } else {
      const newDM: Conversation = {
        id: `chat_dm_${Date.now()}`,
        type: 'dm',
        name,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
        updatedAt: new Date().toISOString(),
        unreadCount: 0,
        lastMessageContent: 'Chat initiated',
        lastMessageTime: 'Just now',
        messages: [],
        participants: [
          { id: userId, username: name.toLowerCase().replace(/\s+/g, '_'), displayName: name, role: 'member', isOnline: true },
          { id: CURRENT_USER.id, username: CURRENT_USER.username, displayName: CURRENT_USER.displayName, role: 'owner', isOnline: true },
        ],
        pinnedMessages: [],
      };
      setConversations([newDM, ...conversations]);
      setActiveConversationId(newDM.id);
    }
    setActiveTab('chats');
  };

  // Content viewport render
  const renderTabContent = () => {
    if (activeTab === 'chats' || activeTab === 'tools') {
      if (activeConversation) {
        return (
          <ChatConversationView
            conversation={activeConversation}
            onBack={() => setActiveConversationId(null)}
            onSendMessage={handleSendMessage}
            onToggleReaction={handleToggleReaction}
            onTogglePin={handleTogglePin}
            onDeleteMessage={handleDeleteMessage}
            onUpdateGroupMute={handleUpdateGroupMute}
            onOpenInspiration={handleOpenInspiration}
            clientInspirations={inspirationItems.filter((i) => i.clientId === activeConversation.id)}
          />
        );
      }
      return (
        <ChatListView
          conversations={conversations}
          inspirationItems={inspirationItems}
          onSelectConversation={(id) => setActiveConversationId(id)}
          onOpenNewChat={() => {
            setActiveTab('contacts');
          }}
          onOpenBrief={() => setShowBriefModal(true)}
          onOpenAssets={() => setShowAssetsModal(true)}
          onOpenCalendar={() => setShowCalendarModal(true)}
          onOpenAI={() => setShowAIModal(true)}
          onOpenInspiration={handleOpenInspiration}
        />
      );
    }

    if (activeTab === 'feed') {
      return (
        <FeedView
          feedItems={feedItems}
          onToggleLike={handleToggleFeedLike}
          onAddComment={handleAddFeedComment}
          onPublishContent={handlePublishFeed}
          onOpenNotifications={() => setShowNotificationCenter(true)}
          onOpenCalendar={() => setShowCalendarModal(true)}
          unreadNotifCount={totalUnreadNotifs}
          onOpenChatWithUser={(name) => handleStartChatFromContact('user_' + name.toLowerCase().replace(/\s+/g, '_'), name)}
        />
      );
    }

    if (activeTab === 'viola') {
      return (
        <ViolaAgencyView
          onOpenChatWithTeam={() => {
            setActiveTab('chats');
            setActiveConversationId('chat_viola_chatting');
          }}
          onOpenNotifications={() => setShowNotificationCenter(true)}
          onOpenSocial={() => setShowSocialModal(true)}
          unreadNotifCount={totalUnreadNotifs}
        />
      );
    }

    if (activeTab === 'ai') {
      return (
        <ViolaAIView
          onOpenNotifications={() => setShowNotificationCenter(true)}
          unreadNotifCount={totalUnreadNotifs}
        />
      );
    }

    if (activeTab === 'inspiration') {
      return (
        <div className="flex-1 h-full relative overflow-hidden">
          <ClientInspirationModal
            items={inspirationItems}
            conversations={conversations}
            initialClientId={activeInspirationClientId}
            onClose={() => setActiveTab('feed')}
            onAddItem={handleAddInspiration}
            onUpdateItem={handleUpdateInspiration}
            onDeleteItem={handleDeleteInspiration}
            onTogglePin={handleTogglePinInspiration}
            onToggleLike={handleToggleLikeInspiration}
            onShareToChat={handleShareInspirationToChat}
            currentUser={{
              id: CURRENT_USER.id,
              displayName: CURRENT_USER.displayName,
              username: CURRENT_USER.username,
              avatar: CURRENT_USER.avatar,
              role: 'owner',
            }}
          />
        </div>
      );
    }

    if (activeTab === 'assets') {
      return (
        <div className="flex-1 h-full relative overflow-hidden">
          <UDriveView
            files={clientFiles}
            onClose={() => setActiveTab('feed')}
            onUploadFile={handleUploadFile}
            onUploadNewVersion={handleUploadNewVersion}
            onToggleArchive={handleToggleArchiveFile}
          />
        </div>
      );
    }

    if (activeTab === 'contacts') {
      return (
        <ContactsView
          onStartChat={handleStartChatFromContact}
        />
      );
    }

    if (activeTab === 'profile') {
      return (
        <ProfileView
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          onOpenBrief={() => setShowBriefModal(true)}
          onOpenAssets={() => setShowAssetsModal(true)}
          onOpenCalendar={() => setShowCalendarModal(true)}
          onOpenInspiration={() => handleOpenInspiration()}
          onRestartOnboarding={() => setHasCompletedOnboarding(false)}
          onOpenSocial={() => setShowSocialModal(true)}
        />
      );
    }

    return null;
  };

  if (!hasCompletedOnboarding) {
    return (
      <div className={`min-h-screen w-full flex flex-col items-center justify-center ${isDark ? 'dark bg-[#0A0A0B]' : 'bg-[#F6F7FB]'}`}>
        <div className={`w-full flex-1 flex flex-col transition-all duration-300 ${
          isMobileFrame 
            ? 'max-w-[440px] my-4 sm:my-8 rounded-[40px] border-4 sm:border-8 border-zinc-800 shadow-2xl overflow-hidden min-h-[840px] max-h-[92vh] bg-[#0A0A0B]' 
            : 'max-w-md mx-auto h-screen shadow-2xl overflow-hidden'
        }`}>
          <OnboardingScreen
            onComplete={handleCompleteOnboarding}
            onSkip={handleSkipOnboarding}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full flex flex-col items-center ${isDark ? 'dark bg-[#0A0A0B]' : 'bg-[#F6F7FB]'}`}>
      {/* Viewport Frame Container (supports responsive full screen or phone shell) */}
      <div className={`w-full flex-1 flex flex-col transition-all duration-300 ${
        isMobileFrame 
          ? 'max-w-[440px] my-4 sm:my-8 rounded-[40px] border-4 sm:border-8 border-zinc-800 shadow-2xl overflow-hidden min-h-[840px] max-h-[92vh] bg-[#0A0A0B]' 
          : 'max-w-4xl mx-auto h-screen'
      }`}>
        {/* Top App Header (hidden when inside an active conversation or on views with dedicated headers) */}
        {activeTab !== 'chats' && activeTab !== 'feed' && activeTab !== 'viola' && activeTab !== 'ai' && activeTab !== 'assets' && activeTab !== 'profile' && (
          <TopHeader
            title="Viola"
            subtitle={
              activeTab === 'feed' ? 'Live Desk Dispatches' :
              activeTab === 'inspiration' ? 'Creative Boards & Benchmarks' :
              activeTab === 'assets' ? 'Cloud Assets & Media' :
              activeTab === 'chats' || activeTab === 'tools' ? 'Client Workspaces & Chats' :
              activeTab === 'contacts' ? 'Approved Directory' :
              activeTab === 'profile' ? 'My Profile' : 'Secure Channels'
            }
            unreadNotifCount={totalUnreadNotifs}
            isDark={isDark}
            onToggleTheme={() => setIsDark(!isDark)}
            onOpenSearch={() => setShowUniversalSearch(true)}
            onOpenNotifications={() => setShowNotificationCenter(true)}
            onOpenSocial={() => setShowSocialModal(true)}
            onOpenCalendar={() => setShowCalendarModal(true)}
            isMobileFrame={isMobileFrame}
            onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
          />
        )}

        {/* Main Content Pane */}
        <main className="flex-1 overflow-hidden relative flex flex-col">
          {renderTabContent()}
        </main>

        {/* Bottom Tab Bar (hidden when inside active conversation) */}
        {(!activeConversation || activeTab !== 'chats') && (
          <BottomTabBar
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              if (tab !== 'chats') setActiveConversationId(null);
            }}
            unreadChatCount={totalUnreadChats}
          />
        )}
      </div>

      {/* Global Modals & Overlays */}
      {showBriefModal && (
        <ClientBriefModal
          initialData={clientBrief}
          onClose={() => setShowBriefModal(false)}
          onSave={handleSaveBrief}
        />
      )}

      {showAssetsModal && (
        <ClientAssetsModal
          files={clientFiles}
          onClose={() => setShowAssetsModal(false)}
          onUploadFile={handleUploadFile}
          onUploadNewVersion={handleUploadNewVersion}
          onToggleArchive={handleToggleArchiveFile}
        />
      )}

      {showCalendarModal && (
        <CalendarModal
          events={calendarEvents}
          onClose={() => setShowCalendarModal(false)}
          onAddEvent={handleAddCalendarEvent}
          onDeleteEvent={handleDeleteCalendarEvent}
        />
      )}

      {showAIModal && (
        <AIAssistantModal
          onClose={() => setShowAIModal(false)}
        />
      )}

      {showUniversalSearch && (
        <UniversalSearchModal
          onClose={() => setShowUniversalSearch(false)}
          conversations={conversations}
          files={clientFiles}
          feedItems={feedItems}
          inspirationItems={inspirationItems}
          onSelectConversation={(id) => {
            setActiveConversationId(id);
            setActiveTab('chats');
          }}
          onOpenBrief={() => setShowBriefModal(true)}
          onOpenAssets={() => setShowAssetsModal(true)}
          onOpenInspiration={handleOpenInspiration}
        />
      )}

      {/* Client Inspiration Board Modal */}
      {showInspirationModal && (
        <ClientInspirationModal
          items={inspirationItems}
          conversations={conversations}
          initialClientId={activeInspirationClientId}
          onClose={() => setShowInspirationModal(false)}
          onAddItem={handleAddInspiration}
          onUpdateItem={handleUpdateInspiration}
          onDeleteItem={handleDeleteInspiration}
          onTogglePin={handleTogglePinInspiration}
          onToggleLike={handleToggleLikeInspiration}
          onShareToChat={handleShareInspirationToChat}
          currentUser={{
            id: CURRENT_USER.id,
            displayName: CURRENT_USER.displayName,
            username: CURRENT_USER.username,
            avatar: CURRENT_USER.avatar,
            role: 'owner',
          }}
        />
      )}

      {showNotificationCenter && (
        <NotificationCenterModal
          notifications={notifications}
          onClose={() => setShowNotificationCenter(false)}
          onMarkAllRead={handleMarkAllNotificationsRead}
          onSelectNotification={handleSelectNotification}
        />
      )}

      {showSocialModal && (
        <ViolaSocialModal
          onClose={() => setShowSocialModal(false)}
        />
      )}
    </div>
  );
}
