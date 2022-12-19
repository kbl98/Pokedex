const ctx = document.getElementById('myChart');
let pokemon_list=[];
let pokemonJson;
let allPokeJson=[];
let past_types=[];
let array_moves=[];
let counterPokemon=20;
let names=[];
let pics=[];
let height=[];
let weight=[];
let type=[];
let type2=[];
let current_bg;
let currentPokemon;





function array_pasttype(){
    past_types=[];
    for(let i=0;i<pokemonJson["past_types"].length;i++){
        past_types.push(pokemonJson["past_types"][i])
    }
        if(past_types==""){
            past_types.push("Keine");
        }
}


function push_array_moves(){
    array_moves=[];
    for (let i=0;i<pokemonJson["moves"].length;i++){
        array_moves.push(`&#32;`+pokemonJson["moves"][i]["move"]["name"]);
        
       
    }
}


async function getAllPokemon(){
    let n=0;
    let all_pokes=document.getElementById("hole-pokemon-container");
    all_pokes.innerHTML="";
    for(let i=1;i<=counterPokemon;i++ ){
    let url_all_pokes=await fetch ("https://pokeapi.co/api/v2/pokemon/"+i);

    pokemon_name=await url_all_pokes.json();
    
    all_pokes.innerHTML+=`
    <div id="${pokemon_name["name"]}" class="profil-card" onclick="getPokemon(${n})">
        <div id="info-poke${i}" class="profil-text">
            <h3 class="poke-name">${pokemon_name["name"].toUpperCase()}</h3>
            <div id="main-types${i}"></div>
        </div>
        <img class="poke-img" src="${pokemon_name["sprites"]["other"]["official-artwork"]["front_default"]}"
    
    </div>`;
    let main_types=document.getElementById("main-types"+i);
    for (let j=0;j<pokemon_name["types"].length;j++ ){
    main_types.innerHTML+=
    `<div class="poke-class" >${pokemon_name["types"][j]["type"]["name"]}</div>`
    }
    let type=pokemon_name["types"][0]["type"]["name"];
    console.log(type);
    let id=pokemon_name['name'];
    if(type=="fire"){
        document.getElementById(id).classList.add("bg-orange");}
    if(type=="water"){
        document.getElementById(id).classList.add("bg-blue");
        }
    if(type=="grass"){
        document.getElementById(id).classList.add("bg-green");
    }
    if(type=="poison"){
        document.getElementById(id).classList.add("bg-red");
    }
    if(type=="bug"){
        document.getElementById(id).classList.add("bg-brown");
    }
    if(type=="flying"){
        document.getElementById(id).classList.add("bg-bluely");
    }
    if(type=="normal"){
        document.getElementById(id).classList.add("bg-normal");
    };
    n++;
    names.push(pokemon_name["name"]);
    }

   

  
  
   /*pics.push(pokemon_name["sprites"]["other"]["official-artwork"]["front_default"]);
   height.push(pokemon_name["height"]);
   weight.push(pokemon_name["weight"]);
   type.push(pokemon_name["types"])



   console.log(type[1][0]["type"]["name"])
}

    /*for(let i=0;i<21;i++){
    let name=pokemon_names["results"][i]["name"];
    pokemon_list.push(name);
   
    getPokemonDetail()
   
    }
    
    
    /*renderPokeProfil();*/
}


/*function setBackground(pokemon_json){
    let type=pokemon_json["types"][0]["type"]["name"];
    console.log(type);
    if(type=="fire"){
        document.getElementById("${pokemon_json}['name']").classList.add("bg-orange");
    if(type=="water"){
        document.getElementById("${pokemon_json}['name']").classList.add("bg-blue");
    }
    }
}*/

/*async function getPokemonDetail(){
    console.log(pokemon_list);
    for (let i=0;i<counterPokemon;i++){
    let url_one_poke=await fetch ("https://pokeapi.co/api/v2/pokemon/"+pokemon_list[i]);
   
    let pokemon_single=await url_one_poke.json();
   
    allPokeJson.push(pokemon_single);

    }
}*/

