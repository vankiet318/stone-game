from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.infrastructure.database import get_db
from app.domain.entities import BetRequest
from app.use_cases.game_logic import GameInteractor, AuthInteractor
from pydantic import BaseModel

router = APIRouter()

# Temporary in-memory storage for the hidden dice of the current round
# In a real multi-user app, this should be in Redis or DB per user
active_games = {}

class LoginRequest(BaseModel):
    username: str

@router.post("/auth/login")
async def login(req: LoginRequest, db: Session = Depends(get_db)):
    auth = AuthInteractor(db)
    user = auth.login_or_register(req.username)
    return {"id": user.id, "username": user.username, "balance": user.balance}

@router.get("/user/{user_id}/status")
async def get_status(user_id: int, db: Session = Depends(get_db)):
    from app.domain.models import User
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"balance": user.balance}

@router.post("/game/roll/{user_id}")
async def roll_dice(user_id: int):
    interactor = GameInteractor(None) # DB not needed just for rolling
    dice = interactor.roll_dice()
    active_games[user_id] = dice
    return {"message": "Dice rolled."}

@router.post("/game/reveal/{user_id}")
async def reveal_results(user_id: int, bet_req: BetRequest, db: Session = Depends(get_db)):
    if user_id not in active_games:
        raise HTTPException(status_code=400, detail="No active roll for this user.")
    
    dice = active_games.pop(user_id)
    interactor = GameInteractor(db)
    
    try:
        winnings, new_balance = interactor.process_bet(user_id, bet_req.bets, dice)
        return {
            "dice": dice,
            "winnings": winnings,
            "new_balance": new_balance,
            "matched": [s for s in bet_req.bets if s in dice]
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
