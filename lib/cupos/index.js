const fetch = require('node-fetch')
const cheerio = require('cheerio')
const htmlparser2 = require('htmlparser2')

const { fetchConfig } = require('../utils')

const URL_CUPOS = 'https://buscacursos.uc.cl/informacionVacReserva.ajax.php'

async function obtenerCupos (periodo, nrc, url = URL_CUPOS) {
  const response = await fetch(url + `?nrc=${nrc}&termcode=${periodo}`,
    fetchConfig)
  const html = await response.text()
  const dom = htmlparser2.parseDocument(html)
  const $ = cheerio.load(dom)

  const filas = $('tr').toArray()
  // Obtener sigla del curso
  const columnasInfo = $(filas[2]).find('td')
  const sigla = $(columnasInfo[3]).text().trim()

  // Obtener total disponible
  const columnasTotal = $(filas.at(-1)).find('td').toArray()
  const vacantesDisponibles = parseInt($(columnasTotal.at(-1)).text())

  // Obtener cupos
  const filasCupos = filas.filter(fila => fila.children.length === 19)
  // Eliminar fila de encabezados
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
    nrc: nrc,
    sigla,
    vacantesDisponibles,
    cupos
  }

  return curso
}

exports.obtenerCupos = obtenerCupos
