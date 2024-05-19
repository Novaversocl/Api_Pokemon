// busca.js
export function fetchPokemonDetails(pokemonInput) {
  // Realiza una solicitud para obtener los detalles de un Pokémon a través de la API
  return fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonInput)
    .then(response => response.json()) // Convierte la respuesta en formato JSON
    .then(data => {
      // Obtiene el elemento del DOM con el id "pokemonDetails"
      let pokemonDetails = document.getElementById('pokemonDetails');
      // Borra el contenido anterior del elemento
      pokemonDetails.innerHTML = '';

      // Extrae los datos específicos del Pokémon de la respuesta JSON
      let name = data.name; // Nombre del Pokémon
      let imageUrl = data.sprites.front_default; // URL de la imagen frontal del Pokémon
      let id = data.id; // ID del Pokémon
      let types = data.types.map(type => type.type.name); // Tipos del Pokémon
      let abilities = data.abilities.map(ability => ability.ability.name); // Habilidades del Pokémon

      // Crea una plantilla HTML para mostrar los detalles del Pokémon
      let card = `
        <div class="card">
          <h2 class="card-title">${name}</h2>
          <img src="${imageUrl}" alt="${name}" class="card-img-top">
          <div class="card-body">
            <p><strong>ID:</strong> ${id}</p>
            <p><strong>Types:</strong> ${types.join(', ')}</p>
            <p><strong>Abilities:</strong> ${abilities.join(', ')}</p>
          </div>
        </div>
      `;

      // Asigna la plantilla HTML al elemento "pokemonDetails" en el DOM para mostrar los detalles del Pokémon
      pokemonDetails.innerHTML = card;
    })
    .catch(error => {
      // Muestra un mensaje de error en la consola si ocurre un error al buscar el Pokémon
      console.log('Error al buscar el Pokémon:', error);
    });
}
