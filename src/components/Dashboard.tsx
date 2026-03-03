import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  List, 
  User, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  RefreshCw,
  ExternalLink,
  X
} from 'lucide-react';
import { tickets, Ticket } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardProps {
  onTicketSelect: (id: string) => void;
}

export default function Dashboard({ onTicketSelect }: DashboardProps) {
  const [showViews, setShowViews] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const kpis = [
    { label: 'My Open Tickets', value: 12, icon: User, color: '#2563eb' },
    { label: 'Breached Today', value: 3, icon: AlertTriangle, color: '#dc2626' },
    { label: 'Unassigned', value: 5, icon: Clock, color: '#c2410c' },
    { label: 'Pending Customer', value: 8, icon: CheckCircle2, color: '#16a34a' },
  ];

  const getPriorityBadge = (p: string) => {
    const styles: any = {
      P1: 'bg-[#fef2f2] text-[#dc2626] border-[#fee2e2]',
      P2: 'bg-[#fff7ed] text-[#c2410c] border-[#ffedd5]',
      P3: 'bg-[#fffbeb] text-[#b45309] border-[#fef3c7]',
      P4: 'bg-[#f0fdf4] text-[#15803d] border-[#dcfce7]',
    };
    return styles[p] || styles.P4;
  };

  const getStatusBadge = (s: string) => {
    const styles: any = {
      'New': 'bg-[#eff4ff] text-[#2563eb]',
      'In Progress': 'bg-[#f0fdf4] text-[#16a34a]',
      'Pending': 'bg-[#fffbeb] text-[#d97706]',
      'Open': 'bg-[#f5f3ff] text-[#7c3aed]',
      'Resolved': 'bg-gray-100 text-gray-600',
    };
    return styles[s] || styles.Open;
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-full relative overflow-hidden">
      {/* Sub-header Row */}
      <div className="h-[48px] border-b border-[#f0f2f5] flex items-center justify-between px-4 flex-shrink-0 bg-white">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowViews(!showViews)}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors ${showViews ? 'bg-[#f0f2f5] text-[#2563eb]' : 'text-[#4b5563] hover:bg-[#f0f2f5]'}`}
          >
            <List size={18} />
            <span className="text-[13px] font-bold">Views</span>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-[16px] font-bold text-[#111827]">My Tickets</h1>
            <span className="px-2 py-0.5 bg-[#f0f2f5] text-[#6b7280] text-[11px] font-bold rounded-full">9 Total</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
            <input 
              className="w-[260px] bg-[#f8f9fa] border border-[#e5e7eb] rounded-md py-1.5 pl-8 pr-3 text-[12px] focus:outline-none focus:border-[#2563eb] transition-colors"
              placeholder="Search dashboard..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 px-3 py-1.5 border border-[#e5e7eb] rounded-md text-[12px] font-bold text-[#4b5563] hover:bg-[#f8f9fa] transition-colors"
          >
            <SlidersHorizontal size={14} />
            Filter
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Views Sidebar */}
        <AnimatePresence mode="wait">
          {showViews && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="border-right border-[#e5e7eb] bg-white flex flex-col overflow-hidden"
            >
              <div className="p-4 flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#9ca3af] uppercase tracking-wider">Views</span>
                <div className="flex items-center gap-2">
                  <button className="p-1 text-[#9ca3af] hover:text-[#4b5563] transition-colors"><Plus size={14} /></button>
                  <button className="p-1 text-[#9ca3af] hover:text-[#4b5563] transition-colors"><RefreshCw size={14} /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
                <ViewItem label="Your unsolved tickets" count={1} active />
                <ViewItem label="Unassigned tickets" count={0} />
                <ViewItem label="All unsolved tickets" count={1} />
                <ViewItem label="Recently updated tickets" count={1} />
                <ViewItem label="Pending tickets" count={0} />
                <ViewItem label="Recently solved tickets" count={0} />
                
                <div className="h-px bg-[#f0f2f5] my-2" />
                
                <ViewItem label="Suspended tickets" count={0} />
                <ViewItem label="Deleted tickets" count={0} />
                
                <button className="w-full flex items-center justify-between px-3 py-2 text-[12px] text-[#2563eb] font-medium hover:bg-[#eff6ff] rounded-md transition-colors mt-2">
                  <span className="flex items-center gap-2">Manage views <ExternalLink size={12} /></span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white no-scrollbar">
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-3">
            {kpis.map((kpi, i) => (
              <div key={i} className="bg-white border border-[#e5e7eb] rounded-[10px] p-4 card-shadow relative overflow-hidden group hover:border-[#2563eb]/30 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: kpi.color }} />
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">{kpi.label}</span>
                  <kpi.icon size={16} style={{ color: kpi.color }} className="opacity-80" />
                </div>
                <div className="text-[32px] font-extrabold text-[#111827]">{kpi.value}</div>
              </div>
            ))}
          </div>

          {/* Tickets Table */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-[14px] font-bold text-[#111827]">My Tickets</h2>
              <span className="px-2 py-0.5 bg-[#f0f2f5] text-[#6b7280] text-[10px] font-bold rounded-full">9</span>
            </div>

            <div className="border border-[#e5e7eb] rounded-[10px] overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8f9fa] border-b border-[#e5e7eb]">
                    <th className="px-4 py-3 text-[11px] font-bold text-[#9ca3af] uppercase tracking-wider w-[90px]">Priority</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-[#9ca3af] uppercase tracking-wider w-[100px]">Ticket ID</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-[#9ca3af] uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-[#9ca3af] uppercase tracking-wider w-[120px]">Status</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-[#9ca3af] uppercase tracking-wider w-[100px]">SLA</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-[#9ca3af] uppercase tracking-wider w-[150px]">Assignee</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((t) => (
                    <tr 
                      key={t.id}
                      onClick={() => onTicketSelect(t.id)}
                      className="group border-b border-[#f0f2f5] hover:bg-[#f7f8fa] cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${getPriorityBadge(t.priority)}`}>
                          {t.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[13px] font-bold text-[#2563eb]">{t.id}</td>
                      <td className="px-4 py-3 text-[13px] font-bold text-[#111827]">{t.title}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(t.status)}`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[12px] font-bold ${t.slaRed ? 'text-[#dc2626]' : 'text-[#4b5563]'}`}>
                          {t.slaRed ? t.sla : '4 hrs'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#f0f2f5] flex items-center justify-center text-[10px] font-bold text-[#64748b]">
                            {t.assignee.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-[12px] text-[#4b5563]">{t.assignee}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Drawer */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="absolute inset-0 bg-black/30 z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-[380px] h-full bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-4 border-b border-[#e5e7eb] flex items-center justify-between">
                <h2 className="text-[18px] font-bold text-[#111827]">Filter</h2>
                <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-[#f0f2f5] rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
                <FilterField label="Tags" placeholder="Search tags..." />
                <FilterField label="Ticket status" placeholder="Select status..." />
                <FilterField label="Subject" placeholder="Enter subject..." isInput />
                <FilterField label="Requester" placeholder="Select requester..." />
                <FilterField label="Request date" placeholder="Any" />
                <FilterField label="Type" placeholder="Any" />
                <FilterField label="Priority" placeholder="Any" />
                <FilterField label="Category" placeholder="Any" />
              </div>

              <div className="p-4 border-t border-[#e5e7eb] flex gap-3">
                <button 
                  onClick={() => setShowFilters(false)}
                  className="flex-1 py-2.5 border border-[#e5e7eb] rounded-md text-[13px] font-bold text-[#4b5563] hover:bg-[#f8f9fa] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="flex-[2] py-2.5 bg-[#2563eb] text-white rounded-md text-[13px] font-bold hover:bg-[#1d4ed8] transition-colors"
                >
                  Apply filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function ViewItem({ label, count, active }: { label: string, count: number, active?: boolean }) {
  return (
    <button className={`w-full flex items-center justify-between px-3 py-2 text-[12px] rounded-md transition-colors ${active ? 'bg-[#eff6ff] text-[#2563eb] font-bold' : 'text-[#4b5563] hover:bg-[#f8f9fa]'}`}>
      <span className="truncate">{label}</span>
      <span className={`text-[10px] font-bold ${active ? 'text-[#2563eb]' : 'text-[#9ca3af]'}`}>{count}</span>
    </button>
  );
}

function FilterField({ label, placeholder, isInput }: { label: string, placeholder: string, isInput?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">{label}</label>
      {isInput ? (
        <input 
          className="w-full border border-[#e5e7eb] rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-[#2563eb] transition-colors"
          placeholder={placeholder}
        />
      ) : (
        <div className="w-full border border-[#e5e7eb] rounded-md px-3 py-2 text-[13px] text-[#9ca3af] flex items-center justify-between cursor-pointer hover:border-[#cbd5e1] transition-colors">
          {placeholder}
          <div className="w-4 h-4 flex items-center justify-center">
            <Plus size={12} />
          </div>
        </div>
      )}
    </div>
  );
}
