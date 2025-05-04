from langchain_community.agent_toolkits import create_sql_agent

class AgentExecutor:
    def __init__(self, db_connector, llm_connector):
        self.db_connector = db_connector
        self.llm_connector = llm_connector
        self.agent_executor = None
    
    def setup_agent(self, agent_type="openai-tools", verbose=True):
        if not self.db_connector.db:
            self.db_connector.connect()
        if not self.llm_connector.llm:
            self.llm_connector.connect()
        
        self.agent_executor = create_sql_agent(
            llm=self.llm_connector.get_llm(),
            db=self.db_connector.db,
            agent_type=agent_type,
            verbose=verbose
        )

    def run_query(self, prompt: str):
        if self.agent_executor:
            return self.agent_executor.invoke(prompt)
        raise ValueError("Agent executor not initialized. Please call setup_agent() first.")
