import React, { useState, useRef } from 'react';
import { CURRENT_USER } from '../../data/mockData';
import { 
  User, 
  Bookmark, 
  Calendar,
  CalendarClock, 
  Database, 
  ShieldCheck, 
  Lock, 
  Bell, 
  LogOut, 
  ChevronRight, 
  Sun, 
  Moon, 
  Laptop, 
  X, 
  Check, 
  Trash2, 
  UsersRound,
  Sparkles,
  Camera,
  Edit3,
  ArrowLeft,
  KeyRound,
  Globe,
  Smartphone,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Shield,
  Clock,
  Radio,
  Sliders,
  Folder,
  Mail,
  Phone,
  AtSign,
  Briefcase
} from 'lucide-react';

interface ProfileViewProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenBrief: () => void;
  onOpenAssets: () => void;
  onOpenCalendar: () => void;
  onOpenInspiration?: () => void;
  onRestartOnboarding?: () => void;
  onLogout?: () => void;
  onOpenSocial?: () => void;
}

type SubScreenType = 
  | null 
  | 'appearance' 
  | 'language' 
  | 'notifications' 
  | 'security' 
  | 'change-password' 
  | 'privacy' 
  | 'permissions' 
  | 'cache' 
  | 'saved' 
  | 'scheduled' 
  | 'people';

