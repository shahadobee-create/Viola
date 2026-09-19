import React, { useState } from 'react';
import { ViolaClient } from '../../types';
import { 
  X, 
  Info, 
  FileText, 
  Globe, 
  MapPin, 
  AtSign, 
  Calendar, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  ShieldCheck,
  Palette
} from 'lucide-react';

interface ClientInfoModalProps {
  client: ViolaClient;
  initialTab?: 'info' | 'brief';
  onClose: () => void;
  onOpenUDrive?: () => void;
}

export const ClientInfoModal: React.FC<ClientInfoModalProps> = ({
  client,
  initialTab = 'info',
  onClose,
  onOpenUDrive,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'brief'>(initialTab);

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        id="client-info-modal"
        className="bg-white dark:bg-[#12111A] border border-zinc-200 dark:border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-zinc-200/80 dark:border-white/10 flex items-center justify-between bg-zinc-50/70 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div 
              className="w-11 h-11 rounded-2xl p-0.5 border shadow-sm flex items-center justify-center overflow-hidden bg-white dark:bg-zinc-800"
              style={{ borderColor: `${client.color}88` }}
            >
              {client.logo ? (
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="font-display font-bold text-sm text-zinc-800 dark:text-zinc-200">
                  {client.name.substring(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-black text-lg text-zinc-950 dark:text-white">
                  {client.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-500/15 text-violet-600 dark:text-violet-300 border border-violet-500/30">
                  Active Client
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {client.industry} · {client.location || 'Erbil, Kurdistan Region'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 pt-3 border-b border-zinc-200/80 dark:border-white/10 flex items-center gap-4 bg-zinc-50/40 dark:bg-white/[0.01]">
          <button
            onClick={() => setActiveTab('info')}
            className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'info'
                ? 'border-violet-600 text-violet-600 dark:text-violet-400 dark:border-violet-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
            }`}
          >
            <Info size={14} />
            <span>Client Information</span>
          </button>
          <button
            onClick={() => setActiveTab('brief')}
            className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'brief'
                ? 'border-violet-600 text-violet-600 dark:text-violet-400 dark:border-violet-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
            }`}
          >
            <FileText size={14} />
            <span>Brand Strategy & Brief</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-zinc-800 dark:text-zinc-200">
          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Package Snapshot */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent border border-violet-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                    Active Retainer Package
                  </span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">
                    {client.package?.period || 'September 2026'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-zinc-950 dark:text-white">
                  {client.package?.summary || '4 Posts · 2 Reels'}
                </h4>
                <div className="mt-3 space-y-1.5">
                  <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                    <span>Monthly Production Progress</span>
                    <span className="font-bold text-violet-600 dark:text-violet-400">
                      {client.package?.progressPercent || 75}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${client.package?.progressPercent || 75}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Company Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02]">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block mb-1">
                    Industry & Specialty
                  </span>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {client.industry}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02]">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block mb-1">
                    Location / Office
                  </span>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                    <MapPin size={13} className="text-violet-500" />
                    <span>{client.location || 'Erbil, Kurdistan Region'}</span>
                  </p>
                </div>

                {client.website && (
                  <div className="p-3.5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02]">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block mb-1">
                      Website URL
                    </span>
                    <a 
                      href={client.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1.5"
                    >
                      <Globe size={13} />
                      <span className="truncate">{client.website}</span>
                    </a>
                  </div>
                )}

                {client.social && (
                  <div className="p-3.5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02]">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block mb-1">
                      Official Social
                    </span>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                      <AtSign size={13} className="text-violet-500" />
                      <span>{client.social}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Assigned Team Members */}
              {client.assignedTeam && client.assignedTeam.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold px-1">
                    Viola Creative Squad
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {client.assignedTeam.map((member, idx) => (
                      <div 
                        key={idx}
                        className="p-3 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02] flex items-center gap-2.5"
                      >
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="w-8 h-8 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                            {member.name}
                          </p>
                          <p className="text-[10px] text-zinc-500 truncate">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'brief' && (
            <div className="space-y-5">
              {/* About */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                  About the Brand
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {client.brief?.about || 'Leading brand partner working with Viola on creative strategy and asset management.'}
                </p>
              </div>

              {/* Brand Personality Chips */}
              {client.brief?.brandPersonality && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                    Brand Personality Attributes
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {client.brief.brandPersonality.map((trait, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-bold bg-violet-500/10 text-violet-600 dark:text-violet-300 border border-violet-500/20"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Positioning & Tone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                    Strategic Positioning
                  </span>
                  <p className="text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
                    {client.brief?.positioning || 'Premium market positioning.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                    Tone of Voice
                  </span>
                  <p className="text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
                    {client.brief?.toneOfVoice || 'Warm, refined, visionary.'}
                  </p>
                </div>
              </div>

              {/* Target Audience & Content Direction */}
              <div className="space-y-3.5">
                <div className="p-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                    Target Audience
                  </span>
                  <p className="text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
                    {client.brief?.targetAudience || 'Modern consumers and key decision makers.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                    Content & Visual Direction
                  </span>
                  <p className="text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
                    {client.brief?.contentDirection || 'High quality cinematic visuals, refined typography, and engaging storytelling.'}
                  </p>
                </div>

                {client.brief?.restrictions && (
                  <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold block">
                      Brand Guardrails & Restrictions
                    </span>
                    <p className="text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
                      {client.brief.restrictions}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-200/80 dark:border-white/10 flex items-center justify-between bg-zinc-50/70 dark:bg-white/[0.02]">
          <span className="text-[11px] font-mono text-zinc-400">
            Viola Agency Cloud Storage Node
          </span>
          {onOpenUDrive && (
            <button
              onClick={() => {
                onClose();
                onOpenUDrive();
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-700 text-white transition-colors flex items-center gap-1.5"
            >
              <span>Explore Client UDrive</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
