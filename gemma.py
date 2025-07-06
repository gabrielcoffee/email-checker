import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def check_email_text(user_text):
    response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {os.getenv('BEARER_TOKEN')}",
        "Content-Type": "application/json",
        },
    data=json.dumps({
        "model": "google/gemma-3n-e4b-it:free",
        "messages": [
            {"role": "user", "content": f"Classifique o seguinte texto como 'Produtivo' ou 'Improdutivo'. Responda com apenas uma palavra.\n\nTexto:\n{user_text}"}
        ]
    })
    )

    # print answer in a pretty format
    print('\nResposta da api:')
    print(json.dumps(response.json(), indent=4))

    # response will be Improdutivo, Produtivo ou Erro
    try: 
        return response.json()['choices'][0]['message']['content']
    except:
        return "Erro no servidor"