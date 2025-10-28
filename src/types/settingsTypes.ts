import type { GameModeType } from "@/types/gameboardTypes";

export interface SettingsProps {
  gameMode: GameModeType; 
  setGameMode: () => void; 
  keyboardHighlight: boolean; 
  toggleHighlight: () => void; 
}