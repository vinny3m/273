from flask import Flask, request, jsonify
from flask_cors import CORS
from urllib.parse import quote
from custom_db_llm_connector import run_custom_db_llm_query

# Fixed database details
DB_TYPE = "mysql"
DB_USERNAME = "root"
DB_PASSWORD = "rootroot"
DB_HOST = "localhost"
DB_PORT = 3306
DB_NAME = "scm_db"

# OpenAI config
OPENAI_API_KEY = "key"
app = Flask(__name__)
CORS(app)

# Construct DB URI once
def uri_constructor():
    encoded_username = quote(DB_USERNAME)
    encoded_password = quote(DB_PASSWORD)
    return f"{DB_TYPE}://{encoded_username}:{encoded_password}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

DB_URI = uri_constructor()

@app.route('/populateAnswer', methods=['POST'])
def answer_query():
    data = request.get_json()
    # Expect payload: { "query_ques": "...", "sql": "..." }
    question = data.get('query_ques')
    if not question:
        return jsonify({'error': 'Missing question or SQL in request body.'}), 400

    llm_config = {
        "type": "openai",
        "api_key": OPENAI_API_KEY,
        "model":"gpt-3.5-turbo"
    }

    db_config = {
        "db_type": DB_TYPE,
        "db_uri": DB_URI
    }

    try:
        # Call custom RAG LLM function with fixed DB URI and provided SQL context
        output = run_custom_db_llm_query(db_config, llm_config, question)
        return jsonify(output)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/ping')
def ping():
    return jsonify({'ping': 'pong'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005, debug=True)
