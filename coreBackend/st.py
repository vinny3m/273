from langchain.agents import create_sql_agent
from langchain.llms import OpenAI
from langchain.sql_database import SQLDatabase

# Step 1: Define your database connection
DATABASE_URI = "sqlite:///your_database.db"  # Replace with your actual database URI

# Create a connection to the database
db = SQLDatabase.from_uri(DATABASE_URI)

# Step 2: Initialize the Language Model (LLM)
llm = OpenAI(temperature=0, model="gpt-4")  # Use your preferred LLM configuration

# Step 3: Create the SQL Agent
sql_agent = create_sql_agent(
    llm=llm,
    tool=db,
    verbose=True  # Enable for detailed logs
)

# Step 4: Interact with the agent
if __name__ == "__main__":
    while True:
        user_query = input("Ask a question about your database: ")
        if user_query.lower() in ["exit", "quit"]:
            print("Goodbye!")
            break
        try:
            response = sql_agent.run(user_query)
            print("Response:\n", response)
        except Exception as e:
            print("Error:", e)
def testsc(db_config,llm_config,query_ques):
    print(db_config,llm_config,query_ques)
    return "hello"
print(testsc())