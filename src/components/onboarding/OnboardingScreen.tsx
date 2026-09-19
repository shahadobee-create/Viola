import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  User, 
  BookOpen, 
  TrendingUp, 
  Palette, 
  Globe, 
  Camera, 
  Video, 
  Cpu, 
  Megaphone, 
  Briefcase, 
  ChevronRight, 
  Rocket, 
  Eye,
  Layers,
  Sparkle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface OnboardingData {
  persona: string;
  interests: string[];
  challenge: string;
  services: string[];
}

export interface OnboardingScreenProps {
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onComplete,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Selection states
  const [selectedPersona, setSelectedPersona] = useState<string>('business_owner');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Branding', 'Social Media', 'AI']);
  const [selectedChallenge, setSelectedChallenge] = useState<string>('brand');
  const [selectedServices, setSelectedServices] = useState<string[]>(['branding', 'video']);
  const [challengeFeedback, setChallengeFeedback] = useState<string>(
    "Excellent! Building a premium branding stack sets your company apart immediately. Let's showcase visual assets."
  );

  const totalSteps = 5;

  // Exact background hex colors matching the reference images
  const stepBackgrounds: Record<number, string> = {
    1: 'bg-[#054d42]', // Deep Emerald Teal
    2: 'bg-[#2e112d]', // Midnight Amethyst / Purple
    3: 'bg-[#121e36]', // Deep Navy / Royal Blue
    4: 'bg-[#3d1a11]', // Burnt Terracotta / Rust
    5: 'bg-[#1a2e1d]'  // Forest Moss Green
  };

  // Step 2 Personas
  const personas = [
    { id: 'business_owner', label: 'Business Owner', icon: <Briefcase className="w-4 h-4 text-white" /> },
    { id: 'creative_designer', label: 'Creative Designer', icon: <Palette className="w-4 h-4 text-white" /> },
    { id: 'content_creator', label: 'Content Creator', icon: <Video className="w-4 h-4 text-white" /> },
    { id: 'company', label: 'Company Representative', icon: <Globe className="w-4 h-4 text-white" /> },
    { id: 'startup', label: 'Startup Founder', icon: <Rocket className="w-4 h-4 text-white" /> },
    { id: 'student', label: 'Student', icon: <BookOpen className="w-4 h-4 text-white" /> },
    { id: 'exploring', label: 'Just Exploring', icon: <Eye className="w-4 h-4 text-white" /> }
  ];

  // Step 3 Topics of Interest
  const interests = [
    { id: 'Branding', label: 'Branding' },
    { id: 'Logo Design', label: 'Logo Design' },
    { id: 'Social Media', label: 'Social Media' },
    { id: 'AI', label: 'AI Solutions' },
    { id: 'Photography', label: 'Photography' },
    { id: 'Videography', label: 'Videography' },
    { id: 'Marketing', label: 'Marketing' },
    { id: 'UI/UX', label: 'UI/UX Design' },
    { id: 'Motion Graphics', label: 'Motion Graphics' },
    { id: 'Web Design', label: 'Web Design' },
    { id: 'Mobile Apps', label: 'Mobile Apps' },
    { id: 'Printing', label: 'Printing & Press' }
  ];

  // Step 4 Challenges
  const challenges = [
    { id: 'customers', label: 'Getting more customers', icon: <Rocket className="w-4 h-4" />, desc: 'Focus on lead acquisition and market outreach.' },
    { id: 'brand', label: 'Building a stronger brand', icon: <Palette className="w-4 h-4" />, desc: 'Improve digital styling, logo identity, and assets.' },
    { id: 'content', label: 'Creating better content', icon: <Camera className="w-4 h-4" />, desc: 'Accelerate social posts, reels, and video production.' },
    { id: 'website', label: 'Launching a website', icon: <Globe className="w-4 h-4" />, desc: 'Create responsive high-fidelity web or mobile apps.' },
    { id: 'sales', label: 'Increasing sales', icon: <TrendingUp className="w-4 h-4" />, desc: 'Optimize conversion tunnels and paid ad campaigns.' },
    { id: 'exploring', label: "I'm just exploring", icon: <Eye className="w-4 h-4" />, desc: 'Unlock creative references and agency strategies.' }
  ];

