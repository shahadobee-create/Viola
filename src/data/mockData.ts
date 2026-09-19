import { Conversation, FeedItem, ClientFile, CalendarEvent, ClientBriefData, ViolaNotification, InspirationItem, IndustryPlaylist, ViolaClient } from '../types';

export const CURRENT_USER = {
  id: 'user_me',
  username: 'shahad',
  displayName: 'Shahad (Lead Partner)',
  email: 'shahadobee@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
  role: 'owner' as const,
  accountType: 'staff' as const,
  isOwner: true,
};

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'chat_viola_chatting',
    type: 'group',
    name: 'Viola Chatting',
    avatar: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=160&h=160&q=80',
    updatedAt: '2026-09-12T23:45:00Z',
    unreadCount: 3,
    lastMessageContent: 'armanezaat🎬: Sobahi bchina recorda kiva bashtra?',
    lastMessageSenderId: 'u_arman',
    lastMessageTime: '11:45 PM',
    isMuted: true,
    typingStatus: 'Jomaa, Bejar are typing...',
    effectiveMaxFileSize: '3 GiB',
    pinnedMessages: ['pinned_viola_1'],
    participants: [
      { id: 'u_jomaa', username: 'jomaa_akreyi', displayName: 'Jomaa Akreyi', role: 'admin', isOnline: true, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80' },
      { id: 'u_adam', username: 'adamebdulah', displayName: 'adamebdulah', role: 'member', isOnline: true, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120&q=80' },
      { id: 'u_arman', username: 'armanezaat', displayName: 'armanezaat🎬', role: 'admin', isOnline: true, avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120&q=80' },
      { id: 'u_bejar', username: 'bejar_tech', displayName: 'Bejar', role: 'member', isOnline: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80' },
      { id: 'user_me', username: 'shahad', displayName: 'Shahad (Lead Partner)', role: 'owner', isOnline: true, avatar: CURRENT_USER.avatar },
    ],
    messages: [
      {
        id: 'pinned_viola_1',
        senderId: 'u_jomaa',
        senderName: 'Jomaa Akreyi',
        senderUsername: 'jomaa_akreyi',
        senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
        content: '📌 Nmlie 4 Nali 4 Haji yaseen 3 Car wash 3 Ice cream 4 MHI 4 Smart 4 Cleanify 4 Supermarket 5  Wellbing 4 Toys 4 Lupa 4',
        createdAt: '2026-09-12T22:15:00Z',
        isMine: false,
        deliveryStatus: 'read',
        isPinned: true,
        reactions: [{ emoji: '🔥', count: 4, userReacted: true }, { emoji: '👍', count: 3, userReacted: false }],
      },
      {
        id: 'msg_v1',
        senderId: 'u_jomaa',
        senderName: 'Jomaa Akreyi',
        senderUsername: 'jomaa_akreyi',
        senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
        content: '😎 Sticker',
        createdAt: '2026-09-12T23:44:00Z',
        isMine: false,
        deliveryStatus: 'read',
        reactions: [{ emoji: '❤️', count: 2, userReacted: true }],
      },
      {
        id: 'msg_v2',
        senderId: 'u_adam',
        senderName: 'adamebdulah',
        senderUsername: 'adamebdulah',
        senderAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120&q=80',
        content: '😎 Sticker',
        createdAt: '2026-09-12T23:44:10Z',
        isMine: false,
        deliveryStatus: 'read',
      },
      {
        id: 'msg_v3',
        senderId: 'u_adam',
        senderName: 'adamebdulah',
        senderUsername: 'adamebdulah',
        senderAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120&q=80',
        content: 'ha ava ma drenet',
        createdAt: '2026-09-12T23:44:30Z',
        isMine: false,
        deliveryStatus: 'read',
      },
      {
        id: 'msg_v4',
        senderId: 'u_arman',
        senderName: 'armanezaat🎬',
        senderUsername: 'armanezaat',
        senderAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120&q=80',
        content: '🤣🤣🤣🤣🤣🤣',
        createdAt: '2026-09-12T23:45:00Z',
        isMine: false,
        deliveryStatus: 'read',
      },
      {
        id: 'msg_v5',
        senderId: 'u_jomaa',
        senderName: 'Jomaa Akreyi',
        senderUsername: 'jomaa_akreyi',
        senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
        content: 'Hhhhh',
        createdAt: '2026-09-12T23:45:15Z',
        isMine: false,
        deliveryStatus: 'read',
      },
      {
        id: 'msg_v6',
        senderId: 'u_arman',
        senderName: 'armanezaat🎬',
        senderUsername: 'armanezaat',
        senderAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120&q=80',
        content: 'Salamun aleykum',
        createdAt: '2026-09-12T23:45:30Z',
        isMine: false,
        deliveryStatus: 'read',
      },
      {
        id: 'msg_v7',
        senderId: 'u_arman',
        senderName: 'armanezaat🎬',
        senderUsername: 'armanezaat',
        senderAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120&q=80',
        content: 'Sobahi bchina recorda kiva bashtra?',
        createdAt: '2026-09-12T23:45:48Z',
        isMine: false,
        deliveryStatus: 'read',
        reactions: [{ emoji: '🎙️', count: 3, userReacted: true }],
      },
      {
        id: 'msg_v8',
        senderId: 'u_bejar',
        senderName: 'Bejar',
        senderUsername: 'bejar_tech',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
        content: '🎙️ Voice note (0:38)',
        createdAt: '2026-09-12T23:46:20Z',
        isMine: false,
        deliveryStatus: 'read',
        attachments: [
          {
            name: 'Voice-Note-Studio-Plan.m4a',
            type: 'voice',
            size: '0:38',
            durationMs: 38000,
          }
        ],
        reactions: [{ emoji: '👍', count: 2, userReacted: false }],
      },
      {
        id: 'msg_v9',
        senderId: 'user_me',
        senderName: 'Shahad (Lead Partner)',
        senderUsername: 'shahad',
        senderAvatar: CURRENT_USER.avatar,
        content: 'Dastxosh brayan, sbehi sa3at 11:00 AM bo recording l studioya Viola bshin bashtra. Cameran hazren.',
        createdAt: '2026-09-12T23:47:05Z',
        isMine: true,
        deliveryStatus: 'read',
        reactions: [{ emoji: '🔥', count: 4, userReacted: false }],
      }
    ],
  },
  {
    id: 'chat_smart_city',
    type: 'group',
    name: 'Smart City Project',
    avatar: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=160&h=160&q=80',
    updatedAt: '2026-09-12T19:40:00Z',
    unreadCount: 0,
    lastMessageContent: "Ahmed: Looks great! Let's move forward with billboard key art.",
    lastMessageSenderId: 'u_ahmed',
    lastMessageTime: '7:40 PM',
    isMuted: false,
    effectiveMaxFileSize: '3 GiB',
    pinnedMessages: ['pinned_sc_1'],
    participants: [
      { id: 'u_ahmed', username: 'ahmed_client', displayName: 'Ahmed (Smart City)', role: 'admin', isOnline: true },
      { id: 'u_sarah', username: 'sarah_j', displayName: 'Sarah Jenkins (Video Lead)', role: 'member', isOnline: true },
      { id: 'user_me', username: 'shahad', displayName: 'Shahad (Lead Partner)', role: 'owner', isOnline: true },
    ],
    messages: [
      {
        id: 'pinned_sc_1',
        senderId: 'user_me',
        senderName: 'Shahad (Lead Partner)',
        senderUsername: 'shahad',
        content: '📌 Q3 Deliverables Schedule: 4K Commercial Reel, Billboard Vector Suite & Interactive Portal Demo.',
        createdAt: '2026-09-10T10:00:00Z',
        isMine: true,
        deliveryStatus: 'read',
        isPinned: true,
      },
      {
        id: 'sc_msg_1',
        senderId: 'u_sarah',
        senderName: 'Sarah Jenkins (Video Lead)',
        senderUsername: 'sarah_j',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
        content: 'Hi everyone, here is the updated campaign master file and billboard preview mockup.',
        createdAt: '2026-09-12T18:15:00Z',
        isMine: false,
        deliveryStatus: 'read',
        attachments: [
          {
            name: 'SmartCity_Campaign_Master_v2.pdf',
            type: 'pdf',
            size: '8.4 MB',
          },
          {
            name: 'Billboard_Preview_Night.jpg',
            type: 'image',
            size: '3.2 MB',
            uri: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
          }
        ],
        reactions: [{ emoji: '❤️', count: 4, userReacted: true }],
      },
      {
        id: 'sc_msg_2',
        senderId: 'u_ahmed',
        senderName: 'Ahmed (Smart City)',
        senderUsername: 'ahmed_client',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
        content: "Looks great! ✅ Let's move forward with billboard key art.",
        createdAt: '2026-09-12T19:40:00Z',
        isMine: false,
        deliveryStatus: 'read',
        reactions: [{ emoji: '🚀', count: 3, userReacted: true }],
      }
    ],
  },
  {
    id: 'chat_haji_yaseen',
    type: 'group',
    name: 'Haji Yaseen Branding',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
    updatedAt: '2026-09-12T17:20:00Z',
    unreadCount: 2,
    lastMessageContent: 'Marcus: Reviewing files in folder fonts and color tokens...',
    lastMessageSenderId: 'u_marcus',
    lastMessageTime: '5:20 PM',
    isMuted: false,
    effectiveMaxFileSize: '3 GiB',
    pinnedMessages: [],
    participants: [
      { id: 'u_haji', username: 'haji_yaseen', displayName: 'Haji Yaseen Group', role: 'admin', isOnline: false },
      { id: 'u_marcus', username: 'marcus_v', displayName: 'Marcus Vance (Brand Strategist)', role: 'member', isOnline: true },
      { id: 'user_me', username: 'shahad', displayName: 'Shahad (Lead Partner)', role: 'owner', isOnline: true },
    ],
    messages: [
      {
        id: 'hy_1',
        senderId: 'u_marcus',
        senderName: 'Marcus Vance',
        senderUsername: 'marcus_v',
        senderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80',
        content: 'Reviewing files in folder fonts and color tokens. New Arabic ligature glyphs are in place.',
        createdAt: '2026-09-12T17:20:00Z',
        isMine: false,
        deliveryStatus: 'delivered',
        attachments: [
          {
            name: 'HajiYaseen_Arabic_Typography.ttf',
            type: 'file',
            size: '1.4 MB',
          }
        ]
      }
    ],
  },
  {
    id: 'chat_nali_realestate',
    type: 'group',
    name: 'Nali Real Estate',
    avatar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=160&h=160&q=80',
    updatedAt: '2026-09-12T14:10:00Z',
    unreadCount: 0,
    lastMessageContent: 'Elena: High-res architectural photos uploaded to assets.',
    lastMessageSenderId: 'u_elena',
    lastMessageTime: '2:10 PM',
    isMuted: false,
    effectiveMaxFileSize: '3 GiB',
    pinnedMessages: [],
    participants: [
      { id: 'u_elena', username: 'elena_r', displayName: 'Elena Rostova (Photographer)', role: 'member', isOnline: true },
      { id: 'user_me', username: 'shahad', displayName: 'Shahad (Lead Partner)', role: 'owner', isOnline: true },
    ],
    messages: [
      {
        id: 'nali_1',
        senderId: 'u_elena',
        senderName: 'Elena Rostova',
        senderUsername: 'elena_r',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
        content: 'High-res architectural photos uploaded to assets. Here is the penthouse dusk shot!',
        createdAt: '2026-09-12T14:10:00Z',
        isMine: false,
        deliveryStatus: 'read',
        attachments: [
          {
            name: 'Penthouse_Dusk_Architectural.jpg',
            type: 'image',
            size: '4.8 MB',
            uri: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
          }
        ],
        reactions: [{ emoji: '🔥', count: 5, userReacted: true }]
      }
    ],
  },
  {
    id: 'chat_alex_partner',
    type: 'dm',
    name: 'Alex Partner',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&h=160&q=80',
    updatedAt: '2026-09-12T20:02:00Z',
    unreadCount: 0,
    lastMessageContent: 'Welcome to Viola live workspace. Let me know when you review the contract.',
    lastMessageSenderId: 'u_alex',
    lastMessageTime: '8:02 PM',
    otherUser: {
      id: 'u_alex',
      username: 'alex_partner',
      displayName: 'Alex Partner',
      role: 'admin',
      isOnline: true,
      lastSeen: '2026-09-12T20:05:00Z',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&h=160&q=80',
    },
    participants: [
      { id: 'u_alex', username: 'alex_partner', displayName: 'Alex Partner', role: 'admin', isOnline: true },
      { id: 'user_me', username: 'shahad', displayName: 'Shahad (Lead Partner)', role: 'owner', isOnline: true },
    ],
    pinnedMessages: [],
    messages: [
      {
        id: 'alex_1',
        senderId: 'u_alex',
        senderName: 'Alex Partner',
        senderUsername: 'alex_partner',
        senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&h=160&q=80',
        content: 'Hi Shahad! Welcome to Viola live workspace. Let me know when you review the contract.',
        createdAt: '2026-09-12T20:00:00Z',
        isMine: false,
        deliveryStatus: 'read',
        attachments: [
          {
            name: 'Viola_Partnership_Agreement_2026.pdf',
            type: 'pdf',
            size: '2.1 MB',
          }
        ],
      },
      {
        id: 'alex_2',
        senderId: 'user_me',
        senderName: 'Shahad (Lead Partner)',
        senderUsername: 'shahad',
        content: 'Already looked through the key clauses. Signatures look clean and ready.',
        createdAt: '2026-09-12T20:02:00Z',
        isMine: true,
        deliveryStatus: 'read',
      }
    ],
  },
  {
    id: 'chat_sarah_dm',
    type: 'dm',
    name: 'Sarah Jenkins (Video Lead)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80',
    updatedAt: '2026-09-12T16:15:00Z',
    unreadCount: 1,
    lastMessageContent: 'Final cut for the social reel is ready for your review.',
    lastMessageSenderId: 'u_sarah',
    lastMessageTime: '4:15 PM',
    otherUser: {
      id: 'u_sarah',
      username: 'sarah_j',
      displayName: 'Sarah Jenkins (Video Lead)',
      role: 'member',
      isOnline: true,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80',
    },
    participants: [
      { id: 'u_sarah', username: 'sarah_j', displayName: 'Sarah Jenkins', role: 'member', isOnline: true },
      { id: 'user_me', username: 'shahad', displayName: 'Shahad', role: 'owner', isOnline: true },
    ],
    pinnedMessages: [],
    messages: [
      {
        id: 'sarah_dm_1',
        senderId: 'u_sarah',
        senderName: 'Sarah Jenkins',
        senderUsername: 'sarah_j',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80',
        content: 'Final cut for the social reel is ready for your review. Color grading matched our twilight gold palette.',
        createdAt: '2026-09-12T16:15:00Z',
        isMine: false,
        deliveryStatus: 'delivered',
        attachments: [
          {
            name: 'Reel_Hero_Dusk_4K.mp4',
            type: 'video',
            size: '48.2 MB',
            durationMs: 45000,
          }
        ]
      }
    ],
  },
  {
    id: 'chat_carwash_detailing',
    type: 'group',
    name: 'Apex Detailing & Car Wash',
    avatar: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=160&h=160&q=80',
    updatedAt: '2026-09-12T16:45:00Z',
    unreadCount: 1,
    lastMessageContent: 'Kamaran: Snow foam shoot setup looks super slick. Check the inspo board!',
    lastMessageSenderId: 'u_kamaran',
    lastMessageTime: '4:45 PM',
    isMuted: false,
    effectiveMaxFileSize: '3 GiB',
    pinnedMessages: [],
    participants: [
      { id: 'u_kamaran', username: 'kamaran_apex', displayName: 'Kamaran (Apex Auto)', role: 'admin', isOnline: true },
      { id: 'u_arman', username: 'armanezaat', displayName: 'armanezaat🎬', role: 'member', isOnline: true },
      { id: 'user_me', username: 'shahad', displayName: 'Shahad (Lead Partner)', role: 'owner', isOnline: true },
    ],
    messages: [
      {
        id: 'apex_1',
        senderId: 'u_kamaran',
        senderName: 'Kamaran (Apex Auto)',
        senderUsername: 'kamaran_apex',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
        content: 'Snow foam shoot setup looks super slick. Check the inspo playlist for our next reel!',
        createdAt: '2026-09-12T16:45:00Z',
        isMine: false,
        deliveryStatus: 'read',
      }
    ],
  },
  {
    id: 'chat_restaurant_food',
    type: 'group',
    name: 'Bite & Brew Bistro',
    avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=160&h=160&q=80',
    updatedAt: '2026-09-12T15:10:00Z',
    unreadCount: 0,
    lastMessageContent: 'Chef Tariq: Plating references for autumn menu are approved.',
    lastMessageSenderId: 'u_tariq',
    lastMessageTime: '3:10 PM',
    isMuted: false,
    effectiveMaxFileSize: '3 GiB',
    pinnedMessages: [],
    participants: [
      { id: 'u_tariq', username: 'chef_tariq', displayName: 'Chef Tariq (Bite & Brew)', role: 'admin', isOnline: true },
      { id: 'u_elena', username: 'elena_r', displayName: 'Elena Rostova', role: 'member', isOnline: true },
      { id: 'user_me', username: 'shahad', displayName: 'Shahad (Lead Partner)', role: 'owner', isOnline: true },
    ],
    messages: [
      {
        id: 'bb_1',
        senderId: 'u_tariq',
        senderName: 'Chef Tariq',
        senderUsername: 'chef_tariq',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
        content: 'Plating references for autumn menu are approved. Let us shoot the craft cocktail reel on Thursday.',
        createdAt: '2026-09-12T15:10:00Z',
        isMine: false,
        deliveryStatus: 'read',
      }
    ],
  }
];

export const INITIAL_FEED_ITEMS: FeedItem[] = [
  {
    id: 'feed_1',
    kind: 'reel',
    title: 'Autumn Campaign 2026 / Cinematic Reel',
    summary: 'Direct from the color suite: 60-second teaser for the Smart City brand reveal.',
    body: 'Captured across Erbil and Duhok using anamorphic optics. The campaign balances modern architecture with warm Kurdistan dusk sunlight, emphasizing structural elegance and human warmth.',
    authorName: 'Viola Media Squad',
    publishedAt: '2026-09-12T10:00:00Z',
    likeCount: 42,
    commentCount: 8,
    viewerLiked: true,
    media: [
      {
        id: 'm_reel_1',
        fileName: 'SmartCity_Teaser_60s.mp4',
        mimeType: 'video/mp4',
        fileSize: 34 * 1024 * 1024,
        url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
        durationMs: 60000,
        caption: 'Color graded in DaVinci Resolve with custom Viola 35mm LUT.',
      }
    ],
    comments: [
      { id: 'c1', authorName: 'Ahmed (Smart City)', authorUsername: 'ahmed_client', body: 'The dusk lighting transition at 0:24 is phenomenal. Approved for broadcast!', createdAt: '2026-09-12T11:20:00Z' },
      { id: 'c2', authorName: 'Marcus Vance', authorUsername: 'marcus_v', body: 'Sound design complements the pacing perfectly. Ready for social roll-out.', createdAt: '2026-09-12T11:45:00Z' },
    ]
  },
  {
    id: 'feed_2',
    kind: 'blog',
    title: 'Behind the Brand: Engineering Kurdish Digital Spaces',
    summary: 'A deep-dive into typography, responsive layout scaling, and high-performance offline chat architectures.',
    body: 'Creating digital tools for Kurdistan requires honoring linguistic nuances—from right-to-left Kurdish Sorani typography to Latin-based representations, accompanied by localized timing conventions.\n\nAt Viola, we designed the messaging layer to deliver sub-millisecond local hydration while ensuring all client media conforms to strict security thresholds. In this article, our design and engineering squad breakdown the mathematical step scale used across our design system.',
    authorName: 'Viola Studio Press',
    publishedAt: '2026-09-11T14:30:00Z',
    likeCount: 68,
    commentCount: 14,
    viewerLiked: false,
    media: [
      {
        id: 'm_blog_1',
        fileName: 'typography_study.jpg',
        mimeType: 'image/jpeg',
        fileSize: 2.4 * 1024 * 1024,
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
        caption: 'Mathematical typographic scale balancing Latin and Kurdish character heights.',
      }
    ],
    comments: [
      { id: 'c3', authorName: 'Jomaa Akreyi', authorUsername: 'jomaa_akreyi', body: 'Dastxosh! The typography section is a masterclass.', createdAt: '2026-09-11T16:00:00Z' }
    ]
  },
  {
    id: 'feed_3',
    kind: 'announcement',
    title: 'Studio Expansion & 3 GiB Resumable Cloud UDrive',
    summary: 'Active clients now have access to high-bandwidth file transfers for raw footage and high-res master files.',
    body: 'We have upgraded all active client nodes to support up to 3 GiB per file transfer directly in the chat timeline, supported by chunked resumable upload technology and zero-knowledge local caching.',
    authorName: 'Viola Infrastructure',
    publishedAt: '2026-09-10T09:00:00Z',
    likeCount: 54,
    commentCount: 5,
    viewerLiked: true,
    media: [],
    comments: [
      { id: 'c4', authorName: 'Elena Rostova', authorUsername: 'elena_r', body: 'Massive upgrade for sending uncompressed TIFF and RAW bundles.', createdAt: '2026-09-10T10:15:00Z' }
    ]
  },
  {
    id: 'feed_4',
    kind: 'post',
    title: 'Nali Real Estate Brand Identity Showcase',
    summary: 'Brand identity system, foil-stamped stationery, and outdoor digital billboard system.',
    body: 'Complete visual identity created for Nali Real Estate, blending minimalist architectural geometry with rich emerald and brass foils.',
    authorName: 'Viola Creative Lab',
    publishedAt: '2026-09-09T17:00:00Z',
    likeCount: 91,
    commentCount: 19,
    viewerLiked: false,
    media: [
      {
        id: 'm_post_1',
        fileName: 'nali_stationery.jpg',
        mimeType: 'image/jpeg',
        fileSize: 4.1 * 1024 * 1024,
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Architectural portfolio packaging and stationery collateral.',
      }
    ],
    comments: []
  }
];

export const INITIAL_CLIENT_FILES: ClientFile[] = [
  // Zofia Coffee Files
  {
    id: 'f_zofia_logo_primary',
    clientId: 'zofia_coffee',
    clientName: 'Zofia Coffee',
    name: 'Zofia_Primary_Horizontal_Vector.svg',
    folder: 'Logos',
    size: '1.8 MB',
    fileSizeBytes: 1.8 * 1024 * 1024,
    type: 'image/svg+xml',
    updatedAt: '2026-09-14T10:30:00Z',
    version: 2,
    author: 'Michael Torres',
    previewUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
    versions: [
      { version: 2, author: 'Michael Torres', date: '2026-09-14', note: 'Refined kerning for Kurdish & English dual lockup.' },
      { version: 1, author: 'Michael Torres', date: '2026-08-28', note: 'Initial approved vector mark.' },
    ]
  },
  {
    id: 'f_zofia_logo_icon',
    clientId: 'zofia_coffee',
    clientName: 'Zofia Coffee',
    name: 'Zofia_Monogram_Stamp.png',
    folder: 'Logos',
    size: '820 KB',
    fileSizeBytes: 820 * 1024,
    type: 'image/png',
    updatedAt: '2026-09-12T14:15:00Z',
    version: 1,
    author: 'Michael Torres',
    previewUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'f_zofia_font_poppins',
    clientId: 'zofia_coffee',
    clientName: 'Zofia Coffee',
    name: 'Poppins-SemiBold.ttf',
    folder: 'Fonts',
    size: '1.2 MB',
    fileSizeBytes: 1.2 * 1024 * 1024,
    type: 'font/ttf',
    updatedAt: '2026-09-08T15:30:00Z',
    version: 1,
    author: 'Michael Torres',
  },
  {
    id: 'f_zofia_font_krd',
    clientId: 'zofia_coffee',
    clientName: 'Zofia Coffee',
    name: 'ViolaKRD-CoffeeSpecial.otf',
    folder: 'Fonts',
    size: '1.8 MB',
    fileSizeBytes: 1.8 * 1024 * 1024,
    type: 'font/otf',
    updatedAt: '2026-09-08T15:35:00Z',
    version: 1,
    author: 'Michael Torres',
  },
  {
    id: 'f_zofia_brand_guide',
    clientId: 'zofia_coffee',
    clientName: 'Zofia Coffee',
    name: 'Zofia_Brand_Guidelines_Book_2026.pdf',
    folder: 'Brand Assets',
    size: '14.2 MB',
    fileSizeBytes: 14.2 * 1024 * 1024,
    type: 'application/pdf',
    updatedAt: '2026-09-10T11:00:00Z',
    version: 3,
    author: 'Shahad (Lead Partner)',
    versions: [
      { version: 3, author: 'Shahad', date: '2026-09-10', note: 'Added packaging foil stamping specifications.' },
      { version: 2, author: 'Marcus Vance', date: '2026-08-30', note: 'Standardized barista uniform guide.' },
    ]
  },
  {
    id: 'f_zofia_post_morning',
    clientId: 'zofia_coffee',
    clientName: 'Zofia Coffee',
    name: 'Post_01_Ethiopian_PourOver_4K.jpg',
    folder: 'Posts',
    size: '6.4 MB',
    fileSizeBytes: 6.4 * 1024 * 1024,
    type: 'image/jpeg',
    updatedAt: '2026-09-18T09:00:00Z',
    version: 1,
    author: 'Elena Rostova',
    previewUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'f_zofia_reel_aeropress',
    clientId: 'zofia_coffee',
    clientName: 'Zofia Coffee',
    name: 'Reel_01_AeroPress_Ritual_9x16.mp4',
    folder: 'Reels',
    size: '94.0 MB',
    fileSizeBytes: 94 * 1024 * 1024,
    type: 'video/mp4',
    updatedAt: '2026-09-17T16:20:00Z',
    version: 2,
    author: 'armanezaat🎬',
    previewUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    versions: [
      { version: 2, author: 'armanezaat🎬', date: '2026-09-17', note: 'Added Kurdish subtitles and natural coffee shop ambience.' }
    ]
  },
  {
    id: 'f_zofia_photo_roastery',
    clientId: 'zofia_coffee',
    clientName: 'Zofia Coffee',
    name: 'Roastery_Interior_GoldenHour_RAW.zip',
    folder: 'Photos',
    size: '420.0 MB',
    fileSizeBytes: 420 * 1024 * 1024,
    type: 'application/zip',
    updatedAt: '2026-09-15T18:45:00Z',
    version: 1,
    author: 'Elena Rostova',
  },
  {
    id: 'f_zofia_contract',
    clientId: 'zofia_coffee',
    clientName: 'Zofia Coffee',
    name: 'Viola_Zofia_Retainer_Scope_2026.pdf',
    folder: 'Contracts',
    size: '2.1 MB',
    fileSizeBytes: 2.1 * 1024 * 1024,
    type: 'application/pdf',
    updatedAt: '2026-09-01T10:00:00Z',
    version: 1,
    author: 'Viola Legal',
  },

  // Smart City Erbil Files
  {
    id: 'f1',
    clientId: 'smart_city_erbil',
    clientName: 'Smart City Erbil',
    name: 'SmartCity_Brand_Guidelines_2026.pdf',
    folder: 'Brand Assets',
    size: '18.4 MB',
    fileSizeBytes: 18.4 * 1024 * 1024,
    type: 'application/pdf',
    updatedAt: '2026-09-12T18:00:00Z',
    version: 3,
    author: 'Marcus Vance (Brand Strategist)',
    previewUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
    versions: [
      { version: 3, author: 'Marcus Vance', date: '2026-09-12', note: 'Added Arabic typography rules and billboard safe zones.' },
      { version: 2, author: 'Michael Torres', date: '2026-09-01', note: 'Updated primary color hex tokens.' },
      { version: 1, author: 'Michael Torres', date: '2026-08-15', note: 'Initial concept draft.' },
    ]
  },
  {
    id: 'f2',
    clientId: 'smart_city_erbil',
    clientName: 'Smart City Erbil',
    name: 'SmartCity_SVG_Vector_Package.zip',
    folder: 'Logos',
    size: '5.6 MB',
    fileSizeBytes: 5.6 * 1024 * 1024,
    type: 'application/zip',
    updatedAt: '2026-09-10T12:00:00Z',
    version: 2,
    author: 'Michael Torres (Brand Designer)',
    versions: [
      { version: 2, author: 'Michael Torres', date: '2026-09-10', note: 'Added monochrome and dark mode marks.' },
      { version: 1, author: 'Michael Torres', date: '2026-08-20', note: 'Base vector logo exports.' },
    ]
  },
  {
    id: 'f5',
    clientId: 'smart_city_erbil',
    clientName: 'Smart City Erbil',
    name: 'Campaign_Hero_Dusk_4K.mp4',
    folder: 'Reels',
    size: '185.0 MB',
    fileSizeBytes: 185 * 1024 * 1024,
    type: 'video/mp4',
    updatedAt: '2026-09-11T20:00:00Z',
    version: 2,
    author: 'Sarah Jenkins (Video Lead)',
    previewUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    versions: [
      { version: 2, author: 'Sarah Jenkins', date: '2026-09-11', note: 'Final color master with Dolby sound.' },
      { version: 1, author: 'Sarah Jenkins', date: '2026-09-05', note: 'Rough assembly cut.' }
    ]
  },
  {
    id: 'f6',
    clientId: 'smart_city_erbil',
    clientName: 'Smart City Erbil',
    name: 'Architectural_Master_Penthouse.zip',
    folder: 'Photos',
    size: '340.0 MB',
    fileSizeBytes: 340 * 1024 * 1024,
    type: 'application/zip',
    updatedAt: '2026-09-09T14:10:00Z',
    version: 1,
    author: 'Elena Rostova (Photographer)',
  },

  // BSmiley London Files
  {
    id: 'f_bsmiley_logo',
    clientId: 'bsmiley_london',
    clientName: 'BSmiley London',
    name: 'BSmiley_HarleySt_London_Logo.svg',
    folder: 'Logos',
    size: '1.4 MB',
    fileSizeBytes: 1.4 * 1024 * 1024,
    type: 'image/svg+xml',
    updatedAt: '2026-09-11T09:20:00Z',
    version: 2,
    author: 'Michael Torres',
    previewUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'f_bsmiley_reel_whiten',
    clientId: 'bsmiley_london',
    clientName: 'BSmiley London',
    name: 'Reel_Whiten_On_The_Go_Campaign.mp4',
    folder: 'Reels',
    size: '128.0 MB',
    fileSizeBytes: 128 * 1024 * 1024,
    type: 'video/mp4',
    updatedAt: '2026-09-16T14:00:00Z',
    version: 2,
    author: 'armanezaat🎬',
    previewUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'f_bsmiley_post_smile',
    clientId: 'bsmiley_london',
    clientName: 'BSmiley London',
    name: 'Post_Aesthetic_Smile_Transformation.jpg',
    folder: 'Posts',
    size: '4.8 MB',
    fileSizeBytes: 4.8 * 1024 * 1024,
    type: 'image/jpeg',
    updatedAt: '2026-09-14T17:00:00Z',
    version: 1,
    author: 'Elena Rostova',
    previewUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
  },

  // Dav Laundry Files
  {
    id: 'f_dav_logo',
    clientId: 'dav_laundry',
    clientName: 'Dav Laundry',
    name: 'Dav_Laundry_EcoClean_Mark.svg',
    folder: 'Logos',
    size: '1.1 MB',
    fileSizeBytes: 1.1 * 1024 * 1024,
    type: 'image/svg+xml',
    updatedAt: '2026-09-13T12:00:00Z',
    version: 1,
    author: 'Michael Torres',
    previewUrl: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'f_dav_post_linen',
    clientId: 'dav_laundry',
    clientName: 'Dav Laundry',
    name: 'Post_Crisp_Linen_Steam_Texture.jpg',
    folder: 'Posts',
    size: '5.2 MB',
    fileSizeBytes: 5.2 * 1024 * 1024,
    type: 'image/jpeg',
    updatedAt: '2026-09-15T11:30:00Z',
    version: 1,
    author: 'Sarah Jenkins',
    previewUrl: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=600&q=80',
  },

  // Lupa Lupa Toys Files
  {
    id: 'f_lupa_logo',
    clientId: 'lupa_lupa_toys',
    clientName: 'Lupa Lupa Toys',
    name: 'LupaLupa_Playful_Character_Mark.svg',
    folder: 'Logos',
    size: '2.4 MB',
    fileSizeBytes: 2.4 * 1024 * 1024,
    type: 'image/svg+xml',
    updatedAt: '2026-09-10T15:00:00Z',
    version: 2,
    author: 'Michael Torres',
    previewUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'f_lupa_post_stem',
    clientId: 'lupa_lupa_toys',
    clientName: 'Lupa Lupa Toys',
    name: 'Post_STEM_Robotics_Kit_Launch.jpg',
    folder: 'Posts',
    size: '4.6 MB',
    fileSizeBytes: 4.6 * 1024 * 1024,
    type: 'image/jpeg',
    updatedAt: '2026-09-16T13:00:00Z',
    version: 1,
    author: 'Elena Rostova',
    previewUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80',
  },

  // Cleanify Files
  {
    id: 'f_clean_logo',
    clientId: 'cleanify_krd',
    clientName: 'Cleanify',
    name: 'Cleanify_BioShield_Logo.svg',
    folder: 'Logos',
    size: '1.3 MB',
    fileSizeBytes: 1.3 * 1024 * 1024,
    type: 'image/svg+xml',
    updatedAt: '2026-09-12T10:00:00Z',
    version: 1,
    author: 'Michael Torres',
    previewUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'f_clean_post_steam',
    clientId: 'cleanify_krd',
    clientName: 'Cleanify',
    name: 'Post_Hospital_Grade_Sanitation.jpg',
    folder: 'Posts',
    size: '5.1 MB',
    fileSizeBytes: 5.1 * 1024 * 1024,
    type: 'image/jpeg',
    updatedAt: '2026-09-14T08:30:00Z',
    version: 1,
    author: 'Shahad',
    previewUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
  },

  // Versa Wellness Files
  {
    id: 'f_versa_logo',
    clientId: 'versa_wellness',
    clientName: 'Versa Wellness',
    name: 'Versa_Sanctuary_Serene_Mark.svg',
    folder: 'Logos',
    size: '1.6 MB',
    fileSizeBytes: 1.6 * 1024 * 1024,
    type: 'image/svg+xml',
    updatedAt: '2026-09-09T16:00:00Z',
    version: 1,
    author: 'Michael Torres',
    previewUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'f_versa_reel_thermal',
    clientId: 'versa_wellness',
    clientName: 'Versa Wellness',
    name: 'Reel_Thermal_Bath_Sound_Immersion.mp4',
    folder: 'Reels',
    size: '110.0 MB',
    fileSizeBytes: 110 * 1024 * 1024,
    type: 'video/mp4',
    updatedAt: '2026-09-16T19:00:00Z',
    version: 1,
    author: 'armanezaat🎬',
    previewUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
  },

  // Haji Yaseen Group
  {
    id: 'f_haji_logo',
    clientId: 'haji_yaseen_group',
    clientName: 'Haji Yaseen Group',
    name: 'Haji_Yaseen_Gilded_Heritage_Crest.svg',
    folder: 'Logos',
    size: '2.8 MB',
    fileSizeBytes: 2.8 * 1024 * 1024,
    type: 'image/svg+xml',
    updatedAt: '2026-09-07T11:00:00Z',
    version: 2,
    author: 'Michael Torres',
    previewUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },

  // Nali Real Estate
  {
    id: 'f_nali_logo',
    clientId: 'nali_real_estate',
    clientName: 'Nali Real Estate',
    name: 'Nali_Emerald_Monogram.svg',
    folder: 'Logos',
    size: '1.9 MB',
    fileSizeBytes: 1.9 * 1024 * 1024,
    type: 'image/svg+xml',
    updatedAt: '2026-09-06T15:00:00Z',
    version: 1,
    author: 'Michael Torres',
    previewUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
  },

  // Bite & Brew Bistro
  {
    id: 'f_bite_logo',
    clientId: 'bite_brew_bistro',
    clientName: 'Bite & Brew Bistro',
    name: 'Bite_Brew_WoodFired_Emblem.svg',
    folder: 'Logos',
    size: '2.1 MB',
    fileSizeBytes: 2.1 * 1024 * 1024,
    type: 'image/svg+xml',
    updatedAt: '2026-09-08T14:00:00Z',
    version: 1,
    author: 'Michael Torres',
    previewUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
  }
];

export const VIOLA_CLIENTS: ViolaClient[] = [
  {
    id: 'zofia_coffee',
    name: 'Zofia Coffee',
    logo: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=120&h=120&q=80',
    color: '#D97706',
    industry: 'Coffee & Beverage',
    location: 'Erbil, Kurdistan Region',
    website: 'https://zofiacoffee.com',
    social: '@zofiacoffee',
    package: {
      posts: 4,
      reels: 2,
      stories: 8,
      month: 'September Package',
      summary: '4 Posts · 2 Reels',
      period: 'September 2026',
      progressPercent: 75,
    },
    brief: {
      about: 'Zofia Coffee is a modern specialty coffee brand and artisanal roastery based in Erbil, celebrated for single-origin Ethiopian and Colombian beans.',
      positioning: 'Premium artisanal coffee culture for design-forward young professionals and coffee purists.',
      targetAudience: 'Urban creatives, tech founders, architects, and specialty coffee lovers (20–42).',
      toneOfVoice: 'Warm, minimalist, refined, inviting, and sensory-driven.',
      brandPersonality: ['Artisanal', 'Refined', 'Modern', 'Sensory', 'Warm'],
      contentDirection: 'Top-down flat-lay aesthetic photography, golden morning lighting, tactile packaging, and macro slow-motion pour-overs.',
      restrictions: 'Never use generic cafeteria stock images or noisy loud audio tracks.',
      marketingGoals: 'Drive foot traffic to the flagship roastery and boost subscription bean orders by 35% in Q4.',
    },
    brandColors: [
      { name: 'Warm Amber', hex: '#D97706', role: 'Primary Accent' },
      { name: 'Roasted Espresso', hex: '#2A1810', role: 'Dark Base' },
      { name: 'Steamed Oat', hex: '#F5EFEB', role: 'Light Canvas' },
      { name: 'Crema Gold', hex: '#E6A23C', role: 'Secondary Accent' },
    ],
    fonts: [
      { id: 'f_zofia_1', name: 'Poppins', category: 'Brand Font', weight: 'SemiBold', format: 'TTF', size: '1.2 MB', samplePreview: 'Aa Bb Cc 0123456789' },
      { id: 'f_zofia_2', name: 'Noto Kufi Arabic', category: 'Arabic Font', weight: 'Bold', format: 'TTF', size: '1.4 MB', samplePreview: 'قهوة زوفيا المختصة أربيل' },
      { id: 'f_zofia_3', name: 'Viola KRD', category: 'Kurdish Font', weight: 'Display Regular', format: 'OTF', size: '1.8 MB', samplePreview: 'قاوەی تایبەتی زۆفیا' },
    ],
    assignedTeam: [
      { name: 'Elena Rostova', role: 'Lead Photographer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80' },
      { name: 'Shahad', role: 'Lead Partner', avatar: CURRENT_USER.avatar },
      { name: 'armanezaat🎬', role: 'Senior Director', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120&q=80' },
    ]
  },
  {
    id: 'smart_city_erbil',
    name: 'Smart City Erbil',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80',
    color: '#7C3AED',
    industry: 'Urban Architecture & Real Estate',
    location: '100m Road, Erbil, KRG',
    website: 'https://smartcityerbil.iq',
    social: '@smartcity.erbil',
    package: {
      posts: 8,
      reels: 4,
      stories: 12,
      month: 'September Package',
      summary: '8 Posts · 4 Reels · 12 Stories',
      period: 'September 2026',
      progressPercent: 60,
    },
    brief: {
      about: 'Pioneering mega-development offering smart residences, sustainable energy towers, and international commercial plazas in the capital of Kurdistan.',
      positioning: 'The future of modern Iraqi Kurdistan living, combining IoT smart infrastructure with timeless architectural grandeur.',
      targetAudience: 'High-net-worth investors, diaspora families, diaspora returnees, and forward-looking homeowners.',
      toneOfVoice: 'Visionary, confident, prestigious, and technologically advanced.',
      brandPersonality: ['Futuristic', 'Prestigious', 'Architectural', 'Eco-Smart'],
      contentDirection: 'Dusk drone timelapses, hyper-realistic architectural renderings, structural engineering interviews.',
    },
    brandColors: [
      { name: 'Smart Violet', hex: '#7C3AED', role: 'Primary Accent' },
      { name: 'Deep Space Navy', hex: '#0B0F19', role: 'Dark Base' },
      { name: 'Glass Cyan', hex: '#06B6D4', role: 'Tech Highlight' },
      { name: 'Platinum Concrete', hex: '#E2E8F0', role: 'Neutral Tone' },
    ],
    fonts: [
      { id: 'f_smart_1', name: 'Cabinet Grotesk', category: 'Brand Font', weight: 'Extrabold', format: 'WOFF2', size: '890 KB', samplePreview: 'Aa Bb Cc 0123456789' },
      { id: 'f_smart_2', name: 'IBM Plex Sans Arabic', category: 'Arabic Font', weight: 'SemiBold', format: 'TTF', size: '1.1 MB', samplePreview: 'مدينة أربيل الذكية' },
    ],
    assignedTeam: [
      { name: 'Marcus Vance', role: 'Brand Strategist', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80' },
      { name: 'Michael Torres', role: 'Lead 3D Artist', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80' },
    ]
  },
  {
    id: 'bsmiley_london',
    name: 'BSmiley London',
    logo: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=120&h=120&q=80',
    color: '#0284C7',
    industry: 'Dental Aesthetics & Care',
    location: 'Mayfair, London & Gulan Park Erbil',
    website: 'https://bsmileylondon.com',
    social: '@bsmiley.london',
    package: {
      posts: 6,
      reels: 3,
      stories: 10,
      month: 'September Package',
      summary: '6 Posts · 3 Reels',
      period: 'September 2026',
      progressPercent: 85,
    },
    brief: {
      about: 'Boutique British cosmetic dentistry and aesthetic smile studio bringing Harley Street expertise to Erbil.',
      positioning: 'Effortless London luxury smiles with zero-anxiety clinical comfort.',
      targetAudience: 'Fashion influencers, executives, brides, and cosmetic dental clients.',
      toneOfVoice: 'Chic, reassuring, luminous, sophisticated.',
      brandPersonality: ['Luminous', 'British Luxury', 'Precise', 'Welcoming'],
      contentDirection: 'High-key studio portraits, macro enamel reflections, dentist micro-tutorials, and candid patient transformations.',
    },
    brandColors: [
      { name: 'Dental Azure', hex: '#0284C7', role: 'Primary Accent' },
      { name: 'Pure Enamel White', hex: '#FAFAFA', role: 'Light Canvas' },
      { name: 'London Slate', hex: '#1E293B', role: 'Typography Base' },
    ],
    fonts: [
      { id: 'f_bsmiley_1', name: 'Playfair Display', category: 'Display Serif', weight: 'Medium', format: 'TTF', size: '1.3 MB', samplePreview: 'Luminous London Smiles' },
      { id: 'f_bsmiley_2', name: 'Inter Tight', category: 'Body Sans', weight: 'Regular', format: 'WOFF2', size: '720 KB', samplePreview: 'Clinically proven aesthetic dentistry' },
    ],
    assignedTeam: [
      { name: 'armanezaat🎬', role: 'Senior Director', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120&q=80' },
      { name: 'Shahad', role: 'Lead Partner', avatar: CURRENT_USER.avatar },
    ]
  },
  {
    id: 'dav_laundry',
    name: 'Dav Laundry',
    logo: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=120&h=120&q=80',
    color: '#2563EB',
    industry: 'Eco Laundry & Dry Cleaning',
    location: 'Dream City & Naznaz, Erbil',
    website: 'https://davlaundry.krd',
    social: '@davlaundry',
    package: {
      posts: 4,
      reels: 2,
      stories: 6,
      month: 'September Package',
      summary: '4 Posts · 2 Reels',
      period: 'September 2026',
      progressPercent: 50,
    },
    brief: {
      about: 'Next-generation eco-friendly garment care, steam conditioning, and organic detergent laundry service.',
      positioning: 'Premium fabric longevity and door-to-door concierge delivery.',
      targetAudience: 'Busy professionals, luxury fashion owners, expat families in residential communities.',
      toneOfVoice: 'Crisp, fresh, hygienic, dependable.',
      brandPersonality: ['Eco-Clean', 'Modern', 'Trustworthy', 'Effortless'],
      contentDirection: 'Crisp linen textures, soothing steam ASMR reels, pristine hanger alignments, and fabric care tips.',
    },
    brandColors: [
      { name: 'Fresh Ozone Blue', hex: '#2563EB', role: 'Primary Accent' },
      { name: 'Clean Mint', hex: '#10B981', role: 'Eco Badge' },
      { name: 'Crisp Cotton', hex: '#F8FAFC', role: 'Surface' },
    ],
    fonts: [
      { id: 'f_dav_1', name: 'Plus Jakarta Sans', category: 'Brand Font', weight: 'Bold', format: 'TTF', size: '1.0 MB', samplePreview: 'Pristine Fabric Care' }
    ],
    assignedTeam: [
      { name: 'Sarah Jenkins', role: 'Video Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80' },
    ]
  },
  {
    id: 'lupa_lupa_toys',
    name: 'Lupa Lupa Toys',
    logo: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=120&h=120&q=80',
    color: '#EA580C',
    industry: 'Kids & Educational Toys',
    location: 'Family Mall & Majidi Mall, Erbil',
    website: 'https://lupalupatoys.com',
    social: '@lupalupatoys',
    package: {
      posts: 8,
      reels: 4,
      stories: 16,
      month: 'September Package',
      summary: '8 Posts · 4 Reels',
      period: 'September 2026',
      progressPercent: 40,
    },
    brief: {
      about: 'Interactive educational toy distributor inspiring curious young minds with Montessori wooden sets, STEM robotics, and safe creative play.',
      positioning: 'Joyful learning that unlocks imagination without excessive screen time.',
      targetAudience: 'Conscious parents, educators, gift-shoppers for birthdays and school achievements.',
      toneOfVoice: 'Playful, vibrant, heartwarming, encouraging.',
      brandPersonality: ['Playful', 'Joyful', 'Educational', 'Safe'],
      contentDirection: 'Color-rich stop-motion toy assemblies, laughing parent-child unboxing reels, and weekend educational challenges.',
    },
    brandColors: [
      { name: 'Sunshine Tangerine', hex: '#EA580C', role: 'Primary' },
      { name: 'Bubblegum Pink', hex: '#EC4899', role: 'Playful Tone' },
      { name: 'Sky Cyan', hex: '#0284C7', role: 'Secondary' },
    ],
    fonts: [
      { id: 'f_lupa_1', name: 'Fredoka', category: 'Brand Font', weight: 'SemiBold', format: 'TTF', size: '940 KB', samplePreview: 'Wonder & Joy in Every Box' }
    ],
    assignedTeam: [
      { name: 'Elena Rostova', role: 'Photographer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80' },
      { name: 'Michael Torres', role: 'Designer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80' },
    ]
  },
  {
    id: 'cleanify_krd',
    name: 'Cleanify',
    logo: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=120&h=120&q=80',
    color: '#059669',
    industry: 'Facility Services & CleanTech',
    location: 'Bakhtiyari, Erbil',
    website: 'https://cleanify.krd',
    social: '@cleanify.krd',
    package: {
      posts: 4,
      reels: 2,
      stories: 8,
      month: 'September Package',
      summary: '4 Posts · 2 Reels',
      period: 'September 2026',
      progressPercent: 90,
    },
    brief: {
      about: 'Enterprise and residential deep sanitation using medical-grade HEPA filters, steam sterilizers, and non-toxic formulas.',
      positioning: 'The gold standard in corporate and villa sanitation across Erbil and Sulaymaniyah.',
      targetAudience: 'Consulates, corporate offices, medical clinics, and residential estates.',
      toneOfVoice: 'Scientific, impeccable, sterile, reassuring.',
      brandPersonality: ['Impeccable', 'Eco-Sanitary', 'Efficient', 'Corporate'],
      contentDirection: 'Satisfying deep-clean before-and-after transformations, bacterial count testing reels, and team uniforms in action.',
    },
    brandColors: [
      { name: 'Hospital Emerald', hex: '#059669', role: 'Primary' },
      { name: 'Arctic Ice', hex: '#E0F2FE', role: 'Surface' },
      { name: 'Deep Carbon', hex: '#111827', role: 'Base' },
    ],
    fonts: [
      { id: 'f_clean_1', name: 'Inter', category: 'Brand Font', weight: 'Medium', format: 'WOFF2', size: '680 KB', samplePreview: 'Purity in Every Square Meter' }
    ],
    assignedTeam: [
      { name: 'Shahad', role: 'Lead Partner', avatar: CURRENT_USER.avatar },
    ]
  },
  {
    id: 'versa_wellness',
    name: 'Versa Wellness',
    logo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=120&h=120&q=80',
    color: '#0D9488',
    industry: 'Wellness & Spa Sanctuary',
    location: 'Gulan Tower, Erbil',
    website: 'https://versawellness.me',
    social: '@versa.wellness',
    package: {
      posts: 6,
      reels: 4,
      stories: 12,
      month: 'September Package',
      summary: '6 Posts · 4 Reels',
      period: 'September 2026',
      progressPercent: 65,
    },
    brief: {
      about: 'Luxury thermal bath, holistic sound therapy, and bespoke Pilates studio crafted for urban decompression.',
      positioning: 'Your private sanctuary to breathe, restore, and reset.',
      targetAudience: 'Women and wellness enthusiasts seeking premium tranquil recovery.',
      toneOfVoice: 'Serene, meditative, breath-focused, luxurious.',
      brandPersonality: ['Serene', 'Holistic', 'Warm Minimalist', 'Rejuvenating'],
      contentDirection: 'Water ripples, candle-lit stone bath aesthetics, slow mindful breathing prompts, and organic botanical infusions.',
    },
    brandColors: [
      { name: 'Sage Teal', hex: '#0D9488', role: 'Primary' },
      { name: 'Warm Clay', hex: '#D7C4B7', role: 'Secondary' },
      { name: 'Smoked Linen', hex: '#F5F5F0', role: 'Surface' },
    ],
    fonts: [
      { id: 'f_versa_1', name: 'Cormorant Garamond', category: 'Editorial Serif', weight: 'Light', format: 'TTF', size: '1.1 MB', samplePreview: 'Return to Stillness' }
    ],
    assignedTeam: [
      { name: 'Elena Rostova', role: 'Photographer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80' },
      { name: 'armanezaat🎬', role: 'Senior Director', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120&q=80' },
    ]
  },
  {
    id: 'haji_yaseen_group',
    name: 'Haji Yaseen Group',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    color: '#B45309',
    industry: 'Luxury Retail & Commerce',
    location: '60m Commercial Axis, Erbil',
    website: 'https://hajiyaseen.com',
    social: '@hajiyaseengroup',
    package: {
      posts: 10,
      reels: 5,
      stories: 20,
      month: 'September Package',
      summary: '10 Posts · 5 Reels',
      period: 'September 2026',
      progressPercent: 80,
    },
    brief: {
      about: 'Centuries of commercial trading heritage encompassing European crystal, fine china, and luxury homeware imports.',
      positioning: 'Timeless luxury prestige for distinguished Iraqi and Kurdish family estates.',
      targetAudience: 'Diplomatic residences, hospitality managers, and connoisseurs of luxury tableware.',
      toneOfVoice: 'Dignified, timeless, aristocratic, prestigious.',
      brandPersonality: ['Heritage', 'Prestige', 'Aristocratic', 'Gilded'],
      contentDirection: 'Macro crystal reflections, gilded 24K tableware table settings, and heritage archival chronicles.',
    },
    brandColors: [
      { name: 'Imperial Brass', hex: '#B45309', role: 'Primary' },
      { name: 'Velvet Midnight', hex: '#0F172A', role: 'Base' },
      { name: 'Crystal Spark', hex: '#FEF3C7', role: 'Accent' },
    ],
    fonts: [
      { id: 'f_haji_1', name: 'Cinzel', category: 'Brand Serif', weight: 'Bold', format: 'TTF', size: '920 KB', samplePreview: 'Elegance Through Generations' }
    ],
    assignedTeam: [
      { name: 'Marcus Vance', role: 'Brand Strategist', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80' },
      { name: 'Shahad', role: 'Lead Partner', avatar: CURRENT_USER.avatar },
    ]
  },
  {
    id: 'nali_real_estate',
    name: 'Nali Real Estate',
    logo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=120&h=120&q=80',
    color: '#059669',
    industry: 'Luxury Real Estate',
    location: 'Empire World, Erbil',
    website: 'https://nalirealestate.iq',
    social: '@nali.realestate',
    package: {
      posts: 4,
      reels: 2,
      stories: 8,
      month: 'September Package',
      summary: '4 Posts · 2 Reels',
      period: 'September 2026',
      progressPercent: 70,
    },
    brief: {
      about: 'Exclusive brokerage handling penthouses, private villas, and prime commercial plots with absolute discretion.',
      positioning: 'Unrivaled property acquisition across Erbil’s premier developments.',
      targetAudience: 'Private investors, international corporate executives, and diaspora buyers.',
      toneOfVoice: 'Confidential, elite, polished, architectural.',
      brandPersonality: ['Elite', 'Discreet', 'Architectural', 'Bespoke'],
      contentDirection: 'Sunset architectural tours, Italian marble textures, private garden courtyards, and verified ROI case studies.',
    },
    brandColors: [
      { name: 'Emerald Verdant', hex: '#059669', role: 'Primary' },
      { name: 'Gilded Brass', hex: '#D97706', role: 'Luxury Accent' },
      { name: 'Carrara Marble', hex: '#F8FAFC', role: 'Canvas' },
    ],
    fonts: [
      { id: 'f_nali_1', name: 'Bodoni Moda', category: 'Display Serif', weight: 'SemiBold', format: 'TTF', size: '1.2 MB', samplePreview: 'Distinctive Architecture' }
    ],
    assignedTeam: [
      { name: 'Michael Torres', role: 'Brand Designer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80' },
    ]
  },
  {
    id: 'bite_brew_bistro',
    name: 'Bite & Brew Bistro',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=120&h=120&q=80',
    color: '#DC2626',
    industry: 'Artisan Food & Cocktails',
    location: 'Ishtar Street, Ainkawa, Erbil',
    website: 'https://biteandbrew.krd',
    social: '@biteandbrew.erbil',
    package: {
      posts: 6,
      reels: 3,
      stories: 14,
      month: 'September Package',
      summary: '6 Posts · 3 Reels',
      period: 'September 2026',
      progressPercent: 55,
    },
    brief: {
      about: 'Wood-fired sourdough pizza, hand-cut steak cuts, and botanical mocktail mixology in an industrial greenhouse setting.',
      positioning: 'Vibrant evening dining and weekend brunch hotspot in Ainkawa.',
      targetAudience: 'Foodies, expats, couples, and friends seeking lively atmosphere and gourmet plates.',
      toneOfVoice: 'Appetizing, energetic, warm, social.',
      brandPersonality: ['Vibrant', 'Gourmet', 'Social', 'Wood-Fired'],
      contentDirection: 'Cheese pull close-ups, cocktail smoke bubbles, roaring wood-fired ovens, and live acoustic night glimpses.',
    },
    brandColors: [
      { name: 'Cherry Ember', hex: '#DC2626', role: 'Primary' },
      { name: 'Charred Oak', hex: '#1C1917', role: 'Dark Base' },
      { name: 'Warm Yeast', hex: '#FEF3C7', role: 'Warm Canvas' },
    ],
    fonts: [
      { id: 'f_bite_1', name: 'Oswald', category: 'Rustic Sans', weight: 'Bold', format: 'TTF', size: '850 KB', samplePreview: 'Flavors Sizzling in Erbil' }
    ],
    assignedTeam: [
      { name: 'Elena Rostova', role: 'Photographer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80' },
      { name: 'armanezaat🎬', role: 'Senior Director', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120&q=80' },
    ]
  }
];

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  // Today: September 19, 2026 (Saturday) - tasks from prompt
  {
    id: 'ev_zofia_1',
    title: 'Morning Coffee Post',
    clientName: 'Zofia Coffee',
    type: 'post',
    contentType: 'Post',
    status: 'Scheduled',
    date: '2026-09-19',
    startTime: '8:00 AM',
    endTime: '8:30 AM',
    clientLogo: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=120&h=120&q=80',
    clientColor: '#D97706',
    note: 'Aesthetic top-down flat-lay showing single-origin Ethiopian pour-over with warm morning sunlight reflections.',
    caption: 'Slow mornings begin with freshly roasted Ethiopian beans. Notes of wild jasmine honey and bergamot citrus. ☕✨ Available now at our Erbil roastery. #ZofiaCoffee #ErbilSpecialty #MorningRitual',
    mediaPreview: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    assignedTo: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'Lead Photographer'
    }
  },
  {
    id: 'ev_bsmiley_1',
    title: 'Whiten On The Go Campaign',
    clientName: 'BSmiley London',
    type: 'reel',
    contentType: 'Reel',
    status: 'In Progress',
    date: '2026-09-19',
    startTime: '10:30 AM',
    endTime: '11:30 AM',
    clientLogo: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=120&h=120&q=80',
    clientColor: '#0284C7',
    note: 'Fast-paced lifestyle cut highlighting the cordless wireless whitening wand for busy professionals.',
    caption: 'Brighter smiles anywhere in London & Erbil. 10 minutes, zero sensitivity. ✨🦷 #BSmiley #TeethWhitening #LondonSmile #ViolaStudio',
    mediaPreview: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    assignedTo: {
      name: 'armanezaat🎬',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'Senior Director'
    }
  },
  {
    id: 'ev_dav_1',
    title: 'Laundry Service Campaign',
    clientName: 'Dav Laundry',
    type: 'carousel',
    contentType: 'Carousel',
    status: 'Approved',
    date: '2026-09-19',
    startTime: '1:00 PM',
    endTime: '1:45 PM',
    clientLogo: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=120&h=120&q=80',
    clientColor: '#2563EB',
    note: '5-slide educational carousel explaining the 24h pickup, eco-wash process, and folded delivery.',
    caption: 'Your wardrobe deserves five-star treatment. Doorstep pickup in Erbil, freshly folded in 24 hours. 🧺💧 #DavLaundry #PremiumLaundry #ViolaCreative',
    mediaPreview: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80',
    mediaCount: 5,
    assignedTo: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'Video Lead'
    }
  },
  {
    id: 'ev_lupa_1',
    title: 'New Toy Promotion',
    clientName: 'Lupa Lupa Toys',
    type: 'story',
    contentType: 'Story',
    status: 'Needs Review',
    date: '2026-09-19',
    startTime: '5:30 PM',
    endTime: '6:00 PM',
    clientLogo: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=120&h=120&q=80',
    clientColor: '#EA580C',
    note: 'Interactive Instagram story series with poll sticker: "Which sensory kit is your toddler\'s favorite?"',
    caption: 'Play, explore, learn! 🚀 Discover our new Montessori wooden puzzle sets now available. #LupaLupaToys #KidsCreativity',
    mediaPreview: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80',
    assignedTo: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'Brand Strategist'
    }
  },
  // Surrounding week events
  {
    id: 'ev_smart_1',
    title: 'Billboard Launch Sync',
    clientName: 'Smart City Erbil',
    type: 'meeting',
    contentType: 'Campaign',
    status: 'Scheduled',
    date: '2026-09-14',
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    clientLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80',
    clientColor: '#7C3AED',
    note: 'Review final high-definition print proofs and road banner sequence before installation.',
    caption: 'Smart City Erbil urban living vision billboard launch. #SmartCity #Architecture #Erbil',
    assignedTo: {
      name: 'Shahad (Lead Partner)',
      avatar: CURRENT_USER.avatar,
      role: 'Owner'
    }
  },
  {
    id: 'ev_smart_2',
    title: 'Q3 Video Teaser Delivery Deadline',
    clientName: 'Smart City Erbil',
    type: 'deadline',
    contentType: 'Video',
    status: 'Approved',
    date: '2026-09-16',
    startTime: '5:00 PM',
    endTime: '6:00 PM',
    clientLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80',
    clientColor: '#7C3AED',
    note: 'Final 4K ProRes 422 delivery for Kurdish national television and social distribution.',
    assignedTo: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'Video Lead'
    }
  },
  {
    id: 'ev_haji_1',
    title: 'Brand Identity Review',
    clientName: 'Haji Yaseen Group',
    type: 'meeting',
    contentType: 'Design',
    status: 'Planned',
    date: '2026-09-18',
    startTime: '2:30 PM',
    endTime: '3:30 PM',
    clientLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    clientColor: '#B45309',
    note: 'In-person executive walkthrough of the stationery, packaging, and sign systems at Viola studio.',
    assignedTo: {
      name: 'Jomaa Akreyi',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'Production Lead'
    }
  },
  {
    id: 'ev_nali_1',
    title: 'Luxury Penthouse Showcase',
    clientName: 'Nali Real Estate',
    type: 'deadline',
    contentType: 'Carousel',
    status: 'Approved',
    date: '2026-09-20',
    startTime: '4:00 PM',
    endTime: '5:00 PM',
    clientLogo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=120&h=120&q=80',
    clientColor: '#059669',
    note: 'Architectural photography carousel highlighting sunset views from the top penthouses.',
    caption: 'Elevated horizons over Erbil. Discover the penthouse collection at Nali Residences. 🌇 #NaliRealEstate #Architecture #LuxuryHomes',
    mediaPreview: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    mediaCount: 4,
    assignedTo: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'Lead Photographer'
    }
  }
];

export const INITIAL_CLIENT_BRIEF: ClientBriefData = {
  companyName: 'Viola Agency & Labs',
  businessModel: 'AI-Powered Creative Brand Studio & Digital Architecture',
  brandIdentity: 'Minimalist luxury, technical precision, high-contrast twilight atmosphere.',
  brandVoice: 'Understated, authoritative, culturally grounded, engineering-led.',
  socialMedia: 'X (Twitter) technical notes, Instagram cinematography reels, curated LinkedIn journals.',
  targetAudience: 'Leading enterprises, premium real estate developments, high-growth technology startups in the region.',
  competitors: 'Top international boutique agencies, Pentagram, Linear, Apple Design Studio.',
  objectives: 'Build the preeminent digital and brand production authority in the Kurdistan region with world-class polish.',
  requiredServices: [
    'Brand Identity Refresh',
    'Video Production',
    'Website Re-Design',
    'Campaign Management',
    'Creative Consulting',
    'Development Engineering'
  ],
  additionalNotes: 'Need 4K masters delivered for upcoming Q3 exhibitions and digital billboard rollouts.',
  lastSavedAt: 'Saved just now',
  isSubmitted: true,
};

export const INITIAL_NOTIFICATIONS: ViolaNotification[] = [
  {
    id: 'n1',
    kind: 'message',
    title: 'New message in Viola Chatting',
    body: 'armanezaat🎬: Sobahi bchina recorda kiva bashtra?',
    createdAt: '2026-09-12T23:45:48Z',
    targetChatId: 'chat_viola_chatting'
  },
  {
    id: 'n2',
    kind: 'approval',
    title: 'Smart City Key Art Approved',
    body: 'Ahmed confirmed the billboard dusk mockup for immediate print production.',
    createdAt: '2026-09-12T19:42:00Z',
    targetChatId: 'chat_smart_city'
  },
  {
    id: 'n3',
    kind: 'calendar',
    title: 'Upcoming Meeting: Billboard Launch Sync',
    body: 'Scheduled with Ahmed (Smart City) for Monday at 11:00 AM in Erbil Studio.',
    createdAt: '2026-09-12T15:00:00Z'
  },
  {
    id: 'n4',
    kind: 'announcement',
    title: 'Viola Studio UDrive v2 Live',
    body: '3 GiB resumable file transfers are now activated across all active workspace accounts.',
    createdAt: '2026-09-10T09:00:00Z'
  }
];

export const INITIAL_CONTACTS = [
  { id: 'c1', displayName: 'Jomaa Akreyi', username: 'jomaa_akreyi', role: 'Staff Partner', isOnline: true, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80', bio: 'Production & Logistics Lead' },
  { id: 'c2', displayName: 'adamebdulah', username: 'adamebdulah', role: 'Creative Staff', isOnline: true, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120&q=80', bio: 'Visual FX & Motion' },
  { id: 'c3', displayName: 'armanezaat🎬', username: 'armanezaat', role: 'Senior Director', isOnline: true, avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120&q=80', bio: 'Cinematography & Color' },
  { id: 'c4', displayName: 'Bejar', username: 'bejar_tech', role: 'Audio Engineer', isOnline: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80', bio: 'Sound Design & Mastering' },
  { id: 'c5', displayName: 'Ahmed (Client)', username: 'ahmed_client', role: 'Key Client', isOnline: true, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80', bio: 'Smart City Executive' },
  { id: 'c6', displayName: 'Sarah Jenkins', username: 'sarah_j', role: 'Video Lead', isOnline: true, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80', bio: 'Editorial & Commercials' },
  { id: 'c7', displayName: 'Marcus Vance', username: 'marcus_v', role: 'Brand Strategist', isOnline: false, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80', bio: 'Strategic Communications' },
  { id: 'c8', displayName: 'Elena Rostova', username: 'elena_r', role: 'Lead Photographer', isOnline: true, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80', bio: 'Architectural & Commercial Photo' },
];

export const INDUSTRY_PLAYLISTS: IndustryPlaylist[] = [
  {
    id: 'pl_restaurant',
    name: 'Restaurant',
    industry: 'Food, Dining & Culinary',
    clientId: 'chat_restaurant_food',
    clientName: 'Bite & Brew Bistro',
    icon: 'Utensils',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    description: 'Food ideas, menu, and inspirations'
  },
  {
    id: 'pl_juice',
    name: 'Juice',
    industry: 'Beverages & Smoothie Bars',
    clientId: 'chat_juice_bar',
    clientName: 'SunSqueeze Juice & Smoothies',
    icon: 'GlassWater',
    coverImage: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=1200&q=80',
    description: 'Cold-pressed organic orange juice, berry superfood smoothies, fresh citrus slicing & packaging'
  },
  {
    id: 'pl_cleaning',
    name: 'Cleaning Service',
    industry: 'Commercial & Home Cleaning',
    clientId: 'chat_clean_pro',
    clientName: 'PureClean Facility Services',
    icon: 'Sparkles',
    coverImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    description: 'Eco-friendly spray sanitization, microfiber equipment branding, wash buckets & uniforms'
  },
  {
    id: 'pl_beauty',
    name: 'Beauty Products',
    industry: 'Skincare & Cosmetics',
    clientId: 'chat_luxe_beauty',
    clientName: 'Glow Botanicals Skincare',
    icon: 'Flower2',
    coverImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    description: 'Pastel pink serum pumps, moisturizing creams, gold-accented dropper bottles & floral aesthetics'
  },
  {
    id: 'pl_carwash',
    name: 'Car Wash & Detailing',
    industry: 'Automotive & Detailing',
    clientId: 'chat_carwash_detailing',
    clientName: 'Apex Detailing & Car Wash',
    icon: 'Car',
    coverImage: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=80',
    description: 'Hydrophobic snow foam cannon, ceramic gloss reflections, detailing studio lights & wraps'
  },
  {
    id: 'pl_realestate',
    name: 'Real Estate & Architecture',
    industry: 'Luxury Architecture',
    clientId: 'chat_nali_realestate',
    clientName: 'Nali Real Estate',
    icon: 'Building2',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Dusk infinity pools, floorplan walkthroughs, Swiss architectural books & penthouses'
  },
  {
    id: 'pl_jewelry',
    name: 'Gold & Luxury Jewelry',
    industry: 'Fine Jewelry & Luxury Goods',
    clientId: 'chat_haji_yaseen',
    clientName: 'Haji Yaseen Branding',
    icon: 'Gem',
    coverImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    description: 'Embossed gold foil stationery, modern Arabic calligraphy & travertine storefronts'
  },
  {
    id: 'pl_smartcity',
    name: 'Smart City & Tech',
    industry: 'Urban Tech & IoT Systems',
    clientId: 'chat_smart_city',
    clientName: 'Smart City Project',
    icon: 'Cpu',
    coverImage: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80',
    description: 'Neon billboard key art, 3D interactive kiosk UI & futuristic urban typography'
  }
];

export const INITIAL_INSPIRATION_ITEMS: InspirationItem[] = [
  // --- Restaurant Section (Faithful to uploaded reference image) ---
  {
    id: 'insp_rf_steak',
    clientId: 'chat_restaurant_food',
    clientName: 'Bite & Brew Bistro',
    industryType: 'restaurant_food',
    industryName: 'Restaurant',
    postLayout: 'single',
    title: 'Dry-Aged Ribeye Steak',
    note: '',
    sourceUrl: '',
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Steak', 'MainCourse', 'Meat', 'Grill'],
    category: 'Main Dishes',
    author: {
      id: 'u_elena',
      name: 'Elena Rostova',
      username: 'elena_r',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'member'
    },
    createdAt: '2026-09-12T16:00:00Z',
    updatedAt: '2026-09-12T16:00:00Z',
    isPinned: true,
    likeCount: 42,
    viewerLiked: true
  },
  {
    id: 'insp_rf_pasta',
    clientId: 'chat_restaurant_food',
    clientName: 'Bite & Brew Bistro',
    industryType: 'restaurant_food',
    industryName: 'Restaurant',
    postLayout: 'single',
    title: 'Truffle Fettuccine Pasta',
    note: '',
    sourceUrl: '',
    images: [
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Pasta', 'Italian', 'Truffle', 'Parmesan'],
    category: 'Main Dishes',
    author: {
      id: 'u_elena',
      name: 'Elena Rostova',
      username: 'elena_r',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'member'
    },
    createdAt: '2026-09-12T15:30:00Z',
    updatedAt: '2026-09-12T15:30:00Z',
    isPinned: false,
    likeCount: 28,
    viewerLiked: false
  },
  {
    id: 'insp_rf_burger',
    clientId: 'chat_restaurant_food',
    clientName: 'Bite & Brew Bistro',
    industryType: 'restaurant_food',
    industryName: 'Restaurant',
    postLayout: 'single',
    title: 'Smoked Wagyu Burger',
    note: '',
    sourceUrl: '',
    images: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Burger', 'Wagyu', 'Cheddar', 'ComfortFood'],
    category: 'Main Dishes',
    author: {
      id: 'u_marcus',
      name: 'Marcus Vance',
      username: 'marcus_v',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'member'
    },
    createdAt: '2026-09-12T15:00:00Z',
    updatedAt: '2026-09-12T15:00:00Z',
    isPinned: false,
    likeCount: 35,
    viewerLiked: true
  },
  {
    id: 'insp_rf_cake',
    clientId: 'chat_restaurant_food',
    clientName: 'Bite & Brew Bistro',
    industryType: 'restaurant_food',
    industryName: 'Restaurant',
    postLayout: 'single',
    title: 'Warm Chocolate Lava Cake',
    note: '',
    sourceUrl: '',
    images: [
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Dessert', 'Chocolate', 'LavaCake', 'Gelato'],
    category: 'Desserts',
    author: {
      id: 'user_me',
      name: 'Shahad (Lead Partner)',
      username: 'shahad',
      avatar: CURRENT_USER.avatar,
      role: 'owner'
    },
    createdAt: '2026-09-12T14:30:00Z',
    updatedAt: '2026-09-12T14:30:00Z',
    isPinned: false,
    likeCount: 47,
    viewerLiked: true
  },
  {
    id: 'insp_rf_drink',
    clientId: 'chat_restaurant_food',
    clientName: 'Bite & Brew Bistro',
    industryType: 'restaurant_food',
    industryName: 'Restaurant',
    postLayout: 'single',
    title: 'Layered Iced Caramel Macchiato',
    note: '',
    sourceUrl: '',
    images: [
      'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Drinks', 'Coffee', 'IcedLatte', 'Caramel'],
    category: 'Drinks',
    author: {
      id: 'u_bejar',
      name: 'Bejar',
      username: 'bejar_tech',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'member'
    },
    createdAt: '2026-09-12T14:00:00Z',
    updatedAt: '2026-09-12T14:00:00Z',
    isPinned: false,
    likeCount: 21,
    viewerLiked: false
  },
  {
    id: 'insp_rf_salad',
    clientId: 'chat_restaurant_food',
    clientName: 'Bite & Brew Bistro',
    industryType: 'restaurant_food',
    industryName: 'Restaurant',
    postLayout: 'single',
    title: 'Chargrilled Chicken & Avocado Salad',
    note: '',
    sourceUrl: '',
    images: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Salad', 'Healthy', 'Chicken', 'Snacks'],
    category: 'Snacks',
    author: {
      id: 'u_marcus',
      name: 'Marcus Vance',
      username: 'marcus_v',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'member'
    },
    createdAt: '2026-09-12T13:30:00Z',
    updatedAt: '2026-09-12T13:30:00Z',
    isPinned: false,
    likeCount: 19,
    viewerLiked: false
  },

  // --- Juice & Beverage Section ---
  {
    id: 'insp_juice_1',
    clientId: 'chat_juice_bar',
    clientName: 'SunSqueeze Juice & Smoothies',
    industryType: 'juice',
    industryName: 'Juice',
    postLayout: 'split',
    title: 'Cold-Pressed Citrus & Strawberry Superfood Smoothie Glassware',
    note: 'Vibrant cold-pressed Valencia orange juice paired with strawberry-chia smoothie in condensation tall glassware, surrounded by fresh fruit slices.',
    sourceUrl: 'https://unsplash.com/photos/fresh-juice-smoothie',
    sourceDomain: 'unsplash.com',
    images: [
      'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['Juice', 'Smoothie', 'Citrus', 'FreshDrink', 'CleanLiving'],
    colorPalette: ['#EA580C', '#FB923C', '#E11D48', '#FEF08A'],
    category: 'Photography',
    author: {
      id: 'u_elena',
      name: 'Elena Rostova',
      username: 'elena_r',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'member'
    },
    createdAt: '2026-09-12T14:15:00Z',
    updatedAt: '2026-09-12T14:15:00Z',
    isPinned: true,
    likeCount: 38,
    viewerLiked: true
  },
  {
    id: 'insp_juice_2',
    clientId: 'chat_juice_bar',
    clientName: 'SunSqueeze Juice & Smoothies',
    industryType: 'juice',
    industryName: 'Juice',
    postLayout: 'single',
    title: 'Minimalist Glass Bottle Packaging & Eco Cap Branding',
    note: 'Clear 350ml glass bottles with moisture-resistant matte label wrap and embossed wooden twist cap.',
    sourceUrl: 'https://behance.net/gallery/juice-bottle-branding',
    sourceDomain: 'behance.net',
    images: [
      'https://images.unsplash.com/photo-1622484216250-9382f6e91986?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['JuicePackaging', 'GlassBottle', 'BeverageDesign', 'Minimalist'],
    colorPalette: ['#14532D', '#22C55E', '#BBF7D0'],
    category: 'Print & Packaging',
    author: {
      id: 'u_marcus',
      name: 'Marcus Vance',
      username: 'marcus_v',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'member'
    },
    createdAt: '2026-09-11T11:00:00Z',
    updatedAt: '2026-09-11T11:00:00Z',
    isPinned: false,
    likeCount: 19,
    viewerLiked: false
  },

  // --- Cleaning Service Section ---
  {
    id: 'insp_clean_1',
    clientId: 'chat_clean_pro',
    clientName: 'PureClean Facility Services',
    industryType: 'cleaning_service',
    industryName: 'Cleaning Service',
    postLayout: 'single',
    title: 'Professional Sanitization Equipment & Uniform Color System',
    note: 'Clean blue spray bottle, protective safety gloves, microfiber towel stack, and scrub brush in sky blue caddy. Clean, bright high-key lighting benchmark.',
    sourceUrl: 'https://unsplash.com/photos/cleaning-products-bucket',
    sourceDomain: 'unsplash.com',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['CleaningService', 'Sanitization', 'HygieneBrand', 'FreshClean'],
    colorPalette: ['#0284C7', '#38BDF8', '#EAB308', '#F0F9FF'],
    category: 'Photography',
    author: {
      id: 'u_marcus',
      name: 'Marcus Vance',
      username: 'marcus_v',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'member'
    },
    createdAt: '2026-09-12T13:40:00Z',
    updatedAt: '2026-09-12T13:40:00Z',
    isPinned: true,
    likeCount: 25,
    viewerLiked: true
  },
  {
    id: 'insp_clean_2',
    clientId: 'chat_clean_pro',
    clientName: 'PureClean Facility Services',
    industryType: 'cleaning_service',
    industryName: 'Cleaning Service',
    postLayout: 'split',
    title: 'Residential Deep Clean & Polish Floor Reflection',
    note: 'Before and after steam floor buffing comparison showing mirror-like marble floor reflection in sunlit open-plan salon.',
    sourceUrl: 'https://unsplash.com/photos/clean-interior-flooring',
    sourceDomain: 'unsplash.com',
    images: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['DeepClean', 'MarbleFloor', 'InteriorClean', 'CommercialService'],
    colorPalette: ['#0F172A', '#0284C7', '#F8FAFC'],
    category: 'Photography',
    author: {
      id: 'u_arman',
      name: 'armanezaat🎬',
      username: 'armanezaat',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'admin'
    },
    createdAt: '2026-09-10T15:20:00Z',
    updatedAt: '2026-09-10T15:20:00Z',
    isPinned: false,
    likeCount: 16,
    viewerLiked: false
  },

  // --- Beauty Products Section ---
  {
    id: 'insp_beauty_1',
    clientId: 'chat_luxe_beauty',
    clientName: 'Glow Botanicals Skincare',
    industryType: 'beauty_products',
    industryName: 'Beauty Products',
    postLayout: 'single',
    title: 'Soft Blush Pink Skincare Bottles & Hydrating Cream Jar',
    note: 'Pastel blush pink lotion dispenser pump, glass serum dropper, and gold-rimmed moisturizer jar styled on fresh white cotton towel with delicate orchid blossoms.',
    sourceUrl: 'https://unsplash.com/photos/beauty-cosmetics-skincare',
    sourceDomain: 'unsplash.com',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['BeautyProducts', 'SkincarePackaging', 'PastelAesthetic', 'LuxuryGlow'],
    colorPalette: ['#FB7185', '#FDA4AF', '#FDF2F8', '#B45309'],
    category: 'Photography',
    author: {
      id: 'u_elena',
      name: 'Elena Rostova',
      username: 'elena_r',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'member'
    },
    createdAt: '2026-09-12T17:10:00Z',
    updatedAt: '2026-09-12T17:10:00Z',
    isPinned: true,
    likeCount: 48,
    viewerLiked: true
  },
  {
    id: 'insp_beauty_2',
    clientId: 'chat_luxe_beauty',
    clientName: 'Glow Botanicals Skincare',
    industryType: 'beauty_products',
    industryName: 'Beauty Products',
    postLayout: 'carousel',
    title: 'Organic Botanical Serum Drops & Water Ripple Lighting',
    note: 'Close-up macro of amber glass serum bottle casting caustic water ripple shadows on textured warm travertine.',
    sourceUrl: 'https://behance.net/gallery/cosmetics-macro-photography',
    sourceDomain: 'behance.net',
    images: [
      'https://images.unsplash.com/photo-1608248597359-0524458f623a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['SerumMacro', 'WaterCaustics', 'Travertine', 'CosmeticPackaging'],
    colorPalette: ['#451A03', '#D97706', '#F59E0B', '#FFFBEB'],
    category: 'Photography',
    author: {
      id: 'user_me',
      name: 'Shahad (Lead Partner)',
      username: 'shahad',
      avatar: CURRENT_USER.avatar,
      role: 'owner'
    },
    createdAt: '2026-09-11T13:30:00Z',
    updatedAt: '2026-09-11T13:30:00Z',
    isPinned: false,
    likeCount: 31,
    viewerLiked: true
  },
  // --- Car Wash & Automotive Playlist ---
  {
    id: 'insp_cw_1',
    clientId: 'chat_carwash_detailing',
    clientName: 'Apex Detailing & Car Wash',
    industryType: 'car_wash',
    industryName: 'Car Wash & Automotive',
    postLayout: 'carousel',
    title: 'Ceramic Snow Foam & Deep Gloss Reflections',
    note: 'Dense hydrophobic snow foam dwell shot with high-pressure rinse mist. Benchmark for Apex Detailing’s hero social video & Instagram carousel.',
    sourceUrl: 'https://instagram.com/p/detailing_inspo',
    sourceDomain: 'instagram.com',
    images: [
      'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['CarWash', 'SnowFoam', 'CeramicCoating', 'AutoDetailing', 'DetailingStudio'],
    colorPalette: ['#0B0E14', '#1E293B', '#38BDF8', '#FFFFFF'],
    category: 'Photography',
    author: {
      id: 'user_me',
      name: 'Shahad (Lead Partner)',
      username: 'shahad',
      avatar: CURRENT_USER.avatar,
      role: 'owner'
    },
    createdAt: '2026-09-12T16:30:00Z',
    updatedAt: '2026-09-12T16:30:00Z',
    isPinned: true,
    likeCount: 28,
    viewerLiked: true
  },
  {
    id: 'insp_cw_2',
    clientId: 'chat_carwash_detailing',
    clientName: 'Apex Detailing & Car Wash',
    industryType: 'car_wash',
    industryName: 'Car Wash & Automotive',
    postLayout: 'single',
    title: 'Hexagonal LED Honeycomb Ceiling Detailing Studio',
    note: 'Modern dark garage detailing bay with suspended 6500K daylight white hexagonal grid ceiling lights. Highlights vehicle body lines without harsh glare.',
    sourceUrl: 'https://pinterest.com/pin/garage_detailing_lighting',
    sourceDomain: 'pinterest.com',
    images: [
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['GarageDesign', 'HexagonLED', 'StudioBay', 'AutoLighting'],
    colorPalette: ['#121417', '#252930', '#F59E0B'],
    category: 'Spatial & Architecture',
    author: {
      id: 'u_arman',
      name: 'armanezaat🎬',
      username: 'armanezaat',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'admin'
    },
    createdAt: '2026-09-11T19:20:00Z',
    updatedAt: '2026-09-11T19:20:00Z',
    isPinned: true,
    likeCount: 19,
    viewerLiked: false
  },
  {
    id: 'insp_cw_3',
    clientId: 'chat_carwash_detailing',
    clientName: 'Apex Detailing & Car Wash',
    industryType: 'car_wash',
    industryName: 'Car Wash & Automotive',
    postLayout: 'split',
    title: 'Matte Stealth Livery & Vinyl Wrap Typography',
    note: 'Satin stealth black body finish paired with high-gloss embossed livery typography for Apex VIP fleet branding.',
    sourceUrl: 'https://behance.net/gallery/auto-livery-design',
    sourceDomain: 'behance.net',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['AutoBranding', 'Livery', 'CarbonFiber', 'MatteWrap'],
    colorPalette: ['#111113', '#262626', '#E5A93B'],
    category: 'Branding',
    author: {
      id: 'u_marcus',
      name: 'Marcus Vance',
      username: 'marcus_v',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'member'
    },
    createdAt: '2026-09-10T14:40:00Z',
    updatedAt: '2026-09-10T14:40:00Z',
    isPinned: false,
    likeCount: 14,
    viewerLiked: false
  },



  // --- Smart City Project ---
  {
    id: 'insp_sc_1',
    clientId: 'chat_smart_city',
    clientName: 'Smart City Project',
    industryType: 'smart_city',
    industryName: 'Smart City & Tech',
    postLayout: 'carousel',
    title: 'Dusk Architectural Facade Lighting',
    note: 'Observe how the continuous golden linear perimeter fixtures illuminate the glass curtain wall without casting lens glare. Ideal lighting benchmark for the upcoming billboard and 3D architectural renders.',
    sourceUrl: 'https://www.behance.net/gallery/142891901/Twilight-Metropolis-Lighting',
    sourceDomain: 'behance.net',
    images: [
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['Lighting', 'Dusk', 'Facade', 'Architectural', 'GoldenHour'],
    colorPalette: ['#121820', '#E5A93B', '#4D648D', '#D0E1FD'],
    category: 'Spatial & Architecture',
    author: {
      id: 'u_sarah',
      name: 'Sarah Jenkins',
      username: 'sarah_j',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'member'
    },
    createdAt: '2026-09-12T14:30:00Z',
    updatedAt: '2026-09-12T14:30:00Z',
    isPinned: true,
    likeCount: 9,
    viewerLiked: true
  },
  {
    id: 'insp_sc_2',
    clientId: 'chat_smart_city',
    clientName: 'Smart City Project',
    industryType: 'smart_city',
    industryName: 'Smart City & Tech',
    postLayout: 'single',
    title: '3D Anamorphic LED Curved Billboard Rig',
    note: 'Reference for the curved screen intersection in Erbil central square. Notice the false depth optical illusion created with high-contrast shadows and specular highlights on digital concrete.',
    sourceUrl: 'https://dribbble.com/shots/18920194-Anamorphic-Curved-Screen-3D',
    sourceDomain: 'dribbble.com',
    images: [
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['3D', 'Anamorphic', 'Billboard', 'Motion', 'VFX'],
    colorPalette: ['#0A0B0E', '#F59E0B', '#3B82F6', '#E2E8F0'],
    category: 'Motion & 3D',
    author: {
      id: 'u_arman',
      name: 'armanezaat🎬',
      username: 'armanezaat',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'admin'
    },
    createdAt: '2026-09-11T16:00:00Z',
    updatedAt: '2026-09-11T16:00:00Z',
    isPinned: false,
    likeCount: 14,
    viewerLiked: true
  },
  {
    id: 'insp_sc_3',
    clientId: 'chat_smart_city',
    clientName: 'Smart City Project',
    title: 'Bilingual Arabic-English Structural Grid Typography',
    note: 'Clean typographic harmony pairing heavy geometric Arabic display type with structured neo-grotesque Latin characters. Perfect reference for the brand billboard and identity guidelines.',
    sourceUrl: 'https://www.pentagram.com/work/modern-bilingual-systems',
    sourceDomain: 'pentagram.com',
    images: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['Typography', 'Bilingual', 'Arabic', 'Grid', 'Branding'],
    colorPalette: ['#18181B', '#F4F4F5', '#F59E0B'],
    category: 'Branding',
    author: {
      id: 'u_marcus',
      name: 'Marcus Vance',
      username: 'marcus_v',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'member'
    },
    createdAt: '2026-09-10T11:15:00Z',
    updatedAt: '2026-09-10T11:15:00Z',
    isPinned: true,
    likeCount: 7,
    viewerLiked: false
  },
  {
    id: 'insp_sc_4',
    clientId: 'chat_smart_city',
    clientName: 'Smart City Project',
    title: 'Interactive City Transit & Map Telemetry UI',
    note: 'Dark luxury map HUD design with subtle golden pulse nodes for tracking active infrastructure. Can be integrated into the interactive kiosk app demo.',
    sourceUrl: 'https://www.figma.com/@viola/urban-telemetry-ui',
    sourceDomain: 'figma.com',
    images: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['UI', 'Telemetry', 'Map', 'DarkTokens', 'Figma'],
    colorPalette: ['#090A0F', '#1F2937', '#10B981', '#F59E0B'],
    category: 'Digital & Web',
    author: {
      id: 'user_me',
      name: 'Shahad (Lead Partner)',
      username: 'shahad',
      avatar: CURRENT_USER.avatar,
      role: 'owner'
    },
    createdAt: '2026-09-09T09:20:00Z',
    updatedAt: '2026-09-09T09:20:00Z',
    isPinned: false,
    likeCount: 11,
    viewerLiked: true
  },

  // --- Haji Yaseen Branding ---
  {
    id: 'insp_hy_1',
    clientId: 'chat_haji_yaseen',
    clientName: 'Haji Yaseen Branding',
    industryType: 'luxury_jewelry',
    industryName: 'Gold & Luxury Jewelry',
    postLayout: 'carousel',
    title: 'Embossed Gold Foil Luxury Stationery & Box Packaging',
    note: 'Deep black soft-touch 400gsm cotton board with blind debossing and 24k micro-embossed foil. This is the exact tactile experience Haji Yaseen requested for executive gifting and VIP jewelry sets.',
    sourceUrl: 'https://www.pinterest.com/pin/8342918928174/',
    sourceDomain: 'pinterest.com',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['GoldFoil', 'Embossing', 'Packaging', 'Luxury', 'PrintMaster'],
    colorPalette: ['#0B0D0E', '#C5A059', '#3A3225', '#F5F5F0'],
    category: 'Print & Packaging',
    author: {
      id: 'u_marcus',
      name: 'Marcus Vance',
      username: 'marcus_v',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'member'
    },
    createdAt: '2026-09-12T13:00:00Z',
    updatedAt: '2026-09-12T13:00:00Z',
    isPinned: true,
    likeCount: 12,
    viewerLiked: true
  },
  {
    id: 'insp_hy_2',
    clientId: 'chat_haji_yaseen',
    clientName: 'Haji Yaseen Branding',
    industryType: 'luxury_jewelry',
    industryName: 'Gold & Luxury Jewelry',
    postLayout: 'single',
    title: 'Contemporary Kufic & Nastaliq Monogram Study',
    note: 'Translating classic calligraphy into modern monoline geometry. Retains cultural nobility while remaining instantly recognizable at 16px favicon scale.',
    sourceUrl: 'https://www.behance.net/gallery/kufic-modern-heritage',
    sourceDomain: 'behance.net',
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['Calligraphy', 'Monogram', 'Kufic', 'LogoDesign'],
    colorPalette: ['#1C1917', '#E5A93B', '#FAFAF9'],
    category: 'Branding',
    author: {
      id: 'user_me',
      name: 'Shahad (Lead Partner)',
      username: 'shahad',
      avatar: CURRENT_USER.avatar,
      role: 'owner'
    },
    createdAt: '2026-09-11T18:40:00Z',
    updatedAt: '2026-09-11T18:40:00Z',
    isPinned: true,
    likeCount: 19,
    viewerLiked: true
  },
  {
    id: 'insp_hy_3',
    clientId: 'chat_haji_yaseen',
    clientName: 'Haji Yaseen Branding',
    industryType: 'luxury_jewelry',
    industryName: 'Gold & Luxury Jewelry',
    postLayout: 'single',
    title: 'Brushed Brass & Travertine Stone Flagship Storefront',
    note: 'Backlit halo channel letters mounted on unpolished travertine stone slab. The warm ambient glow creates an inviting, heirloom atmosphere.',
    sourceUrl: 'https://www.archdaily.com/projects/luxury-retail-travertine',
    sourceDomain: 'archdaily.com',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['Retail', 'Brass', 'Travertine', 'Signage', 'Architecture'],
    colorPalette: ['#E6DEC9', '#9C824A', '#24211D'],
    category: 'Spatial & Architecture',
    author: {
      id: 'u_elena',
      name: 'Elena Rostova',
      username: 'elena_r',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'member'
    },
    createdAt: '2026-09-10T14:10:00Z',
    updatedAt: '2026-09-10T14:10:00Z',
    isPinned: false,
    likeCount: 8,
    viewerLiked: false
  },

  // --- Nali Real Estate ---
  {
    id: 'insp_nali_1',
    clientId: 'chat_nali_realestate',
    clientName: 'Nali Real Estate',
    industryType: 'real_estate',
    industryName: 'Real Estate & Architecture',
    postLayout: 'split',
    title: 'Penthouse Sunset Twilight Architectural Photography',
    note: 'Camera perspective positioned at 3/4 corner horizon to capture the infinity pool reflection seamlessly blending into the mountain dusk sky. Benchmark composition for Elena’s upcoming shoot on location.',
    sourceUrl: 'https://unsplash.com/photos/modern-villa-dusk-pool',
    sourceDomain: 'unsplash.com',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['Dusk', 'Interior', 'Architectural', 'Penthouse', 'WarmNeutral'],
    colorPalette: ['#1F2421', '#907163', '#D1AC00', '#F7F4EA'],
    category: 'Photography',
    author: {
      id: 'u_elena',
      name: 'Elena Rostova',
      username: 'elena_r',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'member'
    },
    createdAt: '2026-09-12T15:20:00Z',
    updatedAt: '2026-09-12T15:20:00Z',
    isPinned: true,
    likeCount: 16,
    viewerLiked: true
  },
  {
    id: 'insp_nali_2',
    clientId: 'chat_nali_realestate',
    clientName: 'Nali Real Estate',
    industryType: 'real_estate',
    industryName: 'Real Estate & Architecture',
    postLayout: 'single',
    title: 'Interactive 3D Spatial Walkthrough & Floorplan Viewer',
    note: 'Real-time WebGL walkthrough that allows VIP buyers to view daylight shifts (morning, afternoon, dusk) before scheduling a physical private tour.',
    sourceUrl: 'https://www.awwwards.com/sites/luxury-residence-3d',
    sourceDomain: 'awwwards.com',
    images: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['Web3D', 'ThreeJS', 'RealEstate', 'Interactive', 'UI'],
    colorPalette: ['#0D0E12', '#222630', '#E5A93B', '#FFFFFF'],
    category: 'Digital & Web',
    author: {
      id: 'u_bejar',
      name: 'Bejar',
      username: 'bejar_tech',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'member'
    },
    createdAt: '2026-09-11T12:00:00Z',
    updatedAt: '2026-09-11T12:00:00Z',
    isPinned: false,
    likeCount: 10,
    viewerLiked: false
  },
  {
    id: 'insp_nali_3',
    clientId: 'chat_nali_realestate',
    clientName: 'Nali Real Estate',
    industryType: 'real_estate',
    industryName: 'Real Estate & Architecture',
    postLayout: 'single',
    title: 'Architectural Monograph Hardcover Book Binding',
    note: 'Swiss linen hardcover binding with blind stamping and tipped-in photographic plates. Presentation format for the private penthouse sales salon.',
    sourceUrl: 'https://www.pinterest.com/pin/architectural-book-binding/',
    sourceDomain: 'pinterest.com',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['Print', 'BookBinding', 'Linen', 'LuxuryCatalog'],
    colorPalette: ['#292524', '#78716C', '#F5F5F4'],
    category: 'Print & Packaging',
    author: {
      id: 'u_marcus',
      name: 'Marcus Vance',
      username: 'marcus_v',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'member'
    },
    createdAt: '2026-09-08T16:30:00Z',
    updatedAt: '2026-09-08T16:30:00Z',
    isPinned: false,
    likeCount: 5,
    viewerLiked: false
  },

  // --- Viola Studio (Internal Agency Workspace) ---
  {
    id: 'insp_viola_1',
    clientId: 'chat_viola_chatting',
    clientName: 'Viola Agency & Labs',
    industryType: 'studio_agency',
    industryName: 'Viola Agency & Labs',
    postLayout: 'carousel',
    title: 'High-Contrast Twilight Dark UI Tokens & Micro-Interactions',
    note: 'Reference for Viola applet system colors: deeply saturated dark background (#0A0A0B), rich surface (#141819), and glowing amber/gold accent tokens (#F59E0B) with smooth spring transitions.',
    sourceUrl: 'https://linear.app/design-system',
    sourceDomain: 'linear.app',
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['DesignSystem', 'DarkTokens', 'MicroInteractions', 'ViolaBrand'],
    colorPalette: ['#0A0A0B', '#141819', '#F59E0B', '#E5A93B'],
    category: 'Digital & Web',
    author: {
      id: 'user_me',
      name: 'Shahad (Lead Partner)',
      username: 'shahad',
      avatar: CURRENT_USER.avatar,
      role: 'owner'
    },
    createdAt: '2026-09-12T19:00:00Z',
    updatedAt: '2026-09-12T19:00:00Z',
    isPinned: true,
    likeCount: 22,
    viewerLiked: true
  },
  {
    id: 'insp_viola_2',
    clientId: 'chat_viola_chatting',
    clientName: 'Viola Agency & Labs',
    industryType: 'studio_agency',
    industryName: 'Viola Agency & Labs',
    postLayout: 'single',
    title: 'Kinetic 35mm Film Grain Grading & Title Typography',
    note: 'Natural analog grain scan overlay at 35% opacity in DaVinci Resolve. Adds tactile warmth to corporate and digital footage.',
    sourceUrl: 'https://vimeo.com/channels/cinematography-color',
    sourceDomain: 'vimeo.com',
    images: [
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80'
    ],
    tags: ['FilmGrain', 'LUT', 'Cinematography', 'DaVinci'],
    colorPalette: ['#1C1917', '#E5A93B', '#78716C'],
    category: 'Photography',
    author: {
      id: 'u_arman',
      name: 'armanezaat🎬',
      username: 'armanezaat',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'admin'
    },
    createdAt: '2026-09-11T21:10:00Z',
    updatedAt: '2026-09-11T21:10:00Z',
    isPinned: false,
    likeCount: 15,
    viewerLiked: true
  }
];
