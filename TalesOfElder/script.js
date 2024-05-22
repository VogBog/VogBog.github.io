saved_obj = localStorage.getItem("skill")

function openInfo(index) {
    let name = document.getElementById("name")
    let description = document.getElementById('description')
    if(name == null) {
        let flex = document.getElementsByClassName('horizontal-flex').item(0)
        let info_block = info_block_prefab.cloneNode(true)
        flex.appendChild(info_block)
        setTimeout(openInfo(index), 100)
    }
    else {
        const rim = [
            'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII',
            'XIV', 'XV', 'XVI'
        ]
        name.innerText = rim[index - 1];
        description.innerHTML = getDescription(index)
    }
}

function deleteData() {
    localStorage.removeItem("skill")
    saved_obj = null;
    closeInfo();
}

function onFileLoad(file) {
    if(file != null) {
        let reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function() {
            json_obj = JSON.parse(reader.result)
            if(json_obj['header'] == 'Tales of Elder tree data pack') {
                saved_obj = reader.result
                localStorage.setItem("skill", reader.result)
                let description = document.getElementById('description')
                description.innerText = reader.result;
            }
        }
    }
}

function getDataByCode(code, description) {
    let path = '0'
    if(code == '090204') {
        path = 'sirmeros.json'
    }
    else if(code == '5209') {
        path = 'ravia.json'
    }
    else if(code == '1945w') {
        path = 'vily.json'
    }
    else {
        description.innerText = 'Такой шаблон не существует.'
        return
    }

    let xhr = new XMLHttpRequest()
    xhr.open('GET', path, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onload = function() {
        if(xhr.status >= 200 && xhr.status < 300) {
            let data = xhr.responseText
            if(JSON.parse(data)['header'] != 'Tales of Elder tree data pack') {
                description.innerText = "Произошла ошибка со стороны разработчика-дебила, который загрузил не тот файл."
                return;
            }
            if (data != null) {
                saved_obj = data
                localStorage.setItem("skill", data)
                description.innerText = "Шаблон загружен"
                return;
            }
        }
        description.innerText = "Произошла ошибка " + xhr.status + " Возможно, такой шаблон не найден"
    }
    xhr.onerror = function() {
        description.innerText = "Произошла ошибка: " + xhr.status
    }
    xhr.send()
}

function getDescription(index) {
    let skill = saved_obj
    if(skill == null) {
        skill = localStorage.getItem("skill")
    }
    if(skill == null) {
        const result = 'Нужно загрузить Ваш json файл с Вашими способностями или выбрать готовый шаблон'
        setTimeout(() => {
            let description = document.getElementById('description')
            if(description != null) {
                let input = document.createElement('input')
                input.type = 'file'
                input.onchange = () => {
                    onFileLoad(input.files[0])
                    description.innerText = "Загружен файл " + input.files[0].name;
                }
                description.appendChild(input)

                let button = document.createElement('button')
                button.innerText = 'Выбрать готовый'
                button.onclick = function() {
                    while(description.childElementCount > 0) {
                        description.removeChild(description.children.item(0))
                    }
                    description.innerText = "Введите код шаблона:";
                    input = document.createElement('input')
                    input.type = 'text'
                    description.appendChild(input)
                    let okButton = document.createElement('button')
                    okButton.innerText = "ОК"
                    okButton.onclick = function() {
                        data = input.value
                        while(description.childElementCount > 0) {
                            description.removeChild(description.children.item(0))
                        }
                        getDataByCode(data, description)
                    }
                    description.appendChild(okButton)
                }
                description.appendChild(button)
            }
        }, 500)
        return result
    }
    else {
        skillObj = JSON.parse(skill)
        if(skillObj[index] != undefined) {
            return skillObj[index]
        }
        return "Кажется, эта способность не вписана в json файл"
    }
}

function closeInfo() {
    const span = document.getElementById("info-block")
    span.parentNode.removeChild(span)
}

const info_block_prefab = document.getElementById('info-block').cloneNode(true)
const btns = []
const lefts = []
const tops = []
const glow_effect = document.getElementById('glow-effect')
let glow_left = 0
let glow_top = 0
let last_button = null

function createButton(index, left, top) {
    const img_screen = document.getElementById("after-image-screen");
    const sizes = document.getElementsByClassName("atlas-background").item(0).getBoundingClientRect();
    const btn = document.createElement("span")
    btn.className = "button-custom"
    img_screen.appendChild(btn)
    const ratio = sizes.width / 974
    resizeBtn(btn, ratio, left, top)
    btn.onclick = () => {
        openInfo(index)
        glow_effect.style.visibility = 'visible'
        glow_left = left - 35
        glow_top = top - 35
        glow_effect.style.left = glow_left * ratio - scrollValue + 'px';
        glow_effect.style.top = glow_top * ratio + 'px';
        if(last_button != null) {
            last_button.classList.remove('button-choosen')
        }
        last_button = btn
        last_button.classList.add('button-choosen')
    }
    btns.push(btn)
    lefts.push(left)
    tops.push(top)
}

function resize_all_buttons() {
    const sizes = document.getElementsByClassName("atlas-background").item(0).getBoundingClientRect();
    for(let i = 0; i < btns.length; i++) {
        resizeBtn(btns[i], sizes.width / 974, lefts[i], tops[i])
    }
    resizeBtn(glow_effect, sizes.width / 974, glow_left, glow_top)
}

function set_visible_to_all(visible) {
    for(let i = 0; i < btns.length; i++) {
        btns[i].style.visibility = visible
    }
    glow_effect.style.visibility = visible
}

const scrollView = document.getElementById('image-screen')
let scrollValue = 0
let isScrolling = false
scrollView.onscroll = () => {
    scrollValue = scrollView.scrollLeft
    if(!isScrolling) {
        isScrolling = true
        set_visible_to_all('hidden')
    }
}
scrollView.onscrollend = () => {
    isScrolling = false
    set_visible_to_all('visible')
    resize_all_buttons()
}

function resizeBtn(btn, ratio, left, top) {
    left -= 11
    top -= 11
    btn.style.left = (left * ratio) - scrollValue + 'px';
    btn.style.top = (top * ratio) + 'px';
    btn.style.width = (85 * ratio) + 'px';
    btn.style.height = (80 * ratio) + 'px';
}

window.addEventListener('resize', () => {
    resize_all_buttons()
})

createButton(1, 458, 868)
createButton(2, 228, 768)
createButton(3, 228, 540)
createButton(4, 90, 382)
createButton(5, 90, 50)
createButton(6, 228, 256)
createButton(7, 285, 50)
createButton(8, 458, 605)
createButton(9, 458, 372)
createButton(10, 456, 128)
createButton(11, 685, 761)
createButton(12, 685, 541)
createButton(13, 685, 256)
createButton(14, 646, 50)
createButton(15, 836, 372)
createButton(16, 836, 50)

closeInfo()