from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine

class DatabaseConnector:
    def __init__(self, db_type: str, username: str, password: str, host: str, port: int, database: str):
        self.db_type = db_type
        self.username = username
        self.password = password
        self.host = host
        self.port = port
        self.database = database
        self.engine: Engine = None
        self.connect()

    def connect(self):
        """Initializes the database engine with the provided credentials."""
        db_uri = f"{self.db_type}://{self.username}:{self.password}@{self.host}:{self.port}/{self.database}"
        try:
            self.engine = create_engine(db_uri)
            print("Database connection established.")
        except Exception as e:
            print(f"Failed to connect to the database: {e}")

    def execute_query(self, query: str):
        """Executes a query and returns results if any."""
        if not self.engine:
            raise ConnectionError("Database not connected. Call connect() first.")
        try:
            with self.engine.connect() as connection:
                result = connection.execute(text(query))
                # Check if the query returns rows
                if result.returns_rows:
                    return result.fetchall()
                else:
                    # Commit for DML statements and return None
                    connection.commit()
                    print("Query executed successfully (no rows to return).")
                    return None
        except Exception as e:
            print(f"Query execution failed: {e}")
            return None

    def close(self):
        """Disposes of the database engine."""
        if self.engine:
            self.engine.dispose()
            print("Database connection closed.")


