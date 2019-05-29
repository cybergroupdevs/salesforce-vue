import 'whatwg-fetch'

function handleErrors(response: any) {
  if (!response.ok) {
    throw response
  }
  return response
}

function request(url: string, opts: any) {
  opts = opts || {}
  opts.credentials = opts.credentials || 'same-origin'
  return window.fetch(url, opts).then(handleErrors)
}

function json(url: string, opts: any) {
  opts = opts || {}
  opts.headers = opts.headers || {}
  opts.headers['Content-Type'] =
    opts.headers['Content-Type'] || 'application/json'
  opts.headers['Accept'] = opts.headers['Accept'] || 'application/json'
  return request(url, opts).then(resp => resp.json())
}

export default {
  request: request,
  json: json,
}
