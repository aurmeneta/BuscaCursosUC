const buscacursos = require("../index.js");
const { Curso, Modulo } = buscacursos;

const periodo = "2021-1"

let obtenerCursos = buscacursos.obtenerCursos("http://buscacursos.uc.cl/?cxml_semestre=2020-2&cxml_sigla=mat1620");

let buscarSigla = buscacursos.buscarSigla(periodo, "mat1023");

let buscarProfesor = buscacursos.buscarProfesor(periodo, "marta garcia-huidobro");

let buscarCurso = buscacursos.buscarCurso(periodo, "calculo ii");

let probarMuchosHorarios = buscacursos.buscarSigla(periodo, "AQT0000");

let probarSinHorario = buscacursos.buscarSigla(periodo, "ING1001");

Promise.all([obtenerCursos, buscarSigla, buscarProfesor, buscarCurso, probarMuchosHorarios, probarSinHorario]).then(resultados => {
    resultados.forEach(cursos => console.log(cursos.length));

    console.log(resultados[0][0]);

    console.log("\nMuchos Horarios");
    console.log(resultados[4][0].horario);

    console.log("\nSin Horario");
    console.log(resultados[5][0].horario);
});