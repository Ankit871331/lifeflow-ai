import { AnalysisResult } from '../types';
import RiskBadge from './RiskBadge';
import ActionCard from './ActionCard';
import { motion } from 'motion/react';
import { Brain, ShieldAlert, FileText } from 'lucide-react';

interface DashboardProps {
  result: AnalysisResult;
}

export default function AnalysisDashboard({ result }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl mx-auto px-4 py-8">
      {/* Sidebar: Summary & Metadata */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="lg:col-span-4 space-y-6"
      >
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Classification</span>
            <RiskBadge level={result.risk_level} />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 leading-tight">
              {result.category}
            </h2>
          </div>

          <div className="pt-4 border-t border-gray-50">
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <FileText size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Executive Summary</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {result.summary}
            </p>
          </div>
        </div>

        <div className="bg-[#111827] text-white p-6 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-blue-400">
            <Brain size={16} />
            <span className="text-[10px] font-bold uppercase tracking-wider">AI Reasoning Engine</span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed italic">
            "{result.reasoning}"
          </p>
        </div>

        {result.warnings.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-amber-700">
              <ShieldAlert size={16} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Safety Protocols</span>
            </div>
            <ul className="space-y-2">
              {result.warnings.map((warning, i) => (
                <li key={i} className="text-xs text-amber-800 font-medium leading-relaxed">
                  • {warning}
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

      {/* Main Content: Action Items */}
      <div className="lg:col-span-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionCard 
            type="immediate" 
            title="Immediate Execution (Now)" 
            items={result.immediate_actions} 
            delay={0.1}
          />
          <ActionCard 
            type="short_term" 
            title="Short-Term (24-72 Hours)" 
            items={result.short_term_actions} 
            delay={0.2}
          />
        </div>
        <div className="w-full">
          <ActionCard 
            type="long_term" 
            title="Long-Term Strategic Outlook" 
            items={result.long_term_actions} 
            delay={0.3}
          />
        </div>
      </div>
    </div>
  );
}
