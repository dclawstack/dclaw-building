from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg2://user:pass@localhost/dclaw_building"
    debug: bool = False

    class Config:
        env_prefix = "DCLAW_BUILDING_"

settings = Settings()
