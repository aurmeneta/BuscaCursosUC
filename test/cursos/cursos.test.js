/* eslint-disable no-undef */
const { cursos } = require('../../index')

test('obtenerCurso obtiene datos correctamente', async () => {
  const curso = await cursos.obtenerCurso('2022-1', 12745)
  expect(curso).toEqual(
    new cursos.Curso(
      '12745',
      'DPT6500',
      true,
      false,
      1,
      false,
      'Salud y Bienestar',
      'Presencial',
      '',
      'Tenis I',
      ['Echeverría Francisca'],
      'San Joaquín',
      5,
      20,
      2,
      [
        new cursos.Modulo('CLAS', 'L', 1, 'C-TENIS'),
        new cursos.Modulo('CLAS', 'W', 1, 'C-TENIS'),
        new cursos.Modulo('CLAS', 'V', 1, 'C-TENIS')
      ]
    )
  )
})

test('obtenerCursos obtiene cantidad correcta de resultados', async () => {
  const resultados = await cursos.obtenerCursos('https://buscacursos.uc.cl/?cxml_semestre=2022-1&cxml_sigla=MAT1620&cxml_nrc=&cxml_nombre=&cxml_categoria=TODOS&cxml_area_fg=TODOS&cxml_formato_cur=TODOS&cxml_profesor=&cxml_campus=TODOS&cxml_unidad_academica=TODOS&cxml_horario_tipo_busqueda=si_tenga&cxml_horario_tipo_busqueda_actividad=TODOS#resultados')
  expect(resultados.length).toBe(8)
})

test('buscarSigla obtiene cantidad correcta de resultados', async () => {
  const resultados = await cursos.buscarSigla('2022-1', 'MAT1620')
  expect(resultados.length).toBe(8)
})

test('buscarCurso obtiene cantidad correcta de resultados', async () => {
  const resultados = await cursos.buscarCurso('2022-1', 'Cálculo III')
  expect(resultados.length).toBe(11)
})

test('buscarProfesor obtiene cantidad correcta de resultados', async () => {
  const resultados = await cursos.buscarProfesor('2022-1', 'Francisca Echeverría')
  expect(resultados.length).toBe(11)
})
