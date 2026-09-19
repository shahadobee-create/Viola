import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  MessageCircle, 
  X, 
  Send, 
  Check, 
  Sparkles,
  Heart,
  Calendar,
  Upload
} from 'lucide-react';
import { FeedItem } from '../../types';

interface FeedCard {
  id: string;
  category: string;
  categoryEmoji: string;
  bgImage: string;
  question: string;
  authorName: string;
  authorLocation: string;
  authorAvatar: string;
  likes: number;
  commentsCount: number;
  viewerLiked: boolean;
  comments: Array<{
    id: string;
    author: string;
    avatar: string;
    text: string;
    time: string;
  }>;
}

interface StoryItem {
  id: string;
  name: string;
  avatar: string;
  isMine?: boolean;
  storyImage: string;
  timeAgo: string;
}

interface FeedViewProps {
  feedItems?: FeedItem[];
  onToggleLike?: (itemId: string) => void;
  onAddComment?: (itemId: string, commentBody: string) => void;
  onPublishContent?: (newItem: any) => void;
  onOpenNotifications?: () => void;
  onOpenCalendar?: () => void;
  unreadNotifCount?: number;
  onOpenChatWithUser?: (userName: string) => void;
}

const INITIAL_STORIES: StoryItem[] = [
  {
    id: 'story_my',
    name: 'My Story',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
    isMine: true,
    storyImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    timeAgo: 'Just now'
  },
  {
    id: 'story_selena',
    name: 'Selena',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80',
    storyImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    timeAgo: '15m ago'
  },
  {
    id: 'story_clara',
    name: 'Clara',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&h=160&q=80',
    storyImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    timeAgo: '42m ago'
  },
  {
    id: 'story_fabian',
    name: 'Fabian',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
    storyImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    timeAgo: '1h ago'
  },
  {
    id: 'story_george',
    name: 'George',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80',
    storyImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    timeAgo: '2h ago'
  },
  {
    id: 'story_marcus',
    name: 'Marcus',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&h=160&q=80',
    storyImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    timeAgo: '3h ago'
  }
];

const INITIAL_CARDS: FeedCard[] = [
  {
    id: 'card_travel_1',
    category: 'Travel',
    categoryEmoji: '🏝️',
    bgImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    question: 'If you could live anywhere in the world, where would you pick?',
    authorName: 'Miranda Kehlani',
    authorLocation: 'STUTTGART',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
    likes: 428,
    commentsCount: 56,
    viewerLiked: true,
    comments: [
      {
        id: 'c1',
        author: 'Clara Benson',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&h=160&q=80',
        text: 'Somewhere on the Amalfi coast with endless espresso and sea breeze! 🌊',
        time: '2h ago'
      },
      {
        id: 'c2',
        author: 'Fabian Torres',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
        text: 'Kyoto in autumn or the Swiss Alps. Tough choice between quiet temples and snowy peaks!',
        time: '1h ago'
      }
    ]
  },
  {
    id: 'card_football_1',
    category: 'Football',
    categoryEmoji: '⚽',
    bgImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    question: 'Who is your all-time favorite football player and why?',
    authorName: 'Fabian Torres',
    authorLocation: 'MADRID',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
    likes: 912,
    commentsCount: 143,
    viewerLiked: false,
    comments: [
      {
        id: 'c3',
        author: 'George Vance',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80',
        text: 'Zinedine Zidane in 2002. Pure visual poetry and elegance on the pitch.',
        time: '3h ago'
      },
      {
        id: 'c4',
        author: 'Selena Gomez',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80',
        text: 'Lionel Messi without question. The vision and touch will never be matched.',
        time: '45m ago'
      }
    ]
  },
  {
    id: 'card_lifestyle_1',
    category: 'Lifestyle',
    categoryEmoji: '☕',
    bgImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    question: 'What is the one morning ritual you can never skip to feel inspired?',
    authorName: 'Clara Benson',
    authorLocation: 'STOCKHOLM',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&h=160&q=80',
    likes: 315,
    commentsCount: 38,
    viewerLiked: false,
    comments: [
      {
        id: 'c5',
        author: 'Miranda Kehlani',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
        text: 'Hand-ground filter coffee in absolute silence for 20 minutes before opening any screen.',
        time: '1h ago'
      }
    ]
  },
  {
    id: 'card_design_1',
    category: 'Design & Art',
    categoryEmoji: '🏛️',
    bgImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    question: 'What modern architectural space gave you the biggest sense of awe?',
    authorName: 'Selena Gomez',
    authorLocation: 'LOS ANGELES',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80',
    likes: 624,
    commentsCount: 89,
    viewerLiked: true,
    comments: [
      {
        id: 'c6',
        author: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&h=160&q=80',
        text: 'The concrete light shafts inside Tadao Ando’s Church of the Light.',
        time: '2h ago'
      }
    ]
  }
];

