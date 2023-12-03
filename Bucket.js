function removeItem(objectName) {
    let cost = 0;
    let items = document.getElementsByClassName("bucket-item");
    for(let i = 0; i < items.length; i++) {
        if(items[i].getElementsByClassName("bucket-title").item(0).textContent.trim() == objectName) {
            items[i].parentNode.removeChild(items[i]);
            break;
        }
    }
    for(let i = 0; i < items.length; i++) {
        let costTxt = items[i].getElementsByClassName("bucket-cost").item(0).textContent.trim();
        while(costTxt.includes('.'))
            costTxt = costTxt.replace('.', '');
        cost += parseInt(costTxt.substring(0, costTxt.length - 1));
    }
    let costTxt = cost.toString();
    for(let i = costTxt.length - 4; i >= 0; i -= 3) {
        costTxt = costTxt.substring(0, i + 1) + "." + costTxt.substring(i + 1, costTxt.length);
    }
    document.getElementsByClassName("all-cost").item(0).textContent = "Итого: " + costTxt + " ₽";
}