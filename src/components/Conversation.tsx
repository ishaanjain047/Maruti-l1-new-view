import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreHorizontal, 
  Clock, 
  MessageSquare, 
  GitBranch, 
  FileText,
  X,
  Zap,
  ChevronDown,
  Bold,
  Italic,
  List,
  Link2
} from 'lucide-react';
import { Ticket, Message } from '../data';
import Journey from './Journey';
import Summary from './Summary';
import { motion, AnimatePresence } from 'motion/react';
import { RightPanelMode } from '../App';

interface ConversationProps {
  ticket: Ticket;
  rightPanelMode: RightPanelMode;
  onOpenThreads: () => void;
  onOpenMISA: () => void;
  onCloseTicket: () => void;
}

export default function Conversation({ 
  ticket, 
  rightPanelMode,
  onOpenThreads, 
  onOpenMISA, 
  onCloseTicket 
}: ConversationProps) {
  const [activeTab, setActiveTab] = useState<'conversation' | 'journey' | 'summary'>('conversation');
  const [replyMode, setReplyMode] = useState<'reply' | 'note'>('reply');
  const [message, setMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeTab]);

  const getPriorityBadgeClass = (p: string) => {
    switch(p) {
      case 'P1': return 'bg-[#fef2f2] text-[#dc2626] border-[#fee2e2]';
      case 'P2': return 'bg-[#fff7ed] text-[#c2410c] border-[#ffedd5]';
      case 'P3': return 'bg-[#fffbeb] text-[#b45309] border-[#fef3c7]';
      default: return 'bg-[#f0fdf4] text-[#15803d] border-[#dcfce7]';
    }
  };

  const isThreadsOpen = rightPanelMode === 'threads';
  const isMISAOpen = rightPanelMode === 'misa';

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Ticket Header Strip */}
      <div className="h-[48px] border-b border-[#f0f2f5] flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[13px] font-bold text-[#2563eb] flex-shrink-0">{ticket.id}</span>
          <span className={`px-1.5 py-0.5 rounded border text-[10px] font-bold flex-shrink-0 ${getPriorityBadgeClass(ticket.priority)}`}>
            {ticket.priority}
          </span>
          <h2 className="text-[14px] font-bold text-[#111827] truncate">
            {ticket.title}
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#fef2f2] rounded-md border border-[#fee2e2] mr-2">
            <Clock size={12} className="text-[#dc2626]" />
            <span className="text-[11px] font-bold text-[#dc2626]">12m left</span>
          </div>
          
          <button 
            onClick={onOpenThreads}
            className={`flex items-center gap-2 px-[9px] py-[5px] h-[32px] text-[12px] font-semibold rounded-[6px] transition-all border ${
              isThreadsOpen 
                ? 'bg-[#dbeafe] border-[#93c5fd] text-[#1d4ed8]' 
                : 'bg-[#eff6ff] border-[#bfdbfe] text-[#2563eb] hover:bg-[#dbeafe] hover:border-[#93c5fd]'
            }`}
          >
            <MessageSquare size={14} className={isThreadsOpen ? 'text-[#1d4ed8]' : 'text-[#2563eb]'} />
            Threads
            <div className={`w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold ${
              isThreadsOpen ? 'bg-[#1d4ed8] text-white' : 'bg-[#2563eb] text-white'
            }`}>
              2
            </div>
          </button>
          
          <button 
            onClick={onOpenMISA}
            className={`flex items-center gap-2 px-[9px] py-[5px] h-[32px] text-[12px] font-semibold rounded-[6px] transition-all border ${
              isMISAOpen 
                ? 'bg-[#dbeafe] border-[#93c5fd] text-[#1d4ed8]' 
                : 'bg-[#eff6ff] border-[#bfdbfe] text-[#2563eb] hover:bg-[#dbeafe] hover:border-[#93c5fd]'
            }`}
          >
            <Zap size={14} className={isMISAOpen ? 'text-[#1d4ed8]' : 'text-[#2563eb]'} />
            MISA
          </button>

          <button 
            onClick={onCloseTicket}
            className="p-1.5 text-[#9ca3af] hover:text-[#4b5563] hover:bg-[#f0f2f5] rounded-md transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="h-[40px] border-b border-[#f0f2f5] flex items-center px-4 gap-6 flex-shrink-0">
        <Tab 
          label="Conversation & Response" 
          active={activeTab === 'conversation'} 
          onClick={() => setActiveTab('conversation')} 
          icon={MessageSquare}
        />
        <Tab 
          label="Ticket Journey" 
          active={activeTab === 'journey'} 
          onClick={() => setActiveTab('journey')} 
          icon={GitBranch}
        />
        <Tab 
          label="Summary" 
          active={activeTab === 'summary'} 
          onClick={() => setActiveTab('summary')} 
          icon={FileText}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activeTab === 'conversation' && (
            <motion.div 
              key="conversation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col"
            >
              {/* Messages Area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
                {ticket.messages?.map((msg, idx) => (
                  <div key={idx}>
                    <MessageBubble message={msg} />
                  </div>
                ))}
              </div>

              {/* Composer Area */}
              <div className="p-4 border-t border-[#f0f2f5] bg-white">
                <div className="border border-[#e4e7ec] rounded-lg overflow-hidden focus-within:border-[#2563eb] transition-colors">
                  {/* Composer Header */}
                  <div className="flex items-center justify-between px-3 py-2 bg-[#f8f9fa] border-b border-[#f0f2f5]">
                    <div className="flex gap-1">
                      <button 
                        onClick={() => setReplyMode('reply')}
                        className={`px-3 py-1 text-[11px] font-bold rounded transition-colors ${replyMode === 'reply' ? 'bg-white text-[#2563eb] shadow-sm' : 'text-[#64748b] hover:text-[#111827]'}`}
                      >
                        Reply
                      </button>
                      <button 
                        onClick={() => setReplyMode('note')}
                        className={`px-3 py-1 text-[11px] font-bold rounded transition-colors ${replyMode === 'note' ? 'bg-[#fffbeb] text-[#d97706] shadow-sm' : 'text-[#64748b] hover:text-[#111827]'}`}
                      >
                        Internal Note
                      </button>
                    </div>
                    <div className="flex items-center gap-3 text-[#9ca3af]">
                      <Bold size={14} className="cursor-pointer hover:text-[#4b5563]" />
                      <Italic size={14} className="cursor-pointer hover:text-[#4b5563]" />
                      <List size={14} className="cursor-pointer hover:text-[#4b5563]" />
                      <Link2 size={14} className="cursor-pointer hover:text-[#4b5563]" />
                    </div>
                  </div>

                  {/* Textarea */}
                  <textarea 
                    className={`w-full p-3 text-[13px] focus:outline-none min-h-[80px] resize-none ${replyMode === 'note' ? 'bg-[#fffdf5]' : 'bg-white'}`}
                    placeholder={replyMode === 'reply' ? "Type your response..." : "Type internal note..."}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  {/* Composer Footer */}
                  <div className="flex items-center justify-between px-3 py-2 bg-[#f8f9fa] border-t border-[#f0f2f5]">
                    <div className="flex items-center gap-3 text-[#64748b]">
                      <button className="p-1 hover:bg-black/5 rounded transition-colors"><Paperclip size={16} /></button>
                      <button className="p-1 hover:bg-black/5 rounded transition-colors"><Smile size={16} /></button>
                      <button className="p-1 hover:bg-black/5 rounded transition-colors"><MoreHorizontal size={16} /></button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-bold text-[#4b5563] hover:bg-black/5 rounded transition-colors">
                        Drafts
                        <ChevronDown size={14} />
                      </button>
                      <button className={`flex items-center gap-2 px-4 py-1.5 rounded text-[12px] font-bold text-white transition-all ${replyMode === 'reply' ? 'bg-[#2563eb] hover:bg-[#1d4ed8]' : 'bg-[#d97706] hover:bg-[#b45309]'}`}>
                        {replyMode === 'reply' ? 'Send' : 'Add Note'}
                        <Send size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'journey' && (
            <motion.div 
              key="journey"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute inset-0 overflow-y-auto no-scrollbar"
            >
              <Journey />
            </motion.div>
          )}

          {activeTab === 'summary' && (
            <motion.div 
              key="summary"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute inset-0 overflow-y-auto no-scrollbar"
            >
              <Summary />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Tab({ label, active, onClick, icon: Icon }: { label: string, active: boolean, onClick: () => void, icon: any }) {
  return (
    <button 
      onClick={onClick}
      className={`h-full flex items-center gap-2 px-1 border-b-2 transition-all text-[12px] font-bold ${active ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-[#64748b] hover:text-[#111827]'}`}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}

function MessageBubble({ message }: { message: any }) {
  const isUser = message.type === 'user';
  const isAgent = message.type === 'agent';
  const isAI = message.type === 'ai';
  const isSystem = message.type === 'system';
  const isNote = message.type === 'note';

  if (isSystem) {
    return (
      <div className="flex items-center gap-3 py-2">
        <div className="flex-1 h-px bg-[#f0f2f5]" />
        <span className="text-[11px] font-bold text-[#9ca3af] uppercase tracking-wider">{message.text}</span>
        <div className="flex-1 h-px bg-[#f0f2f5]" />
      </div>
    );
  }

  if (isNote) {
    return (
      <div className="bg-[#fffbeb] border-y border-[#fde68a] -mx-5 px-5 py-3 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-wider">Internal Note · {message.time}</span>
          <span className="text-[11px] font-bold text-[#d97706]">{message.sender}</span>
        </div>
        <p className="text-[13px] text-[#92400e] leading-relaxed italic">
          {message.text}
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}>
      <div className="flex items-center gap-2 px-1">
        {!isUser && (
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${isAI ? 'bg-[#7c3aed]' : 'bg-[#16a34a]'}`}>
            {isAI ? 'AI' : 'AK'}
          </div>
        )}
        <span className="text-[11px] font-bold text-[#64748b]">
          {message.sender} · {message.time}
        </span>
        {isUser && (
          <div className="w-5 h-5 rounded-full bg-[#2563eb] flex items-center justify-center text-[9px] font-bold text-white">
            {message.sender.split(' ').map((n: any) => n[0]).join('')}
          </div>
        )}
      </div>
      <div className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] leading-relaxed card-shadow
        ${isUser ? 'bg-[#eff4ff] text-[#1e40af] rounded-tr-none' : ''}
        ${isAgent ? 'bg-white text-[#111827] border border-[#f0f2f5] rounded-tl-none' : ''}
        ${isAI ? 'bg-[#f5f3ff] text-[#5b21b6] border border-[#ede9fe] rounded-tl-none' : ''}
      `}>
        {message.text}
      </div>
    </div>
  );
}
