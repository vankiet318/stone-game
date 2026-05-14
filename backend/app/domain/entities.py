from pydantic import BaseModel
from typing import List, Dict

class GameState(BaseModel):
    balance: int = 1000
    current_dice: List[str] = []
    is_rolled: bool = False
    symbols: List[str] = ["nai", "bau", "ga", "ca", "cua", "tom"]

class BetRequest(BaseModel):
    bets: Dict[str, int]
