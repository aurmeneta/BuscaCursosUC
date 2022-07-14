/* eslint-disable no-undef */
const { faker } = require('@faker-js/faker')

const { cursos } = require('../../index')
const { ChoquesPermitidos } = cursos

test('si no se ha agregado el choque, no se permite', () => {
  const choquesPermitidos = new ChoquesPermitidos()
  const sigla1 = faker.lorem.slug()
  const sigla2 = faker.lorem.slug()
  const tipo1 = faker.lorem.slug()
  const tipo2 = faker.lorem.slug()

  expect(choquesPermitidos.evaluarChoque(sigla1, tipo1, sigla2, tipo2)).toBe(false)

  choquesPermitidos.anadirChoque(sigla1, tipo1, sigla2, tipo2, true)
  expect(choquesPermitidos.evaluarChoque(sigla1, tipo1, sigla2, tipo2)).toBe(true)
})

test('si se agregó y permitió el choque, se permite', () => {
  const choquesPermitidos = new ChoquesPermitidos()
  const sigla1 = faker.lorem.word()
  const sigla2 = faker.lorem.word()
  const tipo1 = faker.lorem.word()
  const tipo2 = faker.lorem.word()

  choquesPermitidos.anadirChoque(sigla1, tipo1, sigla2, tipo2, true)
  expect(choquesPermitidos.evaluarChoque(sigla1, tipo1, sigla2, tipo2)).toBe(true)
})

test('si se puede cambiar un choque ya agregado', () => {
  const choquesPermitidos = new ChoquesPermitidos()
  const sigla1 = faker.lorem.word()
  const sigla2 = faker.lorem.word()
  const tipo1 = faker.lorem.word()
  const tipo2 = faker.lorem.word()

  choquesPermitidos.anadirChoque(sigla1, tipo1, sigla2, tipo2, true)
  expect(choquesPermitidos.evaluarChoque(sigla1, tipo1, sigla2, tipo2)).toBe(true)

  choquesPermitidos.anadirChoque(sigla1, tipo1, sigla2, tipo2, false)
  expect(choquesPermitidos.evaluarChoque(sigla1, tipo1, sigla2, tipo2)).toBe(false)
})

test('si se permite el choque de una sigla con cualquiera, se permite', () => {
  const choquesPermitidos = new ChoquesPermitidos()
  const sigla1 = faker.lorem.word()
  const sigla2 = faker.lorem.word()
  const tipo1 = faker.lorem.word()
  const tipo2 = faker.lorem.word()

  choquesPermitidos.anadirChoque(sigla1, tipo1, '*', '*', true)
  expect(choquesPermitidos.evaluarChoque(sigla1, tipo1, sigla2, tipo2)).toBe(true)
  expect(choquesPermitidos.evaluarChoque(sigla2, tipo2, sigla1, tipo1)).toBe(true)
})

test('parámetros invertidos no afecta búsqueda', () => {
  const choquesPermitidos = new ChoquesPermitidos()
  const sigla1 = faker.lorem.word()
  const sigla2 = faker.lorem.word()
  const tipo1 = faker.lorem.word()
  const tipo2 = faker.lorem.word()

  choquesPermitidos.anadirChoque(sigla1, tipo1, sigla2, tipo2, true)
  expect(choquesPermitidos.evaluarChoque(sigla2, tipo2, sigla1, tipo1)).toBe(true)
})

test('párametros invertidos con "*" no afecta búsqueda', () => {
  const choquesPermitidos = new ChoquesPermitidos()
  const sigla1 = faker.lorem.word()
  const sigla2 = faker.lorem.word()
  const tipo1 = faker.lorem.word()
  const tipo2 = faker.lorem.word()

  choquesPermitidos.anadirChoque('*', '*', sigla1, tipo1, true)
  expect(choquesPermitidos.evaluarChoque(sigla2, tipo2, sigla1, tipo1)).toBe(true)
  expect(choquesPermitidos.evaluarChoque(sigla1, tipo1, sigla2, tipo2)).toBe(true)
})

test('* solo permite choques del curso especificado', () => {
  const choquesPermitidos = new ChoquesPermitidos()
  const sigla1 = faker.lorem.word()
  const sigla2 = faker.lorem.word()
  const sigla3 = faker.lorem.word()
  const tipo1 = faker.lorem.word()
  const tipo2 = faker.lorem.word()
  const tipo3 = faker.lorem.word()

  choquesPermitidos.anadirChoque('*', '*', sigla1, tipo1, true)
  expect(choquesPermitidos.evaluarChoque(sigla1, tipo1, sigla2, tipo2)).toBe(true)
  expect(choquesPermitidos.evaluarChoque(sigla1, tipo1, sigla3, tipo3)).toBe(true)
  expect(choquesPermitidos.evaluarChoque(sigla2, tipo2, sigla3, tipo3)).toBe(false)
})

test('* con * permite el choque de todo', () => {
  const choquesPermitidos = new ChoquesPermitidos()
  const sigla1 = faker.lorem.word()
  const sigla2 = faker.lorem.word()
  const tipo1 = faker.lorem.word()
  const tipo2 = faker.lorem.word()

  choquesPermitidos.anadirChoque('*', '*', '*', '*', true)
  expect(choquesPermitidos.evaluarChoque(sigla1, tipo1, sigla2, tipo2)).toBe(true)
})

test('distinción de tipos', () => {
  const choquesPermitidos = new ChoquesPermitidos()
  const sigla1 = faker.lorem.word()
  const sigla2 = faker.lorem.word()
  const tipo1 = faker.lorem.word()
  const tipo2 = faker.lorem.word()
  const tipo3 = faker.lorem.word()

  choquesPermitidos.anadirChoque(sigla1, tipo1, sigla2, tipo2, true)
  expect(choquesPermitidos.evaluarChoque(sigla1, tipo1, sigla2, tipo2)).toBe(true)
  expect(choquesPermitidos.evaluarChoque(sigla1, tipo1, sigla2, tipo3)).toBe(false)
  expect(choquesPermitidos.evaluarChoque(sigla1, tipo3, sigla2, tipo2)).toBe(false)
})
