class Modulo {
    static get TIPOS () {
        return [
            "CLAS",
            "LAB",
            "AYU",
            "TAL",
            "LIB",
            "PRA",
            "SUP",
            "TER",
            "TES"]
    }

    static get DIAS () {
        return  [
            "L",
            "M",
            "W",
            "J",
            "V",
            "S"]
    }
       

    static get MODULOS () {
        return 8
    }

    // TODO: Forzar tipo de los parámetros.
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
