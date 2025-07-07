const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const textInput = document.getElementById('textInput');
const submitBtn = document.getElementById('submitBtn');
const fileInfo = document.getElementById('fileInfo');

let selectedFiles = [];

uploadArea.addEventListener('click', () => {
    fileInput.click();
});

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
});

// File input change
fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
});

// Text input change
textInput.addEventListener('input', () => {
    checkSubmitButton();
});

function handleFiles(files) {
    const validFiles = files.filter(file => {
        const extension = file.name.split('.').pop().toLowerCase();
        return extension === 'txt' || extension === 'pdf';
    });

    if (validFiles.length > 0) {
        // Only take the first file
        selectedFiles = [validFiles[0]];
        const fileName = validFiles[0].name;
        fileInfo.textContent = `Arquivo selecionado: ${fileName}`;
        fileInfo.style.display = 'block';
        fileInfo.className = 'file-info';
    } else {
        alert('Por favor, selecione apenas arquivos .txt ou .pdf');
        selectedFiles = [];
        fileInfo.style.display = 'none';
    }
    
    checkSubmitButton();
}

function checkSubmitButton() {
    const hasFile = selectedFiles.length > 0;
    const hasValidText = textInput.value.trim().length >= 10;
    
    submitBtn.disabled = !(hasFile || hasValidText);
}

// Submit button
submitBtn.addEventListener('click', async () => {
    if (selectedFiles.length > 0) {
        // Priority: File upload
        await submitFile();
    } else if (textInput.value.trim().length >= 10) {
        // Fallback: Text submission
        await submitText();
    }
});

async function submitFile() {
    const formData = new FormData();
    formData.append('file', selectedFiles[0]);
    
    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        fileInfo.textContent = 'Processando arquivo...';
        fileInfo.style.display = 'block';
        fileInfo.className = 'file-info processing';
        
        const response = await fetch('/file', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (response.ok) {
            const classification = result.text;
            const fileName = selectedFiles[0].name;
            fileInfo.textContent = `Arquivo: ${fileName} | Classificação: ${classification}`;
            fileInfo.className = `file-info ${classification.toLowerCase()}`;
        } else {
            fileInfo.textContent = 'Erro ao processar arquivo';
            fileInfo.className = 'file-info error';
        }
    } catch (error) {
        console.error('Error:', error);
        fileInfo.textContent = 'Erro ao enviar arquivo';
        fileInfo.className = 'file-info error';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar';
    }
}

async function submitText() {
    const text = textInput.value.trim();
    
    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        fileInfo.textContent = 'Processando texto...';
        fileInfo.style.display = 'block';
        fileInfo.className = 'file-info processing';
        
        const response = await fetch('/text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            const classification = result.text;
            fileInfo.textContent = `Classificação: ${classification}`;
            fileInfo.className = `file-info ${classification.toLowerCase()}`;
        } else {
            fileInfo.textContent = 'Erro ao processar texto';
            fileInfo.className = 'file-info error';
        }
    } catch (error) {
        console.error('Error:', error);
        fileInfo.textContent = 'Erro ao enviar texto';
        fileInfo.className = 'file-info error';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar';
    }
} 