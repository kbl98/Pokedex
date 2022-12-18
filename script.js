const ctx = document.getElementById('myChart');
let pokemonJson;
let past_types=[];
let array_moves=[];



function array_pasttype(){
    for(let i=0;i<pokemonJson["past_types"].length;i++){
        past_types.push(pokemonJson["past_types"][i])
    }
        if(past_types==""){
            past_types.push("Keine");
        }
}


function push_array_moves(){
    for (let i=0;i<pokemonJson["moves"].length;i++){
        array_moves.push(pokemonJson["moves"][i]["move"]["name"]);
       
    }
}




async function getPokemon(){
    let pokeURL=await fetch ("https://pokeapi.co/api/v2/pokemon/salamence");
    pokemonJson=await pokeURL.json();
    console.log(pokemonJson);
    push_array_moves();
    array_pasttype();
    let name=pokemonJson["name"].toUpperCase();
    let pic_content=document.getElementById("pic-container");
    let main_pic=pokemonJson["sprites"]["other"]["official-artwork"]["front_default"];
    for (let i=0;i<pokemonJson["types"].length;i++ ){
        pic_content.innerHTML+=`<div class="poke-class" id="poke-class${i}">${pokemonJson["types"][i]["type"]["name"]}</div>`
        
    }
    
    
    document.getElementById("name").innerHTML=`${name}`;
    document.getElementById("poke-pic").setAttribute("src",main_pic);
    htmlContainerStrongness()
    htmlCommmonContainer()
    }

    function setTypes(){
        
    }
   

   function htmlContainerStrongness(){
    for (let i=0;i<pokemonJson["stats"].length;i++){
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
        document.getElementById("common-info-container").innerHTML=`
        <p><b>Gewicht: ${pokemonJson["weight"]}</b></p>
        <p><b>Grösse: ${pokemonJson["height"]}</b></p>
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