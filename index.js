const colorInput = document.getElementById("color-input");
const optionInput = document.getElementById("scheme-input");
const colorDisplayEl = document.getElementById("scheme-display");
let colorScheme = [];

document.getElementById("get-scheme-btn").addEventListener("click", () => {
    const colorInputValue = colorInput.value.replace("#", "");
    const optionValue = optionInput.value;
    
    fetchPallet(colorInputValue, optionValue);
});

colorDisplayEl.addEventListener("click", async (e) => {
    const parentDiv = e.target.closest(".scheme")
    if (parentDiv) {
        const hexCode = parentDiv.dataset.hex;
        try {
            await navigator.clipboard.writeText(hexCode);
            const tooltip = document.getElementById("tooltip");
            tooltip.style.top = `${e.pageY + 5}px`;
            tooltip.style.left = `${e.pageX + 5}px`;

            tooltip.style.display = "block";

            setTimeout(() => {
                tooltip.style.display = "none";
            }, 1500);
        } catch (err) {
            console.error("Clipboard error: ", err);
        }
    }
});

async function fetchPallet(color, option) {
    const url = `https://www.thecolorapi.com/scheme?hex=${color}&mode=${option}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        colorScheme = data.colors;
        updateSchemeDisplay();

    } catch (err) {
        colorDisplayEl.textContent = "Unable to generate a color scheme. Please try again later.";
        console.error("Color API request error: ", err);
    }
}

function updateSchemeDisplay() {
    let colorSchemeElements = "";
    for (let color of colorScheme) {
        colorSchemeElements += `
            <div class="scheme" data-hex="${color.hex.value}">
                <div class="scheme-color" style="background-color:${color.hex.value}"></div>
                <p>${color.hex.value}</p>

            </div>
        `;
    }
    
    colorDisplayEl.innerHTML = colorSchemeElements
}