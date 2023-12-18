let url = "https://gutendex.com/books/";
let searchInput = document.querySelector(".data-search");
let books = [];
let asc = document.getElementById("asc");
let desc = document.getElementById("desc");
const SORT_YEAR_ASC = function(a, b) {
    return a.download_count - b.download_count;
};

const SORT_YEAR_DESC = function(a, b) {
    return b.download_count - a.download_count;
};

searchInput.addEventListener("input", e =>{
    const value = e.target.value.toLowerCase();
    //console.log(books);
    books.forEach(results =>{
        //let isVisible = results.title.toLowerCase().includes(value);
        let isVisible = results.title.toLowerCase().startsWith(value);
        results.element.classList.toggle("hide", !isVisible);
    })
})

asc.addEventListener("click", function(){
    // Ordenar os livros com base na contagem de downloads
    books.sort(SORT_YEAR_ASC);
    
    let box = document.querySelector(".books");
    box.innerHTML = "";
    books.forEach(results => {
        box.appendChild(results.element);
    });
});

desc.addEventListener("click", function(){
    // Ordenar os livros com base na contagem de downloads
    books.sort(SORT_YEAR_DESC);
    
    let box = document.querySelector(".books");
    box.innerHTML = "";
    books.forEach(results => {
        box.appendChild(results.element);
    });
});

fetch(url).then(function (resposta) {
    return resposta.json();
}).then(function (results) {
    console.log(results); 
    addResult(results);
});


function addResult(json) {
    let box = document.querySelector(".books");

    box.innerHTML=""; //limpar o conteudo
    books = json.results.map(function (results) {
        let card = document.createElement("div");
        card.classList.add("card");
        box.appendChild(card);

        let h3 = document.createElement("h3");
        h3.innerText = results.title;
        card.appendChild(h3);

        let autor = document.createElement("h5");
        autor.innerText = results.authors.length > 0 ? results.authors[0].name : "Unknown Author";
        card.appendChild(autor);

        let d_count = document.createElement("div");
        d_count.innerText = results.download_count;
        card.appendChild(d_count);


        let img = document.createElement("img");
        img.setAttribute("src", results.formats["image/jpeg"]);
        card.appendChild(img);

        //return card;
        let book = { title: results.title, element: card, download_count: results.download_count };
        return book;
    });
}

