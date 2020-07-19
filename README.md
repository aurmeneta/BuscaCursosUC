# BuscaCursosUC
Paquete npm para hacer scraping de buscacursos.uc.cl. Permite buscar y obtener un array con cursos de la UC.

# Instalación
Este paquete no está disponible en los repositorios de NPM. Debes incluirlo directamente desde github.

```javascript
"dependencies": {
    "buscacursos-uc": "git+https://git@github.com/aurmeneta/BuscaCursosUC"
}
```
# Uso
Incluye el paquete en tu proyecto y realiza la búsqueda.

```javascript
const buscaCursos = require("buscacursos-uc");

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
      { tipo: 'CLAS', dia: 'L', hora: 5, sala: 'K203' },
      { tipo: 'CLAS', dia: 'W', hora: 5, sala: 'K203' },
      { tipo: 'CLAS', dia: 'J', hora: 5, sala: 'K203' },
      { tipo: 'AYU', dia: 'V', hora: 1, sala: 'AE102' },
      { tipo: 'LAB', dia: 'V', hora: 6, sala: 'SIN SALA' }
    ]
  },
  ...
]
```
