from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
import io
import check_email_text from gemma

# cria api flask
app = Flask(__name__)
CORS(app)

# Rota para receber texto e retornar uma resposta
@app.route('/text', methods=['POST'])
def receive_text():
    data = request.get_json()
    text = data.get('text', '')

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

        response = check_email_text(content)
        return jsonify({'text': response})
    except:
        print("Error: could not read file" + filename)
        return jsonify({'text': 'Erro'})

# Rodar a aplicação
if __name__ == '__main__':
    print("API rodando em: http://localhost:5000")
    app.run(host='0.0.0.0', port=5000)