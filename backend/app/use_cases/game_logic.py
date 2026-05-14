import random
from typing import List, Dict, Tuple
from sqlalchemy.orm import Session
from app.domain.models import User
from app.core.constants import PAYOUT_MULTIPLIER, SYMBOLS

class GameInteractor:
    def __init__(self, db: Session):
        self.db = db

    def roll_dice(self) -> List[str]:
        return [random.choice(SYMBOLS) for _ in range(3)]

    def process_bet(self, user_id: int, bets: Dict[str, int], dice_results: List[str]) -> Tuple[int, int]:
        user = self.db.query(User).filter(User.id == user_id).first()
        if not user:
            raise ValueError("User not found")

        total_bet = sum(bets.values())
        if user.balance < total_bet:
            raise ValueError("Insufficient balance")

        # Deduct bet
        user.balance -= total_bet
        
        winnings = 0
        for symbol, amount in bets.items():
            if symbol in dice_results:
                winnings += amount * PAYOUT_MULTIPLIER
        
        user.balance += winnings
        self.db.commit()
        self.db.refresh(user)
        
        return winnings, user.balance

class AuthInteractor:
    def __init__(self, db: Session):
        self.db = db

    def login_or_register(self, username: str) -> User:
        user = self.db.query(User).filter(User.username == username).first()
        if not user:
            user = User(username=username, balance=1000)
            self.db.add(user)
            self.db.commit()
            self.db.refresh(user)
        return user
