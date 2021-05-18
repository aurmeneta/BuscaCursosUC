const buscacursos = require("../index.js");
const { Curso, Modulo } = buscacursos;

// Test Curso.mismoHorario.
const horarioA = [
    new Modulo("CLAS", "L", 2, ""),
    new Modulo("CLAS", "M", 2, ""),
    new Modulo("AYU", "J", 3, "")
]

const horarioB = [
    new Modulo("CLAS", "L", 2, ""),
    new Modulo("CLAS", "M", 2, ""),
    new Modulo("AYU", "J", 4, "")
]

const horarioC = [
    new Modulo("CLAS", "L", 2, ""),
    new Modulo("CLAS", "M", 2, ""),
    new Modulo("AYU", "J", 3, ""),
    new Modulo("AYU", "J", 4, "")
]

const curso1 = Curso.cursoMinimo("1111", "CURSO1", 1, "CURSO1", ["PROFE"], 10, horarioA);
const curso2 = Curso.cursoMinimo("1111", "CURSO2", 2, "CURSO2", ["PROFE"], 10, horarioA);
const curso3 = Curso.cursoMinimo("1111", "CURSO3", 3, "CURSO3", ["PROFE"], 10, horarioB);
const curso4 = Curso.cursoMinimo("1111", "CURSO4", 4, "CURSO4", ["PROFE"], 10, horarioC);


console.log("Test Curso.mismoHorario");

console.log("horarioA y horarioA");
console.log(Curso.mismoHorario(curso1, curso2));

console.log("horarioA y horarioB");
console.log(Curso.mismoHorario(curso1, curso3));

console.log("horarioA y horarioC");
console.log(Curso.mismoHorario(curso1, curso4));

console.log("horarioB y horarioC");
console.log(Curso.mismoHorario(curso3, curso4));