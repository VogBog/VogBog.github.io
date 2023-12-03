var isTop = true;

const header = document.querySelector("header");
const profile_menu = document.getElementsByClassName("profile-menu").item(0);

document.onscroll = (event) => {
    if(document.scrollingElement.scrollTop < 1) {
        if(!isTop)
            header.style.backgroundColor = "rgba(255, 255, 255, 0)";
        isTop = true;
    }
    else {
        if(isTop)
            header.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        isTop = false;
    }
}

function onProfileClick() {
    if(profile_menu.style.visibility == "visible")
        profile_menu.style.visibility = "hidden";
    else
        profile_menu.style.visibility = "visible";
}

function onGoMainClicked() {
    document.location.href = "index.html";
}

document.getElementsByClassName("profile-button").item(0).addEventListener("click", (event) => {
    document.location.href = "Profile.html";
});
document.getElementsByClassName("profile-button").item(1).addEventListener("click", (event) => {
    document.location.href = "Bucket.html";
});
document.getElementsByClassName("profile-button").item(2).addEventListener("click", (event) => {
    document.location.href = "CompudactilStore.html";
});
document.getElementsByClassName("profile-button").item(3).addEventListener("click", (event) => {
    document.location.href = "LoginSignup.html";
});