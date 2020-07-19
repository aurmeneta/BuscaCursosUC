/*
Copyright (c) 2020, Andrés Urmeneta B. <aurmenetab@gmail.com>
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

const axios = require("axios");
const cheerio = require("cheerio");

const url_base = "http://buscacursos.uc.cl/?";

function obtenerCursos(url) {
    return axios.get(url).then(response => {
        let cursos = []; // Arreglo para guardar los cursos encontrados.
        let filas = []; // Arreglo para guardar las filas obtenidas desde la tabla html.

        // Carga la pagina web en el selector.
        const $ = cheerio.load(response.data);

        // Busca las filas de la tabla.
        filas = $('.resultadosRowPar').toArray();
        filas = filas.concat($('.resultadosRowImpar').toArray());

        // Convierte las filas html en objetos.
        filas.forEach(fila => {

            let columnas = $(fila).find('td');

            let nrc = $(columnas[0]).text().trim();
            let sigla = $(columnas[1]).text().trim();
            let seccion = parseInt($(columnas[4]).text());
            let nombre = $(columnas[9]).text().trim();
            let profesor = $(columnas[10]).text()
                .split(',')
                .map(texto => texto.trim());
            let vacantes_disponibles = parseInt($(columnas[14]).text());

            let horario = [];
            
            let filas_horario = $(columnas[16]).find('tr').toArray();
            
            filas_horario.forEach(fila_horario => {
                let columnas_horario = $(fila_horario).find('td');

                let tipo = $(columnas_horario[1]).text().trim();
                let sala = $(columnas_horario[2]).text().trim();

                let horas_dias = $(columnas_horario[0]).text().trim().split(':');
                let dias = horas_dias[0].split('-');
                let horas = horas_dias[1].split(',').map(hora => parseInt(hora));

                dias.forEach(dia => {
                    horas.forEach(hora => {
                        horario.push({tipo, dia, hora, sala})
                    });
                });
            });



            cursos.push({nrc, sigla, seccion, nombre, profesor, vacantes_disponibles, horario})
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