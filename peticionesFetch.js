async function obtenerDatosPokemon(id){
    let respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

if(!respuesta.ok){
    throw new Error("Error al cargar datos");
}
return await respuesta.json();
}

async function mostrarPokemones(id){
    try{
        const personaje = await obtenerDatosPokemon(id);
        console.log(personaje);
    }catch(error){
        console.error(error);
    }
}

mostrarPokemones(93); // grimer ID number, test.

async function obtenerPokemon(){
    console.log("Peticiones simples")
    try{
        let respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/haunter"); // obtenemos a pokemon meowth
        if(!respuesta.ok) throw new Error("Error al obtener el personaje") ;
        let personaje = await respuesta.json();
        console.log("Personaje: ", personaje);

        console.log("Habilidades:")
        for (let i = 0; i < 1; i++) {
            console.log(personaje.abilities[i])
        }

        console.log("Tipo:", personaje.types[0]);

    }catch(error){
        console.error(error);
    }
}

obtenerPokemon();

async function obtenerEvolucion(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/haunter`);
        const data = await response.json();
        const pokemonInfo = {
            name: data.name,
            type: data.types[0].type.name
        };
        const speciesUrl = data.species.url;
        const speciesResponse = await fetch(speciesUrl);
        const speciesData = await speciesResponse.json();
        const evolutionUrl = speciesData.evolution_chain.url;
        const evolutionResponse = await fetch(evolutionUrl);
        const evolutionData = await evolutionResponse.json();
        const evolutionName = evolutionData.chain.species.name;
        const evolutionTypeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/gengar`);
        const evolutionTypeData = await evolutionTypeResponse.json();
        const evolutionTypeInfo = {
            name: evolutionTypeData.name,
            type: evolutionTypeData.types[0].type.name
        };

        return { pokemon: pokemonInfo, evolution: evolutionTypeInfo };
    } catch (error) {
        console.error(error);
    }
}
obtenerEvolucion('haunter').then(result => {
    console.log("Petición compuesta:")
    console.log('Información del Pokémon:', result.pokemon);
    console.log('Información de la evolución:', result.evolution);
});
