window.onload = function () {
  window.scrollTo(0, 0);

  addTable();
};

let derechos = [
  "Derecho a la seguridad social",
  "Derecho a un nivel de vida adecuado",
  "Derecho a la igualdad para la mujeres en la vida económica",
  "Derechos a la alimentación adecuada",
  "Derecho a la vida",
  "Derecho a la salud",
  "Derecho a beneficiarse del progreso científico y de sus aplicaciones",
  "Derecho a la educación",
  "Derecho al trabajo incluyendo formación técnica y vocacional",
  "Derecho a la igualdad para las mujeres y niñas en la educación",
  "Derecho a decidir el número y esparcimiento de los hijos",
  "Derecho a la eliminación de la violencia contra mujeres y niñas",
  "Derecho a la eliminación de todas las formas discriminación contra la mujer",
  "Derecho a condiciones de trabajo justas y favorables",
  "Derecho al agua potable segura y al saneamiento",
  "Derecho a la igualdad para los trabajadores migrantes",
  "Prohibición del trabajo infantil",
  "Prohibición de la esclavitud, trabajo forzoso y trata de personas",
  "Derecho al acceso de información",
  "Derecho a la igualdad para la mujeres en créditos financieros e infraestructuras rurales",
  "Derecho a la vivienda digna",
  "Derecho a la igualdad y a la no discriminación",
  "Derecho a participar en la vida cultural",
  "Derecho a la accesibilidad, al transporte, instalaciones y servicios",
  "Derecho a la protección ante desastres naturales",
  "Derecho a disponer libremente de recursos naturales",
  "Derecho a la libertad",
  "Derecho al acceso a la justicia y un debido proceso",
  "Derecho a participar en asuntos públicos",
  "Derecho a la personalidad jurídica",
  "Derecho a la protección a los niños y niñas de toda forma de violencia, abuso y explotación",
  "Derecho a la privacidad",
  "Derecho a la autodeterminación",
  "Derecho al desarrollo y cooperación internacional",
];
let colors = [
  "#e5243b",
  "#DDA63A",
  "#4C9F38",
  "#C5192D",
  "#FF3A21",
  "#26BDE2",
  "#FCC30B",
  "#A21942",
  "#FD6925",
  "#DD1367",
  "#FD9D24",
  "#BF8B2E",
  "#3F7E44",
  "#0A97D9",
  "#56C02B",
  "#00689D",
  "#19486A",
];
let correct = [
  "0-0",
  "0-9",
  "0-15",
  "1-0",
  "1-6",
  "2-0",
  "2-4",
  "2-7",
  "3-1",
  "3-11",
  "3-12",
  "3-13",
  "3-14",
  "4-2",
  "4-15",
  "5-2",
  "5-5",
  "5-11",
  "5-12",
  "5-13",
  "5-14",
];
let answers = [];

function addTable() {
  //create table
  var table = $("<table>").addClass("tab");

  //add headers
  for (k = 0; k <= 17; k++) {
    var header = $("<th>").addClass("tabHeader").addClass("sticky");
    if (k === 0) {
      header
        .addClass("derechosHeader")
        .append($("<h1>").text("Derechos").css("margin", "0%"));
    } else {
      header.css("background-image", "url(../content/ods-" + k + ".png)");
    }
    table.append(header);
  }

  //add rows
  for (i = 0; i < derechos.length; i++) {
    var row = $("<tr>")
      .addClass("tabRow")
      .attr("id", "row" + i);

    //cel with text
    var cell = $("<td>").addClass("textDerechos").text(derechos[i]);
    row.append(cell);

    //empty cells to color
    for (j = 0; j < 17; j++) {
      let color = colors[j];
      var cell = $("<td>")
        .addClass("emptyCell")
        .attr("id", i + "-" + j)
        .attr("data-click-state", 0)
        .attr("data-hover-state", 0)
        .click(function () {
          if ($(this).attr("data-click-state") == 1) {
            //remove color
            $(this).attr("data-click-state", 0);
            $(this).css("background-color", "transparent");
            const index = answers.indexOf($(this).attr("id"));
            if (index > -1) {
              answers.splice(index, 1);
            }
          } else {
            //color
            $(this).attr("data-click-state", 1);
            $(this).css("background-color", color);
            $(this).css("border-radius", "0%");
            answers.push($(this).attr("id"));
          }
          $("#ammount").html(answers.length);
          $("#possible").html(correct.length);
        })
        .hover(function () {
          if ($(this).attr("data-click-state") == 0) {
            //remove colored circle
            if ($(this).attr("data-hover-state") == 1) {
              $(this).attr("data-hover-state", 0);
              $(this).css("background-color", "transparent");
            } else {
              //add color circle
              $(this).attr("data-hover-state", 1);
              $(this).css("background-color", color);
              $(this).css("border-radius", "100%");
            }
          }
        });
      row.append(cell);
    }
    table.append(row);
  }

  $("#here_table").append(table);
}

function hoverFunc(cell) {}

function checkAnswers() {
  $(".emptyCell").html("&nbsp;");

  //answered correctly
  rightAnswered = answers.map((answer) => {
    if (correct.includes(answer)) {
      return answer;
    }
  });
  rightAnswered = rightAnswered.filter((x) => x !== undefined);

  //answered wrong
  wrongAnswered = answers.map((answer) => {
    if (!correct.includes(answer)) {
      return answer;
    }
  });
  wrongAnswered = wrongAnswered.filter((x) => x !== undefined);

  //missing to answer
  missingAnswers = correct.map((answer) => {
    if (!answers.includes(answer)) {
      return answer;
    }
  });
  missingAnswers = missingAnswers.filter((x) => x !== undefined);

  console.log(correct);
  console.log(answers);
  console.log(rightAnswered);
  console.log(wrongAnswered);
  console.log(missingAnswers);

  // Returns a Promise that resolves after "ms" Milliseconds
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  rightAnswered.map((cell) => {
    $("#" + cell).text("✔️");
  });
  wrongAnswered.map((cell) => {
    $("#" + cell).text("❌");
  });
  missingAnswers.map((cell) => {
    $("#" + cell).text("⚠️");
  });
}
