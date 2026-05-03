import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Loader2, Sparkles } from 'lucide-react';

interface ProblemInputProps {
  onAnalyze: (problem: string) => void;
  isLoading: boolean;
}

export default function ProblemInput({ onAnalyze, isLoading }: ProblemInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onAnalyze(input);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative group lg:mt-12"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-focus-within:duration-200"></div>
        
        <form 
          onSubmit={handleSubmit}
          className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-stretch">
            <textarea
              className="flex-1 p-6 text-lg bg-transparent border-none focus:ring-0 placeholder-gray-400 min-h-[160px] resize-none font-sans"
              placeholder="Describe your situation in messy detail... (e.g., 'I have an interview tomorrow, I'm feeling totally underprepared and anxious about my technical skills...')"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            
            <div className="md:w-48 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-100 p-4 flex flex-col justify-end gap-3">
              <div className="hidden md:flex items-center gap-2 text-gray-400">
                <Sparkles size={14} className="text-blue-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider">AI Reasoning Engine</span>
              </div>
              
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`
                  w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-200
                  flex items-center justify-center gap-2 shadow-lg shadow-blue-200
                  ${!input.trim() || isLoading 
                    ? 'bg-gray-300 cursor-not-allowed shadow-none' 
                    : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}
                `}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Analyze</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
      
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {['Job Stresses', 'Failed Exams', 'Emergencies', 'Life Decisions'].map((tag) => (
          <span key={tag} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
