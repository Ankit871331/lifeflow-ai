import { motion } from 'motion/react';
import { Activity, Menu } from 'lucide-react';

export default function Header() {
  return (
    <nav className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
            <Activity size={18} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 italic">
            LIFEFLOW <span className="text-blue-600">AI</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Intelligence', 'Protocols', 'About'].map((item) => (
            <a key={item} href="#" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors">
              {item}
            </a>
          ))}
          <button className="bg-gray-950 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-lg">
            System Status
          </button>
        </div>

        <button className="md:hidden p-2 text-gray-600">
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
}