  // Step 5 Services
  const helpOptions = [
    { id: 'strategy', label: 'Marketing Strategy', icon: <TrendingUp className="w-4 h-4 text-white" /> },
    { id: 'branding', label: 'Branding & Identity', icon: <Palette className="w-4 h-4 text-white" /> },
    { id: 'photography', label: 'Photography', icon: <Camera className="w-4 h-4 text-white" /> },
    { id: 'video', label: 'Video Production', icon: <Video className="w-4 h-4 text-white" /> },
    { id: 'social', label: 'Social Media Strategy', icon: <Rocket className="w-4 h-4 text-white" /> },
    { id: 'websites', label: 'Websites & Apps', icon: <Globe className="w-4 h-4 text-white" /> },
    { id: 'ads', label: 'Advertising Campaigns', icon: <Megaphone className="w-4 h-4 text-white" /> },
    { id: 'ai', label: 'AI Solutions', icon: <Cpu className="w-4 h-4 text-white" /> }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete({
        persona: selectedPersona || 'Business Owner',
        interests: selectedInterests.length > 0 ? selectedInterests : ['Branding', 'Marketing'],
        challenge: selectedChallenge || 'brand',
        services: selectedServices
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(i => i !== interestId)
        : [...prev, interestId]
    );
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(s => s !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleChallengeSelect = (challengeId: string) => {
    setSelectedChallenge(challengeId);
    let feedback = '';
    if (challengeId === 'customers') {
      feedback = "Great choice! We will personalize your feed with tactics focused on customer acquisition and growth outreach.";
    } else if (challengeId === 'brand') {
      feedback = "Excellent! Building a premium branding stack sets your company apart immediately. Let's showcase visual assets.";
    } else if (challengeId === 'content') {
      feedback = "Perfect! High quality visual assets drive attention. We'll prioritize content-creation toolkits.";
    } else if (challengeId === 'website') {
      feedback = "Smart move! A web destination is the central anchor of your digital footprint. We'll highlight development briefs.";
    } else if (challengeId === 'sales') {
      feedback = "Actionable! Let's tailor analytical and ROI dashboards. Conversion tunnels are ready for optimization.";
    } else {
      feedback = "Welcome! Take your time to explore our stories, templates, and meet our AI consulting assistant.";
    }
    setChallengeFeedback(feedback);
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case 1: return <Sparkles className="w-7 h-7 text-white" />;
      case 2: return <User className="w-7 h-7 text-white" />;
      case 3: return <BookOpen className="w-7 h-7 text-white" />;
      case 4: return <TrendingUp className="w-7 h-7 text-white" />;
      case 5: return <Palette className="w-7 h-7 text-white" />;
      default: return <Sparkles className="w-7 h-7 text-white" />;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Welcome to Viola";
      case 2: return "Your Professional Domain";
      case 3: return "Personalize Your Feed";
      case 4: return "Your Primary Challenge";
      case 5: return "Tailored Agency Services";
      default: return "Onboard into Viola";
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1: return "A minimalist visual workspace connecting premium branding, marketing, strategy, and asset delivery directly to you.";
      case 2: return "Choose your professional profile. We use this to curate your templates, business stories, and action tools.";
      case 3: return "Select topics of interest. Your custom feed immediately structures itself around your aesthetic choices.";
      case 4: return "What is your main priority? Setting this helps our AI Assistant guide you through targeted consultation steps.";
      case 5: return "Which creative or technical disciplines are you looking to outsource or discuss with our elite agency squad?";
      default: return "";
    }
  };

  return (
    <div 
      className={`relative flex flex-col h-full w-full overflow-hidden select-none text-white transition-colors duration-500 ${stepBackgrounds[currentStep] || 'bg-[#054d42]'}`}
    >
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col h-full justify-between overflow-hidden relative">
        {/* Top Header Bar */}
        <div className="pt-6 px-6 flex items-center justify-between z-20 shrink-0">
          <span className="text-[11px] font-mono font-bold tracking-widest text-white/50 uppercase">
            VIOLA ONBOARDING
          </span>
          <button 
            onClick={onSkip}
            className="text-[11px] font-semibold px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            Skip
          </button>
        </div>

        {/* Screen Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-6 pt-2 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex-1 flex flex-col justify-start pt-1"
            >
              {/* Concentric Rings Graphic (Exact match to uploaded screenshots) */}
              <div className="relative w-44 h-44 mx-auto flex items-center justify-center shrink-0 my-1">
                <div className="absolute w-full h-full rounded-full border border-white/10 flex items-center justify-center animate-pulse" style={{ animationDuration: '4s' }}>
                  <div className="w-[82%] h-[82%] rounded-full border border-white/15 flex items-center justify-center">
                    <div className="w-[66%] h-[66%] rounded-full border border-white/20 flex items-center justify-center">
                      <div className="w-[50%] h-[50%] rounded-full bg-white/10 border border-white/25 backdrop-blur-md flex items-center justify-center shadow-lg shadow-black/20">
                        {getStepIcon()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Headline & Description */}
              <div className="text-center space-y-2 mt-3 shrink-0 px-2">
                <h2 className="font-display font-extrabold text-2xl tracking-tight text-white leading-tight">
                  {getStepTitle()}
                </h2>
                <p className="text-[11.5px] font-light text-white/70 max-w-[320px] mx-auto leading-relaxed">
                  {getStepSubtitle()}
                </p>
              </div>

              {/* Interactive Cards Content Area */}
              <div className="mt-4 space-y-2 flex-1 flex flex-col justify-start max-w-[340px] mx-auto w-full">
                
                {/* STEP 1: Welcome Highlights */}
                {currentStep === 1 && (
                  <div className="space-y-2.5 w-full pt-1">
                    {[
                      { label: "Bespoke Multi-Channel Strategy", icon: <TrendingUp className="w-4 h-4 text-white" />, desc: "Tailored market outreach formulas." },
                      { label: "Ultra-Prism Branding & Assets", icon: <Palette className="w-4 h-4 text-white" />, desc: "High fidelity logo, identity and layouts." },
                      { label: "Generative AI Consulting & Logic", icon: <Cpu className="w-4 h-4 text-white" />, desc: "Deploying custom server-side neural features." }
                    ].map((item, idx) => (
                      <div 
                        key={idx}
                        className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 flex items-center gap-3.5 shadow-sm"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                          {item.icon}
                        </div>
                        <div className="text-left">
                          <p className="text-[12px] font-bold text-white leading-snug">{item.label}</p>
                          <p className="text-[9.5px] text-white/60 mt-0.5 leading-snug">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* STEP 2: Persona Selection */}
                {currentStep === 2 && (
                  <div className="space-y-2 w-full max-h-[240px] overflow-y-auto no-scrollbar pt-1">
                    {personas.map((pers) => {
                      const isSelected = selectedPersona === pers.id;
                      return (
                        <button
                          key={pers.id}
                          onClick={() => setSelectedPersona(pers.id)}
                          className={`w-full p-3 rounded-2xl border flex items-center justify-between text-left transition-all active:scale-98 cursor-pointer backdrop-blur-md
                            ${isSelected 
                              ? 'bg-white/20 border-white/40 shadow-md shadow-black/20' 
                              : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? 'bg-white/20' : 'bg-white/10'}`}>
                              {pers.icon}
                            </div>
                            <span className="text-[12px] font-bold text-white">
                              {pers.label}
                            </span>
                          </div>
                          {isSelected ? (
                            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                              <Check className="w-3.5 h-3.5 text-zinc-900" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-white/20" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* STEP 3: Topics Multi-Select */}
                {currentStep === 3 && (
                  <div className="space-y-2.5 w-full pt-1">
                    <div className="grid grid-cols-2 gap-2 max-h-[190px] overflow-y-auto no-scrollbar">
                      {interests.map((intItem) => {
                        const isSelected = selectedInterests.includes(intItem.id);
                        return (
                          <button
                            key={intItem.id}
                            onClick={() => toggleInterest(intItem.id)}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-center backdrop-blur-md
                              ${isSelected 
                                ? 'bg-white/20 border-white/50 text-white font-bold shadow-sm' 
                                : 'bg-white/5 border-white/10 hover:border-white/20 text-white/75'}`}
                          >
                            <span className="text-[11px] tracking-tight">{intItem.label}</span>
                            {isSelected && (
                              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-zinc-900" />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[10.5px] text-white/60 font-mono text-center leading-none">
                      Selected topics: {selectedInterests.length} / {interests.length}
                    </p>
                  </div>
                )}

                {/* STEP 4: Challenge Single Select with Feedback */}
                {currentStep === 4 && (
                  <div className="space-y-2 w-full pt-1">
                    <div className="space-y-1.5 max-h-[165px] overflow-y-auto no-scrollbar">
                      {challenges.map((ch) => {
                        const isSelected = selectedChallenge === ch.id;
                        return (
                          <button
                            key={ch.id}
                            onClick={() => handleChallengeSelect(ch.id)}
                            className={`w-full p-2 px-3 rounded-xl border flex flex-col text-left transition-all cursor-pointer backdrop-blur-md
                              ${isSelected 
                                ? 'bg-white/20 border-white/40 shadow-sm' 
                                : 'bg-white/5 border-white/10 hover:border-white/25'}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className={`p-1 rounded-md shrink-0 ${isSelected ? 'text-amber-300' : 'text-white/70'}`}>
                                {ch.icon}
                              </div>
                              <span className={`text-[11.5px] font-bold ${isSelected ? 'text-white' : 'text-white/90'}`}>
                                {ch.label}
                              </span>
                            </div>
                            <p className="text-[9.5px] text-white/60 mt-0.5 pl-6 leading-normal">{ch.desc}</p>
                          </button>
                        );
                      })}
                    </div>

                    <AnimatePresence mode="wait">
                      {challengeFeedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-[10.5px] text-white/95 leading-relaxed font-light text-center"
                        >
                          ⚡ {challengeFeedback}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* STEP 5: Agency Services Multi-Select */}
                {currentStep === 5 && (
                  <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto no-scrollbar w-full pt-1">
                    {helpOptions.map((opt) => {
                      const isSelected = selectedServices.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          onClick={() => toggleService(opt.id)}
                          className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-left transition-all cursor-pointer relative backdrop-blur-md
                            ${isSelected 
                              ? 'bg-white/25 border-white/50 text-white font-bold shadow-sm' 
                              : 'bg-white/5 border-white/10 hover:border-white/20 text-white/80'}`}
                        >
                          <div className="p-1.5 rounded-lg bg-white/10 shrink-0">
                            {opt.icon}
                          </div>
                          <span className="text-[10.5px] font-bold leading-tight truncate">{opt.label}</span>
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-zinc-900" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 py-3 shrink-0">
            {Array.from({ length: totalSteps }).map((_, idx) => {
              const isActive = currentStep === idx + 1;
              return (
                <div 
                  key={idx}
                  className={`transition-all duration-300 rounded-full
                    ${isActive ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30'}`}
                />
              );
            })}
          </div>

          {/* Bottom Navigation Bar (Circular Back, Pill Action, Circular Next) */}
          <div className="flex items-center justify-between z-10 shrink-0">
            {/* Back Button */}
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`w-11 h-11 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/90 transition-all hover:bg-white/10 active:scale-90
                ${currentStep === 1 ? 'opacity-20 pointer-events-none' : 'cursor-pointer'}`}
              aria-label="Previous step"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Primary Action Button */}
            <button
              onClick={handleNext}
              className="flex-1 mx-3 rounded-full py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-[13px] font-bold text-white flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <span>{currentStep === totalSteps ? 'Complete Onboarding' : 'Next'}</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={currentStep === totalSteps}
              className={`w-11 h-11 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/90 transition-all hover:bg-white/10 active:scale-90
                ${currentStep === totalSteps ? 'opacity-20 pointer-events-none' : 'cursor-pointer'}`}
              aria-label="Next step"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Step Index Label */}
          <div className="text-center shrink-0 mt-2">
            <span className="text-[10px] font-mono font-bold text-white/50 tracking-widest uppercase">
              {currentStep} OF {totalSteps}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