const INITIAL_PUBLIC_CARDS: FeedCard[] = [
  {
    id: 'public_music_1',
    category: 'Music',
    categoryEmoji: '🎵',
    bgImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    question: 'What song instantly changes your mood no matter what kind of day you are having?',
    authorName: 'Selena Gomez',
    authorLocation: 'LOS ANGELES',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80',
    likes: 852,
    commentsCount: 94,
    viewerLiked: true,
    comments: [
      {
        id: 'cp1',
        author: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&h=160&q=80',
        text: 'Midnight City by M83. Instant energy boost every single time!',
        time: '1h ago'
      },
      {
        id: 'cp2',
        author: 'Miranda Kehlani',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
        text: 'Dreams by Fleetwood Mac on a warm evening drive.',
        time: '30m ago'
      }
    ]
  },
  {
    id: 'public_skill_1',
    category: 'Ideas',
    categoryEmoji: '💡',
    bgImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    question: 'If you could master any skill overnight with zero effort, what would it be?',
    authorName: 'Marcus Vance',
    authorLocation: 'LONDON',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&h=160&q=80',
    likes: 634,
    commentsCount: 71,
    viewerLiked: false,
    comments: [
      {
        id: 'cp3',
        author: 'Clara Benson',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&h=160&q=80',
        text: 'Fluency in 10 languages! Imagine speaking to anyone on earth in their native tongue.',
        time: '2h ago'
      }
    ]
  },
  {
    id: 'public_peace_1',
    category: 'Lifestyle',
    categoryEmoji: '✨',
    bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    question: 'What is a small everyday luxury that brings you genuine peace?',
    authorName: 'Fabian Torres',
    authorLocation: 'MADRID',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
    likes: 489,
    commentsCount: 52,
    viewerLiked: false,
    comments: [
      {
        id: 'cp4',
        author: 'Selena Gomez',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80',
        text: 'Reading with no notifications on and a candle burning after dusk.',
        time: '4h ago'
      }
    ]
  },
  {
    id: 'public_travel_1',
    category: 'Travel',
    categoryEmoji: '☕',
    bgImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    question: 'Best coffee or bakery spot you have ever stumbled upon while traveling?',
    authorName: 'Clara Benson',
    authorLocation: 'STOCKHOLM',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&h=160&q=80',
    likes: 512,
    commentsCount: 63,
    viewerLiked: true,
    comments: [
      {
        id: 'cp5',
        author: 'Miranda Kehlani',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
        text: 'A hidden basement bakery in Montmartre with warm cardamom rolls.',
        time: '1h ago'
      }
    ]
  }
];

