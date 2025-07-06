import requests
import json

def check_email_text(user_text):
    print('Buscando resposta da api...')

    response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
        "Authorization": "Bearer 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",
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
    print('Resposta da api:')
    print(json.dumps(response.json(), indent=4))

    # response will be Improdutivo, Produtivo ou Erro
    try: 
        return response.json()['choices'][0]['message']['content']
    except:
        return "Erro"
