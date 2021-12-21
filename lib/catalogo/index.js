const cheerio = require('cheerio')
const fetch = require('node-fetch')
const { fetchConfig } = require('../utils')

const URL_CATALOGO = 'https://catalogo.uc.cl/index.php'

async function obtenerRequisitos (sigla) {
  const response = await fetch(URL_CATALOGO + `?tmpl=component&view=requisitos&sigla=${sigla}`,
    fetchConfig)
  const html = await response.text()
  const $ = cheerio.load(html)
  const filas = $('tr').toArray()

  // Prerrequisitos
  const prerrequistos = []

  const columnasPrerrequisitos = $(filas[0]).find('td').toArray()
  const prerrequistosRaw = $(columnasPrerrequisitos.at(-1)).text().split('o')

  prerrequistosRaw.forEach(prerrequisto => {
    const cursosRaw = prerrequisto.split('y')
    const cursos = []

    cursosRaw.forEach(curso => {
      curso = curso.trim()
      let correquisito = false

      if (/\(c\)/.test(curso)) {
        correquisito = true
      }

      curso = curso.replaceAll(/\(c\)/g, '')
      curso = curso.replaceAll(/[()]/g, '')
      cursos.push({ sigla: curso, correquisito })
    })

    prerrequistos.push(cursos)
  })

  // Relación Prerrequisitos - Restricciones
  const relacion = $($(filas[1]).find('td')[1]).text().trim()

  // Restricciones
  const restricciones = $($(filas[2]).find('td')[1]).text().trim()

  return {
    prerrequistos,
    restricciones,
    relacion
  }
}

exports.obtenerRequisitos = obtenerRequisitos
