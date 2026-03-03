
export interface Message {
  sender: string;
  time: string;
  text: string;
  type: 'user' | 'agent' | 'ai' | 'system' | 'note';
}

export interface Ticket {
  id: string;
  priority: string;
  category: string;
  title: string;
  status: string;
  assignee: string;
  time: string;
  sla: string;
  ola: string;
  urgency: string;
  impact: string;
  openedBy: string;
  type: string;
  messages?: Message[];
  tags?: string[];
  isSR?: boolean;
  slaRed?: boolean;
  requester?: string;
  requesterAvatar?: string;
  created?: string;
  resolutionSLA?: string;
  firstResponseSLA?: string;
  accountOwner?: string;
  accountOwnerAvatar?: string;
  lifecycleStage?: string;
  department?: string;
  location?: string;
  manager?: string;
  employeeId?: string;
}

export const tickets: Ticket[] = [
  { 
    id:'INC-4525', 
    priority:'P1', 
    category:'Application', 
    title:'SAP module crashing — Production line 3',    
    status:'In Progress', 
    assignee:'Amit S.',   
    time:'09:10', 
    sla:'12 min', 
    ola:'6 min',  
    urgency:'Critical', 
    impact:'High',   
    openedBy:'Rajesh Kumar',  
    type:'Incident',
    messages: [
      { sender: 'Rajesh Kumar', time: '09:10 am', text: 'Hi IT Support, I am facing a critical issue with the SAP Production Planning module on Line 3. The application is crashing immediately upon launching the batch scheduler.', type: 'user' },
      { sender: 'System', time: '09:10 am', text: 'Ticket INC-4525 created · Auto-classified: Application / P1', type: 'system' },
      { sender: 'MISA AI', time: '09:11 am', text: 'Hello Rajesh, I have received your ticket regarding the SAP module crash on Line 3. I have automatically classified this as a P1 Incident and assigned it to the L1 Support queue.', type: 'ai' },
      { sender: 'Amit Sharma', time: '09:15 am', text: "Hi Rajesh, I'm Amit from the L1 Support team. I'm looking into this right now. I've reviewed the logs you attached. It seems like a specific process is locking the memory segment.", type: 'agent' },
      { sender: 'Amit Sharma', time: '09:18 am', text: 'Checking the SMGW logs for Line 3 workstation. @Vikram Singh could you verify if there are any server-side locks for this user?', type: 'note' }
    ],
    requester: 'Rajesh Kumar',
    requesterAvatar: 'RK',
    created: '10 minutes ago',
    resolutionSLA: 'Due in 2 hours',
    firstResponseSLA: 'Overdue',
    department: 'Production Operations',
    location: 'Gurgaon Plant, Line 3',
    manager: 'Vikram Malhotra',
    employeeId: 'EMP-2024-889',
    tags: ['SAP', 'Production', 'Critical']
  },
  { 
    id:'INC-4521', 
    priority:'P1', 
    category:'Network',     
    title:'VPN gateway unreachable — Remote workforce', 
    status:'Breached',    
    assignee:'Priya M.',  
    time:'08:45', 
    sla:'2 min',  
    ola:'1 min',  
    urgency:'Critical', 
    impact:'High',   
    openedBy:'Suresh Nair',   
    type:'Incident',
    messages: [
      { sender: 'Suresh Nair', time: '08:45 am', text: 'Cannot connect to VPN from home. Getting "Gateway Unreachable" error.', type: 'user' },
      { sender: 'System', time: '08:45 am', text: 'Ticket INC-4521 created', type: 'system' }
    ],
    requester: 'Suresh Nair',
    created: '35 minutes ago',
    resolutionSLA: 'Due in 1 hour',
    firstResponseSLA: 'Met',
    department: 'Sales & Marketing',
    location: 'Remote (Mumbai)',
    manager: 'Anjali Gupta',
    employeeId: 'EMP-2023-102',
    tags: ['VPN', 'Network', 'Remote']
  },
  { id:'INC-4518', priority:'P3', category:'Hardware',    title:'Printer cluster offline — Floor B2',         status:'In Progress', assignee:'Vikram S.', time:'08:30', sla:'45 min', ola:'20 min', urgency:'High',     impact:'Medium', openedBy:'Meena Roy',     type:'Service Request', messages: [] },
  { id:'INC-4515', priority:'P3', category:'Application', title:'ERP login loop after password reset',        status:'Pending',     assignee:'Amit S.',   time:'08:15', sla:'1h 10m', ola:'30 min', urgency:'Medium',   impact:'Medium', openedBy:'Kavita Das',    type:'Incident', messages: [] },
  { id:'INC-4510', priority:'P1', category:'Security',    title:'Suspicious login attempts — Admin portal',   status:'Escalated',   assignee:'Priya M.',  time:'07:58', sla:'5 min',  ola:'3 min',  urgency:'Critical', impact:'High',   openedBy:'IT Security',   type:'Incident', messages: [] },
  { id:'INC-4507', priority:'P3', category:'Application', title:'Dashboard charts not loading — Analytics',   status:'In Progress', assignee:'Vikram S.', time:'07:40', sla:'2h 30m', ola:'1h 15m', urgency:'Low',      impact:'Low',    openedBy:'Ananya Joshi',  type:'Bug', messages: [] },
  { id:'INC-4503', priority:'P2', category:'Network',     title:'Intermittent WiFi drops — Conference rooms', status:'In Progress', assignee:'Amit S.',   time:'07:20', sla:'50 min', ola:'25 min', urgency:'Medium',   impact:'Medium', openedBy:'Ravi Kulkarni', type:'Incident', messages: [] },
  { id:'INC-4499', priority:'P4', category:'Hardware',    title:'Monitor flickering — Workstation WS-042',    status:'Pending',     assignee:'Priya M.',  time:'07:05', sla:'3h 20m', ola:'2h',     urgency:'Low',      impact:'Low',    openedBy:'Deepak Sinha',  type:'Hardware', messages: [] },
];

