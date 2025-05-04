from langchain_openai import ChatOpenAI
# from transformers import AutoModelForCausalLM, AutoTokenizer
# from llama_index.llms.openai import OpenAI

from custom_llm import *


class LLMConnector:
    def __init__(self, model_type: str, api_key: str = None, model: str = "gpt-3.5-turbo", temperature: float = 0.0):
        self.model_type = model_type
        self.api_key = api_key
        self.model = model
        self.temperature = temperature
        self.llm = None
        self.tokenizer = None

    def connect(self):
        if self.model_type == "openai":
            # self.llm = CustomLlamaIndexLLM(model=self.model, api_key=self.api_key,temperature=self.temperature)
            self.llm = ChatOpenAI(model=self.model, temperature=self.temperature, api_key=self.api_key)
        # elif self.model_type == "codellama":
        #     self.llm = AutoModelForCausalLM.from_pretrained(self.model)
        #     self.tokenizer = AutoTokenizer.from_pretrained(self.model)
        else:
            raise ValueError("Unsupported model type. Use 'openai' or 'codellama'.")

    def get_llm(self):
        if self.llm:
            return self.llm
        raise ValueError("LLM not connected. Please call connect() first.")

    def generate_response(self, prompt: str):
        if self.model_type == "openai":
            return self.llm.generate(prompt)
        elif self.model_type == "codellama":
            inputs = self.tokenizer(prompt, return_tensors="pt")
            outputs = self.llm.generate(inputs.input_ids, max_length=500, temperature=self.temperature)
            return self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        else:
            raise ValueError("Unsupported model type.")
