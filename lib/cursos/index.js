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

const Curso = require('./Curso')
const Modulo = require('./Modulo')

const fetch = require('node-fetch')
const cheerio = require('cheerio')

const fetchConfig = {
  headers: {
    Origin: 'aurmeneta/buscacursos-uc'
  }
}

const URL_BASE = 'https://buscacursos.uc.cl/'

function obtenerCursos (url) {
  return fetch(url, fetchConfig)
    .then(response => response.text())
    .then(html => {
      const cursos = [] // Arreglo para guardar los cursos encontrados.
      let filas = [] // Arreglo para guardar las filas obtenidas desde la tabla html.

      // Carga la pagina web en el selector.
      const $ = cheerio.load(html)

      // Busca las filas de la tabla.
      filas = $('.resultadosRowPar').toArray()
      filas = filas.concat($('.resultadosRowImpar').toArray())

      // Convierte las filas html en objetos Curso.
      filas.forEach(fila => {
        // Obtiene las columnas de la fila
        const columnas = $(fila).find('td')

        // Obtiene el contenido de cada columna y se lo asigna a la variable correspondiente.
        const nrc = $(columnas[0]).text().trim()
        const sigla = $(columnas[1]).text().trim()
        const permiteRetiro = $(columnas[2]).text().trim() === 'SI'
        const ingles = $(columnas[3]).text().trim() === 'SI'
        const seccion = parseInt($(columnas[4]).text())
        const aprobacionEspecial = $(columnas[5]).text().trim() === 'SI'
        const area = $(columnas[6]).text().trim()
        const formato = $(columnas[7]).text().trim()
        const categoria = $(columnas[8]).text().trim()
        const nombre = $(columnas[9]).text().trim()
        const profesor = $(columnas[10]).text()
          .split(',')
          .map(texto => texto.trim())
        const campus = $(columnas[11]).text().trim()
        const creditos = parseInt($(columnas[12]).text())
        const vacantesDisponibles = parseInt($(columnas[14]).text())

        const horario = []

        // Obtiene las filas de la "sub-tabla" con los horarios.
        const filasHorario = $(columnas[16]).find('tr').toArray()

        // Convierte cada fila de la "sub-tabla" de horarios.
        filasHorario.forEach(filaHorario => {
          // Obtiene las columnas de la fila.
          const columnasHorario = $(filaHorario).find('td')

          // Obtiene la información y se la asigna a las variables correspondientes.
          const tipo = $(columnasHorario[1]).text().trim()
          const sala = $(columnasHorario[2]).text().trim()

          // Cada entrada de horario tiene el siguiente formato: D-D:M,M
          // Donde D es un día de la semana y M el número de módulo.

          // Separa la entrada en los días y los modulos.
          const horasModulos = $(columnasHorario[0]).text().trim().split(':')

          // Separa los días.
          let dias = horasModulos[0].split('-')

          // Si un curso no tiene horario, su entrada será simplemente "-".
          // Comprueba que el curso tenga horario, por el contrario, sustituye día por "SIN HORARIO".
          dias = dias.map(dia => dia || 'SIN HORARIO')

          // Separa los módulos
          const modulos = horasModulos[1].split(',').map(hora => (parseInt(hora) || 0))

          dias.forEach(dia => {
            modulos.forEach(modulo => {
              // Retorna un objeto para cada día y cada modulo.
              horario.push(new Modulo(tipo, dia, modulo, sala, modulo))
              // El campo 'dia' fue renombrado por 'modulo', pero se incluye para no provocar incompatibilidades.
            })
          })
        })

        cursos.push(new Curso(nrc, sigla, permiteRetiro, ingles, seccion, aprobacionEspecial, area, formato,
          categoria, nombre, profesor, campus, creditos, vacantesDisponibles, horario))
      })

      return cursos
    })
}

function buscarSigla (periodo, sigla, url = '') {
  if (url === '') {
    return obtenerCursos(URL_BASE + `?cxml_semestre=${periodo}&cxml_sigla=${sigla}`)
  } else {
    return obtenerCursos(url + `?cxml_semestre=${periodo}&cxml_sigla=${sigla}`)
  }
}

function buscarProfesor (periodo, profesor, url = '') {
  if (url === '') {
    return obtenerCursos(URL_BASE + `?cxml_semestre=${periodo}&cxml_profesor=${profesor}`)
  } else {
    return obtenerCursos(url + `?cxml_semestre=${periodo}&cxml_profesor=${profesor}`)
  }
}

function buscarCurso (periodo, nombre, url = '') {
  if (url === '') {
    return obtenerCursos(URL_BASE + `?cxml_semestre=${periodo}&cxml_nombre=${nombre}`)
  } else {
    return obtenerCursos(url + `?cxml_semestre=${periodo}&cxml_nombre=${nombre}`)
  }
}

exports.obtenerCursos = obtenerCursos
exports.buscarSigla = buscarSigla
exports.buscarProfesor = buscarProfesor
exports.buscarCurso = buscarCurso
exports.Curso = Curso
exports.Modulo = Modulo
