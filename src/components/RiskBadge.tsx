import { motion } from 'motion/react';
import { RiskLevel } from '../types';
import { AlertTriangle, ShieldCheck, AlertCircle, Info } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
}

export default function RiskBadge({ level }: RiskBadgeProps) {
  const config = {
    Low: { color: 'bg-green-100 text-green-700 border-green-200', icon: ShieldCheck },
    Medium: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Info },
    High: { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: AlertTriangle },
    Critical: { color: 'bg-red-100 text-red-700 border-red-200', icon: AlertCircle },
  };

  const { color, icon: Icon } = config[level] || config.Low;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${color}`}
    >
      <Icon size={14} />
      {level} Risk
    </motion.div>
  );
}
