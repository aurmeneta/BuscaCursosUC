const cheerio = require('cheerio/lib/slim')

const { fetchConfig, getFetch, URLS } = require('../utils')
const { obtenerCurso } = require('../cursos')

/**
 * Obtiene los cupos disponibles y ocupados desagregados por unidad académica para un curso.
 * @param {string} periodo Período en el que buscar el curso
 * @param {string} nrc NRC del curso a buscar
 * @param {string} urlCupos URL del sitio de cupos donde buscar la información.
 * @param {string} urlBuscaCursos URL de BuscaCursos.
 * @returns {}
 */
async function obtenerCupos (periodo, nrc, urlCupos = URLS.cupos, urlBuscaCursos = URLS.buscacursos) {
  const fetch = await getFetch()
  const response = await fetch(urlCupos + `?nrc=${nrc}&termcode=${periodo}`,
    fetchConfig)
  const html = await response.text()
  const $ = cheerio.load(html)

  const filas = $('tr').toArray()
  // Obtener sigla del curso
  const columnasInfo = $(filas[2]).find('td')
  const sigla = $(columnasInfo[3]).text().trim()

  // Obtener total disponible
  const columnasTotal = $(filas.at(-1)).find('td').toArray()
  const vacantesDisponibles = parseInt($(columnasTotal.at(-1)).text())

  if (isNaN(vacantesDisponibles)) {
    // No es posible obtener info desde este link,
    // posiblemente curso no tiene vacantes reservadas
    // Obtener info desde buscador de cursos
    const curso = await obtenerCurso(periodo, nrc, urlBuscaCursos)

    return {
      nrc: curso.nrc,
      sigla: curso.sigla,
      vacantesDisponibles: curso.vacantes_disponibles,
      cupos: [{
        escuela: 'Vacantes Libres',
        vacantesOfrecidas: curso.vacantes_totales,
        vacantesOcupadas: curso.vacantes_totales - curso.vacantes_disponibles,
        vacantesDisponibles: curso.vacantes_disponibles
      }],
      inseguro: true
    }
  } else {
    // Obtener filas de cupos
    const filasCupos = filas.filter(fila => fila.children.length === 19)
    // Eliminar encabezados
    filasCupos.shift()

    const cupos = []

    filasCupos.forEach(fila => {
      const columnas = $(fila).find('td')

      const escuela = $(columnas[0]).text().trim()
      const vacantesOfrecidas = parseInt($(columnas[6]).text())
      const vacantesOcupadas = parseInt($(columnas[7]).text())
      const vacantesDisponibles = parseInt($(columnas[8]).text())

      cupos.push({ escuela, vacantesOfrecidas, vacantesOcupadas, vacantesDisponibles })
    })

    const curso = {
      nrc,
      sigla,
      vacantesDisponibles,
      cupos,
      inseguro: false
    }

    return curso
  }
}

exports.obtenerCupos = obtenerCupos
