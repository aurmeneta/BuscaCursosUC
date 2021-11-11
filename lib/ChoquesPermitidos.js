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
    // Comprobar si es un choque especifico para dos siglas o general para varias siglas.
    const choque = this.buscarChoque(sigla1, tipo1, sigla2, tipo2)

    if (choque) choque.permitido = true
    else this.choques.push(new Choque(sigla1, tipo1, sigla2, tipo2, permitido))
  }

  /**
     * Busca un choque de las siglas y los tipos indicados en el arreglo de los choques permitidos.
     * Si se encuentra más de un choque para las siglas y tipos indicados, retorna una excepción.
     * @param sigla1 Sigla de curso. No se admite el operador '*'.
     * @param tipo1 Tipo de módulo
     * @param sigla2 Sigla de curso. No se admite el operador '*'.
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
     * @param sigla1 Sigla de curso. No se admite el operador '*'.
     * @param tipo1 Tipo de módulo.
     * @param sigla2 Sigla de curso. No se admite el operador '*'.
     * @param tipo2 Tipo de módulo.
     * @returns {*[]}
     */
  buscarChoques (sigla1, tipo1, sigla2, tipo2) {
    return this.choques
      .filter(choque => {
        return (choque.sigla1 === sigla1 || choque.sigla1 === '*') && (choque.tipo1 === tipo1 || choque.tipo1 === '*') &&
                    (choque.sigla2 === sigla2 || choque.sigla2 === '*') && (choque.tipo2 === tipo1 || choque.tipo2 === '*') ||
                    // Comprobar también si los argumentos se dieron en el orden inverso.
                    (choque.sigla1 === sigla2 || choque.sigla1 === '*') && (choque.tipo1 === tipo2 || choque.tipo1 === '*') &&
                    (choque.sigla2 === sigla1 || choque.sigla2 === '*') && (choque.tipo1 === tipo2 || choque.tipo1 === '*')
      })
  }

  /**
     * Evalúa si el choque entre las siglas y los tipos indicados está permitido.
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
