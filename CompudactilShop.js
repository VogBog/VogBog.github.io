const allStuff = document.getElementsByClassName("all-stuff").item(0);
const pagePrefab = document.getElementsByClassName("shop-page").item(0);
const allPages = document.getElementsByClassName("shop-pages").item(0);
const firstStuff = document.getElementsByClassName("stuff-main").item(0);

const newStuff = (img, title, description, cost) => {
    const stuff = {
        img, title, description, cost
    };
    return stuff;
};

const min = (a, b) => {
    if(a < b)
        return a;
    else
        return b;
};

const stuff = [newStuff("Images/RedPC.jpg", "Сборка Intel Core i9 + RTX 4090", "Intel Core i9-12900KF, NVidia GeForce RTX 4090, 32 GB RAM, SSD 2 TB", "2.150.000 ₽"),
                newStuff("Images/AlienWareProduct.png", "Монитор AlienWare", "Диагональ 27 '', Разрешение 1440р, Частота 280 Гц, Время отклика 0.1 мс", "100.000 ₽"),
                newStuff("Images/GamingMouse.png", "HyperX мышь", "Разрешение оптического сенсора 16000 dpi, мега лёгкая", "5.000 ₽"),
                newStuff("Images/GeForceRTX4090.png", "NVidia GeForce RTX 4090", "Видеокарта, про которую можно ничего не писать, вы и так всё знаете", "1.550.000 ₽"),
                newStuff("Images/HyperPCBuild.jpeg", "Сборка HyperPC", "Intel Core i9-12900KF, NVidia GeForce RTX 4090, 32 GB RAM, SSD 2 TB, Водяное охлаждение, кастомный дизайн", "2.000.000 ₽")];

const minimumOnOnePage = 4;

var pages = stuff.length / minimumOnOnePage;
for(let i = 0; i < pages - 1; i++)
    allPages.appendChild(pagePrefab.cloneNode());
for(let i = 0; i < pages; i++) {
    if(i == 0)
        allPages.children.item(i).style.backgroundColor = "#AA0060";
    allPages.children.item(i).textContent = i + 1;
    allPages.children.item(i).onclick = (event) => {
        allStuff.innerHTML = "";

        for(let j = 0; j < min(stuff.length - minimumOnOnePage * i, minimumOnOnePage); j++) {
            allStuff.innerHTML += '<span class="stuff-main">'+
            '<span class="cost">'+
                stuff[minimumOnOnePage * i + j]["cost"] +
            '</span>'+
            '<img src="' + stuff[minimumOnOnePage * i + j]["img"] + '" alt="RedPC" class="stuff-image">'+
            '<span class="stuff-name">'+
                stuff[minimumOnOnePage * i + j]["title"] +
            '</span>' +
            '<span class="stuff-description">' +
                stuff[minimumOnOnePage * i + j]["description"] +
            '</span>' +
        '</span>';
        }

        for(let j = 0; j < pages; j++) {
            allPages.children.item(j).style.backgroundColor = "#302849";
            if(j == i)
                allPages.children.item(j).style.backgroundColor = "#AA0060";
        }
    }
}

allStuff.innerHTML = "";
for(let i = 0; i < minimumOnOnePage; i++) {
    allStuff.innerHTML += '<span class="stuff-main">'+
            '<span class="cost">'+
                stuff[i]["cost"] +
            '</span>'+
            '<img src="' + stuff[i]["img"] + '" alt="RedPC" class="stuff-image">'+
            '<span class="stuff-name">'+
                stuff[i]["title"] +
            '</span>' +
            '<span class="stuff-description">' +
                stuff[i]["description"] +
            '</span>' +
        '</span>';
}