$(document).ready(function() {
  let pokemonList = []; // Variable para almacenar la lista de Pokémon
  let selectedPokemonData = null; // Variable para almacenar los datos del Pokémon seleccionado
  let powersChart = null; // Variable para almacenar el gráfico de poderes
  let offset = 0; // Variable para el desplazamiento en la API
  let limit = 20; // Variable para el límite de resultados en la API

  function getPokemonData() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=' + limit + '&offset=' + offset;
  
    // Realizar una solicitud GET a la API y obtener los datos de los Pokémon
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        $.ajax({
          url: url,
          method: 'GET',
          success: function(data) {
            let pokemonList = data.results; // Lista de Pokémon obtenida de la API
            let pokemonCards = pokemonList.map(function(pokemon) {
              return createPokemonCard(pokemon); // Crear tarjetas de Pokémon para cada elemento de la lista
            });
            $('#pokemon-cards').append(pokemonCards); // Agregar las tarjetas de Pokémon al elemento con el id "pokemon-cards"
            resolve(); // Resolver la promesa
          },
          error: function() {
            reject('Error al obtener los datos de los Pokémon.'); // Rechazar la promesa con un mensaje de error
          }
        });
      }, 2000); // Esperar 2000 milisegundos (2 segundos) antes de realizar la solicitud
    });
  }
  
  function createPokemonCard(pokemon) {
    let name = pokemon.name; // Nombre del Pokémon obtenido

    let url = pokemon.url;
    let pokemonId = url.split('/')[6]; // Obtener el ID del Pokémon a partir de la URL
    let imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemonId + '.png'; // URL de la imagen del Pokémon

    let card = '<div class="col-md-3">' +
                 '<div class="card">' +
                   '<img src="' + imageUrl + '" class="card-img-top" alt="' + name + '">' +
                   '<div class="card-body">' +
                     '<h5 class="card-title">' + name + ' (ID: ' + pokemonId + ')</h5>' +
                     '<p class="card-text"><strong>Type(s):</strong> <span id="pokemonTypes-' + pokemonId + '"></span></p>' +
                     '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#pokemonModal" data-pokemon-id="' + pokemonId + '">View Powers</button>' +
                   '</div>' +
                 '</div>' +
               '</div>';

    getPokemonTypes(pokemonId); // Obtener los tipos de Pokémon a partir del ID

    return card; // Devolver la tarjeta del Pokémon
  }

  function getPokemonTypes(pokemonId) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonId;

    // Obtener los tipos de Pokémon mediante una solicitud GET a la API
    $.ajax({
      url: url,
      method: 'GET',
      success: function(data) {
        let types = data.types.map(function(type) {
          return type.type.name; // Obtener los nombres de los tipos de Pokémon
        }).join(', '); // Unir los tipos de Pokémon en un solo string separado por comas

        $('#pokemonTypes-' + pokemonId).text(types); // Actualizar el contenido del elemento con el id "pokemonTypes-{pokemonId}" con los tipos de Pokémon
      }
    });
  }

  // Agregar un event listener al hacer clic en el botón dentro de las tarjetas de Pokémon
  $('#pokemon-cards').on('click', '.card .btn', function() {
    var pokemonId = $(this).data('pokemon-id'); // Obtener el ID del Pokémon seleccionado desde el atributo "data-pokemon-id" del botón
    getPokemonDataById(pokemonId); // Obtener los datos del Pokémon por ID
  });

  function getPokemonDataById(pokemonId) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonId;

    // Obtener los datos del Pokémon mediante una solicitud GET a la API
    $.ajax({
      url: url,
      method: 'GET',
      success: function(data) {
        selectedPokemonData = data; // Almacenar los datos del Pokémon seleccionado
        showPokemonModal(); // Mostrar el modal del Pokémon
      }
    });
  }

  // Función para mostrar el modal del Pokémon seleccionado
  function showPokemonModal() {
    let name = selectedPokemonData.name; // Nombre del Pokémon seleccionado
    let imageUrl = selectedPokemonData.sprites.front_default; // URL de la imagen del Pokémon
    let powers = selectedPokemonData.abilities.map(function(ability) {
      return {
        name: ability.ability.name,
        value: ability.slot
      };
    }); // Obtener los poderes del Pokémon con sus nombres y valores

    // Obtener los movimientos del Pokémon
    let moves = selectedPokemonData.moves.map(function(move) {
      return move.move.name; // Obtener los nombres de los movimientos del Pokémon
    }).join(', '); // Unir los movimientos en un solo string separado por comas

    // Actualizar el contenido del modal con los datos del Pokémon seleccionado
    $('#pokemonModalLabel').text(name); // Actualizar el texto del elemento con el id "pokemonModalLabel" con el nombre del Pokémon
    $('#pokemonModalImage').attr('src', imageUrl); // Actualizar la imagen del elemento con el id "pokemonModalImage" con la URL de la imagen del Pokémon

    // Generar la lista de poderes en el modal
    let powersList = powers.map(function(power) {
      return '<li><strong>' + power.name + ':</strong> ' + power.value + '</li>'; // Crear un elemento de lista para cada poder del Pokémon
    }).join(''); // Unir los elementos de lista en un solo string

    $('#pokemonModalPowers').html(powersList); // Actualizar el contenido del elemento con el id "pokemonModalPowers" con la lista de poderes

    // Dibujar el gráfico de poderes
    drawPowersChart(powers); // Dibujar el gráfico de poderes con los datos de los poderes del Pokémon

    // Mostrar el modal
    $('#pokemonModal').modal('show'); // Mostrar el modal con el id "pokemonModal"
  }

  // Función para dibujar el gráfico de poderes
  function drawPowersChart(powers) {
    let powersData = powers.map(function(power) {
      return {
        label: power.name,
        value: power.value
      };
    }); // Crear los datos para el gráfico de poderes con los nombres y valores de los poderes

    let canvas = document.getElementById('powersChart'); // Obtener el elemento canvas con el id "powersChart"
    let context = canvas.getContext('2d'); // Obtener el contexto del canvas

    context.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    let colors = ['#FF6384', '#36A2EB', '#FFCE56', '#8CFF95', '#FF8D3E', '#7364FF', '#FF61F5', '#3EFFAA', '#D3FF5D', '#FF5A6B']; // Colores para las porciones del gráfico

    let totalValue = powersData.reduce(function(total, power) {
      return total + power.value;
    }, 0); // Calcular el valor total sumando los valores de los poderes

    let startAngle = 0; // Ángulo de inicio para cada porción del gráfico

    powersData.forEach(function(power, index) {
      let sliceAngle = (2 * Math.PI * power.value) / totalValue; // Calcular el ángulo de la porción basado en el valor del poder
      let endAngle = startAngle + sliceAngle; // Ángulo final de la porción

      context.beginPath(); // Comenzar un nuevo trazo
      context.fillStyle = colors[index]; // Establecer el color de relleno basado en el índice del poder
      context.moveTo(canvas.width / 2, canvas.height / 2); // Mover el punto de inicio al centro del canvas
      context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, endAngle); // Dibujar un arco para representar la porción
      context.closePath(); // Cerrar el trazo
      context.fill(); // Rellenar la porción con el color establecido

      startAngle = endAngle; // Actualizar el ángulo de inicio para la siguiente porción
    });
  }

  // Agregar un event listener al hacer clic en el botón "Load More"
  $('#btnLoadMore').on('click', function() {
    offset += limit; // Aumentar el desplazamiento por el límite
    getPokemonData().then(function() {
      $('html, body').animate({
        scrollTop: $('#pokemon-cards').offset().top // Desplazarse hacia arriba hasta el elemento con el id "pokemon-cards"
      }, 800); // Animar el desplazamiento en 800 milisegundos (0.8 segundos)
    });
  });

  // Agregar un event listener al hacer clic en el botón "Clear All"
  $('#btnClearAll').on('click', async function() {
    try {
      await fetch(location.href); // Realizar una solicitud GET a la URL actual para recargar la página
      location.reload(); // Recargar la página
      console.log("usando try y catch"); // Imprimir mensaje en la consola
    } catch (error) {
      console.error(error); // Imprimir el error en la consola
      alert(error); // Mostrar una alerta con el mensaje de error
    }
  });

  getPokemonData(); // Obtener los datos de los Pokémon al cargar la página
});
