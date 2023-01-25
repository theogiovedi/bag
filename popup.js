function bagCurrentPage() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const url = tabs[0].url;
        const title = tabs[0].title;
        const article = {
            title: title,
            read: false
        }
        localStorage.setItem(url, JSON.stringify(article))
        alert("Article sucessfully stored in Bag");
    });
}

function openBag() {
    window.open('./bag.html')
}

function showStats() {
    const total = localStorage.length;
    let read, toRead;
    read = toRead = 0;
    for (let i = 0; i <= total - 1; i++) {
        const haveRead = JSON.parse(localStorage.getItem(localStorage.key(i))).read;
        if (!haveRead) {
            toRead++;
        } else {
            read++;
        }
    }
    const message = "You have " + total + " articles stored in Bag, which " + toRead + " haven't been read and " + read + " have already been read.";
    alert(message);
}

const bagPage = document.getElementById("bag-page");
const bagList = document.getElementById("bag-list");
const bagStats = document.getElementById("bag-stats");
bagPage.addEventListener("click", bagCurrentPage);
bagList.addEventListener("click", openBag);
bagStats.addEventListener("click", showStats);