/*
Copyright (c) 2021, Andrés Urmeneta B. <aurmeneta@uc.cl>
Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

const Curso = require('./lib/cursos/Curso')
const Modulo = require('./lib/cursos/Modulo')
const ChoquesPermitidos = require('./lib/cursos/ChoquesPermitidos')
const cursos = require('./lib/cursos')
const cupos = require('./lib/cupos')
const catalogo = require('./lib/catalogo')

// Exports antiguos
exports.obtenerCursos = cursos.obtenerCursos
exports.buscarSigla = cursos.buscarSigla
exports.buscarProfesor = cursos.buscarProfesor
exports.buscarCurso = cursos.buscarCurso
exports.Curso = Curso
exports.Modulo = Modulo
exports.ChoquesPermitidos = ChoquesPermitidos

// Nuevos exports
exports.cursos = cursos
exports.cupos = cupos
exports.catalogo = catalogo
