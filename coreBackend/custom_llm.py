from typing import ClassVar
from langchain.base_language import BaseLanguageModel
from llama_index.llms.openai import OpenAI

class CustomLlamaIndexLLM(BaseLanguageModel):
    llm: ClassVar[OpenAI] = None  # Class variable for the LlamaIndex LLM

    def __init__(self, model: str, api_key: str, temperature: float = 0):
        # Initialize the custom LLM with LlamaIndex's OpenAI model
        CustomLlamaIndexLLM.llm = OpenAI(model=model, api_key=api_key, temperature=temperature)

    def generate(self, prompt: str, **kwargs) -> str:
        response = CustomLlamaIndexLLM.llm.complete(prompt)
        print(response)
        return response

    def generate_prompt(self, prompt: str, **kwargs) -> str:
        return prompt

    def agenerate_prompt(self, prompt: str, **kwargs) -> str:
        return self.generate(prompt, **kwargs)

    def predict(self, prompt: str, **kwargs) -> str:
        return self.generate(prompt, **kwargs)

    def apredict(self, prompt: str, **kwargs):
        return self.predict(prompt, **kwargs)

    def predict_messages(self, messages: list, **kwargs) -> str:
        prompt = " ".join(messages)
        return self.generate(prompt, **kwargs)

    def apredict_messages(self, messages: list, **kwargs):
        return self.predict_messages(messages, **kwargs)

    def invoke(self, prompt: str, *args, **kwargs) -> str:
        return self.predict(prompt, **kwargs)  # Accept any additional keyword arguments
