const inputFieldValue = document.querySelector('.inputField');
const QRCodeImage = document.querySelector('.qr-code-image');
const downloadButton = document.querySelector('.download-button');
const urlButton = document.querySelector('.url');
const textButton = document.querySelector('.text');
const emailButton = document.querySelector('.email');
const phoneButton = document.querySelector('.phone');
const label = document.querySelector('.label');
const colorButtons = document.querySelectorAll('.color');
let data = inputFieldValue.value;
let format = 'png';
let dataColors = ['000000', 'E93323', 'ED7531', '5BBC82', '3478F6', '0F0C9A', '6733BA', 'D54797'];
let selectedColor = 'black'
let bgColor = 'ffffff';

urlButton.addEventListener('click', () => {
    label.innerHTML = 'Enter Your Website Url';
    inputFieldValue.value = 'www.google.com';
    inputFieldValue.placeholder = 'e.g www.google.com';
})
textButton.addEventListener('click', () => {
    label.innerHTML = 'Enter Your message';
    inputFieldValue.value = '';
    inputFieldValue.placeholder = 'e.g I am groot.';
})
emailButton.addEventListener('click', () => {
    label.innerHTML = 'Enter Your email address';
    inputFieldValue.value = '';
    inputFieldValue.placeholder = 'e.g johndoe@gmail.com';
})
phoneButton.addEventListener('click', () => {
    label.innerHTML = 'Enter Your phone number';
    inputFieldValue.value = '';
    inputFieldValue.placeholder = 'e.g +234-915-201-8480';
})

const selectColor = (color) => {
    selectedColor = color
};
colorButtons.forEach((btn, index) => btn.addEventListener('click', () => selectColor(dataColors[index])));
function generateQR() {
    QRCodeImage.src= `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}&bgcolor=${bgColor}&margin=0&color=${selectedColor}`;
    console.log(selectedColor)
    }

downloadButton.addEventListener('click', generateQR);