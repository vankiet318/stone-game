"use client";

import { useState } from "react";
import { useGame } from "@/application/useGame";
import { useAuth } from "@/application/useAuth";
import { DicePlate } from "@/components/DicePlate";
import { BettingGrid } from "@/components/BettingGrid";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { GameSymbol } from "@/domain/types";

const SYMBOLS: GameSymbol[] = [
  { id: "nai", name: "Nai", icon: "🦌" },
  { id: "bau", name: "Bầu", icon: "🎃" },
  { id: "ga", name: "Gà", icon: "🐔" },
  { id: "ca", name: "Cá", icon: "🐟" },
  { id: "cua", name: "Cua", icon: "🦀" },
  { id: "tom", name: "Tôm", icon: "🦐" },
];

export default function GamePage() {
  const { user, login, logout, updateBalance } = useAuth();
  const { bets, dice, phase, message, onRoll, placeBet, onReveal, onReset } = useGame(user, updateBalance);
  const [usernameInput, setUsernameInput] = useState("");

  if (!user) {
    return (
      <main className="game-container">
        <Card style={{ width: '400px', textAlign: 'center', padding: '2rem' }}>
          <h2 style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem' }}>ĐĂNG NHẬP SÒI GAME</h2>
          <input 
            type="text" 
            placeholder="Nhập tên người chơi..."
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            style={{ 
              width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)',
              background: 'rgba(0,0,0,0.3)', color: 'white', marginBottom: '1rem'
            }}
          />
          <Button style={{ width: '100%' }} onClick={() => login(usernameInput)}>
            Vào Sòng
          </Button>
        </Card>
      </main>
    );
  }

  return (
    <main className="game-container">
      <Card style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1.5rem' }}>
        <div>
          <h1 style={{ color: 'var(--accent-gold)', fontSize: '1.2rem' }}>BẦU CUA TÔM CÁ</h1>
          <p style={{ opacity: 0.6, fontSize: '0.75rem' }}>Chào, {user.username}!</p>
        </div>
        <Button variant="secondary" onClick={logout}>Đăng xuất</Button>
      </Card>

      <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1rem', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <span style={{ fontSize: '1rem', opacity: 0.7 }}>Số sỏi:</span>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-gold)' }}>{user.balance} 💎</h2>
        </div>
        <p style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--accent-gold)' }}>{message}</p>
      </Card>

      <DicePlate dice={dice} phase={phase} symbols={SYMBOLS} />
      
      <BettingGrid symbols={SYMBOLS} bets={bets} onPlaceBet={placeBet} />

      <section className="controls" style={{ marginTop: '0.5rem' }}>
        {phase === "IDLE" || phase === "REVEALED" ? (
          <Button onClick={onRoll}>Tung Xúc Xắc</Button>
        ) : phase === "BETTING" ? (
          <Button onClick={onReveal}>Mở Bát</Button>
        ) : (
          <Button disabled>Đang chạy...</Button>
        )}
        {phase === "REVEALED" && (
          <Button variant="secondary" style={{ background: 'var(--accent-red)', border: 'none' }} onClick={onReset}>Làm Lại</Button>
        )}
      </section>
    </main>
  );
}
