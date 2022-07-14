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

class ChoquesPermitidos {
  constructor () {
    this.choques = []
  }

  /**
     * Guarda en el arreglo de choques permitidos, especifico o general, el choque de los módulos de los tipos
     * indicados para las siglas indicadas.
     * @param sigla1 Sigla de curso. Cáracter '*' significa 'cualquiera'.
     * @param tipo1 Tipo de módulo
     * @param sigla2 Sigla de curso. Cáracter '*' significa 'cualquiera'.
     * @param tipo2 Tipo de módulo
     * @param permitido Boolean si el choque está permitido o no.
     */
  anadirChoque (sigla1, tipo1, sigla2, tipo2, permitido) {
    const choque = this.buscarChoque(sigla1, tipo1, sigla2, tipo2)

    if (choque) choque.permitido = permitido
    else this.choques.push(new Choque(sigla1, tipo1, sigla2, tipo2, permitido))
  }

  /**
     * Busca un choque de las siglas y los tipos indicados en el arreglo de los choques permitidos.
     * Si se encuentra más de un choque para las siglas y tipos indicados, levanta una excepción.
     * @param sigla1 Sigla de curso.
     * @param tipo1 Tipo de módulo
     * @param sigla2 Sigla de curso.
     * @param tipo2 Tipo de módulo
     * @returns {Choque}
     */
  buscarChoque (sigla1, tipo1, sigla2, tipo2) {
    const choques = this.buscarChoques(sigla1, tipo1, sigla2, tipo2)

    if (choques.length > 1) throw new ExcepcionMultiplesResultados(choques)
    else return choques[0]
  }

  /**
     * Busca todos los choques para las siglas y los tipos indicados.
     * @param sigla1 Sigla de curso.
     * @param tipo1 Tipo de módulo.
     * @param sigla2 Sigla de curso.
     * @param tipo2 Tipo de módulo.
     * @returns {*[]}
     */
  buscarChoques (sigla1, tipo1, sigla2, tipo2) {
    return this.choques
      .filter(choque => {
        return ((choque.sigla1 === sigla1 || choque.sigla1 === '*') && (choque.tipo1 === tipo1 || choque.tipo1 === '*') &&
          (choque.sigla2 === sigla2 || choque.sigla2 === '*') && (choque.tipo2 === tipo2 || choque.tipo2 === '*')) ||
          // Comprobar también si los argumentos se dieron en el orden inverso.
          ((choque.sigla1 === sigla2 || choque.sigla1 === '*') && (choque.tipo1 === tipo2 || choque.tipo1 === '*') &&
            (choque.sigla2 === sigla1 || choque.sigla2 === '*') && (choque.tipo2 === tipo1 || choque.tipo2 === '*'))
      })
  }

  /**
     * Evalua si el choque entre las siglas y los tipos indicados está permitido.
     * @param sigla1 Sigla de curso. Cáracter '*' significa 'cualquiera'.
     * @param tipo1 Tipo de módulo
     * @param sigla2 Sigla de curso. Cáracter '*' significa 'cualquiera'.
     * @param tipo2 Tipo de módulo
     * @returns {boolean}
     */
  evaluarChoque (sigla1, tipo1, sigla2, tipo2) {
    // Busca el choque en los arreglos de choques permitidos.
    const choque = this.buscarChoque(sigla1, tipo1, sigla2, tipo2)

    if (choque) return choque.permitido
    else return false
  }
}

function ExcepcionMultiplesResultados (resultados) {
  this.resultados = resultados

  this.toString = () => {
    return 'Múltiples choques encontrados. Revisa los choques permitidos o los realiza una búsqueda más precisa.' +
      `Se han encontrado ${resultados.length} resultados.`
  }
}

function Choque (sigla1, tipo1, sigla2, tipo2, permitido) {
  this.sigla1 = sigla1
  this.tipo1 = tipo1
  this.sigla2 = sigla2
  this.tipo2 = tipo2
  this.permitido = permitido
}

module.exports = ChoquesPermitidos
