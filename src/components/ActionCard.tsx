import { motion } from 'motion/react';
import { Calendar, Clock, Rocket } from 'lucide-react';

interface ActionCardProps {
  title: string;
  items: string[];
  type: 'immediate' | 'short_term' | 'long_term';
  delay: number;
}

export default function ActionCard({ title, items, type, delay }: ActionCardProps) {
  const icons = {
    immediate: { icon: Clock, color: 'text-red-500', bg: 'bg-red-50 border-red-100' },
    short_term: { icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50 border-blue-100' },
    long_term: { icon: Rocket, color: 'text-purple-500', bg: 'bg-purple-50 border-purple-100' },
  };

  const { icon: Icon, color, bg } = icons[type];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay }}
      className={`p-5 rounded-xl border flex flex-col gap-4 ${bg}`}
    >
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-lg bg-white shadow-sm ${color}`}>
          <Icon size={18} />
        </div>
        <h3 className="font-bold text-gray-900 tracking-tight">{title}</h3>
      </div>
      
      <ul className="space-y-3">
        {(items ?? []).map((item, i) => (
          <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-300 mt-2" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
