let url = "https://gutendex.com/books/";
let searchInput = document.querySelector(".data-search");
let books = [];
let desc = document.getElementById("desc");
let isDescOrder = false;
let btnContainer = document.querySelector(".categorias");
let btns = btnContainer.getElementsByClassName("btn");
let currentCategory = "all";

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();

    //função trim garante que não se contam os "espaços em branco"
    //Se houver texto na barra de pesquisa
    if (value.trim() !== "") {
        books.forEach((results) => {
            // Verifica se a categoria está presente em algum dos elementos do array
            let isVisible = (currentCategory === 'all' || results.filter.some((element) => element.toLowerCase().includes(currentCategory))) && results.title.toLowerCase().startsWith(value);
            results.element.parentNode.classList.toggle("hide", !isVisible);
        });
    } else {  //Se a barra de pesquisa estiver vazia
        filterSelection(currentCategory);  //os livros da categoria selecionada voltam a estar todos ativos
    }

    for (var i = 0; i < btns.length; i++) {
        btns[i].classList.remove("active"); // Remove a classe "active" de todos os botões
        // Adiciona a classe "active" à categoria atual
        if (currentCategory === btns[i].getAttribute("onclick").split("'")[1]) {
            btns[i].classList.add("active");
        }
    }
})

/* código baseado em https://www.w3schools.com/howto/howto_js_filter_elements.asp */
function filterSelection(category) {
    // Atualiza a categoria atual
    currentCategory = category;
    books.forEach((book) => {
        //console.log(book.filter);
        // Verifica se a categoria está presente em algum dos elementos do array
        let isVisible = category === 'all' || book.filter.some(element => element.toLowerCase().includes(category));
        book.element.parentNode.classList.toggle("hide", !isVisible);
        //console.log(isVisible);
    });
}

function runFunction() {
    isDescOrder = !isDescOrder;
    // Ordenar os livros com base na nova direção
    //faz o mesmo que a "const SORT_ALPHA_TITLE" do exemplo que o professor forneceu na aula (adaptado)
    //https://codepen.io/bee-arcade/pen/xdYLpP/1169a5760153ee5f6877a8b6f7c30521
    //verifica se a função está ordenada de forma crescente e descrescente e retorna o valor -1, 1,0
    books.sort(function(a, b) {
        if (isDescOrder) {
          if (a.download_count > b.download_count) {
            return 1;
          } else if (a.download_count < b.download_count) {
            return -1;
          } else {
            return 0;
          }
        } else {
          if (a.download_count < b.download_count) {
            return 1;
          } else if (a.download_count > b.download_count) {
            return -1;
          } else {
            return 0;
          }
        }
    });

    let box = document.querySelector(".books");
    box.innerHTML = "";
    books.forEach(results => {
        box.appendChild(results.element.parentNode);
    });
}

//percorre o array de todos os botões de categoria
for (var i = 0; i < btns.length; i++) {
    //ao clicar um botão, altera a classe do botão que anteriormente estava ativo para "" e coloca active no btn que foi clicado
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}

// Chamar a função para carregar os resultados no carregamento da página
window.addEventListener("load", function () {
    fetch(url).then(function (resposta) {
        return resposta.json();
    }).then(function (results) {
        //console.log(results); 
        addResult(results);
        //console.log(results.results[0].subjects);
    });
});

//função que cria cada um dos elementos "book"
function addResult(json) {
    let box = document.querySelector(".books");

    box.innerHTML = ""; //limpar o conteudo
    books = json.results.map(function (results) {

        let cols = document.createElement("div");
        cols.classList.add("col-xm-6");
        cols.classList.add("col-m-3");
        cols.classList.add("col-t-4");
        cols.classList.add("col-d-2");
        box.appendChild(cols);

        let card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("box-row");
        cols.appendChild(card);

        let h3 = document.createElement("h3");
        h3.innerText = results.title;
        card.appendChild(h3);

        let autor = document.createElement("h5");
        autor.innerText = results.authors.length > 0 ? results.authors[0].name : "Unknown Author";
        card.appendChild(autor);

        let img = document.createElement("img");
        img.setAttribute("src", results.formats["image/jpeg"]);
        card.appendChild(img);

        let download = document.createElement("div");
        download.classList.add("download");
        card.appendChild(download);

        let d_count = document.createElement("div");
        d_count.innerText = results.download_count;
        download.appendChild(d_count);

        let d_img = document.createElement("img");
        d_img.src = "../data/dowload.svg"
        download.appendChild(d_img);

        let book = { title: results.title, element: card, download_count: results.download_count, filter: results.subjects };
        return book;

    });
}