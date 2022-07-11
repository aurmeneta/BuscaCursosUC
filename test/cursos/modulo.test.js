/* eslint-disable no-undef */
const { cursos } = require('../../index')
const { Modulo } = cursos

test('modulos con mismo horario y tipo son idénticos', () => {
  const modulo1 = new Modulo('CLAS', 'L', 1, 'B11')
  const modulo2 = new Modulo('CLAS', 'L', 1, 'B11')
  const modulo3 = new Modulo('AYU', 'L', 1, 'B11')
  const modulo4 = new Modulo('CLAS', 'M', 1, 'B11')
  const modulo5 = new Modulo('CLAS', 'L', 2, 'B11')
  const modulo6 = new Modulo('CLAS', 'L', 1, 'B12')

  // Mismo día, módulo, tipo y sala
  expect(Modulo.modulosIdenticos(modulo1, modulo2)).toBe(true)
  expect(Modulo.modulosIdenticos(modulo2, modulo1)).toBe(true)
  // Tipo distintos
  expect(Modulo.modulosIdenticos(modulo1, modulo3)).toBe(false)
  // Día distintos
  expect(Modulo.modulosIdenticos(modulo1, modulo4)).toBe(false)
  // Módulo distintos
  expect(Modulo.modulosIdenticos(modulo1, modulo5)).toBe(false)
  // Sala distintas
  expect(Modulo.modulosIdenticos(modulo1, modulo6)).toBe(true)
})

test('modulos compatibles sin son el mismo día el mismo módulo', () => {
  const modulo1 = new Modulo('CLAS', 'L', 1, 'B11')
  const modulo2 = new Modulo('CLAS', 'L', 1, 'B11')
  const modulo3 = new Modulo('AYU', 'L', 1, 'B11')
  const modulo4 = new Modulo('CLAS', 'M', 1, 'B11')
  const modulo5 = new Modulo('CLAS', 'L', 2, 'B11')
  const modulo6 = new Modulo('CLAS', 'L', 1, 'B12')

  // Mismo día, módulo, tipo y sala
  expect(Modulo.modulosCompatibles(modulo1, modulo2)).toBe(false)
  expect(Modulo.modulosCompatibles(modulo2, modulo1)).toBe(false)
  // Tipo distintos
  expect(Modulo.modulosCompatibles(modulo1, modulo3)).toBe(false)
  // Día distintos
  expect(Modulo.modulosCompatibles(modulo1, modulo4)).toBe(true)
  // Módulo distintos
  expect(Modulo.modulosCompatibles(modulo1, modulo5)).toBe(true)
  // Sala distintas
  expect(Modulo.modulosCompatibles(modulo1, modulo6)).toBe(false)
})
