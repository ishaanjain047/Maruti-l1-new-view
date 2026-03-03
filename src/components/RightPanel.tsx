import React, { useState } from 'react';
import { 
  User, 
  Users, 
  Tag, 
  Info, 
  Clock, 
  FileText, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Ticket } from '../data';

interface RightPanelProps {
  ticket: Ticket;
}

export default function RightPanel({ ticket }: RightPanelProps) {
  const [group, setGroup] = useState('L1 Support');
  const [assignee, setAssignee] = useState('Ankit Kumar');

  const Section = ({ title, icon: Icon, children }: any) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <Icon size={14} className="text-[#9ca3af]" />
        <span className="text-[11px] font-bold text-[#9ca3af] uppercase tracking-wider">{title}</span>
      </div>
      <div className="space-y-3 px-1">
        {children}
      </div>
    </div>
  );

  const Field = ({ label, value, isSelect }: any) => (
    <div className="space-y-1">
      <label className="text-[11px] font-bold text-[#6b7280]">{label}</label>
      {isSelect ? (
        <div className="flex items-center justify-between px-3 py-2 bg-[#f8f9fa] border border-[#e4e7ec] rounded-md cursor-pointer hover:border-[#cbd5e1] transition-colors">
          <span className="text-[12px] text-[#111827]">{value}</span>
          <ChevronDown size={14} className="text-[#9ca3af]" />
        </div>
      ) : (
        <div className="text-[12px] text-[#111827] font-medium">{value}</div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="h-[48px] border-b border-[#f0f2f5] flex items-center px-4 flex-shrink-0">
        <h2 className="text-[14px] font-bold text-[#111827]">Issue Details</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-8 no-scrollbar pb-24">
        {/* Assignment */}
        <Section title="Assignment" icon={Users}>
          <Field label="Group" value={group} isSelect />
          <Field label="Assignee" value={assignee} isSelect />
        </Section>

        {/* Ticket Properties */}
        <Section title="Ticket Properties" icon={Tag}>
          <Field label="Category" value={ticket.category} isSelect />
          <Field label="Sub-category" value="Software Issue" isSelect />
          <Field label="Item" value="SAP PP Module" isSelect />
          <Field label="Priority" value={ticket.priority} isSelect />
          <Field label="Status" value={ticket.status} isSelect />
        </Section>

        {/* Employee Details */}
        <Section title="Employee Details" icon={User}>
          <Field label="Name" value="Rajesh Kumar" />
          <Field label="Employee ID" value="MS-98231" />
          <Field label="Email" value="rajesh.k@maruti.co.in" />
          <Field label="Location" value="Gurgaon Plant, Haryana" />
        </Section>

        {/* SLA */}
        <Section title="SLA" icon={Clock}>
          <div className="p-3 bg-[#fef2f2] border border-[#fee2e2] rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-[#dc2626]">Resolution SLA</span>
              <span className="text-[11px] font-bold text-[#dc2626]">Overdue</span>
            </div>
            <div className="h-1.5 bg-white/50 rounded-full overflow-hidden">
              <div className="h-full bg-[#dc2626] w-full" />
            </div>
            <div className="text-[10px] text-[#dc2626] font-medium">Breached by 12 minutes</div>
          </div>
        </Section>

        {/* Relevant Articles */}
        <Section title="Relevant Articles" icon={FileText}>
          <div className="space-y-2">
            <ArticleLink title="SAP PP Module Troubleshooting Guide" />
            <ArticleLink title="Common SAP Login Issues" />
          </div>
        </Section>

        {/* Similar Tickets */}
        <Section title="Similar Tickets" icon={Info}>
          <div className="space-y-2">
            <SimilarTicket id="INC-8821" title="SAP Crash on Line 2" />
            <SimilarTicket id="INC-8754" title="Module loading error" />
          </div>
        </Section>
      </div>

      {/* Pinned Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-[#f0f2f5] z-10">
        <button 
          disabled={group === 'L1 Support'}
          className={`w-full py-2.5 rounded-md text-[13px] font-bold transition-all ${
            group === 'L1 Support' 
              ? 'bg-[#f0f2f5] text-[#9ca3af] cursor-not-allowed' 
              : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-sm'
          }`}
        >
          Update
        </button>
      </div>
    </div>
  );
}

function ArticleLink({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-[#f8f9fa] rounded-md transition-colors cursor-pointer group">
      <span className="text-[12px] text-[#2563eb] font-medium truncate">{title}</span>
      <ExternalLink size={12} className="text-[#9ca3af] group-hover:text-[#2563eb]" />
    </div>
  );
}

function SimilarTicket({ id, title }: { id: string, title: string }) {
  return (
    <div className="p-2 hover:bg-[#f8f9fa] rounded-md transition-colors cursor-pointer border border-transparent hover:border-[#e4e7ec]">
      <div className="text-[11px] font-bold text-[#2563eb]">{id}</div>
      <div className="text-[12px] text-[#4b5563] truncate">{title}</div>
    </div>
  );
}
