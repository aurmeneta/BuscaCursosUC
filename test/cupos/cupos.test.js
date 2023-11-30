/* eslint-disable no-undef */
const { cupos } = require('../../index')

test('obtener cupos retorna resultados no vacíos', async () => {
  const resultado = await cupos.obtenerCupos('2022-1', '14833')

  expect(resultado.nrc).toBe('14833')
  expect(resultado.sigla).toBe('MAT1620-1')
  expect(resultado.vacantesDisponibles).not.toBeNaN()
  expect(resultado.inseguro).toBe(false)
  expect(resultado.cupos.length).toBeGreaterThanOrEqual(1)
})

test('obtener cupos retorna cupos para distintas esculas, programas, concentraciones, admsiones, etc.', async () => {
  const resultado = await cupos.obtenerCupos('2023-2', '12489')

  expect(resultado.nrc).toBe('12489')
  expect(resultado.sigla).toBe('ICS1113-1')
  expect(resultado.vacantesDisponibles).not.toBeNaN()
  expect(resultado.inseguro).toBe(false)
  expect(resultado.cupos.length).toBeGreaterThanOrEqual(1)

  for (cupo of resultado.cupos) {
    expect(cupo.escuela).not.toBeUndefined()
    expect(cupo.nivel).not.toBeUndefined()
    expect(cupo.programa).not.toBeUndefined()
    expect(cupo.concentracion).not.toBeUndefined()
    expect(cupo.cohorte).not.toBeUndefined()
    expect(cupo.admision).not.toBeUndefined()
    expect(cupo.vacantesOfrecidas).not.toBeNaN()
    expect(cupo.vacantesOcupadas).not.toBeNaN()
    expect(cupo.vacantesDisponibles).not.toBeNaN()
  }
})

test('obtener cupos de curso sin reservas retorna resultados no vacíos', async () => {
  const resultado = await cupos.obtenerCupos('2022-1', '12745')

  expect(resultado.nrc).toBe('12745')
  expect(resultado.sigla).toBe('DPT6500')
  expect(resultado.vacantesDisponibles).not.toBeNaN()
  expect(resultado.inseguro).toBe(true)
  expect(resultado.cupos.length).toBe(1)
})
