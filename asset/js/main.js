// main.js
import { fetchPokemonDetails } from './busca.js';

// Agrega un event listener al formulario con el id "pokemonForm" cuando se envía (submit)
document.getElementById('pokemonForm').addEventListener('submit', function(event) {
  // Previene el comportamiento predeterminado de envío del formulario
  event.preventDefault();

  // Obtiene el valor del input con el id "pokemonInput"
 let pokemonInput = document.getElementById('pokemonInput').value;

  // Llama a la función fetchPokemonDetails del módulo busca.js, pasando el valor del input como argumento
  fetchPokemonDetails(pokemonInput);
});
