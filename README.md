# BuscaCursosUC
Paquete npm para hacer scraping de buscacursos.uc.cl. Permite buscar y obtener un array con cursos de la UC.

# Instalación
Paquete disponible en NPM.

```
npm install --save @aurmeneta/buscacursos-uc
```

# Uso
Incluye el paquete en tu proyecto y realiza la búsqueda.

```javascript
const { cursos, catalogo, cupos } = require("@aurmeneta/buscacursos-uc");

// Buscar cursos
let porNombre = await cursos.buscarCurso("2020-1", "Cálculo II");
let porSigla = await cursos.buscarSigla("2020-1", "MAT1620");
let porProfesor = await cursos.buscarProfesor("2020-1", "Torres");

// Obtener períodos disponibles
let periodos = await cursos.obtenerPeriodos();

// Obtener cupos desagregados de un curso
let cupos = await cupos.obtenerCupos("2022-1", "MAT1620");

// Obtener requisitos, restricciones y equivalencias de un curso
let detallesCurso = await catalogo.obtenerDetallesCurso(14275)

```

Cada búsqueda retorna un arreglo con los cursos encontrados.
```javascript
// Búsqueda de cursos
[
  {
    nrc: '14823',
    sigla: 'MAT1620',
    seccion: 1,
    nombre: 'Cálculo II',
    profesor: [ 'Zegarra Luis', 'Rojas Carlos' ],
    vacantes_disponibles: 3,
    horario: [
      { tipo: 'CLAS', dia: 'L', modulo: 5, sala: 'K203' },
      { tipo: 'CLAS', dia: 'W', modulo: 5, sala: 'K203' },
      { tipo: 'CLAS', dia: 'J', modulo: 5, sala: 'K203' },
      { tipo: 'AYU', dia: 'V', modulo: 1, sala: 'AE102' },
      { tipo: 'LAB', dia: 'V', modulo: 6, sala: 'SIN SALA' }
    ]
  },
  ...
]

// Periodos
[ '2022-1', '2021-3', '2021-2', ... ]

// Cupos
{
  nrc: 14275,
  sigla: 'EYP2114-1',
  vacantesDisponibles: 31,
  cupos: [
    {
      escuela: 'Vacantes libres',
      vacantesOfrecidas: 30,
      vacantesOcupadas: 17,
      vacantesDisponibles: 13
    },
    {
      escuela: '04 - Ingeniería',
      vacantesOfrecidas: 60,
      vacantesOcupadas: 44,
      vacantesDisponibles: 16
    },
    {
      escuela: '09 - Lic. Generales (College)',
      vacantesOfrecidas: 5,
      vacantesOcupadas: 3,
      vacantesDisponibles: 2
    }
  ]
}
// Detalles Curso
{
  prerrequistos: [
    [ {sigla: "FIS0152", correquisito: true}, {sigla: "MAT1620", correquisito: false} ],
    ...
  ],
  restricciones: '(Programa=Lic en Ing Cs de Datos)',
  relacion: 'o',
  equivalencias: [ 'FIS1522', 'ICM1003', 'IIQ1002', 'IIQ1003', 'IIQ103H' ]
}
```
# CORS

Si la consulta se realiza directamente desde un navegador, esta será rechazada porque, por defecto, la respuesta no incluye los headers para CORS. Para inlcuirlos, se debe realizar un proxy de buscacursos o el cátalogo que las incluya e indicar el url como páramentro en las solicitudes.

```javascript
const buscaCursos = require("@aurmeneta/buscacursos-uc");

let porNombre = await buscaCursos.buscarCurso("2020-1", "Cálculo II", "https://buscacursos.proxy.example/");
let porSigla = await buscaCursos.buscarSigla("2020-1", "MAT1620",  "https://buscacursos.proxy.example/");
let porProfesor = await buscaCursos.buscarProfesor("2020-1", "Torres",  "https://buscacursos.proxy.example/");

let periodos = await cursos.obtenerPeriodos("https://buscacursos.proxy.example/")

let cupos = await cupos.obtenerCupos("2022-1", "MAT1620", "https://buscacursos.proxy.example/");

let detallesCurso = await catalogo.obtenerDetallesCurso(14275, "https://catalogo.proxy.example/");)
```
