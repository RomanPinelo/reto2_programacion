var boton1 = document.getElementById("option1");
var boton2 = document.getElementById("option2");
var boton3 = document.getElementById("option3");
var boton4 = document.getElementById("option4");
var boton5 = document.getElementById("option5");
var infoSection = document.getElementById("info");
var opcion;

// Traigo los datos de la API.
const fetchData = async (option) => {
  try {

    const res = await fetch("https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=perl&site=stackoverflow");
    const data = await res.json();
    
    if (option == 1) {
      pintarOpcion1(data);
    }
    if (option == 2) {
      pintarOpcion2(data);
    }
    if (option == 3) {
      pintarOpcion3(data);
    }
    if (option == 4) {
      pintarOpcion4(data);
    }
    if (option == 5) {
      pintarOpcion5(data);
    }

  } catch (error) {
    console.log(error);
  }
};

// Funciones que pintan en el DOM la información que selecionamos
// Obtener el número de respuestas contestadas y no contestadas
function pintarOpcion1(data) {
  infoSection.innerHTML = "";
  let contestadas = 0;
  let noContestadas = 0;

  // Recorro el array items y entro al atributo is_answered de cada elemento
  for (const item of data.items) {
    console.log(item.is_answered);
    // Si el valor es true, aumenta en 1 la variable contestadas
    // Si el valor es false, aumenta en 1 la variable noContestadas
    item.is_answered ? contestadas++ : noContestadas++
  }

  // Pinto en la consola la información
  console.log(contestadas);
  console.log(noContestadas);

  // Pinto en el Dom la información
  infoSection.innerHTML = `
    <p class="respuesta">
      El número de preguntas contestadas es: ${contestadas}
    </p>

    <p class="respuesta">
      El número de preguntas no contestadas es: ${noContestadas}
    </p>
  `;
}

// Obtener la respuesta con mayor owners
function pintarOpcion2(data) {
  infoSection.innerHTML = "";
  let reputation = [];
  let links = [];

  // Recorro el array items y entro al atributo owner.reputation de cada elemento
  for (const item of data.items) {
    reputation.push(item.owner.reputation);
    links.push(item.link);
  }

  let maximo = Math.max(...reputation);
  let link = links[reputation.indexOf(maximo)];

  // Pinto en la consola la información
  console.log(maximo);
  console.log(link);

  // Pinto en el DOM la información
  infoSection.innerHTML = `
    <p class="respuesta">
      El propietario con mayor reputación es: ${maximo}
    </p>
    <p class="respuesta">
      El link es: <a href="${link}">${link}</a>
    </p>
  `;
}

// Obtener la respuesta con menor número de vistas
function pintarOpcion3(data) {
  infoSection.innerHTML = "";
  let vistas = [];
  let links = [];

  // Recorro el array items y entro al atributo view_count de cada elemento
  for (const item of data.items) {
    vistas.push(item.view_count);
    links.push(item.link);
  }

  // La sintaxis extendida es con la que se puede expandir los valores de un array
  // dentro de los argumentos de una función. Esto se puede hacer mediante el operador ….
  let minimo = Math.min(...vistas);

  let link = links[vistas.indexOf(minimo)];

  // Pinto en la consola la información
  console.log(minimo);
  console.log(link);

  // Pinto en el DOM la información
  infoSection.innerHTML = `
    <p class="respuesta">
      El menor número de vistas fue de: ${minimo} vistas
    </p>
    <p class="respuesta">
      El link es: <a href="${link}">${link}</a>
    </p>
  `;
}

