from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import PyPDF2
import io
import os
from gemma import check_email_text

# cria api flask
app = Flask(__name__)
CORS(app)

# Rota para a página inicial
@app.route('/', methods=['GET'])
def index():
    print("Acessando rota /")
    try:
        return render_template('index.html')
    except Exception as e:
        print(f"Erro ao renderizar template: {e}")
        return f"Erro: {e}", 500

# Rota de health check para o Railway
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'API funcionando!'})

# Rota para receber texto e retornar uma resposta
@app.route('/text', methods=['POST'])
def receive_text():
    data = request.get_json()
    text = data.get('text', '')

    print('text: ' + text)

    response = check_email_text(text)
    return jsonify({'text': response})

# Rota para receber arquivos
@app.route('/file', methods=['POST'])
def receive_file():
    file = request.files['file']
    filename = file.filename.lower()
    
    try: 
        if filename.endswith('.pdf'):
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(file.read()))
            content = ""
            for page in pdf_reader.pages:
                content += page.extract_text()
        else:
            content = file.read().decode('utf-8')

        print('content: ' + content)
        response = check_email_text(content)
        return jsonify({'text': response})
    except:
        print("Error: could not read file" + filename)
        return jsonify({'text': 'Erro ao ler arquivo'})

# Rodar a aplicação
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port)