saved_obj = localStorage.getItem("skill")
studied_skills = JSON.parse(localStorage.getItem("studied_skills"))
let choosen_skill_index = 0

const skills_relations = {
    1: 0, 2: 0, 11: 0,
    3: [2], 8: [1], 12: [11],
    4: [2,3], 6: [3], 9: [3,8,12], 13: [12], 15: [11, 12],
    5: [4,6], 7:[6], 10:[9], 14:[13], 16:[13, 15]
}

function openInfo(index) {
    choosen_skill_index = index
    update_glow_effects_on_studied_skills()
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
        const colors = [
            '#D6E1D0', '#E4DA89', '#EBD76A', '#ffcc00'
        ]
        const index_to_color = [
            0, 0, 1, 2, 3, 2, 3, 1, 2, 3, 0, 1, 2, 3, 2, 3
        ]
        name.innerText = rim[index - 1];
        name.style.color = colors[index_to_color[index - 1]]
        description.innerHTML = getDescription(index)
    }

    let studyBtn = document.getElementById('study-or-forgot-btn')
    const c = canStudyThisSkill(index)
    if(c == 0) {
        studyBtn.style.visibility = 'hidden'
    }
    else {
        studyBtn.style.visibility = 'visible'
    }
    if(c == 2) {
        studyBtn.innerText = 'Забыть'
        if(!studyBtn.classList.contains('remove-study-button')) {
            studyBtn.classList.add('remove-study-button')
        }
    }
    else {
        studyBtn.innerText = 'Изучить'
        if(studyBtn.classList.contains('remove-study-button')) {
            studyBtn.classList.remove('remove-study-button')
        }
    }
}

function study() {
    if(canStudyThisSkill(choosen_skill_index) == 1) {
        if(studied_skills == null || studied_skills.skills == null) {
            studied_skills = {
                skills: [ choosen_skill_index ]
            }
        }
        else {
            studied_skills.skills.push(choosen_skill_index)
        }
        localStorage.setItem('studied_skills', JSON.stringify(studied_skills))
        update_glow_effects_on_studied_skills()
        openInfo(choosen_skill_index)
    }
    else if(canStudyThisSkill(choosen_skill_index) == 2) {
        let isRemoveSome = true
        let removed_skills = [choosen_skill_index]
        while(isRemoveSome) {
            isRemoveSome = false;
            for(let i = 0; i < studied_skills.skills.length; i++) {
                if(removed_skills.includes(studied_skills.skills[i]))
                    continue
                const arr = skills_relations[studied_skills.skills[i]]
                for(let j = 0; j < arr.length; j++) {
                    if(removed_skills.includes(arr[j])) {
                        removed_skills.push(studied_skills.skills[i])
                        isRemoveSome = true;
                        break;
                    }
                }
            }
        }
        let new_arr = []
        for(let i = 0; i < studied_skills.skills.length; i++) {
            if(!removed_skills.includes(studied_skills.skills[i])) {
                new_arr.push(studied_skills[i])
            }
        }
        studied_skills.skills = new_arr
        localStorage.setItem('studied_skills', JSON.stringify(studied_skills))
        update_glow_effects_on_studied_skills()
        closeInfo()
    }
}

function update_glow_effects_on_studied_skills() {
    for(let i = 0; i < btns.length; i++) {
        let c = canStudyThisSkill(i + 1)
        let a = btns[i].getElementsByClassName('glow-effect').item(0)
        a.style.visibility = c == 0 || i + 1 == choosen_skill_index ? 'hidden' : 'visible'
        if(c == 1) {
            a.style.background = '#00ffcc7b';
        }
        else {
            a.style.background = '#00ff007b';
        }
    }
}

function clear_skills() {
    studied_skills = null;
}

function canStudyThisSkill(index) {
    if(saved_obj == null)
        return 0;
    if(index == 1 || index == 2 || index == 11) {
        if(studied_skills == null || studied_skills.skills == null || studied_skills.skills.length == 0) {
            return 1;
        }
        else if(studied_skills.skills.includes(index)) {
            return 2;
        }
        else if(studied_skills.skills.includes(1)) {
            return 1;
        } 
        else if(index == 2 && !studied_skills.skills.includes(1) ||
                index == 11 && !studied_skills.skills.includes(1)) {
                    return 0;
                }
        else {
            return 1;
        }
    }
    if(studied_skills == null || studied_skills.skills == null || studied_skills.skills.length == 0)
        return 0;
    if(studied_skills.skills.includes(index)) {
        return 2;
    }
    let arr = skills_relations[index]
    for(let i = 0; i < arr.length; i++) {
        if(studied_skills.skills.includes(arr[i])) {
            return 1;
        }
    }
    return 0;
}

function deleteData() {
    choosen_skill_index = 0;
    localStorage.removeItem("skill")
    saved_obj = null;
    update_glow_effects_on_studied_skills()
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
                update_glow_effects_on_studied_skills()
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
                update_glow_effects_on_studied_skills()
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
    const glow = document.createElement("span")
    glow.classList.add('glow-effect')
    btn.appendChild(glow)
    btn.className = "button-custom"
    img_screen.appendChild(btn)
    const ratio = sizes.width / 974
    resizeBtn(btn, ratio, left, top)
    btn.onclick = function() {
        openInfo(index)
        glow_effect.style.visibility = 'visible'
        glow_left = left - 25
        glow_top = top - 25
        resizeBtn(glow_effect, ratio, glow_left, glow_top)
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
        btns[i].getElementsByClassName('glow-effect').item(0).style.visibility = 'hidden'
    }
    glow_effect.style.visibility = visible
    if(choosen_skill_index == 0) {
        glow_effect.style.visibility = 'hidden'
    }
    if(visible == 'visible') {
        update_glow_effects_on_studied_skills()
    }
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
    const l = left - 11
    const t = top - 11
    btn.style.left = (l * ratio) - scrollValue + 'px';
    btn.style.top = (t * ratio) + 'px';
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
update_glow_effects_on_studied_skills()

closeInfo()