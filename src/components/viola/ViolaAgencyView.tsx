import React, { useState } from 'react';
import { 
  Sparkles, 
  Crown, 
  Star, 
  Briefcase, 
  Users, 
  Phone, 
  ChevronRight, 
  Bell, 
  Share2, 
  Check, 
  X, 
  Send, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Layers,
  Sparkle
} from 'lucide-react';

interface ViolaAgencyViewProps {
  onOpenChatWithTeam: () => void;
  onOpenNotifications: () => void;
  onOpenSocial: () => void;
  unreadNotifCount?: number;
}

export const ViolaAgencyView: React.FC<ViolaAgencyViewProps> = ({
  onOpenChatWithTeam,
  onOpenNotifications,
  onOpenSocial,
  unreadNotifCount = 3,
}) => {
  // Modal states
  const [activeModal, setActiveModal] = useState<
    'services' | 'packages' | 'feedback' | 'jobs' | 'team' | 'contact' | null
  >(null);

  // Contact form state
  const [contactName, setContactName] = useState('Ahmed');
  const [contactEmail, setContactEmail] = useState('ahmed@client.com');
  const [contactMessage, setContactMessage] = useState('How can we elevate your digital footprints?');
  const [contactSent, setContactSent] = useState(false);

  // Feedback state
  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Packages billing toggle (monthly vs annual)
  const [isAnnual, setIsAnnual] = useState(false);

  // Job application toast
  const [appliedJob, setAppliedJob] = useState<string | null>(null);

  const handleSendContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setActiveModal(null);
    }, 1600);
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setActiveModal(null);
      setFeedbackText('');
    }, 1600);
  };

  const handleApplyJob = (title: string) => {
    setAppliedJob(title);
    setTimeout(() => setAppliedJob(null), 2500);
  };

  return (
    <div className="flex flex-col h-full bg-[#0C0812] overflow-y-auto pb-28 text-white font-sans selection:bg-[#F59E0B]/30 antialiased">
      {/* Top Header */}
      <header className="px-5 sm:px-7 pt-4 pb-3 flex items-center justify-end sticky top-0 z-20 bg-[#0C0812]/90 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenNotifications}
            className="w-10 h-10 rounded-full bg-[#181224] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white relative transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadNotifCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                {unreadNotifCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Agency Content */}
      <div className="px-4 sm:px-6 space-y-4 max-w-md mx-auto w-full pt-1">
        {/* Agency Profile Hero Card */}
        <div className="bg-[#171221] border border-white/10 rounded-3xl p-5 shadow-xl relative overflow-hidden">
          <div className="space-y-1.5 mb-3">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#F59E0B] uppercase">
              AGENCY PROFILE
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white font-display">
              Aesthetic Innovation
            </h2>
          </div>

          <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-300 font-normal">
            We operate at the nexus of luxury marketing and high-end technological craftsmanship, empowering forward-thinking companies.
          </p>
        </div>

        {/* 2-Column Grid Shortcuts (Exact Match to Image 2 & 3) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Our Services */}
          <button
            onClick={() => setActiveModal('services')}
            className="bg-[#171221] hover:bg-[#1F182C] border border-white/10 rounded-2xl p-4 text-left transition-all group flex flex-col justify-between min-h-[140px] cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2D2118] border border-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B]">
              <Sparkles size={19} />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white font-display">Our Services</h3>
                <ChevronRight size={15} className="text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">What we do best for your brand</p>
            </div>
          </button>

          {/* Packages */}
          <button
            onClick={() => setActiveModal('packages')}
            className="bg-[#171221] hover:bg-[#1F182C] border border-white/10 rounded-2xl p-4 text-left transition-all group flex flex-col justify-between min-h-[140px] cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2D2118] border border-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B]">
              <Crown size={19} />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white font-display">Packages</h3>
                <ChevronRight size={15} className="text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">Choose the best package for you</p>
            </div>
          </button>

          {/* Feedback */}
          <button
            onClick={() => setActiveModal('feedback')}
            className="bg-[#171221] hover:bg-[#1F182C] border border-white/10 rounded-2xl p-4 text-left transition-all group flex flex-col justify-between min-h-[140px] cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2D2118] border border-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B]">
              <Star size={19} />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white font-display">Feedback</h3>
                <ChevronRight size={15} className="text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">Share your experience</p>
            </div>
          </button>

          {/* Jobs */}
          <button
            onClick={() => setActiveModal('jobs')}
            className="bg-[#171221] hover:bg-[#1F182C] border border-white/10 rounded-2xl p-4 text-left transition-all group flex flex-col justify-between min-h-[140px] cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2D2118] border border-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B]">
              <Briefcase size={19} />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white font-display">Jobs</h3>
                <ChevronRight size={15} className="text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">Join our creative team</p>
            </div>
          </button>

          {/* Meet The Team */}
          <button
            onClick={() => setActiveModal('team')}
            className="bg-[#171221] hover:bg-[#1F182C] border border-white/10 rounded-2xl p-4 text-left transition-all group flex flex-col justify-between min-h-[140px] cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2D2118] border border-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B]">
              <Users size={19} />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white font-display">Meet The Team</h3>
                <ChevronRight size={15} className="text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">The people behind Viola Agency</p>
            </div>
          </button>
        </div>
      </div>

      {/* MODAL 1: OUR SERVICES (Image 10) */}
      {activeModal === 'services' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-[#14121A] border border-white/15 rounded-3xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="text-[#F59E0B]">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-lg font-bold text-white font-display">Services</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content list */}
            <div className="p-4 overflow-y-auto space-y-3">
              {/* Brand Identity */}
              <div className="bg-[#1A1624] border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#2D2118] border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
                    <Crown size={18} />
                  </div>
                  <h4 className="text-sm font-bold text-white font-display">Brand Identity</h4>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed pl-12">
                  Crafting bespoke luxury logos, typography systems, vector guidelines, and digital brand manuals.
                </p>
              </div>

              {/* Video Production */}
              <div className="bg-[#1A1624] border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#2D2118] border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
                    <Sparkles size={18} />
                  </div>
                  <h4 className="text-sm font-bold text-white font-display">Video Production</h4>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed pl-12">
                  Premium commercial shoots, motion graphics, high-fidelity editing, sound engineering, and grading.
                </p>
              </div>

              {/* Website Re-Design */}
              <div className="bg-[#1A1624] border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#2D2118] border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
                    <Check size={18} />
                  </div>
                  <h4 className="text-sm font-bold text-white font-display">Website Re-Design</h4>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed pl-12">
                  Breathtaking responsive Webflow & React web interfaces engineered with motion physics.
                </p>
              </div>

              {/* Campaign Management */}
              <div className="bg-[#1A1624] border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#2D2118] border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
                    <Users size={18} />
                  </div>
                  <h4 className="text-sm font-bold text-white font-display">Campaign Management</h4>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed pl-12">
                  End-to-end multi-platform media rollouts, performance optimization, and creative direction.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PACKAGES (Image 8 & 9) */}
      {activeModal === 'packages' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-[#14121A] border border-white/15 rounded-3xl w-full max-w-md max-h-[88vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="text-[#F59E0B]">
                  <Crown size={20} />
                </div>
                <h3 className="text-lg font-bold text-white font-display">Packages</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Annual toggle */}
            <div className="p-4 border-b border-white/10 bg-[#1A1624] flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">Annual Billing Saver</h4>
                <p className="text-[11px] text-zinc-400">Save up to 15% on long-term partnerships</p>
              </div>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  isAnnual ? 'bg-[#F59E0B]' : 'bg-zinc-700'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Packages list */}
            <div className="p-4 overflow-y-auto space-y-4">
              {/* Growth Package */}
              <div className="bg-[#1A1624] border border-white/10 rounded-2xl p-4 space-y-3">
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                  GROWTH PACKAGE
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white font-display">
                    ${isAnnual ? '4165' : '4900'}
                  </span>
                  <span className="text-xs text-zinc-400">/mo</span>
                </div>
                <div className="space-y-1.5 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#F59E0B]" />
                    <span>Brand Guidelines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#F59E0B]" />
                    <span>2 Videos / mo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#F59E0B]" />
                    <span>Standard React Site</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#F59E0B]" />
                    <span>Dedicated Slack Channel</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveModal('contact');
                    setContactMessage('Inquiring about the Growth Package ($4900/mo).');
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Initiate Pilot Account
                </button>
              </div>

              {/* Agency Pro (Best Value) */}
              <div className="bg-[#1A1624] border-2 border-[#F59E0B] rounded-2xl p-4 space-y-3 relative shadow-lg shadow-[#F59E0B]/10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#F59E0B] uppercase">
                    AGENCY PRO
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#F59E0B] text-black text-[9px] font-extrabold uppercase">
                    BEST VALUE
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white font-display">
                    ${isAnnual ? '7225' : '8500'}
                  </span>
                  <span className="text-xs text-zinc-400">/mo</span>
                </div>
                <div className="space-y-1.5 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#F59E0B]" />
                    <span>Complete Identity Overhaul</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#F59E0B]" />
                    <span>5 Videos / mo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#F59E0B]" />
                    <span>Premium Custom Portal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#F59E0B]" />
                    <span>Active Director Consulting</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveModal('contact');
                    setContactMessage('Inquiring about the Agency Pro Package ($8500/mo).');
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black font-extrabold text-xs transition-colors shadow-md cursor-pointer"
                >
                  Initiate Pilot Account
                </button>
              </div>

              {/* Enterprise Elite */}
              <div className="bg-[#1A1624] border border-white/10 rounded-2xl p-4 space-y-3">
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                  ENTERPRISE ELITE
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white font-display">
                    ${isAnnual ? '12325' : '14500'}
                  </span>
                  <span className="text-xs text-zinc-400">/mo</span>
                </div>
                <div className="space-y-1.5 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#F59E0B]" />
                    <span>Unlimited Assets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#F59E0B]" />
                    <span>TV-Quality Production</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#F59E0B]" />
                    <span>Complex Web/App Systems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#F59E0B]" />
                    <span>24/7 Priority Desk</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveModal('contact');
                    setContactMessage('Inquiring about the Enterprise Elite Package ($14500/mo).');
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Initiate Pilot Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: FEEDBACK (Image 7) */}
      {activeModal === 'feedback' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-[#14121A] border border-white/15 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="text-[#F59E0B]">
                  <Star size={20} />
                </div>
                <h3 className="text-lg font-bold text-white font-display">Feedback</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSendFeedback} className="p-5 space-y-4">
              <p className="text-xs text-zinc-300 leading-relaxed text-center max-w-xs mx-auto">
                Your continuous feedback is what fuels our pursuit of perfection. How would you rate your agency interface today?
              </p>

              {/* Star Rating */}
              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="text-[#F59E0B] hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      size={28}
                      fill={star <= rating ? '#F59E0B' : 'none'}
                      stroke="#F59E0B"
                    />
                  </button>
                ))}
              </div>

              {/* Commentary */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                  COMMENTARY
                </label>
                <textarea
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Tell us what you liked, or where we can polish further..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1624] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#F59E0B] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={feedbackSent}
                className="w-full py-3 rounded-xl bg-[#B45309] hover:bg-[#D97706] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Send size={15} />
                <span>{feedbackSent ? 'Submitted! Thank You' : 'Submit Experience Log'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: JOBS (Image 6) */}
      {activeModal === 'jobs' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-[#14121A] border border-white/15 rounded-3xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="text-[#F59E0B]">
                  <Briefcase size={20} />
                </div>
                <h3 className="text-lg font-bold text-white font-display">Jobs</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4">
              <p className="text-xs text-zinc-300 leading-relaxed text-center px-2">
                We are always scanning the horizon for extraordinary minds to shape the future of visual engineering.
              </p>

              {/* Job 1 */}
              <div className="bg-[#1A1624] border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#F59E0B] uppercase">
                    PRODUCTION
                  </span>
                  <h4 className="text-sm font-bold text-white">Senior Motion Designer</h4>
                  <p className="text-[11px] text-zinc-400">Full-time / Remote</p>
                </div>
                <button
                  onClick={() => handleApplyJob('Senior Motion Designer')}
                  className="px-4 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black font-extrabold text-xs transition-colors shrink-0 cursor-pointer"
                >
                  {appliedJob === 'Senior Motion Designer' ? 'APPLIED' : 'APPLY'}
                </button>
              </div>

              {/* Job 2 */}
              <div className="bg-[#1A1624] border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#F59E0B] uppercase">
                    CREATIVE
                  </span>
                  <h4 className="text-sm font-bold text-white">Creative UI/UX Designer</h4>
                  <p className="text-[11px] text-zinc-400">Full-time / Hybrid</p>
                </div>
                <button
                  onClick={() => handleApplyJob('Creative UI/UX Designer')}
                  className="px-4 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black font-extrabold text-xs transition-colors shrink-0 cursor-pointer"
                >
                  {appliedJob === 'Creative UI/UX Designer' ? 'APPLIED' : 'APPLY'}
                </button>
              </div>

              {/* Job 3 */}
              <div className="bg-[#1A1624] border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#F59E0B] uppercase">
                    DEVELOPMENT
                  </span>
                  <h4 className="text-sm font-bold text-white">Full-Stack React Engineer</h4>
                  <p className="text-[11px] text-zinc-400">Contract / Remote</p>
                </div>
                <button
                  onClick={() => handleApplyJob('Full-Stack React Engineer')}
                  className="px-4 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black font-extrabold text-xs transition-colors shrink-0 cursor-pointer"
                >
                  {appliedJob === 'Full-Stack React Engineer' ? 'APPLIED' : 'APPLY'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: MEET THE TEAM (Image 5) */}
      {activeModal === 'team' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-[#14121A] border border-white/15 rounded-3xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="text-[#F59E0B]">
                  <Users size={20} />
                </div>
                <h3 className="text-lg font-bold text-white font-display">Team</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3">
              {/* Member 1 */}
              <div className="bg-[#1A1624] border border-white/10 rounded-2xl p-3.5 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80"
                  alt="Marcus Vance"
                  className="w-13 h-13 rounded-full object-cover border border-[#F59E0B]/40 shrink-0"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-white">Marcus Vance</h4>
                    <span className="text-[10px] font-mono font-bold text-[#F59E0B] uppercase">Founder & CEO</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-snug">
                    Former Lead Strategist at luxury media houses, steering Viola design directions.
                  </p>
                </div>
              </div>

              {/* Member 2 */}
              <div className="bg-[#1A1624] border border-white/10 rounded-2xl p-3.5 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80"
                  alt="Sarah Jenkins"
                  className="w-13 h-13 rounded-full object-cover border border-[#F59E0B]/40 shrink-0"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-white">Sarah Jenkins</h4>
                    <span className="text-[10px] font-mono font-bold text-[#F59E0B] uppercase">Head of Production</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-snug">
                    Bespoke cinematic specialist, translating blueprints into pixel-perfect audio/video feeds.
                  </p>
                </div>
              </div>

              {/* Member 3 */}
              <div className="bg-[#1A1624] border border-white/10 rounded-2xl p-3.5 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80"
                  alt="Michael Torres"
                  className="w-13 h-13 rounded-full object-cover border border-[#F59E0B]/40 shrink-0"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-white">Michael Torres</h4>
                    <span className="text-[10px] font-mono font-bold text-[#F59E0B] uppercase">Lead Brand Architect</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-snug">
                    Minimalist designer who believes white space is the ultimate luxury asset.
                  </p>
                </div>
              </div>

              {/* Member 4 */}
              <div className="bg-[#1A1624] border border-white/10 rounded-2xl p-3.5 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&h=160&q=80"
                  alt="Alex River"
                  className="w-13 h-13 rounded-full object-cover border border-[#F59E0B]/40 shrink-0"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-white">Alex River</h4>
                    <span className="text-[10px] font-mono font-bold text-[#F59E0B] uppercase">Director of Technology</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-snug">
                    React & WebGL performance optimizer. Crafting portals with zero-latency storage hydration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: CONTACT US (Image 4) */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-[#14121A] border border-white/15 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="text-[#F59E0B]">
                  <Phone size={20} />
                </div>
                <h3 className="text-lg font-bold text-white font-display">Contact</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSendContact} className="p-5 space-y-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                  FULL NAME
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1624] border border-white/10 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                  required
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1624] border border-white/10 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                  required
                />
              </div>

              {/* Message / Request */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                  MESSAGE / REQUEST
                </label>
                <textarea
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1624] border border-white/10 text-xs text-white focus:outline-none focus:border-[#F59E0B] resize-none"
                  required
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={contactSent}
                className="w-full py-3 rounded-xl bg-[#B45309] hover:bg-[#D97706] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Send size={15} />
                <span>{contactSent ? 'Dispatched to Directors!' : 'Deploy Agent Message'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
