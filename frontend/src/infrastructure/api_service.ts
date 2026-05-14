import { User, RevealResponse } from "@/domain/types";

const API_BASE_URL = "http://localhost:8000";

export const apiService = {
  async login(username: string): Promise<User> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    return res.json();
  },

  async getBalance(userId: number): Promise<number> {
    const res = await fetch(`${API_BASE_URL}/user/${userId}/status`);
    const data = await res.json();
    return data.balance;
  },

  async rollDice(userId: number): Promise<void> {
    await fetch(`${API_BASE_URL}/game/roll/${userId}`, { method: "POST" });
  },

  async reveal(userId: number, bets: Record<string, number>): Promise<RevealResponse> {
    const res = await fetch(`${API_BASE_URL}/game/reveal/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bets }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
};
