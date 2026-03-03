import React from 'react';
import { Ticket, landingTickets } from '../data';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Activity, 
  User, 
  AlertTriangle,
  Search,
  Filter
} from 'lucide-react';

interface LandingProps {
  onTicketSelect: (id: string) => void;
}

export default function Landing({ onTicketSelect }: LandingProps) {
  return (
    <div className="flex-1 flex flex-col gap-[6px] overflow-hidden">
      {/* KPI Row */}
      <div className="grid grid-cols-5 gap-[6px] flex-shrink-0">
        <KPICard label="Assigned to me" value="12" icon={<User size={14} className="text-[#2563eb]" />} color="blue" />
        <KPICard label="P1 / Critical" value="3" icon={<AlertTriangle size={14} className="text-[#dc2626]" />} color="red" />
        <KPICard label="In Progress" value="5" icon={<Clock size={14} className="text-[#c2410c]" />} color="orange" />
        <KPICard label="Resolved Today" value="12" icon={<CheckCircle size={14} className="text-[#15803d]" />} color="green" />
        <KPICard label="SLA at Risk" value="2" icon={<AlertTriangle size={14} className="text-[#dc2626]" />} color="red" />
      </div>

      {/* Main Dashboard Card */}
      <div className="flex-1 bg-white rounded-[10px] card-shadow overflow-hidden flex flex-col">
        <div className="p-4 border-b border-[#f0f2f5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-[14px] font-bold text-[#111827]">My Tickets</h2>
            <span className="bg-[#eff6ff] text-[#2563eb] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#dbeafe]">
              {landingTickets.length} Total
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
              <input 
                type="text" 
                placeholder="Search dashboard..." 
                className="pl-8 pr-3 py-1.5 bg-[#f8f9fa] border border-[#e4e7ec] rounded-md text-[12px] focus:outline-none focus:ring-1 focus:ring-[#2563eb] w-64"
              />
            </div>
            <button className="p-1.5 text-[#64748b] hover:bg-[#f8f9fa] rounded-md border border-[#e4e7ec] transition-colors">
              <Filter size={14} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <table className="w-full border-collapse text-left">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="border-b border-[#f0f2f5]">
                {['ID', 'Title', 'Priority', 'Status', 'Category', 'SLA', 'Last Updated'].map(h => (
                  <th key={h} className="px-4 py-3 text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {landingTickets.map((t) => (
                <tr 
                  key={t.id} 
                  onClick={() => onTicketSelect(t.id)}
                  className="border-b border-[#f8f9fa] hover:bg-[#f8f9fa] cursor-pointer transition-colors group"
                >
                  <td className="px-4 py-3">
                    <span className="text-[12px] font-bold text-[#2563eb] group-hover:underline">
                      {t.id}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-[12px] font-bold text-[#111827] line-clamp-1">{t.title}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                      t.priority === 'P1' ? 'bg-[#fef2f2] text-[#dc2626] border-[#fee2e2]' :
                      t.priority === 'P2' ? 'bg-[#fff7ed] text-[#c2410c] border-[#ffedd5]' :
                      t.priority === 'P3' ? 'bg-[#fffbeb] text-[#b45309] border-[#fef3c7]' :
                      'bg-[#f0fdf4] text-[#15803d] border-[#dcfce7]'
                    }`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#eff6ff] text-[#2563eb] rounded-full">
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-[#64748b]">{t.category}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-bold ${t.slaRed ? 'text-[#dc2626]' : 'text-[#64748b]'}`}>
                      {t.sla}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-[#9ca3af]">10 mins ago</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KPICard({ label, value, icon, color }: { label: string, value: string, icon: React.ReactNode, color: string }) {
  const colorStyles = {
    blue: 'border-l-[#2563eb]',
    red: 'border-l-[#dc2626]',
    orange: 'border-l-[#c2410c]',
    green: 'border-l-[#15803d]',
  }[color] || 'border-l-gray-200';

  return (
    <div className={`bg-white rounded-[10px] p-4 card-shadow border-l-4 ${colorStyles} flex flex-col gap-1 transition-transform hover:scale-[1.02] cursor-default`}>
      <div className="flex items-center justify-between text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider">
        {label}
        {icon}
      </div>
      <div className="text-[24px] font-bold text-[#111827] leading-none mt-1">
        {value}
      </div>
    </div>
  );
}
