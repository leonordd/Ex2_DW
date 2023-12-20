let url = "https://gutendex.com/books/";
let searchInput = document.querySelector(".data-search");
let books = [];
let desc = document.getElementById("desc");
//let nxt = document.getElementById("next");
let  isDescOrder = false;


searchInput.addEventListener("input", e =>{
    const value = e.target.value.toLowerCase();
    //console.log(books);
    books.forEach(results =>{
        let isVisible = results.title.toLowerCase().startsWith(value);
        results.element.classList.toggle("hide", !isVisible);
    })
})

/* código baseado em https://www.w3schools.com/howto/howto_js_filter_elements.asp */
function filterSelection(category) {
    books.forEach(book => {
        console.log(book.filter);

        // Verifica se a categoria está presente em algum dos elementos do array
        let isVisible = category === 'all' || book.filter.some(element => element.toLowerCase().includes(category));
        book.element.classList.toggle("hide", !isVisible);
        console.log(isVisible);
    });
}

desc.addEventListener("click", function(){
    // Ordenar os livros com base na contagem de downloads
    isDescOrder = !isDescOrder;

    // Ordenar os livros com base na nova direção
    books.sort((a, b) => (isDescOrder ? a.download_count - b.download_count : b.download_count - a.download_count));
    
    let box = document.querySelector(".books");
    box.innerHTML = "";
    books.forEach(results => {
        box.appendChild(results.element);
    });
});


// Chamar a função para carregar os resultados no carregamento da página
window.addEventListener("load", function() {
    fetch(url).then(function (resposta) {
        return resposta.json();
    }).then(function (results) {
        //console.log(results); 
        addResult(results);
        //console.log(results.results[0].subjects);
    });
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

        //return book;
        let book = { title: results.title, element: card, download_count: results.download_count, filter: results.subjects };
        //console.log(book.filter);
        return book;

    });
}

