from db_connector import DatabaseConnector
from llm_connector import LLMConnector
from agent_executor import AgentExecutor
from output_parser import *

def run_custom_db_llm_query(db_config,llm_config,query):
    print(db_config,llm_config,query)
    db_connector = DatabaseConnector(db_type=db_config["db_type"], db_uri=db_config["db_uri"])
    llm_connector = LLMConnector(model_type=llm_config["type"], api_key=llm_config["api_key"], model=llm_config["model"])
    agent_executor = AgentExecutor(db_connector=db_connector, llm_connector=llm_connector)
    agent_executor.setup_agent()
    output = agent_executor.run_query(query)
    # final_output = parse_output(output)
    return output
