let searchInputEle = document.getElementById("searchInput");
let searchResultsEle = document.getElementById("searchResults");
let spinnerEle = document.getElementById("spinner");
let messageEle = document.getElementById("message");
let headingEle = document.createElement("h1");

function createAndAppendSearchResults(search_results) {
    if (search_results.length < 1) {
        messageEle.textContent = "No results found";
        searchResultsEle.textContent = "";
        headingEle.textContent = "";
    } else {
        searchResultsEle.textContent = "";
        messageEle.textContent = "";
        headingEle.textContent = "Popular Books";
        searchResultsEle.appendChild(headingEle);
        for (let eachItem of search_results) {
            let title = eachItem.title;
            let image = eachItem.imageLink;
            let author = eachItem.author;
            let imageEle = document.createElement("img");
            let textEle = document.createElement("p");
            imageEle.setAttribute("src", image);
            textEle.textContent = author;
            searchResultsEle.appendChild(imageEle);
            searchResultsEle.appendChild(textEle);
            console.log(eachItem);
        }
    }
}

searchInputEle.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinnerEle.classList.toggle("d-none");
        let searchInputValue = searchInputEle.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                createAndAppendSearchResults(search_results);
                spinnerEle.classList.toggle("d-none");
            });

    }
});