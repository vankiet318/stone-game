from sqlalchemy import Column, Integer, String
from app.infrastructure.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String) # In production, use hashed passwords
    balance = Column(Integer, default=1000)
