import React, { useState } from 'react';
import { INITIAL_CONTACTS } from '../../data/mockData';
import { Search, Plus, MessageCircle, Contact, ShieldCheck, Check } from 'lucide-react';

interface ContactsViewProps {
  onStartChat: (userId: string, name: string) => void;
}

export const ContactsView: React.FC<ContactsViewProps> = ({ onStartChat }) => {
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newRole, setNewRole] = useState('Client Partner');

  const filtered = contacts.filter((c) =>
    c.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDisplayName.trim()) return;

    const newContact = {
      id: `c_${Date.now()}`,
      displayName: newDisplayName.trim(),
      username: newUsername.trim() || newDisplayName.toLowerCase().replace(/\s+/g, '_'),
      role: newRole,
      isOnline: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      bio: 'Verified partner',
    };

    setContacts([newContact, ...contacts]);
    setNewDisplayName('');
    setNewUsername('');
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-[#0A0A0B] overflow-y-auto pb-28">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-5 pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5 text-indigo-500 mb-1">
              <ShieldCheck size={14} />
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
                OWNER-APPROVED DIRECTORY
              </span>
            </div>
            <h2 className="font-display font-black text-2xl tracking-tight text-zinc-950 dark:text-white">
              Contacts & Personnel
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
              Verified clients, studio production leads, and executive strategists.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition-transform active:scale-95"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>Add</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search approved people by name or @handle..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-[#141819] text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="px-4 sm:px-6 py-4 max-w-2xl mx-auto w-full space-y-2.5">
        {filtered.map((person) => (
          <div
            key={person.id}
            className="p-3.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-[#141819] flex items-center justify-between gap-3 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={person.avatar}
                  alt={person.displayName}
                  className="w-11 h-11 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-700"
                />
                {person.isOnline && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#141819]" />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-display font-bold text-sm text-zinc-950 dark:text-white truncate">
                    {person.displayName}
                  </h4>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                    {person.role}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-zinc-500 truncate">
                  @{person.username} · {person.isOnline ? 'Online now' : 'Offline'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onStartChat(person.id, person.displayName)}
              className="p-2.5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
            >
              <MessageCircle size={15} />
              <span className="hidden sm:inline">Message</span>
            </button>
          </div>
        ))}
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddSubmit}
            className="bg-[#141819] border border-zinc-800 rounded-3xl w-full max-w-sm p-5 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-display font-bold text-sm text-white">Add Connection</h4>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                Full Display Name
              </label>
              <input
                type="text"
                required
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
                placeholder="e.g. Darian Akreyi"
                className="w-full p-2.5 rounded-xl bg-[#0A0A0B] border border-zinc-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                Username Handle
              </label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="e.g. darian_akreyi"
                className="w-full p-2.5 rounded-xl bg-[#0A0A0B] border border-zinc-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                Role Classification
              </label>
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="e.g. Brand Executive"
                className="w-full p-2.5 rounded-xl bg-[#0A0A0B] border border-zinc-800 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg"
            >
              Verify & Add Contact
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
