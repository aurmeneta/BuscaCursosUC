/* eslint-disable no-undef */
const { catalogo } = require('../index')

test('obtenerDetallesCurso entrega resultados correctos', async () => {
  const resultado = await catalogo.obtenerDetallesCurso('MAT1620')

  expect(resultado.restricciones).toBe('No tiene')
  expect(resultado.relacion).toBe('No tiene')
  expect(resultado.equivalencias).toContain('MAT1512')
  expect(resultado.prerrequisitos).toEqual([[{ sigla: 'MAT1610', correquisito: false }]])
})
