const {Curso, Modulo, ChoquesPermitidos} = require("../index");

const curso1 = Curso.cursoMinimo("1", "CUR001", 1, "Curso 1", [], 10,
    [
        new Modulo("CLAS", "L", 3, "SIN SALA"),
        new Modulo("AYU", "V", 4, "SIN SALA")
    ]);

const curso2 = Curso.cursoMinimo("2", "CUR002", 1, "Curso 2", [], 10,
    [
        new Modulo("CLAS", "L", 3, "SIN SALA"),
        new Modulo("AYU", "V", 4, "SIN SALA")
    ]);

const curso3 = Curso.cursoMinimo("3", "CUR003", 1, "Curso 3", [], 10,
    [
        new Modulo("TES", "L", 3, "SIN SALA"),
        new Modulo("TER", "W", 3, "SIN SALA"),
        new Modulo("LAB", "V", 3, "SIN SALA"),
        new Modulo("CLAS", "V", 4, "SIN SALA")
    ]);

const choquesPermitidos = new ChoquesPermitidos();

choquesPermitidos.anadirChoque("CUR001", "AYU", "CUR002", "*", true);
choquesPermitidos.anadirChoque("CUR003", "TER", "*", "*", true);
choquesPermitidos.anadirChoque("CUR003", "*", "*", "*", true);

curso1.horario.forEach(modulo1 => curso2.horario.forEach(modulo2 => {
    let sigla1 = curso1.sigla;
    let sigla2 = curso2.sigla;
    let tipo1 = modulo1.tipo;
    let tipo2 = modulo2.tipo;

    console.log(`${sigla1} - ${tipo1} + ${sigla2} - ${tipo2}`);
    console.log("permite choque? " + choquesPermitidos.evaluarChoque(sigla1, tipo1, sigla2, tipo2) + "\n");
}));

console.log("----------------------------------------------\n")

curso1.horario.forEach(modulo1 => curso3.horario.forEach(modulo2 => {
    let sigla1 = curso1.sigla;
    let sigla2 = curso3.sigla;
    let tipo1 = modulo1.tipo;
    let tipo2 = modulo2.tipo;

    console.log(`${sigla1} - ${tipo1} + ${sigla2} - ${tipo2}`);
    console.log("permite choque? " + choquesPermitidos.evaluarChoque(sigla1, tipo1, sigla2, tipo2) + "\n");
}));


