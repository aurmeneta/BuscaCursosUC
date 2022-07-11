/*
Copyright (c) 2022, Andrés Urmeneta B. <aurmeneta@uc.cl>
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

class Modulo {
  /** Tipos de módulos válidos. */
  static TIPOS = [
    'CLAS',
    'LAB',
    'AYU',
    'TAL',
    'LIB',
    'PRA',
    'SUP',
    'TER',
    'TES']

  /** Días válidos. */
  static DIAS = [
    'L',
    'M',
    'W',
    'J',
    'V',
    'S']

  /** Cantidad de módulos por día. */
  static MODULOS = 8

  /**
   * Representa un módulo de clases
   * @contructor
   * @param {string} tipo Tipo del módulo. Debe ser uno de los listados en Modulo.TIPOS.
   * @param {string} dia Día del módulo. Debe ser uno de los listados en Modulo.DIAS.
   * @param {int} modulo Número de módulo. Debe ser igual o mayor a uno y menor o igual a Modulo.MODULOS
   * @param {string} sala Sala del módulo.
   */
  constructor (tipo, dia, modulo, sala) {
    if (!Modulo.TIPOS.includes(tipo)) {
      throw TypeError(`El tipo (${tipo}) de módulo no es válido`)
    }

    if (!Modulo.DIAS.includes(dia) && dia !== 'SIN HORARIO') {
      throw TypeError(`El día (${dia}) del módulo no es válido`)
    }

    if ((modulo < 1 || Modulo.MODULOS < modulo) && (dia !== 'SIN HORARIO')) {
      throw RangeError(`El número (${modulo}) de módulo es inválido. Debe estar entre 1 y ${Modulo.MODULOS}`)
    }

    this.tipo = tipo
    this.dia = dia
    this.modulo = modulo
    this.sala = sala
    // TODO: borrar
    this.hora = modulo
  }

  /**
   * Comprueba si dos módulos son del mismo tipo y en el mismo horario (día y módulo).
   * @param {Modulo} a Primer módulo a comparar.
   * @param {Modulo} b Segundo módulo a comparar.
   * @returns {Boolean}
   */
  static modulosIdenticos (a, b) {
    return a.tipo === b.tipo && a.dia === b.dia && a.modulo === b.modulo
  }

  /**
   * Comprueba si dos módulos son en horarios distintos (día y módulo).
   * @param {Modulo} a Primer módulo a comparar.
   * @param {Modulo} b Segundo módulo a comparar.
   * @returns {Boolean}
   */
  static modulosCompatibles (a, b) {
    return (a.dia !== b.dia) || (a.modulo !== b.modulo) || (a.dia === 'SIN HORARIO') || (b.dia === 'SIN HORARIO')
  }
}

module.exports = Modulo
