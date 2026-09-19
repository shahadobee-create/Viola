import React, { useState } from 'react';
import { ClientBriefData } from '../../types';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Save, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  Users, 
  Briefcase 
} from 'lucide-react';

interface ClientBriefModalProps {
  initialData: ClientBriefData;
  onClose: () => void;
  onSave: (data: ClientBriefData) => void;
}

const AVAILABLE_SERVICES = [
  'Brand Identity Refresh',
  'Video Production',
  'Website Re-Design',
  'Campaign Management',
  'Content Strategy',
  'Creative Consulting',
  'Development Engineering',
  'Foil & Print Packaging',
];

export const ClientBriefModal: React.FC<ClientBriefModalProps> = ({
  initialData,
  onClose,
  onSave,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ClientBriefData>(initialData);
  const [isSubmitted, setIsSubmitted] = useState(initialData.isSubmitted);
  const [savedStatus, setSavedStatus] = useState(initialData.lastSavedAt);

  const steps = [
    { id: 'company', label: 'Company Info', icon: Building2 },
    { id: 'brand', label: 'Brand & Voice', icon: Sparkles },
    { id: 'audience', label: 'Audience & Scope', icon: Users },
    { id: 'services', label: 'Services', icon: Briefcase },
  ];

  const updateField = (key: keyof ClientBriefData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setSavedStatus('Draft autosaved');
  };

  const toggleService = (service: string) => {
    const list = formData.requiredServices.includes(service)
      ? formData.requiredServices.filter((s) => s !== service)
      : [...formData.requiredServices, service];
    updateField('requiredServices', list);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      const updated = {
        ...formData,
        isSubmitted: true,
        lastSavedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      onSave(updated);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#141819] border border-zinc-800 rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="font-display font-black text-base text-white">Client Brief Wizard</h3>
              <p className="text-[10px] font-mono text-zinc-400 mt-0.5">
                ● STATUS: {savedStatus}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 size={36} />
            </div>
            <h4 className="font-display font-black text-xl text-white">
              Directives Submitted to Viola
            </h4>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
              Your company specifications, brand parameters, and required studio services have been synchronized with our executive strategy board.
            </p>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-left max-w-md mx-auto space-y-1">
              <span className="text-[10px] font-mono text-amber-500 uppercase font-bold">
                Synchronized Target: {formData.companyName}
              </span>
              <p className="text-xs text-zinc-300">
                {formData.requiredServices.join(', ')}
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs"
              >
                Edit Directives
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Steps Progress */}
            <div className="px-5 pt-4 pb-2 border-b border-zinc-800/80 bg-zinc-900/30 flex items-center justify-between">
              {steps.map((step, idx) => {
                const isCurrent = currentStep === idx;
                const isPast = currentStep > idx;
                return (
                  <div key={step.id} className="flex-1 flex items-center">
                    <button
                      onClick={() => setCurrentStep(idx)}
                      className="flex items-center gap-1.5 min-w-0"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                        isCurrent 
                          ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20' 
                          : isPast 
                          ? 'bg-emerald-500 text-zinc-950' 
                          : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {isPast ? <Check size={12} strokeWidth={3} /> : idx + 1}
                      </div>
                      <span className={`text-[11px] font-bold truncate hidden sm:inline ${
                        isCurrent ? 'text-white' : 'text-zinc-500'
                      }`}>
                        {step.label}
                      </span>
                    </button>
                    {idx < steps.length - 1 && (
                      <div className="flex-1 h-[1px] bg-zinc-800 mx-2" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => updateField('companyName', e.target.value)}
                      placeholder="e.g. Viola Labs International"
                      className="w-full p-3 rounded-xl bg-[#0A0A0B] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                      Business Model
                    </label>
                    <input
                      type="text"
                      value={formData.businessModel}
                      onChange={(e) => updateField('businessModel', e.target.value)}
                      placeholder="e.g. AI-Powered Creative Automation & Luxury Brand Studio"
                      className="w-full p-3 rounded-xl bg-[#0A0A0B] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                      Brand Identity Aesthetic
                    </label>
                    <textarea
                      rows={3}
                      value={formData.brandIdentity}
                      onChange={(e) => updateField('brandIdentity', e.target.value)}
                      placeholder="e.g. Minimalist, avant-garde, technical elegance, gold twilight atmosphere..."
                      className="w-full p-3 rounded-xl bg-[#0A0A0B] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                      Brand Voice & Tone
                    </label>
                    <input
                      type="text"
                      value={formData.brandVoice}
                      onChange={(e) => updateField('brandVoice', e.target.value)}
                      placeholder="e.g. Understated, authoritative, culturally grounded"
                      className="w-full p-3 rounded-xl bg-[#0A0A0B] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                      Social Media Channels
                    </label>
                    <input
                      type="text"
                      value={formData.socialMedia}
                      onChange={(e) => updateField('socialMedia', e.target.value)}
                      placeholder="e.g. Instagram Reels, X (Twitter), Curated LinkedIn"
                      className="w-full p-3 rounded-xl bg-[#0A0A0B] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                      Primary Strategic Objectives
                    </label>
                    <textarea
                      rows={3}
                      value={formData.objectives}
                      onChange={(e) => updateField('objectives', e.target.value)}
                      placeholder="Key targets, conversion goals, exhibitions..."
                      className="w-full p-3 rounded-xl bg-[#0A0A0B] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                      Target Audience
                    </label>
                    <textarea
                      rows={3}
                      value={formData.targetAudience}
                      onChange={(e) => updateField('targetAudience', e.target.value)}
                      placeholder="Demographics, enterprise clients, architectural partners..."
                      className="w-full p-3 rounded-xl bg-[#0A0A0B] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                      Benchmark Competitors
                    </label>
                    <input
                      type="text"
                      value={formData.competitors}
                      onChange={(e) => updateField('competitors', e.target.value)}
                      placeholder="e.g. Linear, Pentagram, Apple Design"
                      className="w-full p-3 rounded-xl bg-[#0A0A0B] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-2">
                      Select Required Studio Services
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {AVAILABLE_SERVICES.map((serv) => {
                        const isSelected = formData.requiredServices.includes(serv);
                        return (
                          <button
                            type="button"
                            key={serv}
                            onClick={() => toggleService(serv)}
                            className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                              isSelected
                                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                            }`}
                          >
                            <span>{serv}</span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'bg-amber-500 border-amber-500 text-zinc-950' : 'border-zinc-700'
                            }`}>
                              {isSelected && <Check size={11} strokeWidth={3} />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                      Additional Notes & Timelines
                    </label>
                    <textarea
                      rows={3}
                      value={formData.additionalNotes}
                      onChange={(e) => updateField('additionalNotes', e.target.value)}
                      placeholder="Specific deadlines, delivery formats, hardware targets..."
                      className="w-full p-3 rounded-xl bg-[#0A0A0B] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer Navigation */}
            <div className="p-4 border-t border-zinc-800 bg-[#0A0A0B] flex items-center justify-between">
              <button
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  currentStep === 0 ? 'text-zinc-600 cursor-not-allowed' : 'text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <ChevronLeft size={16} />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-lg transition-transform active:scale-95"
              >
                <span>{currentStep === steps.length - 1 ? 'Submit Directives' : 'Continue'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
