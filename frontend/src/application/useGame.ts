import { useState, useEffect } from "react";
import { GamePhase, SymbolId, User } from "@/domain/types";
import { apiService } from "@/infrastructure/api_service";

export function useGame(user: User | null, onUpdateBalance: (balance: number) => void) {
  const [bets, setBets] = useState<Record<string, number>>({});
  const [dice, setDice] = useState<SymbolId[]>(["bau", "bau", "bau"]);
  const [phase, setPhase] = useState<GamePhase>("IDLE");
  const [message, setMessage] = useState("Mời bạn tung xúc xắc!");

  const onRoll = async () => {
    if (!user) return;
    setPhase("ROLLING");
    setMessage("Đang tung xúc xắc...");
    await apiService.rollDice(user.id);
    setTimeout(() => {
      setPhase("BETTING");
      setMessage("Mời bạn đặt cược!");
    }, 2000);
  };

  const placeBet = (id: SymbolId) => {
    if (phase !== "BETTING" || !user) return;
    const betAmount = 10;
    if (user.balance < betAmount) {
      setMessage("Không đủ sỏi!");
      return;
    }
    setBets((prev) => ({ ...prev, [id]: (prev[id] || 0) + betAmount }));
    onUpdateBalance(user.balance - betAmount);
  };

  const onReveal = async () => {
    if (Object.keys(bets).length === 0 || !user) {
      setMessage("Vui lòng đặt ít nhất 1 ô!");
      return;
    }
    setMessage("Đang mở bát...");
    try {
      const data = await apiService.reveal(user.id, bets);
      setDice(data.dice);
      onUpdateBalance(data.new_balance);
      setPhase("REVEALED");
      setMessage(data.winnings > 0 ? `Chúc mừng! +${data.winnings} sỏi` : "Rất tiếc!");
      setBets({});
    } catch (err: any) {
      setMessage(`Lỗi: ${err.message}`);
    }
  };

  const onReset = () => {
    setPhase("IDLE");
    setBets({});
    setMessage("Ván mới bắt đầu!");
  };

  return { bets, dice, phase, message, onRoll, placeBet, onReveal, onReset };
}
