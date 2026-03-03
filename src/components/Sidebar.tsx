import React, { useState } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Home,
  AlertCircle
} from 'lucide-react';
import { Ticket } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  tickets: Ticket[];
  activeTicketId: string | null;
  onSelectTicket: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onHome: () => void;
}

export default function Sidebar({ 
  tickets, 
  activeTicketId, 
  onSelectTicket, 
  isOpen, 
  onToggle, 
  onHome 
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'All' | 'New' | 'In Progress' | 'Pending'>('All');

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'All' || t.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'P1': return '#dc2626';
      case 'P2': return '#c2410c';
      case 'P3': return '#b45309';
      default: return '#15803d';
    }
  };

  const getPriorityBadgeClass = (p: string) => {
    switch(p) {
      case 'P1': return 'bg-[#fef2f2] text-[#dc2626] border-[#fee2e2]';
      case 'P2': return 'bg-[#fff7ed] text-[#c2410c] border-[#ffedd5]';
      case 'P3': return 'bg-[#fffbeb] text-[#b45309] border-[#fef3c7]';
      default: return 'bg-[#f0fdf4] text-[#15803d] border-[#dcfce7]';
    }
  };

  const getStatusBadgeClass = (s: string) => {
    switch(s) {
      case 'New': return 'bg-[#eff4ff] text-[#2563eb]';
      case 'In Progress': return 'bg-[#f0fdf4] text-[#16a34a]';
      case 'Pending': return 'bg-[#fffbeb] text-[#d97706]';
      case 'Open': return 'bg-[#f5f3ff] text-[#7c3aed]';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isOpen ? 240 : 72 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white rounded-[10px] card-shadow flex flex-col overflow-hidden flex-shrink-0 z-40"
    >
      {/* Sidebar Header */}
      <div className="flex flex-col p-2 gap-2 border-b border-[#f0f2f5]">
        <div className={`flex items-center ${isOpen ? 'justify-end' : 'justify-center'}`}>
          <button 
            onClick={onToggle}
            className="w-9 h-9 flex items-center justify-center rounded-md text-[#4b5563] hover:bg-[#f0f2f5] transition-colors"
          >
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 overflow-hidden"
            >
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
                <input 
                  className="w-full bg-[#f8f9fa] border border-[#e4e7ec] rounded-md py-1.5 pl-8 pr-3 text-[11px] focus:outline-none focus:border-[#2563eb] transition-colors"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1">
                {['All', 'New', 'In Progress', 'Pending'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-2 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-colors border
                      ${filter === f 
                        ? 'bg-[#2563eb] text-white border-[#2563eb]' 
                        : 'bg-white text-[#64748b] border-[#e4e7ec] hover:border-[#cbd5e1]'}
                    `}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between px-1 pt-1">
                <span className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider">My Queue</span>
                <span className="text-[10px] font-bold text-[#9ca3af]">{filteredTickets.length}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ticket List */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-1.5 space-y-1">
        {filteredTickets.map(t => {
          const isActive = activeTicketId === t.id;
          const ticketNum = t.id.split('-')[1] || t.id.split('_')[1] || t.id;
          
          return (
            <div 
              key={t.id}
              onClick={() => onSelectTicket(t.id)}
              className={`relative rounded-md cursor-pointer transition-all overflow-hidden
                ${isActive 
                  ? 'bg-[#eff4ff] text-[#2563eb] border-l-[2px] border-l-[#2563eb]' 
                  : 'hover:bg-[#f8f9fa] text-[#4b5563] border-l-[2px] border-l-transparent'}
                ${isOpen ? 'p-3' : 'h-[36px] flex items-center px-3'}
              `}
            >
              {isOpen ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold ${isActive ? 'text-[#2563eb]' : 'text-[#2563eb]'}`}>
                      {t.id}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${getPriorityBadgeClass(t.priority)}`}>
                        {t.priority}
                      </span>
                      <span className="text-[10px] text-[#9ca3af]">{t.time}</span>
                    </div>
                  </div>
                  <div className="text-[12px] font-medium text-[#111827] line-clamp-1 leading-tight">
                    {t.title}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${getStatusBadgeClass(t.status)}`}>
                      {t.status}
                    </span>
                    {t.slaRed && (
                      <div className="flex items-center gap-1 text-[9px] text-[#dc2626] font-bold">
                        <AlertCircle size={10} />
                        SLA Overdue
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[12px] font-semibold ${isActive ? 'text-[#2563eb]' : 'text-[#374151]'}`}>
                    {ticketNum}
                  </span>
                  <div 
                    className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                    style={{ backgroundColor: getPriorityColor(t.priority) }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.aside>
  );
}
