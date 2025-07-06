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
        
        const response = await fetch('/file', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert(`Classificação: ${result.text}`);
        } else {
            alert('Erro ao processar arquivo');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Erro ao enviar arquivo');
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
        
        const response = await fetch('/text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert(`Classificação: ${result.text}`);
        } else {
            alert('Erro ao processar texto');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Erro ao enviar texto');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar';
    }
} 