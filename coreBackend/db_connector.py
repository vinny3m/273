from langchain_community.utilities import SQLDatabase
import pymongo

class DatabaseConnector:
    def __init__(self, db_type: str, db_uri: str):
        self.db_type = db_type
        self.db_uri = db_uri
        self.db = None

    def connect(self):
        if self.db_type == "mysql" or self.db_type == "postgresql":
            self.db = SQLDatabase.from_uri(self.db_uri)
        elif self.db_type == "mongodb":
            self.db = pymongo.MongoClient(self.db_uri)
        else:
            raise ValueError("Unsupported database type. Use 'mysql', 'postgresql', or 'mongodb'.")

    def get_usable_table_names(self):
        if self.db_type in ["mysql", "postgresql"] and self.db:
            return self.db.get_usable_table_names()
        elif self.db_type == "mongodb":
            return self.db.list_database_names()
        else:
            raise ValueError("Database not connected or unsupported operation for NoSQL databases.")

    def execute_query(self, query: str):
        if self.db_type in ["mysql", "postgresql"] and self.db:
            return self.db.run(query)
        elif self.db_type == "mongodb":
            db_name, collection_name, mongo_query = query.get("db"), query.get("collection"), query.get("query")
            collection = self.db[db_name][collection_name]
            return list(collection.find(mongo_query))
        else:
            raise ValueError("Unsupported operation or database not connected.")
