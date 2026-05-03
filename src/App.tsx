import { useState } from 'react';
import Header from './components/Header';
import ProblemInput from './components/ProblemInput';
import AnalysisDashboard from './components/AnalysisDashboard';
import { AnalysisResult } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (problem: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze problem');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] selection:bg-blue-100 pb-20">
      <Header />

      <main className="pt-12">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="input-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4 px-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100"
                >
                  Advanced Decision Support
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 max-w-3xl mx-auto leading-[1.1]">
                  Convert life's <span className="text-blue-600 italic">chaos</span> into intelligence.
                </h1>
                <p className="text-gray-500 max-w-xl mx-auto text-lg">
                  LifeFlow AI uses reasoning engines to structure emergencies, career dilemmas, and strategic life decisions.
                </p>
              </div>

              <ProblemInput onAnalyze={handleAnalyze} isLoading={loading} />

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl mx-auto px-4"
                >
                  <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-700">
                    <AlertCircle size={20} />
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <button 
                    onClick={handleReset}
                    className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-widest"
                  >
                    <RotateCcw size={16} />
                    New Analysis
                  </button>
                </div>
              </div>
              
              <AnalysisDashboard result={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-0 w-full border-t border-gray-100 bg-white/80 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <span>LifeFlow Intelligence Engine v1.0.4</span>
          <div className="flex items-center gap-4">
             <span className="flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               Systems Online
             </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
