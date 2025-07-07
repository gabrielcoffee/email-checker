# Email Checker

Classifica emails como produtivos ou improdutivos usando IA.

## Instalação

1. **Clone o repositório:**
```bash
git clone <seu-repositorio>
cd email-checker-service
```

2. **Instale as dependências:**
```bash
pip install -r requirements.txt
```

3. **Configure as variáveis de ambiente:**
Acesse: https://openrouter.ai/google/gemma-3n-e4b-it:free/api para gerar sua apikey
Neste projeto foi utilizado o modelo gemma 3n e4 que é gratuito
Crie um arquivo `.env` na raiz do projeto:
```
BEARER_TOKEN=seu_token_da_openrouter_aqui
```

## Como Executar

**Desenvolvimento local:**
```bash
python api.py
```

Acesse: `http://localhost:5001`

## Como Usar

1. **Upload de arquivo:** Arraste um arquivo .txt ou .pdf
2. **Texto direto:** Digite texto (mínimo 10 caracteres)
3. **Clique em "Enviar"** para classificar

## Deploy

Para o meu deploy utilizei do Railway, é gratuito e muito facil de usar.

**Railway**
- Conecte seu repositório no Railway
- Configure a variável `BEARER_TOKEN`
- Deploy automático