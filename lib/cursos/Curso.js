/*
Copyright (c) 2021, Andrés Urmeneta B. <aurmeneta@uc.cl>
Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

const Modulo = require('./Modulo')

class Curso {
  // TODO: Forzar tipos de los parámetros.
  constructor (nrc, sigla, permiteRetiro, ingles, seccion, aprobacionEspecial, area, formato, categoria, nombre,
    profesor, campus, creditos, vacantesTotales, vacantesDisponibles, horario) {
    this.nrc = nrc
    this.sigla = sigla
    this.permite_retiro = permiteRetiro
    this.ingles = ingles
    this.seccion = seccion
    this.aprobacion_especial = aprobacionEspecial
    this.area = area
    this.formato = formato
    this.categoria = categoria
    this.nombre = nombre
    this.profesor = profesor
    this.campus = campus
    this.creditos = creditos
    this.vacantes_totales = vacantesTotales
    this.vacantes_disponibles = vacantesDisponibles
    this.horario = horario
  }

  /**
     * Comprueba si dos cursos tienen el mismo horario.
     * @param curso1
     * @param curso2
     * @returns {boolean}
     */
  static mismoHorario (curso1, curso2) {
    const horario1 = curso1.horario
    const horario2 = curso2.horario

    // Si tienen largos distintos, no pueden tener los mismos elementos.
    if (horario1.length !== horario2.length) return false

    // Comprobar que cada modulo de horario1 tenga una entrada idéntica en horario2
    // y que cada modulo de horario2 tenga una entrada idéntica en horario1.
    return horario1.every(a => horario2.some(b => Modulo.modulosIdenticos(a, b))) &&
      horario2.every(b => horario1.some(a => Modulo.modulosIdenticos(a, b)))
  }

  /**
     * Comprueba si dos cursos tienen horarios compatibles.
     * @param curso1
     * @param curso2
     * @param choquesPermitidos
     * @returns {boolean}
     */
  static horariosCompatibles (curso1, curso2, choquesPermitidos) {
    const horario1 = curso1.horario
    const horario2 = curso2.horario
    const sigla1 = curso1.sigla
    const sigla2 = curso2.sigla

    // TODO: comprobar que choquesPermitidos no sea undefined.

    // Dos horarios son compatibles si todos sus módulos son compatibles entre sí,
    // o bien, se permite el choque entre dos módulos de un tipo específico para las siglas correspondientes.
    return horario1.every(modulo1 => horario2.every(modulo2 =>
      Modulo.modulosCompatibles(modulo1, modulo2) ||
      choquesPermitidos.evaluarChoque(sigla1, modulo1.tipo, sigla2, modulo2.tipo)))
  }

  /**
     * Crea una nueva instancia de Curso con los argumentos mínimos para poder ser utilizable.
     * @param nrc
     * @param sigla
     * @param seccion
     * @param nombre
     * @param profesor
     * @param vacantesDisponibles
     * @param horario
     * @returns {Curso}
     */
  static cursoMinimo (nrc, sigla, seccion, nombre, profesor, vacantesDisponibles, horario) {
    return new Curso(nrc, sigla, undefined, undefined, seccion, undefined,
      '', '', '', nombre, profesor, '', 0, 0, vacantesDisponibles, horario)
  }
}

module.exports = Curso