export const landingTickets: Ticket[] = [
  { id:'INC-4525', title:'SAP module crashing — Production line 3',    priority:'P1', status:'New',        category:'Application', tags:['SAP','Production'], sla:'12 min', ola:'—', slaRed:true, assignee: '', time: '', urgency: '', impact: '', openedBy: '', type: '' },
  { id:'INC-4524', title:'VPN drops every 15 minutes — Manesar plant', priority:'P1', status:'New',        category:'Network',     tags:['VPN','Network'],    sla:'28 min', ola:'—', slaRed:true, assignee: '', time: '', urgency: '', impact: '', openedBy: '', type: '' },
  { id:'INC-4523', title:'Outlook not syncing calendar on mobile',      priority:'P3', status:'In Progress',category:'Email',       tags:['Outlook','Mobile'], sla:'4 hrs',  ola:'—', slaRed:false, assignee: '', time: '', urgency: '', impact: '', openedBy: '', type: '' },
  { id:'INC-4522', title:'Printer queue stuck — 5th floor',             priority:'P3', status:'In Progress',category:'Hardware',    tags:['Printer'],          sla:'6 hrs',  ola:'—', slaRed:false, assignee: '', time: '', urgency: '', impact: '', openedBy: '', type: '' },
  { id:'SR-1181',  title:'New monitor request — Design team',           priority:'P4', status:'Open',       category:'Hardware',    tags:['Hardware','Request'],sla:'24 hrs', ola:'—', slaRed:false, isSR:true, assignee: '', time: '', urgency: '', impact: '', openedBy: '', type: '' },
  { id:'INC-4521', title:'SAP login failure — Gurgaon plant users',     priority:'P1', status:'New',        category:'Application', tags:['SAP','Login'],      sla:'8 min',  ola:'—', slaRed:true, assignee: '', time: '', urgency: '', impact: '', openedBy: '', type: '' },
  { id:'INC-4520', title:'Wi-Fi connectivity issue — Building C',       priority:'P2', status:'In Progress',category:'Network',     tags:['Wi-Fi'],            sla:'1.5 hrs',ola:'—', slaRed:false, assignee: '', time: '', urgency: '', impact: '', openedBy: '', type: '' },
  { id:'INC-4519', title:'Adobe license activation failed',             priority:'P3', status:'Open',       category:'Software',    tags:['Adobe','License'],  sla:'8 hrs',  ola:'—', slaRed:false, assignee: '', time: '', urgency: '', impact: '', openedBy: '', type: '' },
  { id:'SR-1180',  title:'Laptop replacement — Finance dept.',          priority:'P4', status:'Open',       category:'Hardware',    tags:['Laptop'],           sla:'48 hrs', ola:'—', slaRed:false, isSR:true, assignee: '', time: '', urgency: '', impact: '', openedBy: '', type: '' },
];

export const similarTickets: Ticket[] = [
  { 
    id:'INC-4482', 
    priority:'P1', 
    category:'Application', 
    title:'SAP PP module freeze on Line 1',    
    status:'Resolved', 
    assignee:'Amit S.',   
    time:'Yesterday', 
    sla:'Met', 
    ola:'Met',  
    urgency:'Critical', 
    impact:'High',   
    openedBy:'Vikram M.',  
    type:'Incident',
    created: '1 day ago'
  },
  { 
    id:'INC-4390', 
    priority:'P2', 
    category:'Application', 
    title:'Batch scheduler latency',    
    status:'Closed', 
    assignee:'Priya M.',   
    time:'3 days ago', 
    sla:'Met', 
    ola:'Met',  
    urgency:'High', 
    impact:'Medium',   
    openedBy:'Rajesh K.',  
    type:'Incident',
    created: '3 days ago'
  },
  { 
    id:'INC-4105', 
    priority:'P3', 
    category:'Application', 
    title:'SAP GUI crash on startup',    
    status:'Resolved', 
    assignee:'Vikram S.',   
    time:'Last week', 
    sla:'Met', 
    ola:'Met',  
    urgency:'Medium', 
    impact:'Low',   
    openedBy:'Meena R.',  
    type:'Incident',
    created: '1 week ago'
  }
];

export interface KBArticle {
  id: number;
  name: string;
  pct: number;
  cat: string;
  updated: string;
  summary: string;
  steps: string[];
  note?: string;
}