export const FeedView: React.FC<FeedViewProps> = ({
  onOpenNotifications,
  onOpenCalendar,
  unreadNotifCount = 0,
  onOpenChatWithUser,
}) => {
  // Segmented control: 'viola' vs 'explore' (displayed as Public)
  const [activeSegment, setActiveSegment] = useState<'viola' | 'explore'>('viola');

  // Stories
  const [stories] = useState<StoryItem[]>(INITIAL_STORIES);
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);

  // Cards (Viola & Public streams)
  const [cards, setCards] = useState<FeedCard[]>(INITIAL_CARDS);
  const [publicCards, setPublicCards] = useState<FeedCard[]>(INITIAL_PUBLIC_CARDS);

  // Comments Sheet State
  const [activeCommentsCard, setActiveCommentsCard] = useState<FeedCard | null>(null);
  const [newCommentInput, setNewCommentInput] = useState('');

  // Share / Copy Link Notification
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Create Card Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCardQuestion, setNewCardQuestion] = useState('');
  const [newCardImage, setNewCardImage] = useState(
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80'
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewCardImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Like Toggle
  const handleToggleCardLike = (cardId: string) => {
    const updateFn = (prev: FeedCard[]) =>
      prev.map((card) => {
        if (card.id === cardId) {
          const nextLiked = !card.viewerLiked;
          return {
            ...card,
            viewerLiked: nextLiked,
            likes: card.likes + (nextLiked ? 1 : -1),
          };
        }
        return card;
      });

    setCards(updateFn);
    setPublicCards(updateFn);
  };

  // Add Comment
  const handleAddCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentInput.trim() || !activeCommentsCard) return;

    const newComment = {
      id: `comm_${Date.now()}`,
      author: 'Shahad (Lead Partner)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
      text: newCommentInput.trim(),
      time: 'Just now',
    };

    const updateCommentsFn = (prev: FeedCard[]) =>
      prev.map((c) => {
        if (c.id === activeCommentsCard.id) {
          return {
            ...c,
            commentsCount: c.commentsCount + 1,
            comments: [newComment, ...c.comments],
          };
        }
        return c;
      });

    setCards(updateCommentsFn);
    setPublicCards(updateCommentsFn);

    setActiveCommentsCard((prev) =>
      prev ? { ...prev, commentsCount: prev.commentsCount + 1, comments: [newComment, ...prev.comments] } : null
    );
    setNewCommentInput('');
  };

  // Create new Card / Share Post
  const handleCreateCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const caption = newCardQuestion.trim() || 'Shared a moment';

    const newCard: FeedCard = {
      id: `card_${Date.now()}`,
      category: 'General',
      categoryEmoji: '',
      bgImage: newCardImage,
      question: caption,
      authorName: 'Shahad (Lead Partner)',
      authorLocation: 'ERBIL',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
      likes: 1,
      commentsCount: 0,
      viewerLiked: true,
      comments: [],
    };

    setCards((prev) => [newCard, ...prev]);
    setPublicCards((prev) => [newCard, ...prev]);
    setNewCardQuestion('');
    setShowCreateModal(false);
  };

  // Share / Copy Link
  const handleCopyCard = (_card?: FeedCard) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF7FC] dark:bg-[#0C0812] overflow-y-auto pb-28 text-[#2B124C] dark:text-[#E8E1F0] font-sans antialiased selection:bg-[#E25496]/20">
      
      {/* 1. TOP HEADER (Add post button on left + Action buttons on right) */}
      <header className="px-5 sm:px-7 pt-4 pb-2 flex items-center justify-between sticky top-0 z-20 bg-[#FAF7FC]/90 dark:bg-[#0C0812]/90 backdrop-blur-md transition-colors">
        {/* Left Side: Create / Add Post Button */}
        <div>
          <button
            id="feed_create_button"
            onClick={() => setShowCreateModal(true)}
            aria-label="Create Feed Post"
            title="Create Post"
            className="w-11 h-11 rounded-full border border-[#E9E1F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-[#2B124C] dark:text-white shadow-sm hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Right Side: Notifications */}
        <div className="flex items-center gap-2.5">
          {/* Circular Bell Button */}
          <button
            id="feed_notification_bell"
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="w-11 h-11 rounded-full border border-[#E9E1F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-[#2B124C] dark:text-white shadow-sm hover:scale-105 active:scale-95 transition-all relative"
          >
            <Bell size={20} strokeWidth={2} />
            {unreadNotifCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#E25496] ring-2 ring-white dark:ring-zinc-900" />
            )}
          </button>
        </div>
      </header>

      {/* 2. STORIES / AVATAR ROW */}
      <section className="py-2 px-4 sm:px-6">
        <div className="flex items-center gap-4.5 overflow-x-auto no-scrollbar py-2">
          {stories.map((story) => {
            if (story.isMine) {
              return (
                <button
                  key={story.id}
                  onClick={() => setActiveStory(story)}
                  className="flex flex-col items-center flex-shrink-0 group cursor-pointer"
                >
                  <div className="relative w-17 h-17 sm:w-18 sm:h-18">
                    <img
                      src={story.avatar}
                      alt={story.name}
                      className="w-full h-full rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform"
                    />
                    {/* Pink Plus Badge as in screenshot */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#E25496] text-white flex items-center justify-center border-2 border-white dark:border-[#0C0812] shadow-sm">
                      <Plus size={12} strokeWidth={3} />
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#2B124C] dark:text-zinc-200 mt-1.5 tracking-tight text-center">
                    {story.name}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={story.id}
                onClick={() => setActiveStory(story)}
                className="flex flex-col items-center flex-shrink-0 group cursor-pointer"
              >
                <div className="p-[2.5px] rounded-full ring-[2px] ring-[#D84996] ring-offset-2 ring-offset-[#FAF7FC] dark:ring-offset-[#0C0812] group-hover:scale-105 transition-transform">
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-15 h-15 sm:w-16 sm:h-16 rounded-full object-cover"
                  />
                </div>
                <span className="text-xs font-semibold text-[#2B124C] dark:text-zinc-200 mt-1.5 tracking-tight text-center">
                  {story.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. SEGMENTED CONTROL (Replaced: Make Friends -> Viola, Search Partners -> Explore) */}
      <section className="px-5 sm:px-7 my-2.5 max-w-md mx-auto w-full">
        <div 
          id="feed_segmented_pill_control"
          className="bg-[#F2E8F6] dark:bg-zinc-900/90 p-1.5 rounded-full flex items-center shadow-inner border border-[#EBE0EF] dark:border-zinc-800"
        >
          {/* Left Button: Viola (formerly Make Friends) */}
          <button
            id="tab_viola_button"
            onClick={() => setActiveSegment('viola')}
            className={`flex-1 py-2.5 px-6 rounded-full font-bold text-sm sm:text-[15px] transition-all duration-200 text-center cursor-pointer ${
              activeSegment === 'viola'
                ? 'bg-white dark:bg-zinc-800 text-[#2B124C] dark:text-white shadow-sm'
                : 'text-[#755D8B] dark:text-zinc-400 hover:text-[#2B124C] dark:hover:text-white'
            }`}
          >
            Viola
          </button>

          {/* Right Button: Public (formerly Explore) */}
          <button
            id="tab_explore_button"
            onClick={() => setActiveSegment('explore')}
            className={`flex-1 py-2.5 px-6 rounded-full font-bold text-sm sm:text-[15px] transition-all duration-200 text-center cursor-pointer ${
              activeSegment === 'explore'
                ? 'bg-white dark:bg-zinc-800 text-[#2B124C] dark:text-white shadow-sm'
                : 'text-[#755D8B] dark:text-zinc-400 hover:text-[#2B124C] dark:hover:text-white'
            }`}
          >
            Public
          </button>
        </div>
      </section>

      {/* 4. CONTENT SECTIONS */}
      {activeSegment === 'viola' ? (
        /* MAIN VIOLA FEED STREAM */
        <main className="px-4 sm:px-6 py-2 space-y-6 max-w-md mx-auto w-full">
          {cards.map((card) => (
            <article
              key={card.id}
              id={`feed_card_${card.id}`}
              className="relative rounded-[36px] overflow-hidden aspect-[9/13] sm:aspect-[4/5] shadow-xl shadow-[#2B124C]/10 border border-black/5 select-none transition-transform duration-200 hover:shadow-2xl"
            >
              {/* Full-bleed high-res background image */}
              <img
                src={card.bgImage}
                alt={card.category}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />

              {/* Natural dark vignette gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 pointer-events-none" />

              {/* Floating Right-side Action Bar (Vertical frosted glass pill) */}
              <aside 
                className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3.5 bg-white/25 dark:bg-black/40 backdrop-blur-md border border-white/25 rounded-full py-4 px-2 shadow-xl"
                aria-label="Card actions"
              >
                {/* 1. Heart / Like Button */}
                <button
                  id={`card_like_${card.id}`}
                  onClick={() => handleToggleCardLike(card.id)}
                  aria-label="Like post"
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-80 shadow-sm ${
                    card.viewerLiked
                      ? 'bg-[#E25496] text-white'
                      : 'bg-white/40 dark:bg-white/20 hover:bg-white/60 text-white'
                  }`}
                >
                  <Heart size={18} strokeWidth={2.2} className={card.viewerLiked ? 'fill-white' : ''} />
                </button>

                {/* 2. Speech Bubble / Comment Button */}
                <button
                  id={`card_comment_${card.id}`}
                  onClick={() => setActiveCommentsCard(card)}
                  aria-label="Comments"
                  className="w-10 h-10 rounded-full bg-white/40 dark:bg-white/20 hover:bg-white/60 text-white flex items-center justify-center transition-transform active:scale-80 shadow-sm relative"
                >
                  <MessageCircle size={18} strokeWidth={2.2} />
                  {card.commentsCount > 0 && (
                    <span className="absolute -top-1 -right-1 text-[9px] font-bold bg-[#2B124C] text-white px-1.5 py-0.2 rounded-full border border-white/40">
                      {card.commentsCount}
                    </span>
                  )}
                </button>

                {/* 3. Share / Sender (Telegram paper-plane style) Button */}
                <button
                  id={`card_share_${card.id}`}
                  onClick={() => handleCopyCard(card)}
                  aria-label="Share post"
                  className="w-10 h-10 rounded-full bg-white/40 dark:bg-white/20 hover:bg-white/60 text-white flex items-center justify-center transition-transform active:scale-80 shadow-sm"
                >
                  <Send size={18} strokeWidth={2.2} />
                </button>
              </aside>

              {/* Bottom Card Content (Question & Author info) */}
              <div className="absolute bottom-6 left-6 right-18 z-10 space-y-3.5">
                <h2 className="font-sans font-bold text-xl sm:text-2xl text-white leading-snug drop-shadow-md pr-2">
                  {card.question}
                </h2>

                <div className="flex items-center gap-3 pt-1">
                  <img
                    src={card.authorAvatar}
                    alt={card.authorName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white/40 shadow-md"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white drop-shadow-sm leading-tight">
                      {card.authorName}
                    </h3>
                    <p className="text-[10px] font-extrabold text-white/70 tracking-widest uppercase mt-0.5">
                      {card.authorLocation}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </main>
      ) : (
        /* PUBLIC FEED STREAM (Same layout as Viola in Feed Home) */
        <main className="px-4 sm:px-6 py-2 space-y-6 max-w-md mx-auto w-full">
          {publicCards.map((card) => (
            <article
              key={card.id}
              id={`feed_card_${card.id}`}
              className="relative rounded-[36px] overflow-hidden aspect-[9/13] sm:aspect-[4/5] shadow-xl shadow-[#2B124C]/10 border border-black/5 select-none transition-transform duration-200 hover:shadow-2xl"
            >
              {/* Full-bleed high-res background image */}
              <img
                src={card.bgImage}
                alt={card.category}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />

              {/* Natural dark vignette gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 pointer-events-none" />

              {/* Floating Right-side Action Bar (Vertical frosted glass pill) */}
              <aside 
                className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3.5 bg-white/25 dark:bg-black/40 backdrop-blur-md border border-white/25 rounded-full py-4 px-2 shadow-xl"
                aria-label="Card actions"
              >
                {/* 1. Heart / Like Button */}
                <button
                  id={`card_like_${card.id}`}
                  onClick={() => handleToggleCardLike(card.id)}
                  aria-label="Like post"
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-80 shadow-sm ${
                    card.viewerLiked
                      ? 'bg-[#E25496] text-white'
                      : 'bg-white/40 dark:bg-white/20 hover:bg-white/60 text-white'
                  }`}
                >
                  <Heart size={18} strokeWidth={2.2} className={card.viewerLiked ? 'fill-white' : ''} />
                </button>

                {/* 2. Speech Bubble / Comment Button */}
                <button
                  id={`card_comment_${card.id}`}
                  onClick={() => setActiveCommentsCard(card)}
                  aria-label="Comments"
                  className="w-10 h-10 rounded-full bg-white/40 dark:bg-white/20 hover:bg-white/60 text-white flex items-center justify-center transition-transform active:scale-80 shadow-sm relative"
                >
                  <MessageCircle size={18} strokeWidth={2.2} />
                  {card.commentsCount > 0 && (
                    <span className="absolute -top-1 -right-1 text-[9px] font-bold bg-[#2B124C] text-white px-1.5 py-0.2 rounded-full border border-white/40">
                      {card.commentsCount}
                    </span>
                  )}
                </button>

                {/* 3. Share / Sender (Telegram paper-plane style) Button */}
                <button
                  id={`card_share_${card.id}`}
                  onClick={() => handleCopyCard(card)}
                  aria-label="Share post"
                  className="w-10 h-10 rounded-full bg-white/40 dark:bg-white/20 hover:bg-white/60 text-white flex items-center justify-center transition-transform active:scale-80 shadow-sm"
                >
                  <Send size={18} strokeWidth={2.2} />
                </button>
              </aside>

              {/* Bottom Card Content (Question & Author info) */}
              <div className="absolute bottom-6 left-6 right-18 z-10 space-y-3.5">
                <h2 className="font-sans font-bold text-xl sm:text-2xl text-white leading-snug drop-shadow-md pr-2">
                  {card.question}
                </h2>

                <div className="flex items-center gap-3 pt-1">
                  <img
                    src={card.authorAvatar}
                    alt={card.authorName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white/40 shadow-md"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white drop-shadow-sm leading-tight">
                      {card.authorName}
                    </h3>
                    <p className="text-[10px] font-extrabold text-white/70 tracking-widest uppercase mt-0.5">
                      {card.authorLocation}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </main>
      )}

      {/* 5. COMMENTS DRAWER */}
      {activeCommentsCard && (
        <div 
          id="comments_modal_backdrop"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setActiveCommentsCard(null)}
        >
          <div
            className="bg-white dark:bg-[#140F1D] w-full sm:max-w-md rounded-t-[36px] sm:rounded-[36px] border border-[#E9E1F0] dark:border-zinc-800 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4.5 border-b border-[#F0E6F4] dark:border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#2B124C] dark:text-white">
                  Comments ({activeCommentsCard.commentsCount})
                </h3>
              </div>
              <button
                onClick={() => setActiveCommentsCard(null)}
                className="w-9 h-9 rounded-full bg-[#F2E8F6] dark:bg-zinc-800 flex items-center justify-center text-[#755D8B] dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Prompt Preview */}
            <div className="px-6 py-3 bg-[#FAF4FC] dark:bg-zinc-900/40 border-b border-[#F0E6F4] dark:border-zinc-800/80">
              <p className="text-xs text-[#2B124C] dark:text-zinc-200 font-semibold italic">
                "{activeCommentsCard.question}"
              </p>
            </div>

            {/* Comments List */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {activeCommentsCard.comments.length === 0 ? (
                <div className="text-center py-8 text-[#755D8B] dark:text-zinc-400 text-xs">
                  Be the first to share your answer!
                </div>
              ) : (
                activeCommentsCard.comments.map((comm) => (
                  <div key={comm.id} className="flex items-start gap-3">
                    <img src={comm.avatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 bg-[#F6EEF9] dark:bg-zinc-800/60 p-3 rounded-2xl">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#2B124C] dark:text-white">{comm.author}</span>
                        <span className="text-[10px] text-[#755D8B] dark:text-zinc-400">{comm.time}</span>
                      </div>
                      <p className="text-xs text-[#3D255E] dark:text-zinc-200 leading-relaxed font-medium">
                        {comm.text}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddCommentSubmit} className="p-4 border-t border-[#F0E6F4] dark:border-zinc-800 flex items-center gap-2">
              <input
                type="text"
                value={newCommentInput}
                onChange={(e) => setNewCommentInput(e.target.value)}
                placeholder="Write your answer..."
                className="flex-1 px-4 py-2.5 rounded-full bg-[#F2E8F6] dark:bg-zinc-800 border-none text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#D84996]"
              />
              <button
                type="submit"
                disabled={!newCommentInput.trim()}
                className="w-10 h-10 rounded-full bg-[#2B124C] dark:bg-white text-white dark:text-[#2B124C] flex items-center justify-center disabled:opacity-40 shadow-sm active:scale-95 transition-transform"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}



      {/* 7. STORY VIEWER MODAL */}
      {activeStory && (
        <div 
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center select-none"
          onClick={() => setActiveStory(null)}
        >
          {/* Progress bar at top */}
          <div className="absolute top-4 inset-x-4 max-w-md mx-auto z-20 flex gap-1">
            <div className="h-1 flex-1 bg-white/40 rounded-full overflow-hidden">
              <div className="h-full bg-white animate-[pulse_3s_infinite]" style={{ width: '85%' }} />
            </div>
          </div>

          {/* Story Top Info */}
          <div className="absolute top-8 inset-x-5 max-w-md mx-auto z-20 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <img src={activeStory.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <div>
                <p className="text-sm font-bold drop-shadow-md">{activeStory.name}</p>
                <p className="text-[10px] text-white/80 drop-shadow-sm">{activeStory.timeAgo}</p>
              </div>
            </div>
            <button
              onClick={() => setActiveStory(null)}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Story Image */}
          <div className="w-full max-w-md h-full max-h-[85vh] rounded-[32px] overflow-hidden relative shadow-2xl mx-auto">
            <img src={activeStory.storyImage} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute bottom-10 inset-x-6 text-center text-white">
              <p className="text-sm font-semibold drop-shadow-md">
                Captured with Viola Agency Lens · {activeStory.name}'s highlights
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 8. CREATE / SHARE POST MODAL */}
      {showCreateModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="bg-white dark:bg-[#140F1D] w-full max-w-md rounded-[32px] border border-[#E9E1F0] dark:border-zinc-800 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <div className="flex items-center justify-end pb-1 border-b border-[#F0E6F4] dark:border-zinc-800">
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-full text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateCardSubmit} className="space-y-4">
              {/* 1. Gallery Mobile or Uploaded Image Section */}
              <div className="space-y-2.5">
                {/* Image Preview */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-[#E9E1F0] dark:border-zinc-700 shadow-inner group">
                  <img
                    src={newCardImage}
                    alt="Selected preview"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Upload button overlay */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg hover:bg-black/80 active:scale-95 transition-all"
                  >
                    <Upload size={14} />
                    <span>Upload Photo</span>
                  </button>
                </div>

                {/* Hidden File Input for Device Gallery / Upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </div>

              {/* 2. Text (Add Caption) Section */}
              <div>
                <label className="block text-xs font-bold text-[#755D8B] dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                  Add Caption
                </label>
                <textarea
                  value={newCardQuestion}
                  onChange={(e) => setNewCardQuestion(e.target.value)}
                  placeholder="Add Caption..."
                  rows={3}
                  className="w-full p-3.5 rounded-2xl bg-[#F2E8F6] dark:bg-zinc-800/90 border border-transparent focus:border-[#D84996] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#D84996]/30 text-[#2B124C] dark:text-white placeholder:text-zinc-400 shadow-inner"
                />
              </div>

              {/* 3. Bottom Cancel and Share Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  id="create_post_cancel_button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 rounded-2xl font-bold text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="create_post_share_button"
                  className="flex-1 py-3 rounded-2xl font-bold text-xs bg-[#2B124C] dark:bg-white text-white dark:text-[#2B124C] shadow-md hover:opacity-90 active:scale-98 transition-all"
                >
                  Share
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Copy notification toast */}
      {copiedNotification && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#2B124C] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
          <Check size={14} className="text-[#E25496]" />
          <span>Link copied to clipboard</span>
        </div>
      )}
    </div>
  );
};
