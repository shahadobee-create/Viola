import React from 'react';
import { X, Sparkles, Globe, ExternalLink, Instagram, Twitter, Youtube, Linkedin, MapPin } from 'lucide-react';

interface ViolaSocialModalProps {
  onClose: () => void;
}

export const ViolaSocialModal: React.FC<ViolaSocialModalProps> = ({ onClose }) => {
  const socials = [
    {
      name: 'Instagram',
      handle: '@violakrd',
      desc: 'Cinematography reels & behind-the-scenes photography',
      icon: Instagram,
      color: '#E1306C',
      url: 'https://instagram.com',
    },
    {
      name: 'X (Twitter)',
      handle: '@violakrd',
      desc: 'Technical dispatches, design system updates & notes',
      icon: Twitter,
      color: '#1DA1F2',
      url: 'https://twitter.com',
    },
    {
      name: 'YouTube',
      handle: '@viola_agency',
      desc: '4K Commercial masters & brand showcases',
      icon: Youtube,
      color: '#FF0000',
      url: 'https://youtube.com',
    },
    {
      name: 'LinkedIn',
      handle: 'Viola Creative Agency',
      desc: 'Corporate insights & regional architectural publications',
      icon: Linkedin,
      color: '#0A66C2',
      url: 'https://linkedin.com',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#141819] border border-zinc-800 rounded-3xl w-full max-w-md p-6 relative overflow-hidden shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Glow ambient circles */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white shadow-md">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-white">Viola Social Network</h3>
              <p className="text-[10px] font-mono text-zinc-400">Verified official channels</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Studio Location */}
        <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-3 relative z-10">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
            <MapPin size={18} />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">Viola Studios</h4>
            <p className="text-[11px] text-zinc-400 font-mono">Erbil & Duhok · Kurdistan Region</p>
          </div>
        </div>

        {/* Social channels */}
        <div className="space-y-2.5 relative z-10">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 flex items-center justify-between gap-3 group transition-all block"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-zinc-800"
                    style={{ backgroundColor: `${s.color}15`, color: s.color }}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-white truncate">{s.name}</h4>
                      <span className="font-mono text-[10px] text-zinc-500 font-bold">{s.handle}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate">{s.desc}</p>
                  </div>
                </div>

                <ExternalLink size={14} className="text-zinc-500 group-hover:text-white shrink-0 transition-colors" />
              </a>
            );
          })}
        </div>

        <div className="pt-2 text-center relative z-10">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
            Viola Creative Agency & Intelligence Labs
          </span>
        </div>
      </div>
    </div>
  );
};
