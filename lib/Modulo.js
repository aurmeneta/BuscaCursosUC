class Modulo {
    static TIPOS = [
        "CLAS",
        "LAB",
        "AYU",
        "TAL",
        "LIB",
        "PRA",
        "SUP",
        "TER",
        "TES"];

    static DIAS =[
        "L",
        "M",
        "W",
        "J",
        "V",
        "S"];

    static MODULOS = 8;

    constructor(tipo, dia, modulo, sala) {
        this.tipo = tipo;
        this.dia = dia;
        this.modulo = modulo;
        this.sala = sala;
        this.hora = modulo;
    }

    static modulosIdenticos(a, b) {
        return a.tipo === b.tipo && a.dia === b.dia && a.modulo === b.modulo;
    }

    static modulosCompatibles(a, b) {
        return (a.dia !== b.dia) || (a.modulo !== b.modulo) || (a.dia === "SIN HORARIO") || (b.dia === "SIN HORARIO");
    }
}

module.exports = Modulo;
