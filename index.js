const colorInput = document.getElementById("color-input");
const optionInput = document.getElementById("scheme-input");
let colorScheme = [];

document.getElementById("get-scheme-btn").addEventListener("click", () => {
    const colorInputValue = colorInput.value.replace("#", "");
    const optionValue = optionInput.value;
    
    fetchPallet(colorInputValue, optionValue);
});

function fetchPallet(color, option) {
    const url = `https://www.thecolorapi.com/scheme?hex=${color}&mode=${option}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            colorScheme = data.colors;
            updateSchemeDisplay();
        });
}

function updateSchemeDisplay() {
    // document.getElementById("scheme-display")
    let colorSchemeElements = "";
    for (let color of colorScheme) {
        colorSchemeElements += `
            <div class="scheme">
                <div class="scheme-color" style="background-color:${color.hex.value}"></div>
                <p>${color.hex.value}</p>
            </div>
        `;
    }
    
    document.getElementById("scheme-display").innerHTML = colorSchemeElements
}