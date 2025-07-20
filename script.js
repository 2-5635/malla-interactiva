// Datos de los cursos con sus dependencias
const cursos = [
  { id: "comunicacion1", nombre: "COMUNICACIÓN Y REDACCIÓN I", abre: ["comunicacion2"] },
  { id: "comunicacion2", nombre: "COMUNICACIÓN Y REDACCIÓN II", abre: [] },
  { id: "calculo1", nombre: "CÁLCULO DIFERENCIAL", abre: ["calculo2", "fisica1"] },
  { id: "quimica", nombre: "QUÍMICA GENERAL", abre: [] },
  { id: "filosofia", nombre: "FILOSOFÍA Y ÉTICA", abre: [] },
  { id: "autonomia", nombre: "DESARROLLO PERSONAL Y AUTONOMÍA", abre: [] },
  { id: "introinfo", nombre: "INTRODUCCIÓN A LA INGENIERÍA INFORMÁTICA", abre: [] },
  { id: "ingles1", nombre: "INGLÉS 1", abre: ["ingles2"] },
  { id: "ingles2", nombre: "INGLÉS 2", abre: ["ingles3"] },
  { id: "ingles3", nombre: "INGLÉS 3", abre: ["ingles4"] },
  { id: "ingles4", nombre: "INGLÉS 4", abre: [] },
  { id: "actividad1", nombre: "ACTIVIDAD COMPLEMENTARIA I", abre: [] },

  // Electivos grupo 1
  { id: "vision", nombre: "VISIÓN COMPUTACIONAL-ELECTIVA1", abre: [], grupo: "electiva1" },
  { id: "nlp", nombre: "NATURAL LANGUAGE PROCESSING-ELECTIVA1", abre: [], grupo: "electiva1" },

  // Electivos grupo 2
  { id: "sistemasinfo", nombre: "TÓPICOS AVANZADOS DE SISTEMAS DE INFORMACIÓN-ELECTIVA2", abre: [], grupo: "electiva2" },
  { id: "bioinfo", nombre: "BIOINFORMÁTICA_ELECTIVA2", abre: [], grupo: "electiva2" },

  // Electivos grupo 3
  { id: "refuerzo", nombre: "APRENDIZAJE POR REFUERZO-ELECTIVO3", abre: [], grupo: "electiva3" },
  { id: "ia", nombre: "TÓPICOS AVANZADOS EN INTELIGENCIA ARTIFICIAL-ELECTIVO3", abre: [], grupo: "electiva3" },
  { id: "calidad", nombre: "CALIDAD DE SOFTWARE-ELECTIVO3", abre: [], grupo: "electiva3" }
];

const estado = JSON.parse(localStorage.getItem("estadoCursos") || "{}");

function guardarEstado() {
  localStorage.setItem("estadoCursos", JSON.stringify(estado));
}

function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  cursos.forEach(curso => {
    const div = document.createElement("div");
    div.className = "curso";
    div.id = curso.id;
    div.textContent = curso.nombre;

    const aprobado = estado[curso.id] === true;
    const bloqueado = !aprobado && curso.abre && curso.abre.length > 0 && !cursos.some(c => (c.abre || []).includes(curso.id) && estado[c.id]);

    if (aprobado) div.classList.add("aprobado");
    if (bloqueado) div.classList.add("bloqueado");

    if (!bloqueado || aprobado) {
      div.addEventListener("click", () => {
        // Electivo exclusivo
        if (curso.grupo && !estado[curso.id]) {
          cursos.forEach(c => {
            if (c.grupo === curso.grupo) estado[c.id] = false;
          });
        }
        estado[curso.id] = !estado[curso.id];
        guardarEstado();
        crearMalla();
      });
    }

    contenedor.appendChild(div);
  });
}

crearMalla();

