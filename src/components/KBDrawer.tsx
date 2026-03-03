import React from 'react';
import { X, ChevronLeft, BookOpen, ChevronRight } from 'lucide-react';
import { kbArticles, KBArticle } from '../data';

interface KBDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KBDrawer({ isOpen, onClose }: KBDrawerProps) {
  const [selectedArticle, setSelectedArticle] = React.useState<KBArticle | null>(null);

  const handleClose = () => {
    setSelectedArticle(null);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="h-14 border-b border-gray-200 flex items-center px-4 gap-3 flex-shrink-0 bg-white">
          {selectedArticle && (
            <button 
              onClick={() => setSelectedArticle(null)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          
          <div className="flex-1 font-display font-bold text-sm text-gray-900">
            {selectedArticle ? selectedArticle.name : 'KB Suggestions'}
          </div>

          {!selectedArticle && (
            <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
              {kbArticles.length} articles
            </span>
          )}

          <button 
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {selectedArticle ? (
            <ArticleView article={selectedArticle} />
          ) : (
            <div className="divide-y divide-gray-100">
              {kbArticles.map(kb => (
                <div 
                  key={kb.id}
                  onClick={() => setSelectedArticle(kb)}
                  className="p-4 bg-white hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 flex-shrink-0">
                      <BookOpen size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {kb.name}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${kb.pct >= 80 ? 'bg-green-500' : kb.pct >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} 
                            style={{ width: `${kb.pct}%` }}
                          />
                        </div>
                        <span className={`text-[10px] font-mono font-bold ${kb.pct >= 80 ? 'text-green-600' : kb.pct >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                          {kb.pct}% match
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ArticleView({ article }: { article: KBArticle }) {
  const tierColor = article.pct >= 80 ? 'text-green-600 bg-green-500' : article.pct >= 60 ? 'text-amber-600 bg-amber-500' : 'text-red-600 bg-red-500';
  
  return (
    <div className="p-5 space-y-6">
      <div>
        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-display font-bold tracking-widest uppercase bg-violet-50 text-violet-600 border border-violet-100 mb-2">
          {article.cat}
        </span>
        <h2 className="font-display text-lg font-extrabold text-gray-900 leading-tight mb-2">
          {article.name}
        </h2>
        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
          Last updated: {article.updated}
          <span>·</span>
          <span className={`font-bold ${tierColor.split(' ')[0]}`}>{article.pct}% match</span>
        </div>
      </div>

      <section>
        <h4 className="font-display text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Summary</h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          {article.summary}
        </p>
      </section>

      <section>
        <h4 className="font-display text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Resolution Steps</h4>
        <ol className="list-decimal pl-4 space-y-2 text-sm text-gray-600 marker:text-gray-400 marker:font-bold">
          {article.steps.map((step, i) => (
            <li key={i} className="pl-1">{step}</li>
          ))}
        </ol>
      </section>

      {article.note && (
        <div className="p-3 bg-gray-100 border border-gray-200 rounded-lg text-xs font-mono text-gray-600">
          💡 {article.note}
        </div>
      )}
    </div>
  );
}
