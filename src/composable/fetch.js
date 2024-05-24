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