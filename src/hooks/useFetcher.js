import useSWR from 'swr'
import {fetcher} from '@/utils/fetcher'

export const useFetcher = (path) => {
      return useSWR(path, fetcher)
}