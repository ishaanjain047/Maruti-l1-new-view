import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings,
  LogOut,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavRailProps {
  activeView: 'dashboard' | 'tickets';
  onViewChange: (view: 'dashboard' | 'tickets') => void;
}

export default function NavRail({ activeView, onViewChange }: NavRailProps) {
  const [showProfile, setShowProfile] = useState(false);
  const [isAway, setIsAway] = useState(false);

  const NavIcon = ({ icon: Icon, active, onClick, tooltip }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
      timeoutRef.current = setTimeout(() => {
        setIsHovered(true);
      }, 200);
    };

    const handleMouseLeave = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsHovered(false);
    };

    return (
      <div className="relative flex items-center">
        <button 
          onClick={onClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`w-9 h-9 flex items-center justify-center rounded-md transition-all ${
            active 
              ? 'bg-[#2563eb]/25 text-[#93c5fd]' 
              : 'text-[#9ca3af] hover:bg-white/5 hover:text-white'
          }`}
        >
          <Icon size={17} />
        </button>

        <AnimatePresence>
          {isHovered && tooltip && (
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              className="fixed left-[60px] z-[9999] pointer-events-none"
            >
              <div className="relative bg-[#1e293b] text-[#f8fafc] text-[12px] font-medium px-[9px] py-[5px] rounded-[6px] whitespace-nowrap shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
                {tooltip}
                {/* Arrow */}
                <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[4px] border-r-[#1e293b]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <aside className="w-[52px] h-screen bg-[#18202f] flex flex-col items-center pb-3 flex-shrink-0 z-50">
      {/* Top Section */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* MS Logo - Flush at top */}
        <div className="w-full h-[52px] bg-[#2563eb] flex items-center justify-center text-white font-extrabold text-[15px] mb-1">
          MS
        </div>
        
        <NavIcon 
          icon={LayoutDashboard} 
          active={activeView === 'dashboard'} 
          onClick={() => onViewChange('dashboard')}
          tooltip="Dashboard"
        />
        <NavIcon 
          icon={ClipboardList} 
          active={activeView === 'tickets'} 
          onClick={() => onViewChange('tickets')}
          tooltip="My Tickets"
        />
        <NavIcon icon={Users} tooltip="Contacts" />
        <NavIcon icon={BookOpen} tooltip="Knowledge Base" />
        <NavIcon icon={BarChart3} tooltip="Analytics" />
      </div>

      {/* Bottom Section */}
      <div className="mt-auto flex flex-col items-center gap-3 w-full relative">
        <NavIcon icon={Settings} tooltip="Settings" />
        
        {/* Profile Avatar */}
        <div className="relative group">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            onMouseEnter={() => {
              // We could add a tooltip here too if needed, but the prompt says "Agent avatar circle (bottom) → Profile & Status"
            }}
            className="w-7 h-7 rounded-full bg-[#16a34a] flex items-center justify-center text-white text-[10px] font-bold hover:brightness-110 transition-all"
          >
            AK
          </button>
          
          {/* Tooltip for Avatar */}
          <div className="absolute left-[40px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[9999] delay-200">
             <div className="relative bg-[#1e293b] text-[#f8fafc] text-[12px] font-medium px-[9px] py-[5px] rounded-[6px] whitespace-nowrap shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
                Profile & Status
                <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[4px] border-r-[#1e293b]" />
              </div>
          </div>

          {isAway && (
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#d97706] border-2 border-[#18202f] rounded-full" />
          )}

          {/* Profile Popover */}
          <AnimatePresence>
            {showProfile && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: 10 }}
                className="absolute bottom-0 left-10 w-48 bg-white rounded-lg shadow-xl border border-[#e5e7eb] overflow-hidden"
              >
                <div className="p-3 border-b border-[#f0f2f5] flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#16a34a] flex items-center justify-center text-white text-[11px] font-bold">
                    AK
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-[#111827]">Ankit Kumar</span>
                    <span className="text-[10px] text-[#9ca3af]">L1 Agent</span>
                  </div>
                </div>
                
                <div className="p-2">
                  <div className="flex items-center justify-between px-2 py-1.5">
                    <span className="text-[12px] text-[#4b5563]">Away mode</span>
                    <button 
                      onClick={() => setIsAway(!isAway)}
                      className={`w-8 h-4 rounded-full transition-colors relative ${isAway ? 'bg-[#d97706]' : 'bg-[#e5e7eb]'}`}
                    >
                      <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isAway ? 'left-4.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                  
                  <div className="h-px bg-[#f0f2f5] my-1" />
                  
                  <button className="w-full flex items-center gap-2 px-2 py-1.5 text-[12px] text-[#4b5563] hover:bg-[#f8f9fa] rounded transition-colors">
                    <Settings size={14} />
                    Settings
                  </button>
                  <button className="w-full flex items-center gap-2 px-2 py-1.5 text-[12px] text-[#dc2626] hover:bg-[#fef2f2] rounded transition-colors">
                    <LogOut size={14} />
                    Log out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
}
