import { useState } from "react";
import { User } from "@/domain/types";
import { apiService } from "@/infrastructure/api_service";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (username: string) => {
    setLoading(true);
    try {
      const userData = await apiService.login(username);
      setUser(userData);
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      setLoading(false);
    }
  };

  const updateBalance = (newBalance: number) => {
    if (user) {
      setUser({ ...user, balance: newBalance });
    }
  };

  const logout = () => setUser(null);

  return { user, loading, login, logout, updateBalance };
}
