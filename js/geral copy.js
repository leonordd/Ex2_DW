let url = "https://gutendex.com/books/";
let searchInput = document.querySelector(".data-search");
let books = [];
let desc = document.getElementById("desc");
//let nxt = document.getElementById("next");
let  isDescOrder = false;
var btnContainer = document.querySelector(".categorias");
var btns = btnContainer.getElementsByClassName("btn");

searchInput.addEventListener("input", e =>{
    const value = e.target.value.toLowerCase();
    //console.log(books);
    books.forEach(results =>{
        let isVisible = results.title.toLowerCase().startsWith(value);
        results.element.parentNode.classList.toggle("hide", !isVisible); //parent Node pq é o pai do elemento
    })

    for (var i = 0; i < btns.length; i++) {
          btns[i].classList.remove("active");
          btns[0].classList.add("active");
    }
    
})

/* código baseado em https://www.w3schools.com/howto/howto_js_filter_elements.asp */
function filterSelection(category) {
    books.forEach(book => {
        console.log(book.filter);

        // Verifica se a categoria está presente em algum dos elementos do array
        let isVisible = category === 'all' || book.filter.some(element => element.toLowerCase().includes(category));
        book.element.parentNode.classList.toggle("hide", !isVisible);
        console.log(isVisible);
    });
}

for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
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
        box.appendChild(results.element.parentNode);
    });

    if(isDescOrder){
        desc.innerText="Most Downloaded"
    }else{
        desc.innerText="Least Downloaded"
    }
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

        let cols = document.createElement("div");
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
        //h3.classList.add("overflow");
        card.appendChild(h3);

        let autor = document.createElement("h5");
        autor.innerText = results.authors.length > 0 ? results.authors[0].name : "Unknown Author";
        card.appendChild(autor);

        let img = document.createElement("img");
        img.setAttribute("src", results.formats["image/jpeg"]);
        card.appendChild(img);

        let d_count = document.createElement("div");
        d_count.innerText = results.download_count;
        card.appendChild(d_count);

        //return book;
        let book = { title: results.title, element: card, download_count: results.download_count, filter: results.subjects };
        //console.log(book.filter);
        return book;

    });
}

