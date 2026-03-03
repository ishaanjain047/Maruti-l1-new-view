import React from "react";
import { Ticket } from "../data";
import Conversation from "./Conversation";
import RightPanel from "./RightPanel";
import ThreadsPanel from "./ThreadsPanel";
import MISAPanel from "./MISAPanel";
import { RightPanelMode } from "../App";
import { motion, AnimatePresence } from "motion/react";

interface WorkspaceProps {
  ticket: Ticket;
  rightPanelMode: RightPanelMode;
  setRightPanelMode: (mode: RightPanelMode) => void;
  onCloseTicket: () => void;
}

export default function Workspace({ 
  ticket, 
  rightPanelMode, 
  setRightPanelMode,
  onCloseTicket
}: WorkspaceProps) {
  return (
    <div className="flex-1 flex gap-[6px] min-w-0 overflow-hidden">
      {/* Center Conversation Card */}
      <motion.div 
        layout
        className="flex-1 bg-white rounded-[10px] card-shadow overflow-hidden flex flex-col"
      >
        <Conversation 
          ticket={ticket} 
          rightPanelMode={rightPanelMode}
          onOpenThreads={() => setRightPanelMode('threads')}
          onOpenMISA={() => setRightPanelMode('misa')}
          onCloseTicket={onCloseTicket}
        />
      </motion.div>

      {/* Right Panel Card (Details / Threads / MISA) */}
      <AnimatePresence mode="wait">
        {rightPanelMode === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 268 }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="bg-white rounded-[10px] card-shadow overflow-hidden flex-shrink-0"
          >
            <RightPanel ticket={ticket} />
          </motion.div>
        )}

        {rightPanelMode === 'threads' && (
          <motion.div
            key="threads"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '35%' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="bg-white rounded-[10px] card-shadow overflow-hidden flex-shrink-0"
          >
            <ThreadsPanel onClose={() => setRightPanelMode('details')} />
          </motion.div>
        )}

        {rightPanelMode === 'misa' && (
          <motion.div
            key="misa"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '35%' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="bg-white rounded-[10px] card-shadow overflow-hidden flex-shrink-0"
          >
            <MISAPanel onClose={() => setRightPanelMode('details')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
