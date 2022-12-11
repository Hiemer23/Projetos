let names = [
    "Bulbasaur",
    "Ivysaur",
    "Venusaur",
    "Charmander",
    "Charmeleon",
    "Charizard",
    "Squirtle",
    "Wartortle",
    "Blastoise",
    "Caterpie",
    "Metapod",
    "Butterfree",
    "Weedle",
    "Kakuna",
    "Beedrill",
    "Pidgey",
    "Pidgeotto",
    "Pidgeot",
    "Rattata",
    "Raticate",
    "Spearow",
    "Fearow",
    "Ekans",
    "Arbok",
    "Pikachu",
    "Raichu",
    "Sandshrew",
    "Sandslash",
    "Nidoranâ™€",
    "Nidorina",
    "Nidoqueen",
    "Nidoranâ™‚",
    "Nidorino",
    "Nidoking",
    "Clefairy",
    "Clefable",
    "Vulpix",
    "Ninetales",
    "Jigglypuff",
    "Wigglytuff",
    "Zubat",
    "Golbat",
    "Oddish",
    "Gloom",
    "Vileplume",
    "Paras",
    "Parasect",
    "Venonat",
    "Venomoth",
    "Diglett",
    "Dugtrio",
    "Meowth",
    "Persian",
    "Psyduck",
    "Golduck",
    "Mankey",
    "Primeape",
    "Growlithe",
    "Arcanine",
    "Poliwag",
    "Poliwhirl",
    "Poliwrath",
    "Abra",
    "Kadabra",
    "Alakazam",
    "Machop",
    "Machoke",
    "Machamp",
    "Bellsprout",
    "Weepinbell",
    "Victreebel",
    "Tentacool",
    "Tentacruel",
    "Geodude",
    "Graveler",
    "Golem",
    "Ponyta",
    "Rapidash",
    "Slowpoke",
    "Slowbro",
    "Magnemite",
    "Magneton",
    "Farfetch'd",
    "Doduo",
    "Dodrio",
    "Seel",
    "Dewgong",
    "Grimer",
    "Muk",
    "Shellder",
    "Cloyster",
    "Gastly",
    "Haunter",
    "Gengar",
    "Onix",
    "Drowzee",
    "Hypno",
    "Krabby",
    "Kingler",
    "Voltorb",
    "Electrode",
    "Exeggcute",
    "Exeggutor",
    "Cubone",
    "Marowak",
    "Hitmonlee",
    "Hitmonchan",
    "Lickitung",
    "Koffing",
    "Weezing",
    "Rhyhorn",
    "Rhydon",
    "Chansey",
    "Tangela",
    "Kangaskhan",
    "Horsea",
    "Seadra",
    "Goldeen",
    "Seaking",
    "Staryu",
    "Starmie",
    "Mr. Mime",
    "Scyther",
    "Jynx",
    "Electabuzz",
    "Magmar",
    "Pinsir",
    "Tauros",
    "Magikarp",
    "Gyarados",
    "Lapras",
    "Ditto",
    "Eevee",
    "Vaporeon",
    "Jolteon",
    "Flareon",
    "Porygon",
    "Omanyte",
    "Omastar",
    "Kabuto",
    "Kabutops",
    "Aerodactyl",
    "Snorlax",
    "Articuno",
    "Zapdos",
    "Moltres",
    "Dratini",
    "Dragonair",
    "Dragonite",
    "Mewtwo",
    "Mew"
];
const url = "https://raw.githubusercontent.com/Hiemer23/Projetos/main/Project2.csv"
const urlImages = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
const pokemons = []
let stringPokemons = ""
//Sort names in ascending order
let sortedNames = names.sort();
//reference
let input = document.getElementById("input");
//Execute function on keyup
input.addEventListener("keyup", (e) => {
    //loop through above array
    //Initially remove all elements ( so if user erases a letter or adds new letter then clean previous outputs)
    removeElements();
    for (let i of sortedNames) {
        //convert input to lowercase and compare with each string
        if (
            i.toLowerCase().startsWith(input.value.toLowerCase()) &&
            input.value != ""
        ) {
            //create li element
            let listItem = document.createElement("li");
            //One common class name
            listItem.classList.add("list-items");
            listItem.style.cursor = "pointer";
            listItem.setAttribute("onclick", "displayNames('" + i + "')");
            //Display matched part in bold
            let word = i.substr(0, input.value.length);
            word += i.substr(input.value.length);
            //display the value in array
            listItem.innerHTML = word;
            //console.log(listItem)
            addPoke(i)
            document.querySelector(".list").appendChild(listItem);
        }
        else if (input.value == "") {
            document.getElementById("csv").innerHTML = stringPokemons;
        }
    }
});
function displayNames(value) {
    input.value = value;
    removeElements();
}
function removeElements() {
    //clear all the item
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
        item.remove();
    });
    stringPokemons1 = ""
    items2 = document.querySelectorAll(".lista");
    items2.forEach((item) => {
        item.remove();
    });
}

async function getData() {

    const response = await fetch(url);
    const rawData = await response.text();
    const resultado = rawData.split("/")
    
    for (let i in resultado) {
        pokemons[i] = resultado[i].split(";")
    }
    pokemons.forEach((pokemon) => {
        stringPokemons += `<li class="lista"><img src="${urlImages + pokemon[0]}.png"><div class="nome">${pokemon[1]}</div></li>`
    })
    document.getElementById("csv").innerHTML = stringPokemons;
    //resultado.forEach(a => document.getElementById("csv").innerHTML = a)
    //document.getElementById("csv").innerHTML=resultado;

}
let stringPokemons1 = ""
function addPoke(poke) {
    pokemons.forEach((pokemon) => {
        if (pokemon[1].includes(poke)) stringPokemons1 += `<li class="lista"><img src="${urlImages + pokemon[0]}.png"><div class="nome">${pokemon[1]}</div></li>`
    })
    document.getElementById("csv").innerHTML = stringPokemons1;
    //console.log(stringPokemons1)
}

getData();

//teste