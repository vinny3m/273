from langchain.output_parsers import ResponseSchema, StructuredOutputParser

summary = ResponseSchema(
            name="summary",
            description="summary, as a unique string inside json. if theres is no key name summary return empty string",
        )
results = ResponseSchema(
		name="result",
		description="result, as array of objects  inside json. if theres is no key name results return empty array.",
	)
sql_query = ResponseSchema(
		name="sql_query",
		description="sql query, as a unique string  inside json. if theres is no key name ssql_query empty string",
	)

output_parser = StructuredOutputParser.from_response_schemas([summary, results, sql_query])

def parse_output(output):
    try:      
        final_output = output_parser.parse(output)
    except Exception as e:
        final_output = {
            'result' : '[]',
            'summary' : output,
            'sql_query': 'na',
            'exception': str(e)
        }
    return final_output