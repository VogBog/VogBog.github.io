var isAdListed = false;

const stuffTypesSliderContainer = document.getElementById("stuff-types-container")
const stuffTypeSelectorStyle = document.getElementById("stuff-type-selector")?.style;
const stuffScroll = document.getElementsByClassName("all-stuff");

const delay = ms => new Promise(res => setTimeout(res, ms));

function stuffTypeButtonClicked(index) {
    let rect = stuffTypesSliderContainer.children.item(index).getBoundingClientRect();
    let offset = stuffTypesSliderContainer.children.item(0).getBoundingClientRect().x;
    stuffTypeSelectorStyle.left = rect.x - offset + 10 + "px";
    stuffTypeSelectorStyle.width = rect.width + "px";
}

if(stuffTypeSelectorStyle != null)
    stuffTypeButtonClicked(0);

async function advertismentTimer() {
    const adImg1 = document.getElementById("adImg1");
    const adImg2 = document.getElementById("adImg2");
    const adImgDiv = document.getElementById("adDiv1");
    const adImgDivSecond = document.getElementById("adDiv2");
    const adText = document.getElementsByClassName("black-back-for-words").item(0);
    let i = 0;
    let texts = ['Новый монитор ALIENWARE', 'Мега сборка HyperPC', 'NVIDIA GeForce RTX 4090!'];
    let images = ['Images/ALINEWARE monitor.jpg', 'Images/HyperPCBuild.jpg', 'Images/RTX4090.jpg'];

    while(true) {
        await delay(15000);
        if(isAdListed) {
            isAdListed = false;
        }
        else {
            i = (i + 1) % texts.length;
            adText.textContent = texts[i];
            adImg2.src = images[i];
            adImgDiv.style.opacity = 0;
            await delay(1000);
            adImg1.src = images[i];
            adImgDiv.style.opacity = 1;
            await delay(1000);
        }
    }
}

advertismentTimer();