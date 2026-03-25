import { createContext, useContext, useState, type ReactNode } from 'react';
import type { OptimizationSettings } from '../types/settings.types';
import { DEFAULT_SETTINGS } from '../utils/constants';

interface SettingsContextValue {
  settings: OptimizationSettings;
  updateSettings: (partial: Partial<OptimizationSettings>) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<OptimizationSettings>(DEFAULT_SETTINGS);

  const updateSettings = (partial: Partial<OptimizationSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  return <SettingsContext.Provider value={{ settings, updateSettings }}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
