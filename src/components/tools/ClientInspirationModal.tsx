import React, { useState, useMemo } from 'react';
import { 
  InspirationItem, 
  InspirationCategory, 
  Conversation,
  ParticipantRole,
  IndustryPlaylist
} from '../../types';
import { InspirationCard } from './InspirationCard';
import { InspirationFormModal } from './InspirationFormModal';
import { INDUSTRY_PLAYLISTS } from '../../data/mockData';
import { 
  X, 
  Plus, 
  ArrowLeft,
  Utensils,
  GlassWater,
  Sparkles,
  Flower2,
  Building2,
  Car,
  Gem,
  Cpu,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface ClientInspirationModalProps {
  items: InspirationItem[];
  conversations: Conversation[];
  initialClientId?: string;
  onClose: () => void;
  onAddItem: (item: InspirationItem) => void;
  onUpdateItem: (item: InspirationItem) => void;
  onDeleteItem: (itemId: string) => void;
  onTogglePin?: (itemId: string) => void;
  onToggleLike?: (itemId: string) => void;
  onShareToChat?: (clientId: string, item: InspirationItem) => void;
  currentUser: {
    id: string;
    displayName: string;
    username: string;
    avatar?: string;
    role?: ParticipantRole;
  };
}

export const ClientInspirationModal: React.FC<ClientInspirationModalProps> = ({
  items,
  initialClientId,
  onClose,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  currentUser,
}) => {
  // Map playlist ID to industryType
  const playlistIndustryTypeMap: Record<string, string> = {
    'pl_restaurant': 'restaurant_food',
    'pl_juice': 'juice',
    'pl_cleaning': 'cleaning_service',
    'pl_beauty': 'beauty_products',
    'pl_carwash': 'car_wash',
    'pl_realestate': 'real_estate',
    'pl_jewelry': 'luxury_jewelry',
    'pl_smartcity': 'smart_city'
  };

  // State: null = Section Grid (Left phone screen), string = Section Gallery (Right phone screen)
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(() => {
    if (initialClientId === 'chat_restaurant_food') return 'pl_restaurant';
    if (initialClientId === 'chat_juice_bar') return 'pl_juice';
    if (initialClientId === 'chat_clean_pro') return 'pl_cleaning';
    if (initialClientId === 'chat_luxe_beauty') return 'pl_beauty';
    return null;
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<string | null>(null);

  // Active playlist
  const activePlaylist = useMemo(() => {
    if (!selectedPlaylistId) return null;
    return INDUSTRY_PLAYLISTS.find((p) => p.id === selectedPlaylistId) || INDUSTRY_PLAYLISTS[0];
  }, [selectedPlaylistId]);

  // Helper icon for section
  const getSectionIcon = (iconName: string, size = 18) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils size={size} />;
      case 'GlassWater':
        return <GlassWater size={size} />;
      case 'Flower2':
        return <Flower2 size={size} />;
      case 'Building2':
        return <Building2 size={size} />;
      case 'Car':
        return <Car size={size} />;
      case 'Gem':
        return <Gem size={size} />;
      case 'Cpu':
        return <Cpu size={size} />;
      default:
        return <Sparkles size={size} />;
    }
  };

  // Count items per section
  const getItemCount = (playlistId: string) => {
    const targetType = playlistIndustryTypeMap[playlistId];
    const targetPlaylist = INDUSTRY_PLAYLISTS.find((p) => p.id === playlistId);
    return items.filter((item) => {
      if (targetType && item.industryType === targetType) return true;
      if (targetPlaylist && item.clientId === targetPlaylist.clientId) return true;
      return false;
    }).length;
  };

  // Filter items for active section
  const currentSectionItems = useMemo(() => {
    if (!selectedPlaylistId) return [];
    const targetType = playlistIndustryTypeMap[selectedPlaylistId];
    const targetClientId = activePlaylist?.clientId;

    return items.filter((item) => {
      const matchesIndustry = 
        (targetType && item.industryType === targetType) ||
        (targetClientId && item.clientId === targetClientId);
      
      return !!matchesIndustry;
    });
  }, [items, selectedPlaylistId, activePlaylist]);

  // Handler to update note or link directly from card
  const handleUpdateNote = (itemId: string, newNote: string) => {
    const target = items.find((i) => i.id === itemId);
    if (!target) return;

    const isLink = newNote.startsWith('http://') || 
                   newNote.startsWith('https://') || 
                   newNote.startsWith('www.');

    const updated: InspirationItem = {
      ...target,
      note: newNote,
      sourceUrl: isLink ? newNote : target.sourceUrl,
      updatedAt: new Date().toISOString()
    };
    onUpdateItem(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 bg-[#101314] animate-in fade-in duration-200">
      <div 
        className="w-full h-full rounded-none bg-[#101314] text-white border-0 shadow-none flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================================= */}
        {/* VIEW 1: SECTIONS GRID VIEW (LEFT SCREEN IN USER'S PHOTO)                 */}
        {/* ========================================================================= */}
        {!selectedPlaylistId ? (
          <div className="flex-1 flex flex-col overflow-hidden w-full max-w-5xl mx-auto">
            {/* Minimal Top Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <div>
                <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white">
                  Inspirations
                </h2>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-zinc-800/70 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {INDUSTRY_PLAYLISTS.slice(0, 6).map((pl) => {
                  const count = getItemCount(pl.id);

                  return (
                    <div
                      key={pl.id}
                      onClick={() => {
                        setSelectedPlaylistId(pl.id);
                      }}
                      className="group relative rounded-2xl sm:rounded-3xl bg-[#141819] border border-zinc-800/80 hover:border-amber-500/60 transition-all duration-200 p-3 flex flex-col cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:scale-98"
                    >
                      {/* Top Cover Image Thumbnail */}
                      <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-950 mb-2.5">
                        <img
                          src={pl.coverImage}
                          alt={pl.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        
                        {/* Count Badge */}
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-[9px] font-mono font-bold text-white border border-white/10">
                          {count} {count === 1 ? 'idea' : 'ideas'}
                        </div>
                      </div>

                      {/* Bottom Row: Circular Icon + Section Name */}
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-200 group-hover:bg-amber-500 group-hover:text-zinc-950 group-hover:border-amber-400 transition-colors shrink-0">
                            {getSectionIcon(pl.icon, 15)}
                          </div>
                          <h3 className="font-display font-bold text-sm text-white group-hover:text-amber-400 transition-colors truncate">
                            {pl.name}
                          </h3>
                        </div>

                        <div className="w-5 h-5 rounded-full text-zinc-500 group-hover:text-amber-400 flex items-center justify-center transition-colors">
                          <ChevronRight size={14} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* VIEW 2: SECTION GALLERY VIEW (RIGHT SCREEN IN USER'S PHOTO - E.G. RESTAURANT) */
          /* ========================================================================= */
          <div className="flex-1 flex flex-col overflow-hidden w-full max-w-5xl mx-auto">
            {/* Top Navigation Bar with circular back <, plus +, and close X */}
            <div className="flex items-center justify-between px-6 pt-6 pb-3">
              <button
                onClick={() => setSelectedPlaylistId(null)}
                className="w-10 h-10 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 hover:text-white flex items-center justify-center transition-colors"
                title="Back to all sections"
              >
                <ArrowLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {/* Minimal Add Image & Note/Link Button */}
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 flex items-center justify-center transition-transform active:scale-95 shadow-md shadow-amber-500/20"
                  title="Add image"
                >
                  <Plus size={22} className="stroke-[2.5]" />
                </button>

                {/* Close modal */}
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                  title="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Hero Section: Cover Image on Left + Large Title & Subtitle on Right */}
            <div className="px-6 py-4 flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0 shadow-md">
                <img
                  src={activePlaylist?.coverImage}
                  alt={activePlaylist?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                  {activePlaylist?.name}
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 line-clamp-2">
                  {activePlaylist?.description || 'Food ideas, menu, and inspirations'}
                </p>
              </div>
            </div>

            {/* Images Grid */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {currentSectionItems.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {currentSectionItems.map((item) => (
                    <InspirationCard
                      key={item.id}
                      item={item}
                      canDelete={true}
                      onSelect={(it) => setSelectedLightboxImage(it.images?.[0] || null)}
                      onDelete={(id) => onDeleteItem(id)}
                      onUpdateNote={handleUpdateNote}
                    />
                  ))}
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-zinc-500">
                  <p className="text-sm font-medium text-zinc-300">No items found in this section</p>
                  <p className="text-xs mt-1">Click the + button at top to add an image</p>
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="mt-4 flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 text-zinc-950 font-bold text-xs shadow-md"
                  >
                    <Plus size={14} />
                    <span>Add Image</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Minimal Add Item Modal (Images & Text Type: Note or Link) */}
        <InspirationFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={(newItem) => {
            if (activePlaylist) {
              newItem.clientId = activePlaylist.clientId;
              newItem.clientName = activePlaylist.clientName;
              newItem.industryType = playlistIndustryTypeMap[activePlaylist.id] || 'restaurant_food';
              newItem.industryName = activePlaylist.name;
            }
            onAddItem(newItem);
          }}
          defaultClientId={activePlaylist?.clientId || 'chat_restaurant_food'}
          defaultIndustryType={playlistIndustryTypeMap[activePlaylist?.id || 'pl_restaurant'] || 'restaurant_food'}
          currentUser={currentUser}
        />

        {/* Minimal Lightbox Viewer */}
        {selectedLightboxImage && (
          <div 
            onClick={() => setSelectedLightboxImage(null)}
            className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedLightboxImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-800 text-white flex items-center justify-center hover:bg-zinc-700 transition-colors"
            >
              <X size={20} />
            </button>
            <img
              src={selectedLightboxImage}
              alt="High Resolution Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </div>
  );
};
