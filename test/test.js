const buscacursos = require('../index.js')
// const { Curso, Modulo } = buscacursos

const periodo = '2021-1'

const obtenerCursos = buscacursos.obtenerCursos('https://buscacursos.uc.cl/?cxml_semestre=2020-2&cxml_sigla=mat1620')

const buscarSigla = buscacursos.buscarSigla(periodo, 'mat1620')

const buscarProfesor = buscacursos.buscarProfesor(periodo, 'marta garcia-huidobro')

const buscarCurso = buscacursos.buscarCurso(periodo, 'calculo ii')

const probarMuchosHorarios = buscacursos.buscarSigla(periodo, 'AQT0000')

const probarSinHorario = buscacursos.buscarSigla(periodo, 'ING1001')

const buscarSiglaUrl = buscacursos.buscarSigla(periodo, 'mat1620', url = "https://buscacursos.aurmeneta.cl/")

Promise.all([obtenerCursos, buscarSigla, buscarProfesor, buscarCurso, probarMuchosHorarios, probarSinHorario, buscarSiglaUrl]).then(resultados => {
  resultados.forEach(cursos => console.log(cursos.length))

  console.log(resultados[0][0])

  console.log('\nMuchos Horarios')
  console.log(resultados[4][0].horario)

  console.log('\nSin Horario')
  console.log(resultados[5][0].horario)
})
