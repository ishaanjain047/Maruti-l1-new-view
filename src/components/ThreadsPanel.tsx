import React, { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  Send, 
  Paperclip, 
  Smile,
  Plus,
  MoreHorizontal
} from 'lucide-react';

interface ThreadsPanelProps {
  onClose: () => void;
}

export default function ThreadsPanel({ onClose }: ThreadsPanelProps) {
  const [selectedThread, setSelectedThread] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const threads = [
    {
      id: 1,
      title: 'SAP Basis Team',
      lastMessage: 'Checking server logs now...',
      time: '11:15 am',
      unread: 1,
      participants: ['AS', 'VM'],
      messages: [
        { sender: 'Vikram Malhotra', text: "I've checked the application server logs. There's a recurring memory allocation error in the PP module.", time: '11:12 am', type: 'other' },
        { sender: 'Amit Sharma', text: "Checking server logs now... I'll see if I can find the specific process ID causing the leak.", time: '11:15 am', type: 'me' }
      ]
    },
    {
      id: 2,
      title: 'Network Operations',
      lastMessage: 'No issues found on Line 3 switch.',
      time: '10:55 am',
      unread: 0,
      participants: ['RK', 'JD'],
      messages: []
    }
  ];

  const activeThread = threads.find(t => t.id === selectedThread);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="h-[48px] border-b border-[#f0f2f5] flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          {selectedThread && (
            <button 
              onClick={() => setSelectedThread(null)}
              className="p-1 hover:bg-[#f0f2f5] rounded-md text-[#64748b]"
            >
              <ChevronLeft size={16} />
            </button>
          )}
          <h2 className="text-[14px] font-bold text-[#111827]">
            {selectedThread ? activeThread?.title : 'Threads'}
          </h2>
        </div>
        <div className="flex items-center gap-1">
          {!selectedThread && (
            <button className="p-1.5 text-[#2563eb] hover:bg-[#eff6ff] rounded-md transition-colors">
              <Plus size={18} />
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1.5 text-[#9ca3af] hover:text-[#4b5563] hover:bg-[#f0f2f5] rounded-md transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {!selectedThread ? (
          <div className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar">
            {threads.map(thread => (
              <button
                key={thread.id}
                onClick={() => setSelectedThread(thread.id)}
                className="w-full flex items-start gap-3 p-3 hover:bg-[#f8f9fa] rounded-lg transition-colors text-left group"
              >
                <div className="flex -space-x-2 flex-shrink-0">
                  {thread.participants.map((p, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[#e4e7ec] flex items-center justify-center text-[9px] font-bold text-[#4b5563]">
                      {p}
                    </div>
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[12px] font-bold text-[#111827] truncate">{thread.title}</span>
                    <span className="text-[10px] text-[#9ca3af]">{thread.time}</span>
                  </div>
                  <p className="text-[11px] text-[#64748b] truncate">{thread.lastMessage}</p>
                </div>
                {thread.unread > 0 && (
                  <div className="w-2 h-2 rounded-full bg-[#2563eb] mt-1.5 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-5 no-scrollbar">
              {activeThread?.messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.type === 'me' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0 ${msg.type === 'me' ? 'bg-[#2563eb]' : 'bg-[#16a34a]'}`}>
                    {msg.sender.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={`flex flex-col gap-1 max-w-[85%] ${msg.type === 'me' ? 'items-end' : ''}`}>
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-[11px] font-bold text-[#111827]">{msg.sender}</span>
                      <span className="text-[10px] text-[#9ca3af]">{msg.time}</span>
                    </div>
                    <div className={`p-3 rounded-xl text-[12px] leading-relaxed card-shadow
                      ${msg.type === 'me' ? 'bg-[#eff4ff] text-[#1e40af] rounded-tr-none' : 'bg-[#f8f9fa] text-[#111827] rounded-tl-none'}
                    `}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Thread Input */}
            <div className="p-4 border-t border-[#f0f2f5] bg-white">
              <div className="border border-[#e4e7ec] rounded-lg overflow-hidden focus-within:border-[#2563eb] transition-colors">
                <textarea 
                  className="w-full p-3 text-[12px] focus:outline-none min-h-[60px] resize-none"
                  placeholder="Reply to thread..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="flex items-center justify-between px-3 py-2 bg-[#f8f9fa] border-t border-[#f0f2f5]">
                  <div className="flex items-center gap-2 text-[#64748b]">
                    <button className="p-1 hover:bg-black/5 rounded transition-colors"><Paperclip size={14} /></button>
                    <button className="p-1 hover:bg-black/5 rounded transition-colors"><Smile size={14} /></button>
                    <button className="p-1 hover:bg-black/5 rounded transition-colors"><MoreHorizontal size={14} /></button>
                  </div>
                  <button className="bg-[#2563eb] text-white p-1.5 rounded-md hover:bg-[#1d4ed8] transition-colors shadow-sm">
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