// Obtener la respuesta más vieja y más actual
function pintarOpcion4(data) {
  infoSection.innerHTML = "";
  let fechas = [];
  let links = [];

  // Recorro el array items y entro al atributo creation_date de cada elemento
  for (const item of data.items) {
    fechas.push(item.creation_date);
    links.push(item.link);
  }

  // Obtengo la fechas mínima y máxima
  let minimo = Math.min(...fechas);
  let maximo = Math.max(...fechas);

  // Del array de links, obtengo el link correspondiente a la fecha mínima y máxima
  // gracias al indice fechas.indexOf(minimo) y fechas.indexOf(maximo)
  let link1 = links[fechas.indexOf(minimo)];
  let link2 = links[fechas.indexOf(maximo)];

  // Multiplico por 1000 para que me de la fecha correcta. De lo contrario me muestra el año 1970.
  minimo *= 1000;
  maximo *= 1000;

  let fechaVieja = new Date(minimo);
  let fechaNueva = new Date(maximo);

  // Pinto en la consola la información
  console.log(fechaVieja);
  console.log(link1);
  console.log(fechaNueva);
  console.log(link2);

  // Pinto en el DOM la información
  infoSection.innerHTML = `
    <p class="respuesta">
      La respuesta con fecha más vieja es: ${fechaVieja}
    </p>
    <p class="respuesta">
      El link es: <a href="${link1}">${link1}</a>
    </p>
    <p class="respuesta">
    La respuesta con fecha más actual es: ${fechaNueva}
    </p>
    <p class="respuesta">
      El link es: <a href="${link2}">${link2}</a>
    </p>
  `;
}

// Obtener todo junto
function pintarOpcion5(data) {
  infoSection.innerHTML = "";
  let contestadas = 0;
  let noContestadas = 0;
  let reputation = [];
  let vistas = [];
  let fechas = [];
  let links = [];

  // Recorro el array items y entro al atributo is_answered de cada elemento
  for (const item of data.items) {
    item.is_answered ? contestadas++ : noContestadas++
    reputation.push(item.owner.reputation);
    vistas.push(item.view_count);
    fechas.push(item.creation_date);
    links.push(item.link);
  }

  let maximo = Math.max(...reputation);
  let link = links[reputation.indexOf(maximo)];

  let minimo = Math.min(...vistas);
  let link1 = links[vistas.indexOf(minimo)];

  // Obtengo la fechas mínima y máxima
  let minimo1 = Math.min(...fechas);
  let maximo1 = Math.max(...fechas);

  // Del array de links, obtengo el link correspondiente a la fecha mínima y máxima
  // gracias al indice fechas.indexOf(minimo) y fechas.indexOf(maximo)
  let link3 = links[fechas.indexOf(minimo1)];
  let link4 = links[fechas.indexOf(maximo1)];

  // Multiplico por 1000 para que me de la fecha correcta. De lo contrario me muestra el año 1970.
  minimo1 *= 1000;
  maximo1 *= 1000;

  let fechaVieja = new Date(minimo1);
  let fechaNueva = new Date(maximo1);

  // Pinto en la consola la información
  console.log(contestadas);
  console.log(noContestadas);
  console.log(maximo);
  console.log(link);
  console.log(minimo);
  console.log(link1);
  console.log(fechaVieja);
  console.log(link3);
  console.log(fechaNueva);
  console.log(link4);

  // Pinto en el Dom la información
  infoSection.innerHTML = `
    <p class="respuesta">
      El número de preguntas contestadas es: ${contestadas}
    </p>

    <p class="respuesta">
      El número de preguntas no contestadas es: ${noContestadas}
    </p>
    
    <p class="respuesta">
      El propietario con mayor reputación es: ${maximo}
    </p>
    
    <p class="respuesta">
      El link es: <a href="${link}">${link}</a>
    </p>
  
    <p class="respuesta">
      El menor número de vistas fue de: ${minimo} vistas
    </p>

    <p class="respuesta">
      El link es: <a href="${link1}">${link1}</a>
    </p>

    <p class="respuesta">
      La respuesta con fecha más vieja es: ${fechaVieja}
    </p>
    <p class="respuesta">
      El link es: <a href="${link3}">${link3}</a>
    </p>
    <p class="respuesta">
    La respuesta con fecha más actual es: ${fechaNueva}
    </p>

    <p class="respuesta">
      El link es: <a href="${link4}">${link4}</a>
    </p>
  `;
}

//Termina de cargar el contenido y hace lo que le indiquemos en el código
document.addEventListener("DOMContentLoaded", () => {
  
  boton1.addEventListener('click', () => {
    opcion = 1;
    fetchData(opcion);
  });
  boton2.addEventListener('click', () => {
    opcion = 2;
    fetchData(opcion);
  });
  boton3.addEventListener('click', () => {
    opcion = 3;
    fetchData(opcion);
  });
  boton4.addEventListener('click', () => {
    opcion = 4;
    fetchData(opcion);
  });
  boton5.addEventListener('click', () => {
    opcion = 5;
    fetchData(opcion);
  });  
});