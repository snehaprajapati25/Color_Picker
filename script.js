const hueSlider = document.getElementById('hue-slider');
const hexCode = document.getElementById('hex-code');
const colorBox = document.querySelector(".color-box");
const saveBtn = document.querySelector("#saveBtn");
const savedColors = document.querySelector(".saved-colors");
const spectrumTab = document.querySelector("#spectrumTab");
const savedTab = document.querySelector("#savedTab");
const spectrumSection = document.querySelector(".spectrum-section");
const savedSection = document.querySelector(".saved-section");

hueSlider.addEventListener('input', function(){
    const hue = hueSlider.value;

    const selectedColor = `hsl(${hue}, 100%, 50%)`;

    colorBox.style.background = selectedColor;

    hexCode.value = hslToHex(hue, 100, 50);
})

saveBtn.addEventListener('click', ()=>{
    const currentColor = hexCode.value;
    
    const colorItem = document.createElement('div');
    
    colorItem.classList.add("color-item");
    
    colorItem.innerHTML = `<div class="circle"></div>
    <span>${currentColor}</span>`;
    
    colorItem.querySelector('.circle').style.background = currentColor;
    
    savedColors.appendChild(colorItem)
})

//Show saved colors when "Saved" is clicked
savedTab.addEventListener("click", () => {
    spectrumSection.style.display = "none";
    savedSection.style.display = "block";
});

//Hide saved colors when "Spectrum" is clicked
spectrumTab.addEventListener("click", () => {
    spectrumSection.style.display = "block";
    savedSection.style.display = "none";
});

function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) {
        r = c;
        g = x;
    } 
    else if (h < 120) {
        r = x;
        g = c;
    } 
    else if (h < 180) {
        g = c;
        b = x;
    } 
    else if (h < 240) {
        g = x;
        b = c;
    } 
    else if (h < 300) {
        r = x;
        b = c;
    } 
    else {
        r = c;
        b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return "#" + [r, g, b]
        .map(value => value.toString(16).padStart(2, "0"))
        .join("");
}
