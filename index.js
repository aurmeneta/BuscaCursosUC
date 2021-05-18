/*
Copyright (c) 2020, Andrés Urmeneta B. <aurmeneta@uc.cl>
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

const Curso = require("./lib/Curso");
const Modulo = require("./lib/Modulo");
const ChoquesPermitidos = require("./lib/ChoquesPermitidos");

const fetch = require("node-fetch");
const cheerio = require("cheerio");

const fetch_config = {
    headers: {
        'Origin': 'aurmeneta/buscacursos-uc'
    }
}

const url_base = "http://api.aurmeneta.cl/buscacursos?";

function obtenerCursos(url) {
    return fetch(url, fetch_config)
        .then(response => response.text())
        .then(html => {
            let cursos = []; // Arreglo para guardar los cursos encontrados.
            let filas = []; // Arreglo para guardar las filas obtenidas desde la tabla html.

            // Carga la pagina web en el selector.
            const $ = cheerio.load(html);

            // Busca las filas de la tabla.
            filas = $('.resultadosRowPar').toArray();
            filas = filas.concat($('.resultadosRowImpar').toArray());

            // Convierte las filas html en objetos Curso.
            filas.forEach(fila => {

                // Obtiene las columnas de la fila
                let columnas = $(fila).find('td');

                // Obtiene el contenido de cada columna y se lo asigna a la variable correspondiente.
                let nrc = $(columnas[0]).text().trim();
                let sigla = $(columnas[1]).text().trim();
                let permite_retiro = $(columnas[2]).text().trim() === 'SI';
                let ingles = $(columnas[3]).text().trim() === 'SI';
                let seccion = parseInt($(columnas[4]).text());
                let aprobacion_especial = $(columnas[5]).text().trim() === 'SI';
                let area = $(columnas[6]).text().trim();
                let formato = $(columnas[7]).text().trim();
                let categoria = $(columnas[8]).text().trim();
                let nombre = $(columnas[9]).text().trim();
                let profesor = $(columnas[10]).text()
                    .split(',')
                    .map(texto => texto.trim());
                let campus = $(columnas[11]).text().trim();
                let creditos = parseInt($(columnas[12]).text());
                let vacantes_disponibles = parseInt($(columnas[14]).text());

                let horario = [];

                // Obtiene las filas de la "sub-tabla" con los horarios.
                let filas_horario = $(columnas[16]).find('tr').toArray();

                // Convierte cada fila de la "sub-tabla" de horarios.
                filas_horario.forEach(fila_horario => {
                    // Obtiene las columnas de la fila.
                    let columnas_horario = $(fila_horario).find('td');

                    // Obtiene la información y se la asigna a las variables correspondientes.
                    let tipo = $(columnas_horario[1]).text().trim();
                    let sala = $(columnas_horario[2]).text().trim();

                    // Cada entrada de horario tiene el siguiente formato: D-D:M,M
                    // Donde D es un día de la semana y M el número de módulo.

                    // Separa la entrada en los días y los modulos.
                    let horas_modulos = $(columnas_horario[0]).text().trim().split(':');

                    // Separa los días.
                    let dias = horas_modulos[0].split('-');

                    // Si un curso no tiene horario, su entrada será simplemente "-".
                    // Comprueba que el curso tenga horario, por el contrario, sustituye día por "SIN HORARIO".
                    dias = dias.map(dia => dia || "SIN HORARIO");

                    // Separa los módulos
                    let modulos = horas_modulos[1].split(',').map(hora => (parseInt(hora) || 0));

                    dias.forEach(dia => {
                        modulos.forEach(modulo => {
                            // Retorna un objeto para cada día y cada modulo.
                            horario.push(new Modulo(tipo, dia, modulo, sala, modulo));
                            // El campo 'dia' fue renombrado por 'modulo', pero se incluye para no provocar incompatibilidades.
                        });
                    });
                });

                cursos.push(new Curso(nrc, sigla, permite_retiro, ingles, seccion, aprobacion_especial, area, formato,
                    categoria, nombre, profesor, campus, creditos, vacantes_disponibles, horario));
            });

            return cursos;
        });
}

function buscarSigla(periodo, sigla) {
    return obtenerCursos(url_base + `cxml_semestre=${periodo}&cxml_sigla=${sigla}`);
}

function buscarProfesor(periodo, profesor) {
    return obtenerCursos(url_base + `cxml_semestre=${periodo}&cxml_profesor=${profesor}`);
}

function buscarCurso(periodo, nombre) {
    return obtenerCursos(url_base + `cxml_semestre=${periodo}&cxml_nombre=${nombre}`);
}


exports.obtenerCursos = obtenerCursos;
exports.buscarSigla = buscarSigla;
exports.buscarProfesor = buscarProfesor;
exports.buscarCurso = buscarCurso;
exports.Curso = Curso;
exports.Modulo = Modulo;
exports.ChoquesPermitidos = ChoquesPermitidos;