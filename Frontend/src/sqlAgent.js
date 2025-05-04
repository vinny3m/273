import { Client } from "pg";
import { OpenAI } from "openai";
import { SQLDatabase } from "langchain/sql_db";
import { createSqlAgentExecutor } from "langchain/agents";
import "dotenv/config";

export async function makeAgent() {
  // 1. Connect to your live DB
  const pgClient = new Client({ connectionString: process.env.DATABASE_URL });
  await pgClient.connect();

  // 2. Wrap it for LangChain
  const db = await SQLDatabase.fromPgClient(pgClient);

  // 3. Init your LLM
  const model = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,         // deterministic SQL generation
  });

  // 4. Build the SQL-agent executor
  const executor = await createSqlAgentExecutor(model, db, {
    // You can tweak:
    maxIterations: 2,       // how many SQL cycles it can run
    verbose: true,
  });

  return executor;
}
