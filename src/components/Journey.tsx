import React from 'react';
import { AlertTriangle, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function Journey() {
  return (
    <div className="flex h-full bg-white overflow-hidden">
      <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
        
        {/* Breach Card */}
        <div className="bg-white border border-[#fee2e2] rounded-[10px] p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} className="text-[#dc2626]" />
            <span className="text-[11px] font-bold text-[#dc2626] uppercase tracking-wider">Breach Attribution</span>
            <span className="ml-2 px-2 py-0.5 bg-[#fef2f2] text-[#dc2626] border border-[#fee2e2] rounded text-[10px] font-bold">
              SLA breached by 4h 20m
            </span>
          </div>

          {/* Gantt Chart Implementation */}
          <div className="relative mb-4">
            {/* Axis */}
            <div className="flex pl-[130px] mb-2 text-[9px] font-bold text-[#9ca3af] uppercase tracking-wider">
              <div className="flex-1">09:00</div>
              <div className="flex-1">13:00</div>
              <div className="flex-1 text-[#2563eb] font-bold">20 Feb</div>
              <div className="flex-1">06:00</div>
              <div className="flex-1">13:00</div>
              <div className="flex-1">17:10</div>
            </div>

            {/* Rows */}
            <div className="space-y-2 relative">
              {/* Vertical Lines */}
              <div className="absolute top-0 bottom-0 left-[130px] w-px bg-[#f0f2f5]" />
              <div className="absolute top-0 bottom-0 left-[45%] w-0 border-l-2 border-dashed border-[#dbeafe] z-0" />
              <div className="absolute top-0 bottom-0 left-[82%] w-0.5 bg-[#dc2626] z-10" />

              <GanttRow label="AI Agent" sub="Auto-classify" start="0%" width="5%" status="ok" time="5 min" />
              <GanttRow label="Priya Mehta" sub="L1 Support" start="2.5%" width="9.5%" status="ok" time="55 min" />
              <GanttRow label="Vikram Singh" sub="L2 Specialist" start="12%" width="13%" status="ok" time="1h 25m" />
              <GanttRow label="Infosys Network" sub="Vendor 1 — Infra" start="23%" width="62%" status="fail" time="6h 10m" />
              <GanttRow label="TCS Infra" sub="Vendor 2 — Storage" start="82%" width="8%" status="ok" time="48 min" />
            </div>
          </div>

          <div className="mt-4 p-3 bg-[#fef2f2] border border-[#fee2e2] rounded-lg text-[12px] text-[#4b5563] leading-relaxed flex gap-2 items-start">
            <AlertCircle size={14} className="text-[#dc2626] mt-0.5 flex-shrink-0" />
            <div>
              SLA breach attributed to <strong className="text-[#111827]">Infosys Network</strong> — exceeded vendor OLA on response time (+1h 10m) and resolution time (+2h 10m). Internal teams (L1, L2) performed within OLA.
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative pl-4 space-y-8 before:absolute before:left-[29px] before:top-4 before:bottom-4 before:w-px before:bg-[#f0f2f5]">
          <TimelineItem 
            icon={<AlertCircle size={14} />} 
            color="blue"
            date="19 Feb 2026 · 09:10"
            title="Ticket created via AI Agent"
            desc="Rajesh Kumar reported SAP batch scheduler crash on Production Line 3"
            tag="End User"
            tagColor="blue"
          />
          <TimelineItem 
            icon={<CheckCircle size={14} />} 
            color="violet"
            date="19 Feb 2026 · 09:12"
            title="Auto-classified & prioritised"
            desc="Category: Application · Priority: P1 · Root cause: Memory Leak"
            tag="AI Agent"
            tagColor="violet"
          />
          <TimelineItem 
            icon={<Clock size={14} />} 
            color="amber"
            date="19 Feb 2026 · 09:15"
            title="L1 OLA timer started"
            desc="L1 must respond within 30 min · resolve within 1 hr"
            tag="L1 OLA"
            tagColor="amber"
          />
          <TimelineItem 
            icon={<CheckCircle size={14} />} 
            color="green"
            date="19 Feb 2026 · 09:18"
            title="First response sent"
            desc="Sent SAP application server restart steps via SMGW transaction"
            tag="Amit Sharma (L1)"
            tagColor="green"
          />
        </div>

      </div>
    </div>
  );
}

function GanttRow({ label, sub, start, width, status, time }: any) {
  const colors = {
    ok: 'bg-[#f0fdf4] border-[#dcfce7] text-[#15803d]',
    warn: 'bg-[#fffbeb] border-[#fef3c7] text-[#b45309]',
    fail: 'bg-[#fef2f2] border-[#fee2e2] text-[#dc2626]',
  }[status as 'ok' | 'warn' | 'fail'];

  return (
    <div className="flex items-center relative z-10 group">
      <div className="w-[130px] flex-shrink-0">
        <div className="text-[11px] font-bold text-[#111827]">{label}</div>
        <div className="text-[9px] text-[#9ca3af]">{sub}</div>
      </div>
      <div className="flex-1 h-7 bg-[#f8f9fa] rounded relative">
        <div 
          className={`absolute top-1 bottom-1 rounded border flex items-center px-2 text-[9px] font-bold transition-all hover:brightness-95 ${colors}`}
          style={{ left: start, width: width }}
        >
          {time}
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ icon, color, date, title, desc, tag, tagColor }: any) {
  const colors = {
    blue: 'bg-[#eff6ff] border-[#dbeafe] text-[#2563eb]',
    violet: 'bg-[#f5f3ff] border-[#ddd6fe] text-[#7c3aed]',
    amber: 'bg-[#fffbeb] border-[#fef3c7] text-[#b45309]',
    green: 'bg-[#f0fdf4] border-[#dcfce7] text-[#15803d]',
    gray: 'bg-[#f8f9fa] border-[#e4e7ec] text-[#64748b]',
  }[color as string] || 'bg-[#f8f9fa] border-[#e4e7ec] text-[#64748b]';

  return (
    <div className="relative flex gap-4">
      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 bg-white z-10 ${colors.replace('bg-', 'border-').replace('text-', 'text-')}`}>
        {icon}
      </div>
      <div className="pt-0.5">
        <div className="text-[10px] text-[#9ca3af] mb-1 font-bold">{date}</div>
        <div className="text-[14px] font-bold text-[#111827] mb-1">{title}</div>
        <div className="text-[12px] text-[#4b5563] mb-2">{desc}</div>
        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${colors}`}>
          {tag}
        </span>
      </div>
    </div>
  );
}