/*function renderPokeProfil(){
    let all_pokes=document.getElementById("hole-pokemon-container");
    for(let i=0;i<counterPokemon;i++){
        
        all_pokes.innerHTML+=`
        <div id="card${i}" class="profil-card">
            <div id="info-poke${i}" class="profil-text">
                <h3 id="poke-name${i}></h3>
            </div>
            <img id="poke-img${i}" src="${allPokeJson[i]["sprites"]["other"]["official-artwork"]["front_default"]}"
        
        </div>`
    }
}*/
function setBackground(id,pokemon){
    let type=pokemon["types"][0]["type"]["name"];
    console.log(type);
    document.getElementById(id).classList.remove(current_bg);
    if(type=="fire"){
        document.getElementById(id).classList.add("bg-orange");
        current_bg="bg-orange"};
    if(type=="water"){
        document.getElementById(id).classList.add("bg-blue");
        current_bg="bg-blue"
        }
    if(type=="grass"){
        document.getElementById(id).classList.add("bg-green");
        current_bg="bg-green"
    }
    if(type=="poison"){
        document.getElementById(id).classList.add("bg-red");
        current_bg="bg-red"
    }
    if(type=="bug"){
        document.getElementById(id).classList.add("bg-brown");
        current_bg="bg-brown"
    }
    if(type=="flying"){
        document.getElementById(id).classList.add("bg-bluely");
        current_bg="bg-bluely"
    }
    if(type=="normal"){
        document.getElementById(id).classList.add("bg-normal");
        current_bg="bg-normal"
    }
    };


async function getPokemon(n){
    document.getElementById("hole-pokemon-container").scrollTop;
    currentPokemon=n;
    let name=names[n];
    console.log(names)
    document.getElementById("overlay").classList.remove("d-none");
    document.getElementById("content-container").classList.remove("d-none");
    let pokeURL=await fetch ("https://pokeapi.co/api/v2/pokemon/"+name);
    pokemonJson=await pokeURL.json();
    console.log(pokemonJson);
    push_array_moves();
    array_pasttype();
   
    let pic_content=document.getElementById("pic-container");
    pic_content.innerHTML="";
    let main_pic=pokemonJson["sprites"]["other"]["official-artwork"]["front_default"];
    for (let i=0;i<pokemonJson["types"].length;i++ ){
        pic_content.innerHTML+=`<div class="poke-class" id="poke-class${i}">${pokemonJson["types"][i]["type"]["name"]}</div>`
        
    }
    setBackground("head-container",pokemonJson)
    
    document.getElementById("name").innerHTML=`${name.toUpperCase()}`;
    document.getElementById("poke-pic").setAttribute("src",main_pic);
    htmlContainerStrongness()
    htmlCommmonContainer()
    }

    
   

   function htmlContainerStrongness(){
    document.getElementById("info-container-strongness").innerHTML="";
    for (let i=0;i<6;i++){
        document.getElementById("info-container-strongness").innerHTML+=`
        <div class="strongness">
        <p>${pokemonJson["stats"][i]["stat"]["name"]}</p>
        <div class="progress">
        <div class="progress-bar bg-success" id="process${i}" role="progressbar" style="width: ${pokemonJson["stats"][i]["base_stat"]}%" aria-valuenow="${pokemonJson["stats"][i]["base_stat"]}" aria-valuemin="0" aria-valuemax="100">${pokemonJson["stats"][i]["base_stat"]}</div>
        </div>
        </div>`
   }
   }

    function htmlCommmonContainer(){
        document.getElementById("common-info-container").innerHTML="";
        document.getElementById("common-info-container").innerHTML=`
        <p><b>Gewicht: ${pokemonJson["weight"]} kg</b></p>
        <p><b>Grösse: ${pokemonJson["height"]} dm</b></p>
        <p><b>Vorentwicklungen:</b> ${past_types}</p>
        <p><b>Moves:</b><br> ${array_moves}</p>`
        }

    function removeHide(id,id2,p1,p2){
        let p1_text=document.getElementById(p1);
        let p2_text=document.getElementById(p2);
        let notHidden=document.getElementById(id2)
        let hidden=document.getElementById(id);
        if(hidden.classList.contains("d-none")){
            hidden.classList.remove("d-none");
            p1_text.classList.add("color-red")
            p2_text.classList.remove("color-red")
            notHidden.classList.add("d-none");
           
        }
       

    }

    function closeCard(){
        document.getElementById("overlay").classList.add("d-none");
        document.getElementById("content-container").classList.add("d-none");

    }

    function next(){
        let next_poke=currentPokemon+1;
       
        if(next_poke>counterPokemon-1){
            next_poke=currentPokemon
        }
       getPokemon(next_poke);
    }

    function back(){
        let last_poke=currentPokemon-1;
       
        if(last_poke<0){
            last_poke=currentPokemon;
        }
       getPokemon(last_poke);
    }

    function loadMore(){
        counterPokemon+=20;
        getAllPokemon();
    }