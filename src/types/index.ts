export type TabType = 'feed' | 'viola' | 'ai' | 'chats' | 'profile' | 'inspiration' | 'assets' | 'tools' | 'contacts';

export type ContentKind = 'post' | 'blog' | 'reel' | 'announcement' | 'story';

export interface FeedComment {
  id: string;
  authorName: string;
  authorUsername: string;
  avatar?: string;
  body: string;
  createdAt: string;
}

export interface ContentMedia {
  id: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  url: string;
  thumbnailUrl?: string;
  durationMs?: number;
  caption?: string;
  altText?: string;
}

export interface FeedItem {
  id: string;
  kind: ContentKind;
  title: string;
  summary: string;
  body: string;
  authorName: string;
  publishedAt: string;
  likeCount: number;
  commentCount: number;
  viewerLiked: boolean;
  media: ContentMedia[];
  comments: FeedComment[];
}

export interface AttachmentMeta {
  name: string;
  type: 'image' | 'video' | 'voice' | 'pdf' | 'file';
  size: string;
  uri?: string;
  mime?: string;
  durationMs?: number;
}

export interface ReactionAgg {
  emoji: string;
  count: number;
  userReacted: boolean;
}

export type DeliveryStatus = 'sending' | 'sent' | 'delivered' | 'read';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderUsername: string;
  senderAvatar?: string;
  content: string;
  createdAt: string;
  isMine: boolean;
  deliveryStatus: DeliveryStatus;
  replyToId?: string;
  forwardedFromId?: string;
  deletedAt?: string;
  editedAt?: string;
  attachments?: AttachmentMeta[];
  reactions?: ReactionAgg[];
  isPinned?: boolean;
  isSaved?: boolean;
}

export type ParticipantRole = 'owner' | 'admin' | 'member' | 'readonly';

export interface ConversationParticipant {
  id: string;
  username: string;
  displayName: string;
  role: ParticipantRole;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface Conversation {
  id: string;
  type: 'dm' | 'group';
  name: string;
  avatar?: string;
  updatedAt: string;
  unreadCount: number;
  lastMessageContent?: string;
  lastMessageSenderId?: string;
  lastMessageTime?: string;
  isMuted?: boolean;
  typingStatus?: string;
  effectiveMaxFileSize?: string;
  otherUser?: ConversationParticipant;
  participants: ConversationParticipant[];
  messages: ChatMessage[];
  pinnedMessages: string[]; // message IDs
}

export interface ClientPackageInfo {
  posts: number;
  reels: number;
  stories?: number;
  month: string;
  summary: string; // e.g. "4 Posts · 2 Reels"
  period: string; // e.g. "September 2026 Package"
  progressPercent: number;
}

export interface ClientBriefSummary {
  about: string;
  positioning: string;
  targetAudience: string;
  toneOfVoice: string;
  brandPersonality: string[];
  contentDirection: string;
  restrictions?: string;
  marketingGoals?: string;
}

export interface ClientFontAsset {
  id: string;
  name: string;
  category: string; // e.g. 'Brand Font', 'Arabic Font', 'Kurdish Font'
  weight: string;
  format: string;
  size: string;
  samplePreview?: string;
}

export interface ClientColorAsset {
  name: string;
  hex: string;
  role: string;
}

export interface ClientTeamMember {
  name: string;
  role: string;
  avatar: string;
}

export interface ViolaClient {
  id: string;
  name: string;
  logo: string;
  color: string;
  industry: string;
  location?: string;
  website?: string;
  social?: string;
  package: ClientPackageInfo;
  brief: ClientBriefSummary;
  fonts?: ClientFontAsset[];
  brandColors?: ClientColorAsset[];
  assignedTeam?: ClientTeamMember[];
}

export interface ClientFile {
  id: string;
  clientId?: string;
  clientName?: string;
  name: string;
  folder: 'Logos' | 'Fonts' | 'Brand Guidelines' | 'Brand Assets' | 'Colors' | 'Photos' | 'Videos' | 'Illustrations' | 'Adobe Files' | 'PDF' | 'Documents' | 'Contracts' | 'Posts' | 'Reels' | 'Stories' | 'Brief' | string;
  size: string;
  fileSizeBytes: number;
  type: string;
  updatedAt: string;
  version: number;
  author: string;
  archived?: boolean;
  downloadUrl?: string;
  previewUrl?: string;
  versions?: { version: number; author: string; date: string; note: string }[];
}

export type CalendarContentType = 'Post' | 'Reel' | 'Story' | 'Carousel' | 'Campaign' | 'Photography' | 'Video' | 'Design' | 'Other';
export type CalendarTaskStatus = 'Idea' | 'Planned' | 'In Progress' | 'Needs Review' | 'Approved' | 'Scheduled' | 'Published';

export interface CalendarEvent {
  id: string;
  title: string;
  clientName: string;
  type: 'meeting' | 'deadline' | 'post' | 'reel' | 'story' | 'carousel' | 'campaign' | 'photography' | 'video' | 'design' | 'other';
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  description?: string;
  contentType?: CalendarContentType;
  status?: CalendarTaskStatus;
  clientLogo?: string;
  clientColor?: string;
  note?: string;
  caption?: string;
  mediaPreview?: string;
  mediaCount?: number;
  assignedTo?: {
    name: string;
    avatar: string;
    role?: string;
  };
  linkedContentId?: string;
}

export interface ClientBriefData {
  companyName: string;
  businessModel: string;
  brandIdentity: string;
  brandVoice: string;
  socialMedia: string;
  targetAudience: string;
  competitors: string;
  objectives: string;
  requiredServices: string[];
  additionalNotes: string;
  lastSavedAt: string;
  isSubmitted: boolean;
}

export interface ViolaNotification {
  id: string;
  kind: 'message' | 'calendar' | 'announcement' | 'approval';
  title: string;
  body: string;
  createdAt: string;
  readAt?: string;
  targetChatId?: string;
}

export type InspirationCategory = 
  | 'All'
  | 'Main Dishes'
  | 'Desserts'
  | 'Drinks'
  | 'Snacks'
  | 'Branding' 
  | 'Photography' 
  | 'Digital & Web' 
  | 'Motion & 3D' 
  | 'Print & Packaging' 
  | 'Spatial & Architecture' 
  | 'Other';

export type PostLayoutType = 'single' | 'carousel' | 'split' | 'collage';

export interface IndustryPlaylist {
  id: string;
  name: string;
  industry: string;
  clientId: string;
  clientName: string;
  icon: string;
  coverImage: string;
  description: string;
}

export interface InspirationItem {
  id: string;
  clientId: string;
  clientName: string;
  industryType?: string;
  industryName?: string;
  postLayout?: PostLayoutType;
  title: string;
  note: string;
  sourceUrl?: string;
  sourceDomain?: string;
  images: string[];
  tags: string[];
  colorPalette?: string[];
  category: Exclude<InspirationCategory, 'All'>;
  author: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    role?: ParticipantRole;
  };
  createdAt: string;
  updatedAt: string;
  isPinned?: boolean;
  likeCount: number;
  viewerLiked: boolean;
}

export type InspirationSortOption = 'newest' | 'oldest' | 'alpha' | 'pinned' | 'popular';
