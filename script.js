// script.js
document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById("gallery");
    const searchInput = document.getElementById("search");

    //Funksion per te marre te dhenat nga API bazuar ne pet type
    function fetchData(petType) {
        fetch(`https://freetestapi.com/apis/${petType}`)
            .then(response => response.json())
            .then(data => {
                gallery.innerHTML = ""; 
                data.forEach(pet => {
                    const card = document.createElement("div");
                    card.classList.add("card");
                    card.innerHTML = `
                        <img src="${pet.image}" alt="${pet.name}">
                        <h3>${pet.name}</h3>
                        <p>${pet.origin}</p>
                    `;
                    gallery.appendChild(card);
                });
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    // Event listeners per pet type links
    document.getElementById("cats").addEventListener("click", function(event) {
        event.preventDefault();
        fetchData("cats");
    });

    document.getElementById("dogs").addEventListener("click", function(event) {
        event.preventDefault();
        fetchData("dogs");
    });

    document.getElementById("birds").addEventListener("click", function(event) {
        event.preventDefault();
        fetchData("birds");
    });

    // Event listener per search input
    searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.toLowerCase();
        const cards = gallery.getElementsByClassName("card");
        Array.from(cards).forEach(card => {
            const petName = card.querySelector("h3").innerText.toLowerCase();
            if (petName.includes(searchTerm)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});
