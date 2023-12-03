const allStuff = document.getElementsByClassName("all-stuff").item(0);
const pagePrefab = document.getElementsByClassName("shop-page").item(0);
const allPages = document.getElementsByClassName("shop-pages").item(0);
const firstStuff = document.getElementsByClassName("stuff-main").item(0);

const newStuff = (img, title, description) => {
    const stuff = {
        img, title, description
    };
    return stuff;
};

const min = (a, b) => {
    if(a < b)
        return a;
    else
        return b;
};

const stuff = [newStuff("Images/BigPC.png", "Компьютер", "Мега крутой компьютер"),
                newStuff("Images/RedPC.jpg", "Другой комп", "Тоже неплох"),
                newStuff("Images/BigPC.png", "Компьютер", "Мега крутой компьютер"),
                newStuff("Images/RedPC.jpg", "Другой комп", "Тоже неплох"),
                newStuff("Images/BigPC.png", "Компьютер", "Мега крутой компьютер"),
                newStuff("Images/RedPC.jpg", "Другой комп", "Тоже неплох")];

const minimumOnOnePage = 4;

var pages = stuff.length / minimumOnOnePage;
for(let i = 0; i < pages - 1; i++)
    allPages.appendChild(pagePrefab.cloneNode());
for(let i = 0; i < pages; i++) {
    if(i == 0)
        allPages.children.item(i).style.backgroundColor = "#AA0060";
    allPages.children.item(i).textContent = i + 1;
    allPages.children.item(i).onclick = (event) => {
        while(allStuff.childElementCount > 1)
            allStuff.removeChild(allStuff.children.item(0));
        let first = allStuff.children.item(0);
        first.children.item(0).src = stuff[minimumOnOnePage * i]["img"];
        first.children.item(1).textContent = stuff[minimumOnOnePage * i]["title"];
        first.children.item(2).textContent = stuff[minimumOnOnePage * i]["description"];
        for(let j = 1; j < min(stuff.length - minimumOnOnePage * i, minimumOnOnePage); j++) {
            let cur = first.cloneNode(true);
            allStuff.appendChild(cur);
            cur.children.item(0).src = stuff[minimumOnOnePage * i + j]["img"];
            cur.children.item(1).textContent = stuff[minimumOnOnePage * i + j]["title"];
            cur.children.item(2).textContent = stuff[minimumOnOnePage * i + j]["description"];
        }

        for(let j = 0; j < pages; j++) {
            allPages.children.item(j).style.backgroundColor = "#302849";
            if(j == i)
                allPages.children.item(j).style.backgroundColor = "#AA0060";
        }
    }
}

firstStuff.children.item(0).src = stuff[0]["img"];
firstStuff.children.item(1).textContent = stuff[0]["title"];
firstStuff.children.item(2).textContent = stuff[0]["description"];

for(let i = 1; i < minimumOnOnePage; i++) {
    let curStuff = firstStuff.cloneNode(true);
    allStuff.appendChild(curStuff);
    curStuff.children.item(0).src = stuff[i]["img"];
    curStuff.children.item(1).textContent = stuff[i]["title"];
    curStuff.children.item(2).textContent = stuff[i]["description"];
}