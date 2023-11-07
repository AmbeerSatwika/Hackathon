function initializeUI() {
    const inputSlider = document.getElementById("inputSlider");
    const sliderValue = document.getElementById("sliderValue");
    const passBox = document.getElementById("passBox");
    const lowercase = document.getElementById("lowercase");
    const uppercase = document.getElementById("uppercase");
    const numbers = document.getElementById("numbers");
    const symbols = document.getElementById("symbols");
    const genBtn = document.getElementById("genBtn");
    const copyIcon = document.getElementById("copyIcon");

    sliderValue.textContent = inputSlider.value;

    inputSlider.addEventListener('input', () => {
        updateSliderValueText(inputSlider, sliderValue);
    });

    genBtn.addEventListener('click', () => {
        generatePasswordOnClick(lowercase, uppercase, numbers, symbols, inputSlider, passBox);
    });

    copyIcon.addEventListener('click', () => {
        copyPasswordOnClick(passBox, copyIcon);
    });
}

function updateSliderValueText(inputSlider, sliderValue) {
    sliderValue.textContent = inputSlider.value;
}

function generatePassword(lowercase, uppercase, numbers, symbols, length) {

    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const allNumbers = "0123456789";
    const allSymbols = "~!@#$%^&*";
    
    let allChars = "";

    allChars += lowercase.checked ? lowerChars : "";
    allChars += uppercase.checked ? upperChars : "";
    allChars += numbers.checked ? allNumbers : "";
    allChars += symbols.checked ? allSymbols : "";

    if (allChars === "" || allChars.length === 0) {
        return "";
    }

    let genPassword = "";
    for (let i = 1; i <= length; i++) {
        genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    return genPassword;

}

function generatePasswordOnClick(lowercase, uppercase, numbers, symbols, inputSlider, passBox) {
    passBox.value = generatePassword(lowercase, uppercase, numbers, symbols, inputSlider.value);
}

function copyPasswordToClipboard(passBox, copyIcon) {
    
    if (passBox.value !== "" && passBox.value.length >= 1) {
        navigator.clipboard.writeText(passBox.value)
            .then(() => {
                copyIcon.innerText = "check";
                copyIcon.title = "Password Copied";

                setTimeout(() => {
                    copyIcon.innerHTML = "content_copy";
                    copyIcon.title = "";
                }, 3000);
            })
            .catch((error) => {
                console.error("Failed to copy password to clipboard: ", error);
            });
    }
}

function copyPasswordOnClick(passBox, copyIcon) {
    if (passBox.value !== "" && passBox.value.length >= 1) {
        copyPasswordToClipboard(passBox, copyIcon);
    }
}

initializeUI();
