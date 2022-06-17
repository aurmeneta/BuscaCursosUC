const fetchConfig = {
  headers: {
    Origin: 'aurmeneta/buscacursos-uc'
  }
}

async function getFetch () {
  if (typeof fetch === 'function') {
    return fetch
  } else {
    return (await import('node-fetch')).default
  }
}

exports.fetchConfig = fetchConfig
exports.getFetch = getFetch
exports.URLS = {
  cupos: 'https://buscacursos.uc.cl/informacionVacReserva.ajax.php',
  buscacursos: 'https://buscacursos.uc.cl/',
  catalogo: 'https://catalogo.uc.cl/index.php'
}
