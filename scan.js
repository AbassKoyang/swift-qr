const textarea = document.querySelector('.result');
const QRImage = document.querySelector('.qr-code-image');
const fileInput = document.querySelector('.file-input');
const submitButton = document.querySelector('.button')
const form = document.getElementById('qrCodeForm');
let content = 'Scan result';

 const fetchQRCodeContent = async () => {
            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json(); 
                    console.log(data);
                    content = data[0].symbol[0].data;
                    submitButton.value = 'Scanning...';
                    setTimeout(() => {
                        textarea.value = data[0].symbol[0].data;
                        submitButton.value = 'Read QR code';
                    }, 1000);
                } else {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
            } catch (error) {
                console.error(error);
            }
};

fileInput.addEventListener('change', () => {
    const fileURL = URL.createObjectURL(fileInput.files[0]);
    QRImage.src = fileURL;
})

submitButton.addEventListener('click', () => {
    if (fileInput.files[0]) {
        fetchQRCodeContent();
    } else {
        alert('Select an image')
    }
})