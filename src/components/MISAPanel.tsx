import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle, 
  FileText, 
  ExternalLink, 
  ArrowRight,
  Send,
  Zap
} from 'lucide-react';

interface MISAPanelProps {
  onClose: () => void;
}

export default function MISAPanel({ onClose }: MISAPanelProps) {
  const [message, setMessage] = useState('');

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="h-[48px] border-b border-[#f0f2f5] flex items-center justify-between px-4 flex-shrink-0 bg-[#f5f3ff]">
        <div className="flex items-center gap-2 text-[#7c3aed]">
          <Zap size={16} fill="currentColor" />
          <h2 className="text-[14px] font-bold">MISA AI Assistant</h2>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 text-[#9ca3af] hover:text-[#4b5563] hover:bg-black/5 rounded-md transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
        {/* AI Insights */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Sparkles size={14} className="text-[#7c3aed]" />
            <span className="text-[11px] font-bold text-[#9ca3af] uppercase tracking-wider">AI Insights</span>
          </div>
          <div className="p-4 bg-[#f5f3ff] border border-[#ede9fe] rounded-xl space-y-3 card-shadow">
            <p className="text-[13px] text-[#4c1d95] font-medium leading-relaxed">
              Based on the error logs, this is likely a memory leak in the SAP PP module v7.4 patch. I recommend checking the SMGW locks.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-bold px-2 py-1 bg-white text-[#7c3aed] rounded-full border border-[#ede9fe]">Sentiment: Frustrated</span>
              <span className="text-[10px] font-bold px-2 py-1 bg-white text-[#7c3aed] rounded-full border border-[#ede9fe]">Urgency: High</span>
            </div>
          </div>
        </section>

        {/* Suggested Actions */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <CheckCircle size={14} className="text-[#10b981]" />
            <span className="text-[11px] font-bold text-[#9ca3af] uppercase tracking-wider">Suggested Actions</span>
          </div>
          <div className="space-y-2">
            <ActionButton 
              title="Escalate to L2 SAP Basis" 
              icon={<ArrowRight size={14} />} 
              color="text-[#7c3aed] bg-[#f5f3ff]"
            />
            <ActionButton 
              title="Draft AI Response" 
              icon={<FileText size={14} />} 
              color="text-[#2563eb] bg-[#eff6ff]"
            />
          </div>
        </section>

        {/* Knowledge Base */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <FileText size={14} className="text-[#64748b]" />
            <span className="text-[11px] font-bold text-[#9ca3af] uppercase tracking-wider">Knowledge Base</span>
          </div>
          <div className="space-y-2">
            <KBItem title="SAP Memory Allocation Failure Fix" match="92%" />
            <KBItem title="Common SAP Login Issues" match="85%" />
          </div>
        </section>
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-[#f0f2f5] bg-white">
        <div className="relative">
          <input 
            type="text"
            className="w-full pl-4 pr-10 py-2.5 bg-[#f8f9fa] border border-[#e4e7ec] rounded-full text-[13px] focus:outline-none focus:border-[#7c3aed] transition-colors"
            placeholder="Ask MISA anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#7c3aed] hover:bg-[#ede9fe] rounded-full transition-colors">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ title, icon, color }: { title: string, icon: any, color: string }) {
  return (
    <button className="w-full flex items-center justify-between p-3 bg-white border border-[#e4e7ec] rounded-xl hover:border-[#7c3aed] hover:shadow-sm transition-all text-left group">
      <span className="text-[13px] font-bold text-[#111827] group-hover:text-[#7c3aed]">{title}</span>
      <div className={`p-1.5 rounded-lg ${color}`}>
        {icon}
      </div>
    </button>
  );
}

function KBItem({ title, match }: { title: string, match: string }) {
  return (
    <div className="p-3 bg-white border border-[#e4e7ec] rounded-xl hover:border-[#2563eb] hover:shadow-sm transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-1">
        <span className="text-[13px] font-bold text-[#111827] group-hover:text-[#2563eb] line-clamp-1">{title}</span>
        <ExternalLink size={12} className="text-[#9ca3af] flex-shrink-0" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold text-[#10b981]">{match} Match</span>
        <span className="text-[10px] text-[#9ca3af]">Updated 2 days ago</span>
      </div>
    </div>
  );
}
