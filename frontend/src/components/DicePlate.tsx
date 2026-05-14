import { GamePhase, SymbolId, GameSymbol } from "@/domain/types";
import { Card } from "./common/Card";

interface DicePlateProps {
  dice: SymbolId[];
  phase: GamePhase;
  symbols: GameSymbol[];
}

export const DicePlate = ({ dice, phase, symbols }: DicePlateProps) => (
  <Card className="dice-plate" style={{ padding: '1rem' }}>
    <div className="dice-container">
      {dice.map((d, i) => (
        <div key={i} className={`die ${phase === 'ROLLING' ? 'rolling' : ''}`}>
          {phase === 'BETTING' || phase === 'ROLLING' ? '❓' : symbols.find(s => s.id === d)?.icon}
        </div>
      ))}
    </div>
  </Card>
);
