let url = "https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json";

fetch(url).then(function (resposta) {
    return resposta.json();
}).then(function (articles) {
    console.log(articles);
    addArticle(articles);
});

function addArticle(json) {
    let box = document.querySelector(".noticias");
    box.innerHTML=""; //limpar o conteudo
    json.articles.forEach(function (articles) {
        let card = document.createElement("div");
        card.classList.add("card");
        box.appendChild(card);

        let h3 = document.createElement("h3");
        h3.innerText = articles.title;
        card.appendChild(h3);

        let p = document.createElement("p");
        p.innerText = articles.description;
        card.appendChild(p);

        let autor = document.createElement("h5");
        autor.innerText = articles.author;

        if(articles.author == null){
            autor.innerText = "Unknown Author";
        }
        card.appendChild(autor);

        let img = document.createElement("img");
        img.setAttribute("src", articles.urlToImage);
        card.appendChild(img);

        return card;
    });
}