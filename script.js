let past_types = [];
let array_moves = [];
let counterPokemon = 20;
let names = [];
let pokemonJson;
let current_bg;
let currentPokemon;
let pokemon_name;

function array_pasttype() {
  past_types = [];
  for (let i = 0; i < pokemonJson["past_types"].length; i++) {
    past_types.push(pokemonJson["past_types"][i]);
  }
  if (past_types == "") {
    past_types.push("Keine");
  }
}

function push_array_moves() {
  array_moves = [];
  for (let i = 0; i < pokemonJson["moves"].length; i++) {
    array_moves.push(`&#32;` + pokemonJson["moves"][i]["move"]["name"]);
  }
}

async function getAllPokemon() {
  names = [];
  let n = 0;
  let all_pokes = document.getElementById("hole-pokemon-container");
  all_pokes.innerHTML = "";
  for (let i = 1; i <= counterPokemon; i++) {
    let url_all_pokes = await fetch("https://pokeapi.co/api/v2/pokemon/" + i);
    pokemon_name = await url_all_pokes.json();
    await allPokesHTML(all_pokes, pokemon_name, n, i);
    await setMainTypesHtml(i, pokemon_name);
    let id = pokemon_name["name"];
    setBackground(id, pokemon_name);
    n++;
    names.push(pokemon_name["name"]);
  }
}

async function allPokesHTML(all_pokes, pokemon_name, n, i) {
  all_pokes.innerHTML += `
    <div id="${
      pokemon_name["name"]
    }" class="profil-card" title="${
        pokemon_name["name"]}" onclick="getPokemon(${n})">
        <div id="info-poke${i}" class="profil-text">
            <h3 class="poke-name">${pokemon_name["name"].toUpperCase()}</h3>
            <div id="main-types${i}"></div>
        </div>
        <img class="poke-img" src="${
          pokemon_name["sprites"]["other"]["official-artwork"]["front_default"]
        }"
    </div>`;
}

async function setMainTypesHtml(i, pokemon_name) {
  let main_types = document.getElementById("main-types" + i);
  for (let j = 0; j < pokemon_name["types"].length; j++) {
    main_types.innerHTML += `<div class="poke-class" >${pokemon_name["types"][j]["type"]["name"]}</div>`;
  }
}

async function setBackground(id, pokemon) {
  let type = pokemon["types"][0]["type"]["name"];
  document.getElementById(id).classList.remove(current_bg);
  await getBackround(type, id);
}

async function getBackround(type, id) {
  let bg = "bg-" + type;
  document.getElementById(id).classList.add(bg);
  current_bg = bg;
}

async function getPokemon(n) {
  currentPokemon = n;
  let name = names[n];
  document.getElementById("overlay").classList.remove("d-none");
  document.getElementById("content-container").classList.remove("d-none");
  let pokeURL = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
  pokemonJson = await pokeURL.json();
  push_array_moves();
  array_pasttype();
  await cardHeadHtml(name);
  await setBackground("head-container", pokemonJson);
  htmlContainerStrongness();
  htmlCommmonContainer();
}

async function cardHeadHtml(name) {
  let pic_content = document.getElementById("pic-container");
  pic_content.innerHTML = "";
  let main_pic =
    pokemonJson["sprites"]["other"]["official-artwork"]["front_default"];
  for (let i = 0; i < pokemonJson["types"].length; i++) {
    pic_content.innerHTML += `<div class="poke-class" id="poke-class${i}">${pokemonJson["types"][i]["type"]["name"]}</div>`;
  }
  document.getElementById("name").innerHTML = `${name.toUpperCase()}`;
  document.getElementById("poke-pic").setAttribute("src", main_pic);
}

async function htmlContainerStrongness() {
  document.getElementById("info-container-strongness").innerHTML = "";
  for (let i = 0; i < 6; i++) {
    document.getElementById("info-container-strongness").innerHTML += `
        <div class="strongness">
        <p>${pokemonJson["stats"][i]["stat"]["name"]}</p>
        <div class="progress">
        <div class="progress-bar bg-success" id="process${i}" role="progressbar" style="width: ${pokemonJson["stats"][i]["base_stat"]}%" aria-valuenow="${pokemonJson["stats"][i]["base_stat"]}" aria-valuemin="0" aria-valuemax="100">${pokemonJson["stats"][i]["base_stat"]}</div>
        </div>
        </div>`;
  }
}

async function htmlCommmonContainer() {
  document.getElementById("common-info-container").innerHTML = "";
  document.getElementById("common-info-container").innerHTML = `
        <p><b>Gewicht: ${pokemonJson["weight"]} kg</b></p>
        <p><b>Grösse: ${pokemonJson["height"]} dm</b></p>
        <p><b>Vorentwicklungen:</b> ${past_types}</p>
        <p><b>Moves:</b><br> ${array_moves}</p>`;
}

function removeHide(id, id2, p1, p2) {
  let p1_text = document.getElementById(p1);
  let p2_text = document.getElementById(p2);
  let notHidden = document.getElementById(id2);
  let hidden = document.getElementById(id);
  if (hidden.classList.contains("d-none")) {
    hidden.classList.remove("d-none");
    p1_text.classList.add("color-red");
    p2_text.classList.remove("color-red");
    notHidden.classList.add("d-none");
  }
}

function closeCard() {
  document.getElementById("overlay").classList.add("d-none");
  document.getElementById("content-container").classList.add("d-none");
}

function next() {
  let next_poke = currentPokemon + 1;

  if (next_poke > counterPokemon - 1) {
    next_poke = currentPokemon;
  }
  getPokemon(next_poke);
}

function back() {
  let last_poke = currentPokemon - 1;

  if (last_poke < 0) {
    last_poke = currentPokemon;
  }
  getPokemon(last_poke);
}

async function loadMore() {
  counterPokemon += 20;
  if (counterPokemon > 1154) {
    counterPokemon = 1154;
  }
  await getAllPokemon();
  document.getElementById("button").scrollIntoView();
}

async function loadAll() {
  counterPokemon = 1154;

  getAllPokemon();

  document.getElementById("button").classList.add("d-none");
  document.getElementById("button-2").classList.add("d-none");
}

function search() {
  let input = document.getElementById("input").value;

  input = input.toLowerCase();
  let results;
  for (let i = 0; i < names.length; i++) {
    if (names[i].includes(input)) {
      results = i + 1;
      document.getElementById("info-poke" + results).scrollIntoView();
      getPokemon(i);

      break;
    }
  }
  document.getElementById("input").value = "";
}

function scrollBottom() {
  let elheight = document.getElementById("all-pokemons").offsetHeight;

  window.scrollTo(0, elheight);
}
