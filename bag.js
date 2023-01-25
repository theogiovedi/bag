function listArticles() {
    // Clear previous list
    const list = document.getElementById("article-list");
    list.innerHTML = "";
    const center = document.getElementById("center");
    center.innerHTML = "";

    let i;
    for (i = 0; i <= localStorage.length - 1; i++) {

        const url = localStorage.key(i);
        const title = JSON.parse(localStorage.getItem(localStorage.key(i))).title;
        const read = JSON.parse(localStorage.getItem(localStorage.key(i))).read;

        // Article Item
        const li = document.createElement("li");
        li.classList.add("article-item");
        li.id = i;
        list.append(li);

        // Article Info
        const div = document.createElement("div");
        div.classList.add("article-info");
        li.append(div);
        div.addEventListener("click", function () {
            openUrl(url);
        });
        div.title = title;

        // Article Title
        const articleTitle = document.createElement("span");
        articleTitle.classList.add("article-title");
        div.append(articleTitle);
        articleTitle.innerText = title.length > 60 ? title.substring(0, 57) + "..." : title;

        // Article URL
        const articleUrl = document.createElement("span");
        articleUrl.classList.add("article-url");
        div.append(articleUrl);
        articleUrl.innerText = url.length > 75 ? url.substring(0, 72) + "..." : url;

        // Mark as Read Button
        const markRead = document.createElement("button");
        markRead.title = "Toggle Read"
        markRead.classList.add("article-button");
        markRead.addEventListener("click", function () {
            toggleRead(url);
        });
        li.append(markRead);

        // Mark as Read Icon
        const markReadIcon = document.createElement("i");
        markRead.append(markReadIcon);

        // Remove Button
        const remove = document.createElement("button");
        remove.title = "Remove article";
        remove.classList.add("article-button");
        li.append(remove);

        // Remove Icon
        const removeIcon = document.createElement("i");
        removeIcon.classList.add("bi", "bi-x-lg");
        remove.append(removeIcon);
        remove.addEventListener("click", function () {
            removeArticle(url);
        });

        if (read) {
            div.classList.toggle("article-read-border");
            articleTitle.classList.toggle("article-read");
            articleUrl.classList.toggle("article-read");
            markRead.classList.toggle("article-read");
            markRead.classList.toggle("article-read-border");
            remove.classList.toggle("article-read");
            remove.classList.toggle("article-read-border");
            markReadIcon.classList.add("bi", "bi-eye-slash");
        } else {
            markReadIcon.classList.add("bi", "bi-eye");
        }
    }

    if (i != 0) {
        const removeAll = document.createElement("span");
        center.append(removeAll);
        removeAll.classList.add("remove-all");
        removeAll.id = "remove-all";
        removeAll.innerHTML = "Remove all articles";
        removeAll.addEventListener("click", removeAllArticles);
    } else {
        const emptyList = document.createElement("span");
        center.append(emptyList);
        emptyList.classList.add("empty-list");
        emptyList.innerHTML = "Congratulations! You have read all your articles.";
    }
}

function openUrl(url) {
    window.open(url);
    listArticles();
}

function toggleRead(url) {
    const article = JSON.parse(localStorage.getItem(url));
    if (!article.read) {
        article.read = true;
    } else {
        article.read = false;
    }
    localStorage.setItem(url, JSON.stringify(article));
    listArticles();
}

function removeArticle(url) {
    localStorage.removeItem(url);
    listArticles();
}

function removeAllArticles() {
    localStorage.clear();
    listArticles();
}

listArticles();