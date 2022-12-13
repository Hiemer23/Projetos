let names = [
    "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard",
    "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree",
    "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot",
    "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok",
    "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina",
    "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable",
    "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat",
    "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat",
    "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck",
    "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag",
    "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop",
    "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool",
    "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash",
    "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo",
    "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder",
    "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee",
    "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute",
    "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung",
    "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela",
    "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu",
    "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar",
    "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto",
    "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte",
    "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno",
    "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"
];
const url = "https://raw.githubusercontent.com/Hiemer23/Projetos/main/Project2.csv"
const urlImages = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
const pokemons = []
let stringPokemons = ""
//Sort de nomes em ordem crescente
let sortedNames = names.sort();

//elemento input
let input = document.getElementById("input");
//elemento form com id = search
let search = document.getElementById('search');
//evento relacionado ao input
input.addEventListener("keyup", (e) => {
    //limpa todos os elementos da lista antes de verificar o que foi escrito no input
    removeElements();
    for (let i of sortedNames) {
        if (i.toLowerCase().startsWith(input.value.toLowerCase()) && input.value != "") {
            let listItem = document.createElement("li");
            
            listItem.classList.add("list-items");
            listItem.style.cursor = "pointer";
            listItem.setAttribute("onclick", "displayNames('" + i + "')");
            let word = i.substr(0, input.value.length);
            word += i.substr(input.value.length);
            listItem.innerHTML = word;
            document.querySelector(".list").appendChild(listItem);
        }
    }
});
//evento relacionado ao form
search.addEventListener("submit", e => {
    //evitar de sair da página ao apertar enter
    e.preventDefault()
    for (let i of sortedNames) {
        if (i.toLowerCase() == input.value.toLowerCase()) {
            addPoke(i)
            console.log(i)
        }
    }
});

//atualiza os nomes da lista
function displayNames(value) {
    input.value = value;

    addPoke(value)
    removeElements();
    input.value = ""
}
//remove os nomes da lista
function removeElements() {
    let items = document.querySelectorAll(".list-items");

    items.forEach((item) => {
        item.remove();
    });
}


//inicializa todos os pokemons no sistema
async function getData() {
    const response = await fetch(url);
    const rawData = await response.text();
    const resultado = rawData.split("/")

    for (let i in resultado) {
        pokemons[i] = resultado[i].split(";")
    }
    pokemons.forEach((pokemon) => {
        stringPokemons += `<li class="lista" id = "${pokemon[1]}" show = "false"><img src="${urlImages + pokemon[0]}.png"><a class="position">${pokemon[0]}</a><a class="nome">${pokemon[1]}</a><a class="type1-${pokemon[2]}">${pokemon[2]}</a><a class="type2-${pokemon[3]}">${pokemon[3]}</a></li>`
    })
    document.getElementById("csv").innerHTML = stringPokemons;
}
//muda o atributo show para true quando chamada
function addPoke(poke) {
    let tag = document.getElementById(poke)

    if (tag == undefined) {
        return
    }
    tag.setAttribute('show', true)
}

//pega todos os dados dos pokemons
getData();