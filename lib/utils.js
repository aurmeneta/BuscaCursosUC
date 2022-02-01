const fetchConfig = {
  headers: {
    Origin: 'aurmeneta/buscacursos-uc'
  }
}

async function getFetch () {
  console.log('yip')
  if (typeof fetch === 'function') {
    return fetch
  } else {
    return (await import('node-fetch')).default
  }
}

exports.fetchConfig = fetchConfig
exports.getFetch = getFetch