export const ProfileView: React.FC<ProfileViewProps> = ({
  isDark,
  onToggleTheme,
  onOpenBrief,
  onOpenAssets,
  onOpenCalendar,
  onOpenInspiration,
  onRestartOnboarding,
  onLogout,
  onOpenSocial,
}) => {
  // Navigation
  const [activeSubScreen, setActiveSubScreen] = useState<SubScreenType>(null);

  // Profile data
  const [profile, setProfile] = useState({
    displayName: CURRENT_USER.displayName || 'Shahad',
    username: CURRENT_USER.username || 'shahad',
    email: CURRENT_USER.email || 'shahadobee@gmail.com',
    phone: '+964 750 442 8891',
    jobTitle: 'Creative Director · Lead Partner',
    avatar: CURRENT_USER.avatar,
    isOnline: true,
  });

  // Edit Mode
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });
  const [isSaving, setIsSaving] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Avatar Modal
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Logout Modal
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Settings State
  const [themeMode, setThemeMode] = useState<'system' | 'light' | 'dark'>(isDark ? 'dark' : 'light');
  const [language, setLanguage] = useState<'en' | 'ku_sorani' | 'ku_badini' | 'ar'>('en');

  // Notifications toggles
  const [notifications, setNotifications] = useState({
    messages: true,
    mentions: true,
    clientUpdates: true,
    calendar: true,
    contentReviews: true,
    assignments: true,
    announcements: true,
  });

  // Privacy toggles
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'studio', // 'studio' | 'contacts'
    onlineStatus: true,
    readReceipts: true,
    typingIndicator: true,
  });

  // Change Password state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Cache & Storage state
  const [cacheCleared, setCacheCleared] = useState(false);
  const [cacheToast, setCacheToast] = useState(false);

  // Active Sessions
  const sessions = [
    {
      id: 'sess_1',
      device: 'MacBook Pro 16" · macOS Sequoia',
      client: 'Chrome 129 · Erbil Studio HQ',
      ip: '185.193.18.42',
      isCurrent: true,
      lastActive: 'Active Now',
    },
    {
      id: 'sess_2',
      device: 'iPhone 15 Pro · iOS 18.2',
      client: 'Viola Mobile App · Erbil',
      ip: '185.193.18.89',
      isCurrent: false,
      lastActive: '2 hours ago',
    },
  ];

  // Presets for quick avatar selection
  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&h=160&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=160&h=160&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80',
  ];

  const handleStartEdit = () => {
    setEditForm({ ...profile });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditForm({ ...profile });
    setIsEditing(false);
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setProfile({ ...editForm });
      setIsSaving(false);
      setIsEditing(false);
      setSaveToast('Profile updated successfully');
      setTimeout(() => setSaveToast(null), 3000);
    }, 600);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newAvatar = event.target.result as string;
          setProfile((prev) => ({ ...prev, avatar: newAvatar }));
          setEditForm((prev) => ({ ...prev, avatar: newAvatar }));
          setShowAvatarModal(false);
          setSaveToast('Avatar photo updated');
          setTimeout(() => setSaveToast(null), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPresetAvatar = (url: string) => {
    setProfile((prev) => ({ ...prev, avatar: url }));
    setEditForm((prev) => ({ ...prev, avatar: url }));
    setShowAvatarModal(false);
    setSaveToast('Avatar photo updated');
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleRemovePhoto = () => {
    const fallback = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80';
    setProfile((prev) => ({ ...prev, avatar: fallback }));
    setEditForm((prev) => ({ ...prev, avatar: fallback }));
    setShowAvatarModal(false);
    setSaveToast('Photo reset to studio default');
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleThemeChange = (mode: 'system' | 'light' | 'dark') => {
    setThemeMode(mode);
    if (mode === 'dark' && !isDark) {
      onToggleTheme();
    } else if (mode === 'light' && isDark) {
      onToggleTheme();
    } else if (mode === 'system') {
      // check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark !== isDark) {
        onToggleTheme();
      }
    }
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (!passwordForm.currentPassword) {
      setPasswordError('Please enter your current password');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New password and confirmation do not match');
      return;
    }

    setIsChangingPassword(true);
    setTimeout(() => {
      setIsChangingPassword(false);
      setPasswordSuccess(true);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => {
        setPasswordSuccess(false);
        setActiveSubScreen('security');
      }, 1500);
    }, 700);
  };

  const handleClearCache = () => {
    setCacheCleared(true);
    setCacheToast(true);
    setTimeout(() => setCacheToast(false), 3500);
  };

  // Count active notifications
  const activeNotificationCount = Object.values(notifications).filter(Boolean).length;

  return (
    <div className="flex flex-col h-full bg-[#F8F9FC] dark:bg-[#0A0A0B] overflow-y-auto pb-32 transition-colors">
      {/* Hidden file inputs for avatar upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="user"
        className="hidden"
      />

      {/* Global Toast Notification */}
      {saveToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs shadow-2xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 size={16} className="text-emerald-400 dark:text-emerald-600" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <div className="sticky top-0 z-30 px-5 sm:px-8 py-3.5 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-[#0A0A0B]/90 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          {activeSubScreen && (
            <button
              onClick={() => {
                if (activeSubScreen === 'change-password') {
                  setActiveSubScreen('security');
                } else {
                  setActiveSubScreen(null);
                }
              }}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>
          )}

          <div>
            <h1 className="font-display font-extrabold text-base sm:text-lg tracking-tight text-zinc-950 dark:text-white">
              {activeSubScreen === 'appearance' && 'Appearance'}
              {activeSubScreen === 'language' && 'Language'}
              {activeSubScreen === 'notifications' && 'Notifications'}
              {activeSubScreen === 'security' && 'Security'}
              {activeSubScreen === 'change-password' && 'Change Password'}
              {activeSubScreen === 'privacy' && 'Privacy'}
              {activeSubScreen === 'permissions' && 'Role & Permissions'}
              {activeSubScreen === 'cache' && 'Cache & Storage'}
              {activeSubScreen === 'saved' && 'Saved Messages'}
              {activeSubScreen === 'scheduled' && 'Scheduled Deliveries'}
              {activeSubScreen === 'people' && 'People & Access Desk'}
              {!activeSubScreen && 'Profile & Settings'}
            </h1>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {activeSubScreen === 'appearance' && 'Customize theme & visual display mode'}
              {activeSubScreen === 'language' && 'Select your preferred studio interface language'}
              {activeSubScreen === 'notifications' && 'Configure alerts for chats, briefs & deadlines'}
              {activeSubScreen === 'security' && 'Manage passwords, active sessions & node encryption'}
              {activeSubScreen === 'change-password' && 'Update your account access credentials'}
              {activeSubScreen === 'privacy' && 'Control online presence and read receipt visibility'}
              {activeSubScreen === 'permissions' && 'View your verified studio authorization matrix'}
              {activeSubScreen === 'cache' && 'Manage local media cache & offline storage'}
              {activeSubScreen === 'saved' && 'Your private encrypted message archive'}
              {activeSubScreen === 'scheduled' && 'Pending automated agency dispatches'}
              {activeSubScreen === 'people' && 'Studio members, assigned clients & permissions'}
              {!activeSubScreen && 'Manage your account and preferences'}
            </p>
          </div>
        </div>

        {/* Quick Theme Toggle in Header */}
        <button
          onClick={onToggleTheme}
          title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 pt-4 space-y-6">

        {/* =========================================================================
            ROOT PROFILE & SETTINGS VIEW (When activeSubScreen === null)
        ========================================================================== */}
        {!activeSubScreen && (
          <>
            {/* 1. PROFILE HEADER CARD (Inspired by Reference Layout) */}
            <div className="relative rounded-[28px] border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141819] overflow-hidden shadow-sm">
              {/* Top Curved Banner with Viola Brand Aesthetic */}
              <div className="h-28 sm:h-32 w-full bg-gradient-to-tr from-amber-500/20 via-violet-600/20 to-indigo-600/25 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-70" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-500/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/20 rounded-full blur-2xl" />
              </div>

              {/* Overlapping Profile Photo & Info */}
              <div className="relative px-6 pb-6 pt-0 flex flex-col items-center text-center -mt-14 sm:-mt-16">
                <div className="relative inline-block mb-3">
                  <img
                    src={profile.avatar}
                    alt={profile.displayName}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white dark:border-[#141819] shadow-xl shadow-black/10"
                  />
                  {/* Pen button that opens Personal Information edit modal */}
                  <button
                    onClick={handleStartEdit}
                    title="Edit Personal Information"
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all border-2 border-white dark:border-[#141819]"
                    aria-label="Edit personal information"
                  >
                    <Edit3 size={14} />
                  </button>
                </div>

                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-zinc-950 dark:text-white tracking-tight">
                  {profile.displayName}
                </h2>
                <p className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
                  @{profile.username}
                </p>
              </div>
            </div>

            {/* 2. SETTINGS GROUPS (Grouped Minimal Layout from Reference) */}
            
            {/* GROUP A: GENERAL */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-400 px-2">
                General
              </span>
              <div className="rounded-[24px] border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141819] overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800/60 shadow-sm">
                
                {/* Row: Appearance */}
                <button
                  onClick={() => setActiveSubScreen('appearance')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      {isDark ? <Moon size={17} /> : <Sun size={17} />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-950 dark:text-white">Appearance</h4>
                      <p className="text-[11px] text-zinc-500">
                        {themeMode === 'system' ? 'System Default' : isDark ? 'Dark Luxury' : 'Light Minimal'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-zinc-400">
                      {themeMode === 'system' ? 'Auto' : isDark ? 'Dark' : 'Light'}
                    </span>
                    <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {/* Row: Language */}
                <button
                  onClick={() => setActiveSubScreen('language')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                      <Globe size={17} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-950 dark:text-white">Language</h4>
                      <p className="text-[11px] text-zinc-500">Studio interface localization</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-zinc-400">
                      {language === 'en' ? 'English (US)' : language === 'ku_sorani' ? 'کوردی' : language === 'ku_badini' ? 'بادینی' : 'العربية'}
                    </span>
                    <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {/* Row: Notifications */}
                <button
                  onClick={() => setActiveSubScreen('notifications')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center">
                      <Bell size={17} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-950 dark:text-white">Notifications</h4>
                      <p className="text-[11px] text-zinc-500">Messages, calendar deadlines & dispatches</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
                      {activeNotificationCount} Active
                    </span>
                    <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              </div>
            </div>

            {/* GROUP B: ACCOUNT & SECURITY */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-400 px-2">
                Account & Security
              </span>
              <div className="rounded-[24px] border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141819] overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800/60 shadow-sm">
                
                {/* Row: Security */}
                <button
                  onClick={() => setActiveSubScreen('security')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      <Lock size={17} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-950 dark:text-white">Security</h4>
                      <p className="text-[11px] text-zinc-500">Password, active sessions & TLS status</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">VERIFIED</span>
                    <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {/* Row: Privacy */}
                <button
                  onClick={() => setActiveSubScreen('privacy')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      <ShieldCheck size={17} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-950 dark:text-white">Privacy</h4>
                      <p className="text-[11px] text-zinc-500">Online status, read receipts & visibility</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-zinc-400">Configured</span>
                    <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {/* Row: Role & Permissions */}
                <button
                  onClick={() => setActiveSubScreen('permissions')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <KeyRound size={17} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-950 dark:text-white">Role & Permissions</h4>
                      <p className="text-[11px] text-zinc-500">Staff owner authorization matrix</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-mono font-bold">
                      OWNER
                    </span>
                    <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              </div>
            </div>

            {/* GROUP C: VIOLA WORKSPACE */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-400 px-2">
                Workspace
              </span>
              <div className="rounded-[24px] border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141819] overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800/60 shadow-sm">
                
                {/* Row: People & Access Desk */}
                <button
                  onClick={() => setActiveSubScreen('people')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                      <UsersRound size={17} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-950 dark:text-white">People & Access Desk</h4>
                      <p className="text-[11px] text-zinc-500">Manage user roles, overrides & group memberships</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Row: Saved & Bookmarked Messages */}
                <button
                  onClick={() => setActiveSubScreen('saved')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      <Bookmark size={17} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-950 dark:text-white">Saved & Bookmarked Messages</h4>
                      <p className="text-[11px] text-zinc-500">Your private encrypted message archive</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Row: Scheduled Deliveries */}
                <button
                  onClick={() => setActiveSubScreen('scheduled')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <CalendarClock size={17} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-950 dark:text-white">Scheduled Deliveries</h4>
                      <p className="text-[11px] text-zinc-500">Pending automated messages queue</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-zinc-400">1 Pending</span>
                    <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {/* Row: Daily Routine & Studio Calendar */}
                {onOpenCalendar && (
                  <button
                    id="profile_calendar_row"
                    onClick={onOpenCalendar}
                    className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <Calendar size={17} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-950 dark:text-white">Daily Routine & Calendar</h4>
                        <p className="text-[11px] text-zinc-500">Scheduled studio agenda, deadlines & milestones</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                        AGENDA
                      </span>
                      <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                )}

                {/* Row: Official Social Channels */}
                {onOpenSocial && (
                  <button
                    id="profile_social_row"
                    onClick={onOpenSocial}
                    className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center">
                        <Globe size={17} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-950 dark:text-white">Official Social Channels</h4>
                        <p className="text-[11px] text-zinc-500">Instagram, X, YouTube, LinkedIn & reels</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-pink-600 dark:text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-md">
                        VERIFIED
                      </span>
                      <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                )}

                {/* Row: Cache & Offline Storage */}
                <button
                  onClick={() => setActiveSubScreen('cache')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                      <Database size={17} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-950 dark:text-white">Cache & Offline Storage</h4>
                      <p className="text-[11px] text-zinc-500">Downloaded media, local SQLite cache</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-zinc-400">
                      {cacheCleared ? '0 KB' : '61.7 MB'}
                    </span>
                    <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {/* Row: Replay Onboarding */}
                {onRestartOnboarding && (
                  <button
                    onClick={onRestartOnboarding}
                    className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center">
                        <Sparkles size={17} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-950 dark:text-white">Viola Onboarding Experience</h4>
                        <p className="text-[11px] text-zinc-500">Replay the 5-step guided setup & domain selection</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>
            </div>

            {/* 4. LOGOUT BUTTON (Near Bottom, Destructive Treatment with Dialog) */}
            <div className="pt-2">
              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 active:bg-rose-500/15 text-rose-500 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
              <p className="text-center text-[10px] font-mono text-zinc-400 mt-2">
                Viola Studio Node · v2.4.0 · Erbil HQ
              </p>
            </div>
          </>
        )}

        {/* =========================================================================
            NESTED SCREEN 1: APPEARANCE
        ========================================================================== */}
        {activeSubScreen === 'appearance' && (
          <div className="space-y-4">
            <div className="rounded-[28px] border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141819] p-5 sm:p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400 mb-1">
                  Theme Preference
                </h3>
                <p className="text-xs text-zinc-500">
                  Choose your interface theme. System default automatically adapts with your OS setting.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    id: 'system' as const,
                    title: 'System Default',
                    desc: 'Automatically matches your device dark or light appearance',
                    icon: Laptop,
                  },
                  {
                    id: 'light' as const,
                    title: 'Light Mode',
                    desc: 'Clean, high-contrast crisp off-white canvas with balanced contrast',
                    icon: Sun,
                  },
                  {
                    id: 'dark' as const,
                    title: 'Dark Luxury Mode',
                    desc: 'Viola signature deep dark canvas with ambient gold and violet lighting',
                    icon: Moon,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = themeMode === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleThemeChange(item.id)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/5 dark:bg-amber-500/10 shadow-sm'
                          : 'border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                            {item.title}
                            {isSelected && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-mono font-bold">
                                ACTIVE
                              </span>
                            )}
                          </h4>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500 text-zinc-950'
                          : 'border-zinc-300 dark:border-zinc-700'
                      }`}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            NESTED SCREEN 2: LANGUAGE
        ========================================================================== */}
        {activeSubScreen === 'language' && (
          <div className="space-y-4">
            <div className="rounded-[28px] border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141819] p-5 sm:p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400 mb-1">
                  Interface Language
                </h3>
                <p className="text-xs text-zinc-500">
                  Select your primary language for studio menus, client briefs, and typography displays.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'en' as const, name: 'English (US)', native: 'English', sub: 'Standard Studio Dialect' },
                  { id: 'ku_sorani' as const, name: 'Kurdish (Sorani)', native: 'کوردی سۆرانی', sub: 'Erbil & Sulaymaniyah Region' },
                  { id: 'ku_badini' as const, name: 'Kurdish (Badini)', native: 'کوردی بادینی', sub: 'Duhok & Zakho Region' },
                  { id: 'ar' as const, name: 'Arabic', native: 'العربية الفصحى', sub: 'Regional Middle East Commerce' },
                ].map((item) => {
                  const isSelected = language === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setLanguage(item.id);
                        setSaveToast(`Language set to ${item.name}`);
                        setTimeout(() => setSaveToast(null), 2500);
                      }}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10 shadow-sm'
                          : 'border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-zinc-950 dark:text-white">{item.name}</h4>
                          <span className="text-xs font-semibold text-zinc-400 font-mono">({item.native})</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{item.sub}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-500 text-white'
                          : 'border-zinc-300 dark:border-zinc-700'
                      }`}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            NESTED SCREEN 3: NOTIFICATIONS
        ========================================================================== */}
        {activeSubScreen === 'notifications' && (
          <div className="space-y-4">
            <div className="rounded-[28px] border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141819] p-5 sm:p-6 shadow-sm space-y-5">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400 mb-1">
                  Notification Delivery Settings
                </h3>
                <p className="text-xs text-zinc-500">
                  Control push notifications and alert sounds across your active devices.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    key: 'messages' as const,
                    title: 'In-app Chat Messages',
                    desc: 'Direct messages, client mentions, and thread replies',
                  },
                  {
                    key: 'mentions' as const,
                    title: 'Direct Mentions & Tags',
                    desc: 'When a teammate or client @tags your username in a channel',
                  },
                  {
                    key: 'clientUpdates' as const,
                    title: 'Client Updates & Directives',
                    desc: 'Brand brief approvals, client comments, and review notes',
                  },
                  {
                    key: 'calendar' as const,
                    title: 'Calendar & Production Deadlines',
                    desc: 'Shooting schedules, reel deliverables & milestone countdowns',
                  },
                  {
                    key: 'contentReviews' as const,
                    title: 'Content Reviews & Approvals',
                    desc: 'Key art reviews, caption edits, and media revisions',
                  },
                  {
                    key: 'assignments' as const,
                    title: 'Task & Role Assignments',
                    desc: 'When assigned to new client campaigns or retainers',
                  },
                  {
                    key: 'announcements' as const,
                    title: 'Agency Announcements & Dispatches',
                    desc: 'Viola Erbil HQ broadcast alerts and studio releases',
                  },
                ].map((item) => {
                  const isChecked = notifications[item.key];
                  return (
                    <div
                      key={item.key}
                      className="p-3.5 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-zinc-900/40 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-zinc-950 dark:text-white">{item.title}</h4>
                        <p className="text-[11px] text-zinc-500 leading-relaxed">{item.desc}</p>
                      </div>

                      {/* Native Style Switch */}
                      <button
                        type="button"
                        onClick={() => {
                          setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }));
                        }}
                        className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 cursor-pointer p-0.5 ${
                          isChecked ? 'bg-amber-500' : 'bg-zinc-300 dark:bg-zinc-700'
                        }`}
                        aria-label={item.title}
                      >
                        <span
                          className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                            isChecked ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            NESTED SCREEN 4: SECURITY
        ========================================================================== */}
        {activeSubScreen === 'security' && (
          <div className="space-y-4">
            {/* Change Password Card */}
            <div className="rounded-[28px] border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141819] p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <KeyRound size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-950 dark:text-white">Account Password</h3>
                    <p className="text-[11px] text-zinc-500">Last changed 45 days ago</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSubScreen('change-password')}
                  className="px-3.5 py-1.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Lock size={13} />
                  <span>Change Password</span>
                </button>
              </div>
            </div>

            {/* Zero-Knowledge Status */}
            <div className="rounded-[28px] border border-emerald-500/20 bg-emerald-500/5 p-5 sm:p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck size={20} />
                  <h3 className="font-bold text-xs uppercase tracking-wider font-mono">
                    Zero-Knowledge Node Security
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                  ACTIVE
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Sessions use cryptographically signed ephemeral tokens. In-flight messages and client briefs travel over TLS 1.3 with AES-256-GCM symmetric ciphers.
              </p>
              <div className="p-3 rounded-xl bg-black/5 dark:bg-black/30 border border-emerald-500/10 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 space-y-1">
                <div>PROTOCOL: TLS 1.3 / ECDHE-RSA-AES256-GCM-SHA384</div>
                <div>NODE VERIFICATION: verified_mesh_erbil_01</div>
                <div>KEY ROTATION: Automated 72h cycle</div>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="rounded-[28px] border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141819] p-5 sm:p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400">
                  Active Sessions
                </h3>
                <span className="text-[10px] font-mono text-zinc-400">2 Devices Connected</span>
              </div>

              <div className="space-y-2.5">
                {sessions.map((sess) => (
                  <div
                    key={sess.id}
                    className="p-3.5 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-zinc-900/40 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        {sess.device.includes('iPhone') ? <Smartphone size={16} /> : <Laptop size={16} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-zinc-950 dark:text-white">{sess.device}</h4>
                          {sess.isCurrent && (
                            <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-mono font-bold">
                              THIS DEVICE
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-0.5">{sess.client} · {sess.lastActive}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            NESTED SCREEN 5: CHANGE PASSWORD
        ========================================================================== */}
        {activeSubScreen === 'change-password' && (
          <div className="space-y-4">
            <div className="rounded-[28px] border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141819] p-5 sm:p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400 mb-1">
                  Change Password
                </h3>
                <p className="text-xs text-zinc-500">
                  Enter your current password followed by a secure new password of at least 8 characters.
                </p>
              </div>

              {passwordError && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-500 text-xs font-medium flex items-center gap-2">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              {passwordSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-500 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 size={16} className="flex-shrink-0" />
                  <span>Password updated successfully! Redirecting...</span>
                </div>
              )}

              <form onSubmit={handleChangePasswordSubmit} className="space-y-3.5">
                {/* Current Password */}
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPw ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-2.5 pr-10 rounded-2xl text-xs font-medium bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPw(!showCurrentPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                    >
                      {showCurrentPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    New Password (min 8 characters)
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPw ? 'text' : 'password'}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-2.5 pr-10 rounded-2xl text-xs font-medium bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw(!showNewPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                    >
                      {showNewPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {/* Strength Meter */}
                  {passwordForm.newPassword && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <div className={`h-1 flex-1 rounded-full ${passwordForm.newPassword.length >= 8 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      <div className={`h-1 flex-1 rounded-full ${passwordForm.newPassword.length >= 12 ? 'bg-emerald-500' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
                      <div className={`h-1 flex-1 rounded-full ${passwordForm.newPassword.length >= 14 ? 'bg-emerald-500' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
                      <span className="text-[10px] font-mono text-zinc-400 ml-1">
                        {passwordForm.newPassword.length >= 12 ? 'Strong' : passwordForm.newPassword.length >= 8 ? 'Good' : 'Too short'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPw ? 'text' : 'password'}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-2.5 pr-10 rounded-2xl text-xs font-medium bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPw(!showConfirmPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                    >
                      {showConfirmPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActiveSubScreen('security')}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="px-5 py-2.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 shadow-md shadow-black/10"
                  >
                    {isChangingPassword ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                        <span>Updating Password...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={14} />
                        <span>Change Password</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
            NESTED SCREEN 6: PRIVACY
        ========================================================================== */}
        {activeSubScreen === 'privacy' && (
          <div className="space-y-4">
            <div className="rounded-[28px] border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141819] p-5 sm:p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400 mb-1">
                  Privacy Settings
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Control how your activity and profile information appear to other Viola users across the studio.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                {/* Online Status Toggle */}
                <div className="p-3.5 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-zinc-900/40 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-zinc-950 dark:text-white">Online Status</h4>
                    <p className="text-[11px] text-zinc-500">
                      Show green active dot when you are actively inside Viola
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPrivacy((prev) => ({ ...prev, onlineStatus: !prev.onlineStatus }))}
                    className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 cursor-pointer p-0.5 ${
                      privacy.onlineStatus ? 'bg-amber-500' : 'bg-zinc-300 dark:bg-zinc-700'
                    }`}
                    aria-label="Online Status"
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                        privacy.onlineStatus ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Read Receipts Toggle */}
                <div className="p-3.5 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-zinc-900/40 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-zinc-950 dark:text-white">Read Receipts</h4>
                    <p className="text-[11px] text-zinc-500">
                      Show double blue checkmarks when you open and read messages
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPrivacy((prev) => ({ ...prev, readReceipts: !prev.readReceipts }))}
                    className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 cursor-pointer p-0.5 ${
                      privacy.readReceipts ? 'bg-amber-500' : 'bg-zinc-300 dark:bg-zinc-700'
                    }`}
                    aria-label="Read Receipts"
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                        privacy.readReceipts ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Typing Indicator Toggle */}
                <div className="p-3.5 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-zinc-900/40 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-zinc-950 dark:text-white">Typing Indicators</h4>
                    <p className="text-[11px] text-zinc-500">
                      Broadcast "typing..." in active client conversations
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPrivacy((prev) => ({ ...prev, typingIndicator: !prev.typingIndicator }))}
                    className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 cursor-pointer p-0.5 ${
                      privacy.typingIndicator ? 'bg-amber-500' : 'bg-zinc-300 dark:bg-zinc-700'
                    }`}
                    aria-label="Typing Indicators"
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                        privacy.typingIndicator ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            NESTED SCREEN 7: ROLE & PERMISSIONS
        ========================================================================== */}
        {activeSubScreen === 'permissions' && (
          <div className="space-y-4">
            <div className="rounded-[28px] border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141819] p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3.5">
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400">
                    Staff Owner Matrix
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Full Studio Administrative Rights</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold">
                  CREATIVE DIRECTOR
                </span>
              </div>

              <div className="space-y-3 pt-1">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    Authorized Scope
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { label: 'Content Create & Edit', verified: true },
                      { label: 'Client Strategy & Directives', verified: true },
                      { label: 'Cloud UDrive Asset Upload', verified: true },
                      { label: 'Calendar Manage & Deadlines', verified: true },
                      { label: '4K Reel & Story Publishing', verified: true },
                      { label: 'Client Retainer Override', verified: true },
                      { label: 'Studio User Access Control', verified: true },
                      { label: 'Financial & Billing Scope', verified: true },
                    ].map((perm, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/60 dark:bg-zinc-900/40 flex items-center justify-between"
                      >
                        <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">{perm.label}</span>
                        <Check size={14} className="text-emerald-500" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Permissions are determined by the agency master node. Regular studio members cannot modify their own authorization tier.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            NESTED SCREEN 8: CACHE & OFFLINE STORAGE
        ========================================================================== */}
        {activeSubScreen === 'cache' && (
          <div className="space-y-4">
            <div className="rounded-[28px] border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141819] p-5 sm:p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400 mb-1">
                  Cache & Local Storage
                </h3>
                <p className="text-xs text-zinc-500">
                  Manage locally cached media files, offline conversation threads, and cloud UDrive buffers.
                </p>
              </div>

              {cacheToast && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-500 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>Local storage and offline media cache successfully cleared!</span>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">Offline SQLite Messages</span>
                  <span className="font-mono text-zinc-950 dark:text-white font-bold">
                    {cacheCleared ? '0 KB' : '1.2 MB'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">Downloaded 4K Production Media</span>
                  <span className="font-mono text-zinc-950 dark:text-white font-bold">
                    {cacheCleared ? '0 MB' : '48.5 MB'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">Cloud UDrive Chunk Buffers</span>
                  <span className="font-mono text-zinc-950 dark:text-white font-bold">
                    {cacheCleared ? '0 MB' : '12.0 MB'}
                  </span>
                </div>
                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs font-bold">
                  <span className="text-zinc-800 dark:text-zinc-200">Total Storage Consumed</span>
                  <span className="font-mono text-amber-500">
                    {cacheCleared ? '0 KB' : '61.7 MB'}
                  </span>
                </div>
              </div>

              <button
                onClick={handleClearCache}
                disabled={cacheCleared}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                  cacheCleared
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                    : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30'
                }`}
              >
                <Trash2 size={15} />
                <span>{cacheCleared ? 'Cache is Clean' : 'Clear Downloaded Cache'}</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            NESTED SCREEN 9: SAVED MESSAGES
        ========================================================================== */}
        {activeSubScreen === 'saved' && (
          <div className="space-y-4">
            <div className="rounded-[28px] border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141819] p-5 sm:p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400 mb-1">
                  Saved & Bookmarked Messages
                </h3>
                <p className="text-xs text-zinc-500">
                  Your private encrypted bookmarks from client channels and direct discussions.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-amber-500 font-mono text-[11px]">
                      Smart City Project · Ahmed
                    </span>
                    <span className="text-[10px] text-zinc-400">Sep 14</span>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    "Looks great! ✅ Let's move forward with billboard key art for 100M Road."
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-amber-500 font-mono text-[11px]">
                      Viola Chatting · Jomaa
                    </span>
                    <span className="text-[10px] text-zinc-400">Sep 12</span>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    "📌 Nmlie 4 Nali 4 Haji yaseen 3 Car wash 3 Ice cream 4 MHI 4 Smart 4 Cleanify 4"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            NESTED SCREEN 10: SCHEDULED DELIVERIES
        ========================================================================== */}
        {activeSubScreen === 'scheduled' && (
          <div className="space-y-4">
            <div className="rounded-[28px] border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141819] p-5 sm:p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400 mb-1">
                  Scheduled Automated Queue
                </h3>
                <p className="text-xs text-zinc-500">
                  Messages and client deliverables queued for automatic dispatch.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                      DISPATCH: SEP 22, 11:00 AM
                    </span>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white mt-1">
                      Smart City billboard lighting & print approval checklist
                    </h4>
                    <p className="text-[11px] text-zinc-500 font-mono">
                      Target Channel: #smart-city-direct
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSaveToast('Scheduled dispatch removed from queue');
                      setTimeout(() => setSaveToast(null), 2500);
                    }}
                    className="text-zinc-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Cancel scheduled dispatch"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            NESTED SCREEN 11: PEOPLE & ACCESS DESK
        ========================================================================== */}
        {activeSubScreen === 'people' && (
          <div className="space-y-4">
            <div className="rounded-[28px] border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141819] p-5 sm:p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400 mb-1">
                  People & Access Desk
                </h3>
                <p className="text-xs text-zinc-500">
                  Owner control plane: team members, assigned clients & feature permissions.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  { name: 'Jomaa Akreyi', role: 'Staff Lead', rights: 'Full Studio Rights', status: 'ACTIVE', color: 'emerald' },
                  { name: 'Ahmed (Smart City)', role: 'Key Client', rights: 'Client Partner · Assigned to Sarah', status: 'ASSIGNED', color: 'amber' },
                  { name: 'Sarah Jenkins', role: 'Video Lead', rights: 'Reel & 4K Upload Rights', status: 'ACTIVE', color: 'emerald' },
                  { name: 'Marcus Vance', role: 'Brand Strategist', rights: 'Strategy & Brief Authoring', status: 'ACTIVE', color: 'emerald' },
                ].map((member, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-bold text-xs text-zinc-900 dark:text-white block">{member.name}</span>
                      <span className="text-zinc-500 font-mono text-[10px]">{member.rights}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      member.color === 'emerald'
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                    }`}>
                      {member.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          EDIT PERSONAL INFORMATION POPUP MODAL ("OPEN THE BOX")
      ========================================================================== */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#141819] border border-zinc-200/80 dark:border-zinc-800/80 rounded-[28px] w-full max-w-lg p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Edit3 size={18} />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-base text-zinc-950 dark:text-white">
                    Edit Personal Information
                  </h3>
                  <p className="text-[11px] text-zinc-500">Update your agency credentials & public contact info</p>
                </div>
              </div>
              <button
                onClick={handleCancelEdit}
                className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Avatar Row */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={editForm.avatar}
                    alt={editForm.displayName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-zinc-800 shadow-sm"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center text-[10px] font-bold shadow-sm">
                    <Camera size={10} />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Profile Photo</h4>
                  <p className="text-[11px] text-zinc-500">Visible to team members & clients</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAvatarModal(true)}
                className="px-3 py-1.5 rounded-xl bg-zinc-200/70 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-colors"
              >
                Change Photo
              </button>
            </div>

            {/* Editable Form Inputs */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveProfile();
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  value={editForm.displayName}
                  onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl text-xs font-medium bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                  placeholder="Shahad (Lead Partner)"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-400">@</span>
                    <input
                      type="text"
                      required
                      value={editForm.username}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value.replace(/^@/, '') })}
                      className="w-full pl-8 pr-4 py-2.5 rounded-2xl text-xs font-mono font-medium bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                      placeholder="shahad"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.jobTitle}
                    onChange={(e) => setEditForm({ ...editForm, jobTitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs font-medium bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                    placeholder="Creative Director · Lead Partner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs font-medium bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                    placeholder="shahadobee@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs font-medium bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                    placeholder="+964 750 442 8891"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs active:scale-95 transition-all flex items-center gap-2 shadow-md shadow-amber-500/20"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} strokeWidth={2.5} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          CHANGE PROFILE PHOTO MODAL / SHEET
      ========================================================================== */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#141819] border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-sm p-5 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="font-display font-bold text-sm text-zinc-950 dark:text-white">
                Change Profile Photo
              </h3>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white p-1"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="w-full p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-bold flex items-center gap-3 transition-colors"
              >
                <Camera size={18} className="text-amber-500" />
                <span>Take Photo</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-bold flex items-center gap-3 transition-colors"
              >
                <Folder size={18} className="text-indigo-500" />
                <span>Choose From Library</span>
              </button>

              {/* Curated Presets */}
              <div className="pt-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-2 px-1">
                  Or choose a preset
                </span>
                <div className="flex items-center gap-2 justify-between">
                  {avatarPresets.map((presetUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectPresetAvatar(presetUrl)}
                      className="w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 hover:border-amber-500 transition-all hover:scale-105"
                    >
                      <img src={presetUrl} alt="Preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleRemovePhoto}
                className="w-full p-3.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/15 text-rose-500 text-xs font-bold flex items-center gap-3 transition-colors mt-2"
              >
                <Trash2 size={16} />
                <span>Remove Photo</span>
              </button>
            </div>

            <button
              onClick={() => setShowAvatarModal(false)}
              className="w-full py-2.5 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          LOGOUT CONFIRMATION MODAL
      ========================================================================== */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#141819] border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-sm p-6 space-y-4 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
              <LogOut size={22} />
            </div>

            <div>
              <h3 className="font-display font-extrabold text-base text-zinc-950 dark:text-white">
                Log out of Viola?
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                You will need to sign in again to access your workspace and client communication channels.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-bold text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  if (onLogout) {
                    onLogout();
                  } else {
                    setSaveToast('Signed out of Viola node session');
                    setTimeout(() => setSaveToast(null), 3000);
                  }
                }}
                className="py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-all"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
