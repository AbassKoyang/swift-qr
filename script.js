const inputFieldValue = document.querySelector('.inputField');
const QRCodeImage = document.querySelector('.qr-code-image');
const submitButton = document.querySelector('.submit-button');
const downloadButton = document.querySelector('.download-button');
const urlButton = document.querySelector('.url');
const textButton = document.querySelector('.text');
const emailButton = document.querySelector('.email');
const phoneButton = document.querySelector('.phone');
const label = document.querySelector('.label');
const colorButtons = document.querySelectorAll('.color-button');
const codeTypeButtons = document.querySelectorAll('.code-type-button');
const fileTypebuttons = document.querySelectorAll('.file-type-button')
let data = inputFieldValue.value;
let dataColors = ['000000', 'E93323', 'ED7531', '5BBC82', '3478F6', '0F0C9A', '6733BA', 'D54797'];
let dataFormat = ['png', 'jpeg', 'svg'];
let selectedFormat = 'png';
let selectedColor = 'black'
let bgColor = 'ffffff';

const removeActiveClass = () => {
    codeTypeButtons.forEach(items => {
        items.style.border = '1px solid transparent'
        items.style.backgroundColor = '#F8F9FA'
    })
}
codeTypeButtons.forEach(items => {
        items.addEventListener('click', () => {
            removeActiveClass();
            items.style.border = '1px solid #07C34A';
            items.style.backgroundColor = '#e7faee';
            items.focus()
        })
    });
codeTypeButtons.item(0).focus();
    const handleCodeTypeButtonsArrowKeyPress = (event, buttonIndex) => {
        const nextButton = buttonIndex + 1;
        const previousButton = buttonIndex -1;
        const isFirstButton = buttonIndex === 0;
        const isLastButton = buttonIndex === codeTypeButtons.length -1;
        if(event.key === 'ArrowDown' || event.key === 'ArrowRight'){
            if(isLastButton){
                codeTypeButtons.item(0).focus();
                return;
            }
            codeTypeButtons.item(nextButton).focus()
        };

        if(event.key === 'ArrowUp' || event.key === 'ArrowLeft'){
            if(isFirstButton){
                codeTypeButtons.item(codeTypeButtons.length - 1).focus();
                return;
            }
            codeTypeButtons.item(previousButton).focus()
        };
    };

    codeTypeButtons.forEach((button, index) => {
        button.addEventListener('keydown', (event) => {handleCodeTypeButtonsArrowKeyPress(event, index);});
    });

urlButton.addEventListener('click', () => {
    label.innerHTML = 'Enter Your Website Url';
    inputFieldValue.value = 'www.google.com';
    inputFieldValue.placeholder = 'e.g www.google.com';
    inputFieldValue.type = 'text';
})
textButton.addEventListener('click', () => {
    label.innerHTML = 'Enter Your message';
    inputFieldValue.value = '';
    inputFieldValue.placeholder = 'e.g I am groot.';
    inputFieldValue.type = 'text';
})
emailButton.addEventListener('click', () => {
    label.innerHTML = 'Enter Your email address';
    inputFieldValue.value = '';
    inputFieldValue.placeholder = 'e.g johndoe@gmail.com';
    inputFieldValue.type = 'email';
})
phoneButton.addEventListener('click', () => {
    label.innerHTML = 'Enter Your phone number';
    inputFieldValue.value = '';
    inputFieldValue.placeholder = 'e.g +234-915-201-8480';
    inputFieldValue.type = 'phone';
})

const selectColor = (color) => {
    selectedColor = color;
};
const selectFormat = (format) => {
    selectedFormat = format;
};

const removeActiveClassFromButton = (button) => {
    button.forEach(items => {
        items.style.border = '1px solid transparent'
        items.style.backgroundColor = '#F8F9FA'
    })
};

colorButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        selectColor(dataColors[index]);
        removeActiveClassFromButton(colorButtons);
        btn.style.border = '1px solid #07C34A';
        btn.style.backgroundColor = '#e7faee';
        btn.focus()
    })
});

fileTypebuttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        selectFormat(dataFormat[index]);
        removeActiveClassFromButton(fileTypebuttons);
        btn.style.border = '1px solid #07C34A';
        btn.style.backgroundColor = '#e7faee';
        btn.focus()
    })
});

inputFieldValue.addEventListener('change', (e) => {
    data = e.target.value;
});

function generateQR() {
    if(inputFieldValue.value === ''){
        alert("Please enter a value");
    }else{
        QRCodeImage.src= `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}&bgcolor=${bgColor}&margin=0&color=${selectedColor}&format=${selectedFormat}`;
    }
}

async function handleDownloadImage(imageUrl, suggestedFileName) {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Image download failed');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = suggestedFileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

submitButton.addEventListener('click', generateQR);
downloadButton.addEventListener('click', () => {
    const imageUrl = QRCodeImage.src;
    const isUrlValid = imageUrl.toString().indexOf('/images/placeholder.svg');
    if(inputFieldValue.value !== '' && isUrlValid === -1){
        handleDownloadImage(QRCodeImage.src, inputFieldValue.value);
    } else{
        alert('Please enter a value and generate QR code before trying to download.')
    }
})