export const kbArticles: KBArticle[] = [
  { id:1, name:'SAP Module Crash — Memory Leak Fix', pct:94, cat:'Application', updated:'18 Feb 2026',
    summary:'Resolves memory leak in SAP PP v7.4 causing batch scheduler crashes on production systems.',
    steps:['Open SM50 to check work process status and identify stuck processes','Run OS07 to view OS-level memory diagnostics and confirm leak','Execute SMGW transaction — terminate gateway processes if stuck','Clear PP planning cache via /SAPAPO/CACHETEST','Restart ICM (Internet Communication Manager) via SMICM','Monitor SM50 for 10 min — confirm all processes return to "Running"'],
    note:'If restart loop continues after step 6, apply SAP Note 2956431 (PP v7.4 hotfix).' },
  { id:2, name:'SAP PP v7.4 Patch Notes & Hotfixes', pct:89, cat:'Application', updated:'15 Feb 2026',
    summary:'Comprehensive patch notes for SAP PP v7.4 including memory management fixes.',
    steps:['Download SAP Note 2956431 from support portal','Apply patch via SNOTE transaction','Restart application server after patch','Validate planning run in /SAPAPO/SDP94'],
    note:'Requires system downtime of approx 20 min.' },
  { id:3, name:'Batch Scheduler Restart Procedure', pct:82, cat:'Application', updated:'12 Feb 2026',
    summary:'Standard operating procedure for restarting the SAP batch scheduler safely.',
    steps:['Cancel all running batch jobs via SM37','Stop batch scheduler via SM36','Wait 2 minutes for jobs to terminate','Restart scheduler service from OS level','Verify job queue via SM37'],
    note:'Always inform production floor before restarting during shift hours.' },
  { id:4, name:'ICM Restart & Connection Reset', pct:76, cat:'Network', updated:'10 Feb 2026',
    summary:'Steps to restart the Internet Communication Manager and reset active connections.',
    steps:['Open SMICM transaction','Navigate to Administration → ICM → Restart (Soft)','Monitor active connections in SMICM → Goto → Display Server List','Confirm all connections re-established within 3 min'],
    note:'Hard restart (Administration → ICM → Restart Hard) if soft restart fails.' },
  { id:5, name:'SM50 Work Process Diagnostics', pct:71, cat:'Application', updated:'8 Feb 2026',
    summary:'Using SM50 to identify and resolve stuck SAP work processes.',
    steps:['Open SM50 — look for processes in "Stopped" or "Priv" state','Note the PID of stuck processes','Use Process → Cancel Without Core for non-critical processes','For critical: restart application server instance'],
    note:'Document all cancelled PIDs for post-incident review.' },
  { id:6, name:'OS07 Memory Diagnostics Guide', pct:65, cat:'Infrastructure', updated:'5 Feb 2026',
    summary:'Comprehensive guide for OS-level memory analysis using OS07 transaction.',
    steps:['Run OS07 — check Virtual Memory usage','Look for swap space > 80% utilization','Identify top memory-consuming processes','Increase virtual memory via OS admin if needed'],
    note:'Coordinate with infrastructure team for OS-level changes.' },
  { id:7, name:'SAP Gateway SMGW Troubleshooting', pct:60, cat:'Application', updated:'2 Feb 2026',
    summary:'Troubleshooting SAP gateway connection issues via SMGW transaction.',
    steps:['Open SMGW → Goto → Logged On Clients','Identify stale connections older than 2 hours','Release stale connections manually','Monitor for reconnection errors in gateway log'],
    note:'Gateway restart requires SAP_ALL authorization.' },
  { id:8, name:'Production Planning Cache Management', pct:54, cat:'Application', updated:'28 Jan 2026',
    summary:'Managing and clearing the SAP production planning cache to resolve stale data issues.',
    steps:['Navigate to /SAPAPO/CACHETEST','Select all cache objects for the affected planning area','Execute Clear Selected Objects','Trigger a new planning run to rebuild cache'],
    note:'Cache rebuild can take 5–15 min depending on planning area size.' },
  { id:9, name:'SAP Application Server Restart SOP', pct:48, cat:'Infrastructure', updated:'25 Jan 2026',
    summary:'Standard procedure for safely restarting SAP application servers.',
    steps:['Notify all active users via system message (SM02)','Wait 5 min for users to log off','Stop application server from OS: stopsap r3','Verify all processes stopped: ps -ef | grep sapwork','Start application server: startsap r3','Validate login via SAP Logon'],
    note:'Estimated downtime: 8–12 minutes.' },
  { id:10, name:'P1 Incident Escalation Protocol', pct:41, cat:'Process', updated:'20 Jan 2026',
    summary:'Protocol for escalating P1 incidents that breach SLA or require vendor involvement.',
    steps:['Confirm P1 classification with supervisor','Engage L2/L3 support via escalation bridge','Notify vendor support (SAP) if application-layer root cause','Update ticket every 15 min with resolution steps taken','Send business impact update to stakeholders'],
    note:'Business impact template available in SharePoint under ITSM > Templates.' },
];
