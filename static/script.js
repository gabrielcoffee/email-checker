const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
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

function handleFiles(files) {
    const validFiles = files.filter(file => {
        const extension = file.name.split('.').pop().toLowerCase();
        return extension === 'txt' || extension === 'pdf';
    });

    if (validFiles.length > 0) {
        // Only take the first file
        selectedFiles = [validFiles[0]];
        submitBtn.disabled = false;
        
        const fileName = validFiles[0].name;
        fileInfo.textContent = `Arquivo selecionado: ${fileName}`;
        fileInfo.style.display = 'block';
    } else {
        alert('Por favor, selecione apenas arquivos .txt ou .pdf');
    }
}

// Submit button
submitBtn.addEventListener('click', () => {
    if (selectedFiles.length > 0) {

        
        console.log('Files to send:', selectedFiles);
        alert('Arquivos enviados com sucesso!');
    }
}); 