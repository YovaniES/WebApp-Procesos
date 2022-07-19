const estudiantes = [
  { nombre: "yovany",
    apellidos: "Santiago",
    edad: 30,
    curso: "Angular avanzando"
  },
  { nombre: "Yelsy",
    apellidos:" Ayala Melgarejo",
    edad: 23,
    curso: "Ingles"
  },
  { nombre: "Junior",
    apellidos: "Valenzuela Espinoza",
    edad: 28,
    curso: "Full Stack"
  }
]

const fullnames = [];

estudiantes.forEach(resp => {
  fullnames.push(resp.nombre +''+resp.apellidos)
}
  //  this.fullmames = resp.nombre + '' resp.apellidos
  )

// OPERADOR - MAP()
const abc = estudiantes.map(study => {
  return {
    ...study,
    title : `${study.nombre} - ${study.curso}`
  }
})
