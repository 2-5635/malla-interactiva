// Cursos con prerrequisitos y semestre
const cursos = [
  // Primer año — I semestre
  { id: "com1", nombre: "COMUNICACIÓN Y REDACCIÓN I", sem: "I-1", abre: ["com2"] },
  { id: "cal1", nombre: "CÁLCULO DIFERENCIAL", sem: "I-1", abre: ["cal2", "fis1"] },
  { id: "qui", nombre: "QUÍMICA GENERAL", sem: "I-1", abre: [] },
  { id: "fil", nombre: "FILOSOFÍA Y ÉTICA", sem: "I-1", abre: [] },
  { id: "aut", nombre: "DESARROLLO PERSONAL Y AUTONOMÍA", sem: "I-1", abre: [] },
  { id: "intro", nombre: "INTRODUCCIÓN A LA INGENIERÍA INFORMÁTICA", sem: "I-1", abre: [] },
  { id: "ing1", nombre: "INGLÉS 1", sem: "I-1", abre: ["ing2"] },
  { id: "act1", nombre: "ACTIVIDAD COMPLEMENTARIA I", sem: "I-1", abre: [] },

  // Primer año — II semestre
  { id: "com2", nombre: "COMUNICACIÓN Y REDACCIÓN II", sem: "I-2", abre: [] },
  { id: "alg", nombre: "ÁLGEBRA MATRICIAL Y GEOMETRÍA ANALÍTICA", sem: "I-2", abre: ["calv"] },
  { id: "fis1", nombre: "FÍSICA PARA INGENIERÍA 1", sem: "I-2", abre: ["elec"] },
  { id: "fp", nombre: "FUNDAMENTOS DE PROGRAMACIÓN", sem: "I-2",
    abre: ["elec", "bd1", "plp", "edis"]
  },
  { id: "css", nombre: "CIENCIAS SOCIALES EN EL CONTEXTO ACTUAL", sem: "I-2", abre: [] },
  { id: "pci", nombre: "PENSAMIENTO CIENTÍFICO E INVESTIGACIÓN", sem: "I-2", abre: ["pi"] },
  { id: "cas", nombre: "CULTURA AMBIENTAL Y DESARROLLO SOSTENIBLE", sem: "I-2", abre: [] },
  { id: "ing2", nombre: "INGLÉS 2", sem: "I-2", abre: ["ing3"] },
  { id: "act2", nombre: "ACTIVIDAD COMPLEMENTARIA II", sem: "I-2", abre: [] },

  // Segundo año — III semestre
  { id: "cal2", nombre: "CÁLCULO INTEGRAL PARA INGENIERÍA", sem: "II-3",
    abre: ["estad", "calv", "edis2"]
  },
  { id: "elec", nombre: "ELECTRÓNICA DIGITAL Y ROBÓTICA", sem: "II-3",
    abre: ["oac"]
  },
  { id: "pi", nombre: "PROCESOS DE INNOVACIÓN EN INGENIERÍA", sem: "II-3",
    abre: ["funddis"]
  },
  { id: "bd1", nombre: "BASES DE DATOS I", sem: "II-3",
    abre: ["pcd", "si", "bd2"]
  },
  { id: "plp", nombre: "PARADIGMAS DE LENGUAJES DE PROGRAMACIÓN", sem: "II-3",
    abre: ["oac", "poo"]
  },
  { id: "edis", nombre: "ESTRUCTURAS DISCRETAS I", sem: "II-3",
    abre: ["edis2"]
  },
  { id: "ing3", nombre: "INGLÉS 3", sem: "II-3", abre: ["ing4"] },
  { id: "act3", nombre: "ACTIVIDAD COMPLEMENTARIA III", sem: "II-3", abre: [] },

  // IV semestre
  { id: "calv", nombre: "CÁLCULO VECTORIAL PARA INGENIERÍA", sem: "II-4",
    abre: ["pcd"]
  },
  { id: "funddis", nombre: "FUNDAMENTOS DE DISEÑO", sem: "II-4",
    abre: ["hcd", "pi2"]
  },
  { id: "oac", nombre: "ORGANIZACIÓN Y ARQUITECTURA DE COMPUTADORES", sem: "II-4",
    abre: ["vd"]
  },
  { id: "poo", nombre: "PROGRAMACIÓN ORIENTADA A OBJETOS", sem: "II-4",
    abre: ["pcd", "si"]
  },
  { id: "bd2", nombre: "BASES DE DATOS II", sem: "II-4", abre: [] },
  { id: "edis2", nombre: "ESTRUCTURAS DISCRETAS II", sem: "II-4",
    abre: ["aed"]
  },
  { id: "ing4", nombre: "INGLÉS 4", sem: "II-4", abre: [] },
  { id: "act4", nombre: "ACTIVIDAD COMPLEMENTARIA IV", sem: "II-4", abre: [] },


];

// Estado guardado localmente
const estado = JSON.parse(localStorage.getItem("mallaEstado") || "{}");

// Guarda estado y recarga
function toggleCurso(id) {
  estado[id] = !estado[id];
  localStorage.setItem("mallaEstado", JSON.stringify(estado));
  render();
}

// Verifica si curso desbloqueado
function estaDesbloqueado(curso) {
  if (!curso.abrePrer) return true;
  return curso.prerrequisitos.every(r => estado[r]);
}

// Renderizado principal
function render() {
  const cont = document.getElementById("malla");
  cont.innerHTML = "";
  const semestres = [...new Set(cursos.map(c => c.sem))];
  semestres.forEach(sem => {
    cursos.filter(c => c.sem === sem).forEach(c => {
      const div = document.createElement("div");
      div.textContent = c.nombre;
      div.className = "curso";

      const apro = estado[c.id];
      const unlocked = estaDesbloqueado(c);
      if (apro) div.classList.add("aprobado");
      else if (!unlocked) {
        div.classList.add("bloqueado");
      }

      div.onclick = () => {
        if (!unlocked) return;
        toggleCurso(c.id);
      };

      cont.appendChild(div);
    });
  });
}

render();

