import os


from langchain_community.agent_toolkits.sql.toolkit import SQLDatabaseToolkit
from typing import List
from pydantic import BaseModel, Field
from output_parser import parse_output
#config
from extras.config import llm_model, openai_api_key

# sql connector
from langchain_community.utilities import SQLDatabase
pg_uri = f"mysql://root:rootroot@localhost:3306/180b_university"
db = SQLDatabase.from_uri(pg_uri)
os.environ.setdefault('OPENAI_API_KEY', openai_api_key)

#llm connector
from langchain_openai import ChatOpenAI
llm = ChatOpenAI(temperature=0, model=llm_model)

toolkit = SQLDatabaseToolkit(db=db, llm=llm)
prompt = ""
custom_suffix = "You are a database admin. Understand and answer queries properly."

from langchain_community.agent_toolkits import create_sql_agent
agent = create_sql_agent(
    llm=llm,
    toolkit=toolkit,
    verbose=False,
    prefix=prompt,
    agent_type="openai-tools",
    suffix=custom_suffix,
    return_only_outputs=True,
)


class Response(BaseModel):
    summary: str = Field(description="Summary from the output")
    sql_query: str = Field(description="SQL query from the output")
    result: List[dict[str, str]] = Field(description="Result as List of objects")



def run_query(query: str):
    query = "Take the above questions and the resultant SQL queries into consideration for generating SQL queries if they are helpful.\n" + query
    print(query)
    output = agent.invoke(query)
    print(output)
    # final_output = parse_output(output)
    return output

if __name__ == "__main__":
    print(prompt)
