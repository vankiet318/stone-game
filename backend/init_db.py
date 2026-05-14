from app.infrastructure.database import engine, Base
from app.domain.models import User

def init_db():
    Base.metadata.create_all(bind=engine)
    print("Database initialized!")

if __name__ == "__main__":
    init_db()
