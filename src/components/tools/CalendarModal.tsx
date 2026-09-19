import React, { useState, useMemo } from 'react';
import { CalendarEvent, CalendarContentType, CalendarTaskStatus } from '../../types';
import { VIOLA_CLIENTS, CURRENT_USER } from '../../data/mockData';
import { 
  ArrowLeft,
  X, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Check, 
  Clock, 
  Calendar as CalendarIcon,
  Play, 
  Layers, 
  FileText, 
  Copy, 
  CheckCircle2, 
  Trash2, 
  User, 
  Filter,
  Sparkles,
  AlertTriangle,
  Send,
  Video,
  ExternalLink
} from 'lucide-react';

interface CalendarModalProps {
  events: CalendarEvent[];
  onClose: () => void;
  onAddEvent: (newEvent: CalendarEvent) => void;
  onDeleteEvent: (eventId: string) => void;
}

// Current reference date: Saturday, September 19, 2026
const REFERENCE_TODAY = '2026-09-19';

const TEAM_MEMBERS = [
  { id: 'user_me', name: 'Shahad (Lead Partner)', role: 'Owner', avatar: CURRENT_USER.avatar },
  { id: 'u_sarah', name: 'Sarah Jenkins', role: 'Video Lead', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80' },
  { id: 'u_arman', name: 'armanezaat🎬', role: 'Senior Director', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120&q=80' },
  { id: 'u_elena', name: 'Elena Rostova', role: 'Lead Photographer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80' },
  { id: 'u_marcus', name: 'Marcus Vance', role: 'Brand Strategist', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80' },
  { id: 'u_jomaa', name: 'Jomaa Akreyi', role: 'Production Lead', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80' }
];

const CONTENT_TYPES: CalendarContentType[] = [
  'Post',
  'Reel',
  'Story',
  'Carousel',
  'Campaign',
  'Photography',
  'Video',
  'Design',
  'Other'
];

const STATUS_OPTIONS: CalendarTaskStatus[] = [
  'Planned',
  'In Progress',
  'Needs Review',
  'Approved',
  'Scheduled',
  'Published'
];

export const CalendarModal: React.FC<CalendarModalProps> = ({
  events,
  onClose,
  onAddEvent,
  onDeleteEvent,
}) => {
  // Navigation & Date State
  const [selectedDateStr, setSelectedDateStr] = useState<string>(REFERENCE_TODAY);
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [showMonthCalendar, setShowMonthCalendar] = useState<boolean>(false);
  const [monthViewDate, setMonthViewDate] = useState<Date>(new Date(2026, 8, 1)); // September 2026

  // Selection & Detail View
  const [selectedEventId, setSelectedEventId] = useState<string | null>('ev_bsmiley_1');
  const [activeDetailEvent, setActiveDetailEvent] = useState<CalendarEvent | null>(null);

  // Filters
  const [clientFilter, setClientFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false);

  // Add Task Modal State
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState<boolean>(false);
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  // Add Task Form Fields
  const [newClientName, setNewClientName] = useState<string>(VIOLA_CLIENTS[0].name);
  const [newContentType, setNewContentType] = useState<CalendarContentType>('Post');
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskDate, setNewTaskDate] = useState<string>(selectedDateStr);
  const [newTaskTime, setNewTaskTime] = useState<string>('10:00 AM');
  const [newTaskStatus, setNewTaskStatus] = useState<CalendarTaskStatus>('Planned');
  const [newTaskNote, setNewTaskNote] = useState<string>('');
  const [newTaskCaption, setNewTaskCaption] = useState<string>('');
  const [newAssignedName, setNewAssignedName] = useState<string>(TEAM_MEMBERS[0].name);
  const [newMediaPreview, setNewMediaPreview] = useState<string>('');

  // Toast / notification
  const [copiedCaption, setCopiedCaption] = useState<boolean>(false);

  // Calculate the 7 days for current week offset
  // Base reference Monday is September 14, 2026
  const weekDays = useMemo(() => {
    const baseMonday = new Date(2026, 8, 14); // 8 is September
    baseMonday.setDate(baseMonday.getDate() + weekOffset * 7);

    const days = [];
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    for (let i = 0; i < 7; i++) {
      const d = new Date(baseMonday);
      d.setDate(baseMonday.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      days.push({
        dayName: dayNames[i],
        dayNumber: d.getDate(),
        fullDateStr: dateStr,
        isToday: dateStr === REFERENCE_TODAY,
      });
    }
    return days;
  }, [weekOffset]);

  // Selected Date Display
  const parsedSelectedDate = useMemo(() => {
    const [y, m, d] = selectedDateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return {
      monthName: monthNames[dateObj.getMonth()],
      dayNumber: dateObj.getDate(),
      year: dateObj.getFullYear(),
      dayName: dayNames[dateObj.getDay()],
      formatted: `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`
    };
  }, [selectedDateStr]);

  const isSelectedDateToday = selectedDateStr === REFERENCE_TODAY;

  // Month grid calculation for the Month Calendar on the top of the section
  const monthGrid = useMemo(() => {
    const year = monthViewDate.getFullYear();
    const month = monthViewDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sun
    const startOffset = (firstDayIndex + 6) % 7; // Monday is 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: {
      dayNumber: number;
      isCurrentMonth: boolean;
      dateStr: string;
      hasEvents?: boolean;
      isSelected?: boolean;
      isToday?: boolean;
    }[] = [];

    // Previous month padding
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = startOffset - 1; i >= 0; i--) {
      cells.push({
        dayNumber: prevMonthDays - i,
        isCurrentMonth: false,
        dateStr: ''
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const monthStr = String(month + 1).padStart(2, '0');
      const dayStr = String(d).padStart(2, '0');
      const fullDateStr = `${year}-${monthStr}-${dayStr}`;
      const hasEvents = events.some(e => e.date === fullDateStr);
      cells.push({
        dayNumber: d,
        isCurrentMonth: true,
        dateStr: fullDateStr,
        hasEvents,
        isToday: fullDateStr === REFERENCE_TODAY,
        isSelected: fullDateStr === selectedDateStr
      });
    }

    // Remaining padding to complete 7-day rows
    const totalCells = Math.ceil(cells.length / 7) * 7;
    let nextDay = 1;
    while (cells.length < totalCells) {
      cells.push({
        dayNumber: nextDay++,
        isCurrentMonth: false,
        dateStr: ''
      });
    }

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return {
      title: `${monthNames[month]} ${year}`,
      cells
    };
  }, [monthViewDate, events, selectedDateStr]);

  const handleSelectDateFromCalendar = (dateStr: string) => {
    if (!dateStr) return;
    setSelectedDateStr(dateStr);
    
    // Sync weekOffset relative to reference Monday Sep 14, 2026
    const [y, m, d] = dateStr.split('-').map(Number);
    const target = new Date(y, m - 1, d);
    const baseMonday = new Date(2026, 8, 14);
    const diffDays = Math.floor((target.getTime() - baseMonday.getTime()) / (1000 * 60 * 60 * 24));
    setWeekOffset(Math.floor(diffDays / 7));
  };

  // Jump to Today
  const handleJumpToToday = () => {
    setSelectedDateStr(REFERENCE_TODAY);
    setWeekOffset(0);
    setMonthViewDate(new Date(2026, 8, 1));
  };

  // Back Button / Exit handling
  const handleRequestExit = () => {
    if (showAddModal && isFormDirty) {
      setShowDiscardConfirm(true);
    } else {
      onClose();
    }
  };

  const handleConfirmDiscard = () => {
    setIsFormDirty(false);
    setShowDiscardConfirm(false);
    setShowAddModal(false);
    resetForm();
  };

  const resetForm = () => {
    setNewTaskTitle('');
    setNewTaskNote('');
    setNewTaskCaption('');
    setNewMediaPreview('');
    setIsFormDirty(false);
  };

  // Open Add Task Modal
  const handleOpenAddModal = () => {
    setNewTaskDate(selectedDateStr);
    setShowAddModal(true);
  };

  // Submit New Task
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const matchedClient = VIOLA_CLIENTS.find(c => c.name === newClientName) || VIOLA_CLIENTS[0];
    const matchedMember = TEAM_MEMBERS.find(m => m.name === newAssignedName) || TEAM_MEMBERS[0];

    const newTask: CalendarEvent = {
      id: `ev_${Date.now()}`,
      title: newTaskTitle.trim(),
      clientName: matchedClient.name,
      type: newContentType.toLowerCase() as any,
      contentType: newContentType,
      status: newTaskStatus,
      date: newTaskDate,
      startTime: newTaskTime,
      endTime: newTaskTime,
      clientLogo: matchedClient.logo,
      clientColor: matchedClient.color,
      note: newTaskNote.trim() || undefined,
      caption: newTaskCaption.trim() || undefined,
      mediaPreview: newMediaPreview.trim() || undefined,
      assignedTo: {
        name: matchedMember.name,
        avatar: matchedMember.avatar,
        role: matchedMember.role
      }
    };

    onAddEvent(newTask);
    setSelectedEventId(newTask.id);
    resetForm();
    setShowAddModal(false);
  };

  // Tasks for selected date filtered
  const dayEvents = useMemo(() => {
    return events
      .filter((ev) => ev.date === selectedDateStr)
      .filter((ev) => {
        if (clientFilter !== 'all' && ev.clientName !== clientFilter) return false;
        if (typeFilter !== 'all' && (ev.contentType || ev.type) !== typeFilter) return false;
        if (statusFilter !== 'all' && ev.status !== statusFilter) return false;
        return true;
      })
      .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
  }, [events, selectedDateStr, clientFilter, typeFilter, statusFilter]);

  // Helper to find client info
  const getClientInfo = (clientName: string) => {
    return VIOLA_CLIENTS.find(c => c.name.toLowerCase() === clientName.toLowerCase()) || {
      name: clientName,
      logo: '',
      color: '#7026ED',
      industry: 'Agency Client'
    };
  };

  // Helper badge color for content types
  const getContentTypeBadge = (type?: string) => {
    switch ((type || '').toLowerCase()) {
      case 'reel':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/40';
      case 'post':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/40';
      case 'carousel':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/40';
      case 'story':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border-rose-200/60 dark:border-rose-800/40';
      case 'campaign':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/40';
      default:
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border-zinc-200/60 dark:border-zinc-700/60';
    }
  };

  // Helper for status badge
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'In Progress':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Approved':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Published':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'Needs Review':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      default:
        return 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20';
    }
  };

  // Copy caption utility
  const handleCopyCaption = (captionText?: string) => {
    if (!captionText) return;
    navigator.clipboard.writeText(captionText);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2200);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-0 sm:p-4 overflow-y-auto">
      {/* Mobile-first Viola Agency Container matching Reference Layout */}
      <div 
        id="viola_calendar_container"
        className="bg-white dark:bg-[#0E0D13] text-zinc-900 dark:text-zinc-100 w-full max-w-[440px] min-h-screen sm:min-h-[860px] sm:max-h-[92vh] sm:rounded-[36px] shadow-2xl overflow-hidden flex flex-col relative font-sans antialiased border border-zinc-200/90 dark:border-white/10"
      >
        
        {/* Top Header Section */}
        <header className="px-6 pt-5 pb-3 border-b border-zinc-100 dark:border-white/5 bg-white/80 dark:bg-[#0E0D13]/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center justify-between">
            {/* Back Arrow - User cannot get trapped */}
            <button
              id="calendar_back_button"
              onClick={handleRequestExit}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer active:scale-95"
              aria-label="Back to previous screen"
              title="Back"
            >
              <ArrowLeft size={22} strokeWidth={2.2} />
            </button>

            {/* Quick Actions (Today jump & Filters) */}
            <div className="flex items-center gap-1.5">
              {!isSelectedDateToday && (
                <button
                  onClick={handleJumpToToday}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-[#7026ED]/10 text-[#7026ED] dark:text-[#A78BFA] hover:bg-[#7026ED]/20 transition-all cursor-pointer active:scale-95 flex items-center gap-1"
                >
                  <Clock size={12} />
                  <span>Today</span>
                </button>
              )}

              <button
                onClick={() => setShowFilterDrawer(!showFilterDrawer)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  clientFilter !== 'all' || typeFilter !== 'all' || statusFilter !== 'all'
                    ? 'bg-[#7026ED] text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
                title="Filter tasks"
              >
                <Filter size={17} />
              </button>

              <button
                onClick={handleRequestExit}
                className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>
          </div>

          {/* Current Full Date & Large Heading "Today" matching layout reference */}
          <div className="mt-3 flex items-end justify-between">
            <div>
              {/* Clickable Date with Calendar Icon Toggle */}
              <button
                onClick={() => setShowMonthCalendar(!showMonthCalendar)}
                className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors group cursor-pointer"
                title="Toggle full month calendar"
              >
                <span className="text-[13.5px] font-medium tracking-normal">
                  {parsedSelectedDate.formatted}
                </span>
                <CalendarIcon 
                  size={14} 
                  className={`transition-colors ${
                    showMonthCalendar 
                      ? 'text-[#3B82F6] dark:text-[#60A5FA]' 
                      : 'text-zinc-400 group-hover:text-zinc-600'
                  }`} 
                />
              </button>

              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-1">
                {isSelectedDateToday ? 'Today' : parsedSelectedDate.dayName}
              </h1>
            </div>

            {/* Calendar button and week navigation arrows */}
            <div className="flex items-center gap-1 mb-1">
              <button
                onClick={() => setShowMonthCalendar(!showMonthCalendar)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors ${
                  showMonthCalendar
                    ? 'bg-[#3B82F6]/10 text-[#3B82F6] dark:text-[#60A5FA]'
                    : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
                title="Month Calendar"
              >
                <CalendarIcon size={13} />
                <span className="hidden sm:inline text-[11px]">Calendar</span>
              </button>
              <button
                onClick={() => setWeekOffset(prev => prev - 1)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title="Previous Week"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setWeekOffset(prev => prev + 1)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title="Next Week"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Full Month Calendar View on Top of Section (when toggled) */}
          {showMonthCalendar && (
            <div className="mt-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-[#14121B] border border-zinc-200/80 dark:border-white/10 shadow-sm animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-bold text-zinc-900 dark:text-white">
                  {monthGrid.title}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setMonthViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-zinc-500 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => setMonthViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-zinc-500 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Weekday labels */}
              <div className="grid grid-cols-7 text-center mb-1 text-[10px] font-bold text-zinc-400">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
                  <span key={d}>{d}</span>
                ))}
              </div>

              {/* Month dates grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {monthGrid.cells.map((cell, idx) => (
                  <button
                    key={idx}
                    disabled={!cell.isCurrentMonth}
                    onClick={() => {
                      if (cell.dateStr) {
                        handleSelectDateFromCalendar(cell.dateStr);
                      }
                    }}
                    className={`h-7 rounded-lg flex flex-col items-center justify-center transition-colors relative text-[11px] ${
                      !cell.isCurrentMonth
                        ? 'opacity-20 cursor-default'
                        : cell.isSelected
                        ? 'bg-[#3B82F6] text-white font-bold shadow-xs'
                        : cell.isToday
                        ? 'border border-[#3B82F6] text-[#3B82F6] font-bold hover:bg-[#3B82F6]/10'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 font-medium'
                    }`}
                  >
                    <span>{cell.dayNumber}</span>
                    {cell.hasEvents && !cell.isSelected && (
                      <span className="w-1 h-1 rounded-full bg-[#3B82F6] dark:bg-[#60A5FA] absolute bottom-0.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Horizontal Weekday & Date Selector matching uploaded image reference exactly */}
          <div className="grid grid-cols-7 gap-1 mt-4 pt-1">
            {weekDays.map((item) => {
              const isSelected = item.fullDateStr === selectedDateStr;
              return (
                <button
                  key={item.fullDateStr}
                  onClick={() => setSelectedDateStr(item.fullDateStr)}
                  className="flex flex-col items-center justify-center py-1 group cursor-pointer select-none transition-all active:scale-95"
                >
                  {/* Weekday name on top (Mon, Tue, Wed, Thu, Fri, Sat, Sun) */}
                  <span className={`text-[13px] transition-colors ${
                    isSelected 
                      ? 'text-[#3B82F6] dark:text-[#60A5FA] font-bold' 
                      : 'text-zinc-400 dark:text-zinc-500 font-medium group-hover:text-zinc-600 dark:group-hover:text-zinc-300'
                  }`}>
                    {item.dayName}
                  </span>
                  
                  {/* Naked day number beneath (4, 5, 6, 7, 8, 9, 10) */}
                  <span className={`text-[16px] font-bold mt-1.5 transition-colors ${
                    isSelected
                      ? 'text-[#3B82F6] dark:text-[#60A5FA]'
                      : 'text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'
                  }`}>
                    {item.dayNumber}
                  </span>

                  {/* Single accent dot directly under the selected day number */}
                  <div className="h-2 mt-1 flex items-center justify-center">
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] dark:bg-[#60A5FA]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Compact Filter Drawer */}
          {showFilterDrawer && (
            <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-white/5 space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-500 dark:text-zinc-400">Filters</span>
                {(clientFilter !== 'all' || typeFilter !== 'all' || statusFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setClientFilter('all');
                      setTypeFilter('all');
                      setStatusFilter('all');
                    }}
                    className="text-[11px] text-[#7026ED] dark:text-[#A78BFA] hover:underline"
                  >
                    Reset all
                  </button>
                )}
              </div>

              {/* Client pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
                <button
                  onClick={() => setClientFilter('all')}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                    clientFilter === 'all'
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
                  }`}
                >
                  All Clients
                </button>
                {VIOLA_CLIENTS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setClientFilter(c.name)}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                      clientFilter === c.name
                        ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              {/* Content Type pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
                <button
                  onClick={() => setTypeFilter('all')}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                    typeFilter === 'all'
                      ? 'bg-[#7026ED] text-white font-bold'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                  }`}
                >
                  All Types
                </button>
                {CONTENT_TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                      typeFilter === t
                        ? 'bg-[#7026ED] text-white font-bold'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Scrollable Timeline Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-28 space-y-6 no-scrollbar relative">
          
          {dayEvents.length === 0 ? (
            /* Clean Empty State */
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center text-zinc-400">
                <Clock size={28} />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
                  No scheduled tasks for this date
                </h3>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-[240px]">
                  All client content is up-to-date. Tap the button below to add a new content release.
                </p>
              </div>
              <button
                onClick={handleOpenAddModal}
                className="mt-2 px-4 py-2 rounded-xl bg-[#7026ED] text-white text-xs font-bold hover:bg-[#5E1ECD] transition-all shadow-md active:scale-95"
              >
                + Schedule Content
              </button>
            </div>
          ) : (
            /* Timeline Container matching Reference Image */
            <div className="relative pl-7 space-y-6">
              
              {/* Vertical Timeline Guide Line on the left */}
              <div className="absolute left-[9px] top-4 bottom-4 w-0.5 bg-zinc-200 dark:bg-zinc-800" />

              {dayEvents.map((task) => {
                const isSelected = selectedEventId === task.id;
                const client = getClientInfo(task.clientName);
                const displayLogo = task.clientLogo || client.logo;

                return (
                  <div key={task.id} className="relative flex items-start gap-4 group">
                    
                    {/* Circular Timeline Node on the vertical rail (Reference image: ○ or ◎) */}
                    <div 
                      className={`absolute -left-7 top-4 z-10 w-5 h-5 rounded-full flex items-center justify-center transition-all bg-white dark:bg-[#0E0D13] ${
                        isSelected 
                          ? 'text-[#7026ED] dark:text-[#A78BFA]' 
                          : 'text-zinc-400 dark:text-zinc-600'
                      }`}
                    >
                      {isSelected ? (
                        /* Selected Active Concentric Node ◎ */
                        <div className="w-5 h-5 rounded-full border-2 border-[#7026ED] dark:border-[#A78BFA] flex items-center justify-center bg-white dark:bg-[#0E0D13]">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#7026ED] dark:bg-[#A78BFA]" />
                        </div>
                      ) : (
                        /* Standard Node ○ */
                        <div className="w-4 h-4 rounded-full border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#0E0D13]" />
                      )}
                    </div>

                    {/* Calendar Task Card */}
                    <div
                      onClick={() => {
                        setSelectedEventId(task.id);
                        setActiveDetailEvent(task);
                      }}
                      className={`flex-1 rounded-[22px] p-4 transition-all cursor-pointer border shadow-sm ${
                        isSelected
                          ? 'bg-[#F9F7FE] dark:bg-[#1A1528] border-[#7026ED]/50 dark:border-[#8B5CF6]/50 shadow-md shadow-[#7026ED]/10 ring-1 ring-[#7026ED]/30'
                          : 'bg-white dark:bg-[#16141F] border-zinc-200/70 dark:border-white/5 hover:border-zinc-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      {/* Top Row: Client Logo, Client Name, and Scheduled Time */}
                      <div className="flex items-center justify-between gap-2">
                        
                        {/* Client Identity with Logo as in uploaded reference drawing */}
                        <div className="flex items-center gap-2.5 min-w-0">
                          {displayLogo ? (
                            <img
                              src={displayLogo}
                              alt={task.clientName}
                              className="w-7 h-7 rounded-lg object-cover border border-zinc-200/80 dark:border-white/10 shrink-0"
                            />
                          ) : (
                            <div 
                              className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[11px] text-white shrink-0 shadow-xs"
                              style={{ backgroundColor: client.color || '#7026ED' }}
                            >
                              {task.clientName.charAt(0)}
                            </div>
                          )}

                          <span className="text-[13px] font-bold text-zinc-900 dark:text-white truncate">
                            {task.clientName}
                          </span>
                        </div>

                        {/* Scheduled Time on the Right Side */}
                        <span className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 shrink-0">
                          {task.startTime || '9:00 AM'}
                        </span>
                      </div>

                      {/* Content Type & Status Badges */}
                      <div className="flex items-center gap-2 mt-2.5">
                        <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border ${getContentTypeBadge(task.contentType || task.type)}`}>
                          {task.contentType || (task.type === 'meeting' ? 'SYNC' : 'DELIVERY')}
                        </span>

                        {task.status && (
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${getStatusBadge(task.status)}`}>
                            {task.status}
                          </span>
                        )}
                      </div>

                      {/* Task / Content Title */}
                      <h4 className="text-[14.5px] font-bold text-zinc-900 dark:text-white tracking-tight mt-1.5 line-clamp-1">
                        {task.title}
                      </h4>

                      {/* Short preview of content or note */}
                      {(task.note || task.description || task.caption) && (
                        <p className="text-[12px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                          {task.note || task.description || task.caption}
                        </p>
                      )}

                      {/* Media preview tag or slides indicator */}
                      {task.mediaCount && task.mediaCount > 1 && (
                        <div className="mt-2.5 flex items-center gap-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                          <Layers size={13} />
                          <span>Carousel • {task.mediaCount} slides</span>
                        </div>
                      )}

                      {/* Card Footer: Assigned Member & Media icon */}
                      {task.assignedTo && (
                        <div className="mt-3 pt-2.5 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <img
                              src={task.assignedTo.avatar}
                              alt={task.assignedTo.name}
                              className="w-5 h-5 rounded-full object-cover border border-white dark:border-zinc-800"
                            />
                            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-[150px]">
                              {task.assignedTo.name}
                            </span>
                          </div>

                          {task.mediaPreview && (
                            <span className="text-[11px] font-medium text-[#7026ED] dark:text-[#A78BFA] flex items-center gap-1">
                              Preview attached
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Floating Add Task Button near the bottom right */}
        <div className="absolute bottom-6 right-6 z-30">
          <button
            id="calendar_fab_add_task"
            onClick={handleOpenAddModal}
            aria-label="Add new calendar task"
            title="Add New Calendar Task"
            className="w-14 h-14 rounded-full bg-[#7026ED] hover:bg-[#5E1ECD] text-white flex items-center justify-center shadow-xl shadow-[#7026ED]/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Plus size={26} strokeWidth={2.6} />
          </button>
        </div>

        {/* ============================================================ */}
        {/* TASK DETAIL VIEW SHEET (Card Click Details) */}
        {/* ============================================================ */}
        {activeDetailEvent && (
          <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-xs flex flex-col justify-end">
            <div className="bg-white dark:bg-[#14121B] rounded-t-[32px] max-h-[85%] overflow-y-auto border-t border-zinc-200 dark:border-white/10 p-6 space-y-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
              
              {/* Header with Close */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {activeDetailEvent.clientLogo ? (
                    <img
                      src={activeDetailEvent.clientLogo}
                      alt={activeDetailEvent.clientName}
                      className="w-9 h-9 rounded-xl object-cover border border-zinc-200 dark:border-white/10"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-xl bg-[#7026ED] text-white flex items-center justify-center font-bold">
                      {activeDetailEvent.clientName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                      {activeDetailEvent.clientName}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {activeDetailEvent.date} • {activeDetailEvent.startTime}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveDetailEvent(null)}
                  className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border ${getContentTypeBadge(activeDetailEvent.contentType || activeDetailEvent.type)}`}>
                  {activeDetailEvent.contentType || activeDetailEvent.type}
                </span>

                {/* Status Dropdown / Badge */}
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${getStatusBadge(activeDetailEvent.status)}`}>
                  {activeDetailEvent.status || 'Planned'}
                </span>
              </div>

              {/* Task Title */}
              <div>
                <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white">
                  {activeDetailEvent.title}
                </h2>
              </div>

              {/* Content Preview (Artwork, Reel, Carousel) */}
              {activeDetailEvent.mediaPreview && (
                <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 relative group">
                  <img
                    src={activeDetailEvent.mediaPreview}
                    alt="Content Artwork Preview"
                    className="w-full h-48 object-cover"
                  />
                  {activeDetailEvent.contentType === 'Reel' && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-[#7026ED] flex items-center justify-center shadow-lg">
                        <Play size={22} className="ml-1 fill-[#7026ED]" />
                      </div>
                    </div>
                  )}
                  {activeDetailEvent.mediaCount && (
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/70 text-white text-[11px] font-bold backdrop-blur-md">
                      {activeDetailEvent.mediaCount} slides
                    </span>
                  )}
                </div>
              )}

              {/* Creative Brief / Notes */}
              {activeDetailEvent.note && (
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-100 dark:border-white/5 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Production Notes
                  </span>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {activeDetailEvent.note}
                  </p>
                </div>
              )}

              {/* Caption Section with 1-Click Copy */}
              {activeDetailEvent.caption && (
                <div className="p-4 rounded-2xl bg-purple-500/5 dark:bg-[#7026ED]/10 border border-[#7026ED]/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7026ED] dark:text-[#A78BFA]">
                      Social Caption
                    </span>
                    <button
                      onClick={() => handleCopyCaption(activeDetailEvent.caption)}
                      className="text-xs font-bold text-[#7026ED] dark:text-[#A78BFA] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCaption ? <Check size={13} /> : <Copy size={13} />}
                      <span>{copiedCaption ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans whitespace-pre-line">
                    {activeDetailEvent.caption}
                  </p>
                </div>
              )}

              {/* Assigned Team Member */}
              {activeDetailEvent.assignedTo && (
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeDetailEvent.assignedTo.avatar}
                      alt={activeDetailEvent.assignedTo.name}
                      className="w-10 h-10 rounded-full object-cover border border-white dark:border-zinc-800"
                    />
                    <div>
                      <span className="text-[11px] text-zinc-400">Assigned Lead</span>
                      <p className="text-xs font-bold text-zinc-900 dark:text-white">
                        {activeDetailEvent.assignedTo.name}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium">
                    {activeDetailEvent.assignedTo.role || 'Partner'}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => {
                    onDeleteEvent(activeDetailEvent.id);
                    setActiveDetailEvent(null);
                  }}
                  className="p-3 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                  title="Delete task"
                >
                  <Trash2 size={16} />
                </button>

                <button
                  onClick={() => setActiveDetailEvent(null)}
                  className="flex-1 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs hover:opacity-90 transition-opacity"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ADD CALENDAR TASK MODAL */}
        {/* ============================================================ */}
        {showAddModal && (
          <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col justify-end sm:items-center sm:justify-center p-0 sm:p-4">
            <div className="bg-white dark:bg-[#15131C] w-full max-w-[420px] rounded-t-[32px] sm:rounded-[28px] max-h-[90vh] overflow-y-auto border border-zinc-200 dark:border-white/10 p-6 space-y-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#7026ED]/10 text-[#7026ED] flex items-center justify-center">
                    <Plus size={18} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white">
                    Add Calendar Task
                  </h3>
                </div>

                <button
                  onClick={() => {
                    if (isFormDirty) {
                      setShowDiscardConfirm(true);
                    } else {
                      setShowAddModal(false);
                    }
                  }}
                  className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
                
                {/* Client Picker */}
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-600 dark:text-zinc-400">
                    Client
                  </label>
                  <select
                    value={newClientName}
                    onChange={(e) => {
                      setNewClientName(e.target.value);
                      setIsFormDirty(true);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#7026ED]"
                  >
                    {VIOLA_CLIENTS.map((client) => (
                      <option key={client.id} value={client.name}>
                        {client.name} ({client.industry})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Content Type Picker Pills */}
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-600 dark:text-zinc-400">
                    Content Type
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {CONTENT_TYPES.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => {
                          setNewContentType(type);
                          setIsFormDirty(true);
                        }}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                          newContentType === type
                            ? 'bg-[#7026ED] text-white shadow-xs'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Task Name */}
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-600 dark:text-zinc-400">
                    Task Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Summer Product Reel"
                    value={newTaskTitle}
                    onChange={(e) => {
                      setNewTaskTitle(e.target.value);
                      setIsFormDirty(true);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#7026ED]"
                  />
                </div>

                {/* Date and Time Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-600 dark:text-zinc-400">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newTaskDate}
                      onChange={(e) => {
                        setNewTaskDate(e.target.value);
                        setIsFormDirty(true);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#7026ED]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-600 dark:text-zinc-400">
                      Time
                    </label>
                    <input
                      type="text"
                      placeholder="10:30 AM"
                      value={newTaskTime}
                      onChange={(e) => {
                        setNewTaskTime(e.target.value);
                        setIsFormDirty(true);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#7026ED]"
                    />
                  </div>
                </div>

                {/* Status & Assigned To Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-600 dark:text-zinc-400">
                      Status
                    </label>
                    <select
                      value={newTaskStatus}
                      onChange={(e) => {
                        setNewTaskStatus(e.target.value as CalendarTaskStatus);
                        setIsFormDirty(true);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#7026ED]"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-600 dark:text-zinc-400">
                      Assigned To
                    </label>
                    <select
                      value={newAssignedName}
                      onChange={(e) => {
                        setNewAssignedName(e.target.value);
                        setIsFormDirty(true);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#7026ED]"
                    >
                      {TEAM_MEMBERS.map((member) => (
                        <option key={member.id} value={member.name}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Production Notes / Brief */}
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-600 dark:text-zinc-400">
                    Production Note / Brief
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Key visual focus, props, location..."
                    value={newTaskNote}
                    onChange={(e) => {
                      setNewTaskNote(e.target.value);
                      setIsFormDirty(true);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#7026ED]"
                  />
                </div>

                {/* Social Caption */}
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-600 dark:text-zinc-400">
                    Social Caption (optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Write caption and hashtags..."
                    value={newTaskCaption}
                    onChange={(e) => {
                      setNewTaskCaption(e.target.value);
                      setIsFormDirty(true);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#7026ED]"
                  />
                </div>

                {/* Media Image URL */}
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-600 dark:text-zinc-400">
                    Media / Artwork URL (optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newMediaPreview}
                    onChange={(e) => {
                      setNewMediaPreview(e.target.value);
                      setIsFormDirty(true);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#7026ED]"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#7026ED] hover:bg-[#5E1ECD] text-white font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* DISCARD CHANGES CONFIRMATION DIALOG */}
        {/* ============================================================ */}
        {showDiscardConfirm && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-6">
            <div className="bg-white dark:bg-[#181520] rounded-2xl max-w-[320px] w-full p-5 border border-zinc-200 dark:border-white/10 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150 text-center">
              <div className="w-11 h-11 rounded-full bg-amber-500/10 text-amber-600 mx-auto flex items-center justify-center">
                <AlertTriangle size={22} />
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                  Discard changes?
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Your unsaved changes will be lost.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() => setShowDiscardConfirm(false)}
                  className="py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Stay
                </button>

                <button
                  onClick={handleConfirmDiscard}
                  className="py-2.5 rounded-xl bg-rose-600 text-xs font-bold text-white hover:bg-rose-700 transition-colors shadow-sm"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
