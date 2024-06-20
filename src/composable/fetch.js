import axios from 'axios'

import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

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

// export function useApipost(url, params = null, headers = {}) {
//   return axios.get(url, params, { headers })
// }

// export function useApipost(url, params, headers = {}) {
//   return axios.post(url, params, { headers })
// }