export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type Category = 
  | 'Health / Emergency'
  | 'Career / Job'
  | 'Education'
  | 'Emotional / Personal'
  | 'Financial'
  | 'Productivity / Life decision';

export interface AnalysisResult {
  category: Category;
  risk_level: RiskLevel;
  summary: string;
  immediate_actions: string[];
  short_term_actions: string[];
  long_term_actions: string[];
  reasoning: string;
  warnings: string[];
}
