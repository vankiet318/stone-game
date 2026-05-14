import { GameSymbol, SymbolId } from "@/domain/types";
import { Card } from "./common/Card";

interface BettingGridProps {
  symbols: GameSymbol[];
  bets: Record<string, number>;
  onPlaceBet: (id: SymbolId) => void;
}

export const BettingGrid = ({ symbols, bets, onPlaceBet }: BettingGridProps) => (
  <section className="betting-grid">
    {symbols.map((symbol) => (
      <Card
        key={symbol.id}
        className="bet-card"
        active={!!bets[symbol.id]}
        onClick={() => onPlaceBet(symbol.id)}
      >
        <span className="symbol-icon">{symbol.icon}</span>
        <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{symbol.name}</span>
        {bets[symbol.id] && (
          <div className="bet-amount" style={{ fontSize: '1rem' }}>{bets[symbol.id]} 💎</div>
        )}
      </Card>
    ))}
  </section>
);
