$(document).ready(function (){

  const pokedex = document.getElementById("pokedex");

  console.log(pokedex);

  const fetchPokemon = () => {

    const promises = [];
    for (let i = 1; i <= 20; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then( results => {
      const pokemon = results.map((data) => ({
        name: data.name,
        id: data.id,
        image: data.sprites['front_default'],
        type: data.types.map((type) => type.type.name).join(', ')
      }));
      displayPokemon(pokemon);
    });
  };

  const displayPokemon = (pokemon) => {

    console.log(pokemon);
    const pokemonHTMLString = pokemon.map ( pokeman =>
      `
      <li class="card">
      <img class="card-image" src="${pokeman.image}"/>
      <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
      <p class="card-subtitle">Type: ${pokeman.type}</p>
      <button id="myBtn">¡Quiero saber más de este pokémon!</button>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <span class="close">&times;</span>
            <h2>Modal Header</h2>
          </div>
          <div class="modal-body">
            <p>Some text in the Modal Body</p>
            <p>Some other text...</p>
          </div>
          <div class="modal-footer">
            <h3>Some Text</h3>
          </div>
        </div>
      </div>
      </li>
      `
      )
      .join('');

      pokedex.innerHTML = pokemonHTMLString;

      var modal = document.getElementById("myModal");
      var btn = document.getElementById("myBtn");
      var span = document.getElementsByClassName("close")[0];

      btn.onclick = function() {
        modal.style.display = "block";
      }

      span.onclick = function() {
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

  };

  fetchPokemon();

});
