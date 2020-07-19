const buscacursos = require("../index.js");

let obtenerCursos = buscacursos.obtenerCursos("http://buscacursos.uc.cl/?cxml_semestre=2020-1&cxml_sigla=mat1620");

let buscarSigla = buscacursos.buscarSigla("2020-1", "mat1023");

let buscarProfesor = buscacursos.buscarProfesor("2020-1", "marta garcia-huidobro");

let buscarCurso = buscacursos.buscarCurso("2020-1", "calculo ii");

Promise.all([obtenerCursos, buscarSigla, buscarProfesor, buscarCurso]).then(resultados => {
    resultados.forEach(cursos => console.log(cursos.length));

    console.log(resultados[0][0])
})