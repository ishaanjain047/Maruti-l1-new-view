import React from 'react';
import { X } from 'lucide-react';
import { tickets } from '../data';

interface TabStripProps {
  activeTicketId: string | null;
  openTabs: string[];
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
}

export default function TabStrip({ 
  activeTicketId, 
  openTabs, 
  onSelectTab, 
  onCloseTab
}: TabStripProps) {
  return (
    <div className="h-[52px] bg-[#18202f] flex items-center px-2 gap-0.5 flex-shrink-0 z-40">
      {openTabs.map((id) => {
        const ticket = tickets.find(t => t.id === id);
        if (!ticket) return null;
        const isActive = activeTicketId === id;
        
        return (
          <div 
            key={id}
            onClick={() => onSelectTab(id)}
            className={`group relative flex items-center h-[36px] min-w-[120px] max-w-[180px] px-3 rounded-md cursor-pointer transition-all ${
              isActive 
                ? 'bg-[#f4f6f9] text-[#111827]' 
                : 'bg-transparent text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0 ${
              ticket.priority === 'P1' ? 'bg-[#dc2626]' :
              ticket.priority === 'P2' ? 'bg-[#c2410c]' :
              ticket.priority === 'P3' ? 'bg-[#b45309]' : 'bg-[#15803d]'
            }`} />
            <span className="text-[11px] font-bold truncate mr-4">
              {id} {ticket.title}
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(id);
              }}
              className={`absolute right-2 p-0.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-black/10 transition-all ${
                isActive ? 'text-[#4b5563]' : 'text-white/60'
              }`}
            >
              <X size={12} />
            </button>
            
            {/* Tab Separator */}
            {!isActive && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-4 bg-white/10" />
            )}
          </div>
        );
      })}
    </div>
  );
}
