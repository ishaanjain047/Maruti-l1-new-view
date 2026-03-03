import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TabStrip from './components/TabStrip';
import Dashboard from './components/Dashboard';
import Workspace from './components/Workspace';
import NavRail from './components/NavRail';
import { tickets } from './data';

export type RightPanelMode = 'details' | 'threads' | 'misa';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'workspace'>('landing');
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightPanelMode, setRightPanelMode] = useState<RightPanelMode>('details');

  const activeTicket = tickets.find(t => t.id === activeTicketId) || null;

  const handleTicketSelect = (id: string) => {
    if (!openTabs.includes(id)) {
      setOpenTabs([...openTabs, id]);
    }
    setActiveTicketId(id);
    setCurrentView('workspace');
  };

  const handleCloseTab = (id: string) => {
    const newTabs = openTabs.filter(t => t !== id);
    setOpenTabs(newTabs);
    
    if (activeTicketId === id) {
      if (newTabs.length > 0) {
        setActiveTicketId(newTabs[newTabs.length - 1]);
      } else {
        setActiveTicketId(null);
        setCurrentView('landing');
      }
    }
  };

  const handleOpenPanel = (mode: RightPanelMode) => {
    setRightPanelMode(mode);
    if (mode !== 'details') {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#f4f6f9] font-sans overflow-hidden text-[#111827]">
      {/* Left Navigation Rail - Always Present */}
      <NavRail 
        activeView={currentView === 'landing' ? 'dashboard' : 'tickets'} 
        onViewChange={(view) => {
          if (view === 'dashboard') setCurrentView('landing');
          else if (view === 'tickets' && openTabs.length > 0) setCurrentView('workspace');
        }}
      />

      {/* Page Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Tab Strip - Only in Workspace View */}
        {currentView === 'workspace' && (
          <TabStrip 
            activeTicketId={activeTicketId}
            openTabs={openTabs}
            onSelectTab={(id) => {
              setActiveTicketId(id);
              setCurrentView('workspace');
            }}
            onCloseTab={handleCloseTab}
          />
        )}

        {/* Main Workspace / Dashboard */}
        <main className={`flex-1 flex overflow-hidden ${currentView === 'workspace' ? 'p-[6px] gap-[6px]' : ''}`}>
          {currentView === 'landing' ? (
            <Dashboard onTicketSelect={handleTicketSelect} />
          ) : (
            <>
              <Sidebar 
                tickets={tickets}
                activeTicketId={activeTicketId}
                onSelectTicket={handleTicketSelect}
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
                onHome={() => setCurrentView('landing')}
              />
              
              <div className="flex-1 flex min-w-0 gap-[6px]">
                {activeTicket ? (
                  <Workspace 
                    ticket={activeTicket} 
                    rightPanelMode={rightPanelMode}
                    setRightPanelMode={handleOpenPanel}
                    onCloseTicket={() => handleCloseTab(activeTicket.id)}
                  />
                ) : (
                  <div className="flex-1 bg-white rounded-[10px] card-shadow flex flex-col items-center justify-center text-gray-400">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
                      <span className="text-2xl font-bold text-gray-300">?</span>
                    </div>
                    <p className="font-medium">Select a ticket from the queue</p>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
