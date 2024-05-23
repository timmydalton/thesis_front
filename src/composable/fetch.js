import axios from 'axios'

export function useApiget(url, params = null, headers = {}) {
  const jwt = cookies.get('jwt')

  headers = {
    ...headers,
    Authorization: `Bearer ${jwt}`
  }

  return axios({
    method: 'get',
    url,
    params,
    headers
  })
}

export function useApipost(url, params, body, headers = {}) {
  const jwt = cookies.get('jwt')

  headers = {
    ...headers,
    Authorization: `Bearer ${jwt}`
  }

  return axios({
    method: 'post',
    url,
    params,
    headers,
    data: body
  })
}