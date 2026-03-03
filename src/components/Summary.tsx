import React from 'react';
import { AlertCircle, Activity, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';

export default function Summary() {
  return (
    <div className="flex h-full bg-white overflow-hidden">
      <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
        
        {/* AI Summary Box */}
        <div className="bg-[#f5f3ff] border border-[#ddd6fe] border-l-4 border-l-[#7c3aed] rounded-[10px] p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#7c3aed] shadow-sm">
              <Sparkles size={14} fill="currentColor" />
            </div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#7c3aed]">AI Generated Summary</span>
          </div>
          <p className="text-[13px] text-[#4c1d95] leading-relaxed font-medium">
            User reported SAP production planning module crashing on Line 3 at Gurgaon plant. Batch scheduler fails to open every time it's launched. AI Agent identified possible memory leak in SAP PP v7.4. L1 has attempted standard restart — issue persists. Production line currently halted, business impact is critical.
          </p>
        </div>

        {/* 3 Col Grid */}
        <div className="grid grid-cols-3 gap-4">
          <Card title="User Sentiment">
            <div className="flex items-center gap-2 text-[#dc2626] font-bold text-[14px] mb-2">
              <AlertTriangle size={16} />
              Frustrated
            </div>
            <p className="text-[12px] text-[#64748b] leading-relaxed">
              Detected from 3 escalating messages. Urgency language: "the line is halted", "please hurry".
            </p>
          </Card>

          <Card title="Business Impact">
            <div className="flex items-center gap-2 text-[#b45309] font-bold text-[14px] mb-2">
              <AlertCircle size={16} />
              Critical
            </div>
            <p className="text-[12px] text-[#64748b] leading-relaxed">
              Production line halted. Estimated impact: 200+ workers, Line 3 output at 0% for 38 min.
            </p>
          </Card>

          <Card title="AI Classification">
            <div className="space-y-2">
              <Row label="Category" value="Application" />
              <Row label="Type" value="Incident" />
              <Row label="Root Cause" value="Memory Leak" color="text-[#dc2626]" />
              <Row label="CSAT Score" value="4.2 / 5" color="text-[#b45309]" />
            </div>
          </Card>
        </div>

        {/* Related Tickets */}
        <div className="bg-white border border-[#e4e7ec] rounded-[10px] p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-[11px] font-bold tracking-wider uppercase text-[#9ca3af]">
            <Activity size={14} className="text-[#2563eb]" />
            Related Tickets
          </div>
          <div className="space-y-0 divide-y divide-[#f0f2f5]">
            <RelatedItem id="INC-4498" title="SAP crash — similar plant issue" status="In Progress" />
            <RelatedItem id="INC-4412" title="Batch scheduler failure — Plant 2" status="Resolved" />
            <RelatedItem id="INC-4387" title="Memory leak SAP PP v7.4 — Manesar" status="Resolved" />
          </div>
        </div>

      </div>
    </div>
  );
}

function Card({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#e4e7ec] rounded-[10px] p-4 shadow-sm">
      <div className="text-[10px] font-bold tracking-wider uppercase text-[#9ca3af] mb-2">{title}</div>
      {children}
    </div>
  );
}

function Row({ label, value, color = 'text-[#111827]' }: { label: string, value: string, color?: string }) {
  return (
    <div className="flex justify-between items-center text-[12px] border-b border-[#f8f9fa] pb-1 last:border-0">
      <span className="text-[10px] uppercase tracking-wider text-[#9ca3af] font-bold">{label}</span>
      <span className={`font-bold ${color}`}>{value}</span>
    </div>
  );
}

function RelatedItem({ id, title, status }: { id: string, title: string, status: string }) {
  const isResolved = status === 'Resolved';
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="text-[12px] font-bold text-[#2563eb]">{id}</div>
        <div className="text-[11px] text-[#64748b] mt-0.5">{title}</div>
      </div>
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide
        ${isResolved ? 'bg-[#f0fdf4] text-[#15803d]' : 'bg-[#fffbeb] text-[#b45309]'}
      `}>
        {status}
      </span>
    </div>
  );
}
