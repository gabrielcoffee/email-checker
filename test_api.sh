#!/bin/bash

# API Test Script for Email Checker Service
# Make sure your API is running on http://localhost:5001

echo "🧪 Testando API do Email Checker"
echo "================================"

# Test 1: Text endpoint with productive content
echo "📝 Teste 1: Testando endpoint /text com conteúdo produtivo"
curl -X POST https://email-checker-cbmy.onrender.com/text \
  -H "Content-Type: application/json" \
  -d '{"text": "Reunião agendada para amanhã às 14h para discutir o progresso do projeto e próximos passos."}' \
  | jq '.'

echo -e "\n"

# Test 2: Text endpoint with unproductive content
echo "📝 Teste 2: Testando endpoint /text com conteúdo improdutivo"
curl -X POST https://email-checker-cbmy.onrender.com/text \
  -H "Content-Type: application/json" \
  -d '{"text": "Só navegando nas redes sociais e assistindo vídeos engraçados de gatos."}' \
  | jq '.'

echo -e "\n"

# Test 3: Text endpoint with empty text
echo "📝 Teste 3: Testando endpoint /text com texto vazio"
curl -X POST http://localhost:5001/text \
  -H "Content-Type: application/json" \
  -d '{"text": ""}' \
  | jq '.'

echo -e "\n"

# Test 4: Text endpoint with missing text field
echo "📝 Teste 4: Testando endpoint /text com campo de texto ausente"
curl -X POST http://localhost:5001/text \
  -H "Content-Type: application/json" \
  -d '{}' \
  | jq '.'

echo -e "\n"

# Test 5: File endpoint with text file
echo "📁 Teste 5: Testando endpoint /file com arquivo de texto"
echo "Este é um email produtivo sobre prazos do projeto e colaboração da equipe." > test_file.txt
curl -X POST http://localhost:5001/file \
  -F "file=@test_file.txt" \
  | jq '.'

echo -e "\n"

# Test 6: File endpoint with PDF file (if you have one)
echo "📁 Teste 6: Testando endpoint /file com arquivo PDF"
echo "Nota: Este teste requer um arquivo PDF chamado 'test.pdf' no diretório atual"
if [ -f "test.pdf" ]; then
    curl -X POST http://localhost:5001/file \
      -F "file=@test.pdf" \
      | jq '.'
else
    echo "⚠️  Arquivo test.pdf não encontrado. Pulando teste de PDF."
fi

echo -e "\n"

# Test 7: Invalid endpoint
echo "❌ Teste 7: Testando endpoint inválido"
curl -X GET http://localhost:5001/invalid \
  | jq '.'

echo -e "\n"

# Test 8: Wrong method for text endpoint
echo "❌ Teste 8: Testando método errado para endpoint de texto"
curl -X GET http://localhost:5001/text \
  | jq '.'

echo -e "\n"

# Cleanup
rm -f test_file.txt

echo "✅ Testes da API concluídos!"
echo "================================" 