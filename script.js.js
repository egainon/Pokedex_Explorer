// https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json
const root = document.getElementById("root");
const inputPokemon = document.getElementById("inputPokemon");

let pokemons = []; //déclaration d'un tableau vide

async function PokemonRes() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    );
    const data = await response.json();
    console.log(data.pokemon.length);

    // on stocke la liste dans la variable globale
    pokemons = data.pokemon;

  } catch (error) {
    console.error("Erreur :", error);
  }
}

// écouteur d'événement sur le bouton
inputPokemon.addEventListener("input", () => {
  const search = inputPokemon.value.trim().toLowerCase();//recuperation du texte, suppression des espaces et conversion en minuscule
  root.innerHTML = ""; // vide la zone d’affichage avant d’afficher un nouveau Pokémon.

  if (search === "") return;// si le champ est vide, on quitte la fonction (on n’affiche rien).

  // recherche du pokémon exact
  const found = pokemons.find(p => p.name.toLowerCase() === search); // parcourt du tableau avec find () pour trouver nom du pokemon,
                                                                     // comparaison en minuscule

  if (found) {
  // si le Pokémon a une pré-évolution
    let preEvolution = "";
    if (found.prev_evolution) {
      const names = found.prev_evolution.map(evo => evo.name).join(", ");
      preEvolution = `<p><strong>Pré-évolution :</strong> ${names}</p>`;
    }

//fiche du pokemon
    root.innerHTML = ` 
      <h2>${found.name}</h2>
      <img src="${found.img}" alt="${found.name}">
      <p><strong>Type :</strong> ${found.type.join(", ")}</p>
      <p><strong>Poids :</strong> ${found.weight}</p>
      <p><strong>Taille :</strong> ${found.height}</p>
      <p><strong>Faiblesses :</strong> ${found.weaknesses.join(", ")}</p>
       ${preEvolution}
    `;
  } else {
    root.innerHTML = `<p>Aucun Pokémon trouvé.</p>`;
  }
});
PokemonRes();
