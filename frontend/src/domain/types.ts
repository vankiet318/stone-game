export type SymbolId = "nai" | "bau" | "ga" | "ca" | "cua" | "tom";

export interface GameSymbol {
  id: SymbolId;
  name: string;
  icon: string;
}

export type GamePhase = "IDLE" | "ROLLING" | "BETTING" | "REVEALED";

export interface User {
  id: number;
  username: string;
  balance: number;
}

export interface RevealResponse {
  dice: SymbolId[];
  winnings: number;
  new_balance: number;
  matched: SymbolId[];
}
