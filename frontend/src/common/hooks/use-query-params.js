import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { map } from 'lodash'
import { parse } from 'query-string'

export const parseUrlParams = (searchUrl, array_keys = []) => {
  const params = parse(searchUrl)
  const defaults = {}
  map(params, (value, key) => {
    if (array_keys.includes(key)) {
      if (Array.isArray(value)) defaults[key] = value
      else defaults[key] = [value]
    } else {
      defaults[key] = value
    }
  })
  return defaults
}

export const useQueryParams = (array_keys = []) => {
  const { search } = useLocation()
  return useMemo(() => (search ? parseUrlParams(search, array_keys) : {}), [search, array_keys])
}

export default useQueryParams
