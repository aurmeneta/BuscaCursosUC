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
const buscaCursos = require("@aurmeneta/buscacursos-uc");

let porNombre = await buscaCursos.buscarCurso("2020-1", "Cálculo II");
let porSigla = await buscaCursos.buscarSigla("2020-1", "MAT1620");
let porProfesor = await buscaCursos.buscarProfesor("2020-1", "Torres");
```

Cada búsqueda retorna un arreglo con los cursos encontrados.
```javascript
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
```
# CORS

Si la consulta se realiza directamente desde un navegador, esta será rechazada porque, por defecto, la respuesta no incluye los headers para CORS. Para inlcuirlos, se debe especificar como un tercer argumento en las funciones de búsqueda.

```javascript
const buscaCursos = require("@aurmeneta/buscacursos-uc");

let porNombre = await buscaCursos.buscarCurso("2020-1", "Cálculo II", True);
let porSigla = await buscaCursos.buscarSigla("2020-1", "MAT1620", True);
let porProfesor = await buscaCursos.buscarProfesor("2020-1", "Torres", True);
```