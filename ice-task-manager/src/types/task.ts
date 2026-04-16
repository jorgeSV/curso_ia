export type TaskStatus = 'idle' | 'loading' | 'ready' | 'done' | 'error';

export type IceValues = {
  impact: number;
  confidence: number;
  ease: number;
};

export type IceSuggestion = IceValues & {
  reason: string;
};

export type Task = {
  id: string;
  name: string;
  description: string;
  impact?: number;
  confidence?: number;
  ease?: number;
  iceScore?: number;
  reason?: string;
  status: TaskStatus;
  errorMessage?: string;
  suggestion?: IceSuggestion;
  createdAt: number;
};
