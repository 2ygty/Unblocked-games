import { useState, useMemo } from 'react';
import { Search, Gamepad2, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './data/games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeGame, setActiveGame] = useState(null);

  const categories = useMemo(() => {
    const cats = gamesData.map(g => g.category);
    return Array.from(new Set(cats));
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex min-h-screen bg-brand-bg text-brand-text overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-brand-sidebar border-r border-brand-border flex flex-col hidden lg:flex shrink-0">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10 group cursor-pointer" onClick={() => {setSearchQuery(''); setSelectedCategory(null);}}>
            <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Gamepad2 className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white font-display">VaultGames</h1>
          </div>

          <nav className="space-y-1 mb-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-text-dim font-bold mb-4">Navigation</p>
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                !selectedCategory ? 'bg-brand-card text-white shadow-sm' : 'text-brand-text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${!selectedCategory ? 'bg-brand-blue' : 'bg-transparent'}`}></span> Discover
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-brand-text-muted hover:text-white hover:bg-white/5 rounded-lg text-sm transition-all">
              <span className="w-2 h-2 rounded-full bg-transparent"></span> Popular
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-brand-text-muted hover:text-white hover:bg-white/5 rounded-lg text-sm transition-all">
              <span className="w-2 h-2 rounded-full bg-transparent"></span> Newest
            </button>
          </nav>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-text-dim font-bold mb-4">Categories</p>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs rounded-md border transition-all ${
                    selectedCategory === cat 
                      ? 'bg-brand-blue border-brand-blue text-white shadow-md' 
                      : 'bg-brand-border border-brand-border-muted text-brand-text-dim hover:text-white hover:border-brand-text-dim'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto p-6">
          <div className="bg-brand-card rounded-xl p-4 border border-brand-border">
            <p className="text-xs text-brand-text-muted mb-2">Vault Capacity</p>
            <div className="flex justify-between items-end">
              <span className="text-lg font-bold text-white tracking-tight">{gamesData.length} Games</span>
              <span className="text-[10px] text-green-400 font-mono">+12% UP</span>
            </div>
            <div className="w-full h-1 bg-brand-border rounded-full mt-3 overflow-hidden">
               <div className="h-full bg-brand-blue w-3/4 rounded-full"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 border-b border-brand-border flex items-center justify-between px-6 md:px-10 shrink-0 bg-brand-bg/50 backdrop-blur-md sticky top-0 z-40">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-text-dim group-focus-within:text-brand-blue transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search games by name..."
              className="w-full bg-brand-sidebar border border-brand-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-blue text-brand-text transition-all placeholder:text-brand-text-dim"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center pl-4">
            <button className="px-4 py-2 text-sm font-medium text-brand-text-muted hover:text-white transition-colors hidden sm:block">Support</button>
            <button 
              onClick={() => {
                const random = Math.floor(Math.random() * gamesData.length);
                setActiveGame(gamesData[random]);
              }}
              className="px-5 py-2 bg-brand-blue text-white text-sm font-bold rounded-lg shadow-lg shadow-blue-500/10 hover:bg-blue-600 transition-all hover:-translate-y-0.5"
            >
              Random Play
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight font-display">
              {selectedCategory ? `${selectedCategory} Collection` : 'Discover Trending'}
            </h2>
            <div className="flex items-center gap-2 text-xs text-brand-text-dim">
              <span className="hidden sm:inline">Showing {filteredGames.length} results</span>
              <div className="h-4 w-[1px] bg-brand-border mx-2 hidden sm:block"></div>
              <select className="bg-transparent border-none focus:ring-0 cursor-pointer text-brand-text-muted hover:text-white transition-colors outline-none">
                <option className="bg-brand-sidebar">Latest Added</option>
                <option className="bg-brand-sidebar">Alphabetical</option>
                <option className="bg-brand-sidebar">Most Played</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredGames.map((game) => (
                <motion.div
                  layout
                  key={game.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group cursor-pointer"
                  onClick={() => setActiveGame(game)}
                >
                  <div className="aspect-[16/10] bg-gradient-to-br from-brand-border to-brand-sidebar rounded-xl border border-brand-border-muted mb-3 relative overflow-hidden group-hover:border-brand-blue/50 transition-all duration-300">
                    <img 
                      src={game.thumbnail} 
                      alt={game.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                      <div className="w-12 h-12 bg-white/10 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Gamepad2 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 rounded text-[9px] text-white font-bold uppercase tracking-wider backdrop-blur-sm border border-white/10">
                      {game.category}
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-white group-hover:text-brand-blue transition-colors truncate px-1">{game.name}</h3>
                  <p className="text-xs text-brand-text-dim px-1">Unblocked Fun</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredGames.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-brand-text-dim border border-dashed border-brand-border rounded-3xl">
              <Gamepad2 size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-medium text-brand-text-muted">No relics found in the archives</p>
              <button onClick={() => setSearchQuery('')} className="mt-4 text-brand-blue hover:underline">Clear Search</button>
            </div>
          )}
        </div>

        {/* Footer Status Bar */}
        <footer className="h-12 border-t border-brand-border bg-brand-sidebar flex items-center justify-between px-6 md:px-10 shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] text-brand-text-dim uppercase tracking-wider font-bold">Latency: Stable</span>
            </div>
            <div className="text-[10px] text-brand-text-dim uppercase tracking-wider hidden sm:block">Archive v2.0.4 • {gamesData.length} entries</div>
          </div>
          <div className="text-[10px] text-brand-text-dim uppercase tracking-wider">
            NovaPlay Unblocked • EST. 2026
          </div>
        </footer>
      </main>

      {/* Game Viewer Modal */}
      <AnimatePresence>
        {activeGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-6xl aspect-[16/10] bg-brand-sidebar rounded-3xl overflow-hidden border border-brand-border flex flex-col shadow-2xl"
            >
              <div className="px-6 py-4 flex items-center justify-between bg-brand-bg/80 border-b border-brand-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center">
                    <Gamepad2 size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white leading-none">{activeGame.name}</h3>
                    <p className="text-[10px] text-brand-text-dim uppercase tracking-widest mt-1">{activeGame.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => window.open(activeGame.url, '_blank')}
                    className="p-2 rounded-lg hover:bg-white/5 text-brand-text-dim hover:text-white transition-colors"
                  >
                    <ExternalLink size={18} />
                  </button>
                  <button 
                    onClick={() => setActiveGame(null)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-brand-text-dim hover:text-red-400 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-black">
                <iframe src={activeGame.url} className="w-full h-full" allowFullScreen />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
