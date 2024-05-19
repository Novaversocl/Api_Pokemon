# Api_Pokemon

## Introducción

Esta es una aplicación de panel que obtiene datos de la API de Pokémon y los muestra en una interfaz fácil de usar. Permite a los usuarios ver una lista de Pokémon, sus detalles y habilidades, así como visualizar sus poderes a través de un gráfico JavaScript.

## Características

- **Seguridad**:
  - HSTS
- **Tipografía**:
  - Font Awesome
  - Google Font API
- **Gráficos JavaScript**:
  - CanvasJS 3.8.6 GA
  - Chart.js
- **CDN**:
  - Google Hosted Libraries
  - cdnjs
- **Librerías JavaScript**:
  - jQuery 3.3.1
- **Frameworks de UI**:
  - Bootstrap 5.2

## Uso

La aplicación recupera datos de Pokémon de la API y los muestra en tarjetas. Los usuarios pueden hacer clic en una tarjeta de Pokémon para ver sus detalles y habilidades. Además, los usuarios pueden cargar más Pokémon o borrar la lista actual.

## Explicación del Código

El código JavaScript incluido en este proyecto realiza varias funciones importantes:

1. **Obtener Datos de Pokémon**: La función `getPokemonData` realiza una solicitud a la API de Pokémon para obtener datos de Pokémon. Luego, crea tarjetas de Pokémon con la función `createPokemonCard` y las agrega al DOM.

2. **Visualizar Poderes de Pokémon**: Cuando los usuarios hacen clic en el botón "View Powers" en una tarjeta de Pokémon, se muestra un modal con los detalles del Pokémon, incluidos sus poderes. Además, se dibuja un gráfico circular utilizando CanvasJS para representar visualmente los poderes del Pokémon.

3. **Interactividad del Usuario**: Los usuarios pueden cargar más Pokémon haciendo clic en el botón "Load More" y pueden borrar la lista de Pokémon haciendo clic en el botón "Clear All".

## Tecnologías Utilizadas

- **Seguridad**: HSTS
- **Tipografía**: Font Awesome, Google Font API
- **Gráficos JavaScript**: CanvasJS, Chart.js
- **CDN**: Google Hosted Libraries, jsDelivr, cdnjs
- **Librerías JavaScript**: jQuery
- **Frameworks de UI**: Bootstrap

## Instalación

Para instalar el Tablero de la API de Pokémon, simplemente descarga los archivos y abre el archivo `index.html` en un navegador web.

## Licencia

Este proyecto está bajo la Licencia MIT


## Imágenes

![imagen](https://github.com/Novaversocl/Api_Pokemon/assets/95386670/7c8c83e6-c96c-4973-a9e9-20e484bdb76e)


![imagen](https://github.com/Novaversocl/Api_Pokemon/assets/95386670/2c463d30-d3cf-40b9-9526-27064d2111d7)

![imagen](https://github.com/Novaversocl/Api_Pokemon/assets/95386670/5a7b7453-7cf7-4956-ad55-4fff125f58b5)


