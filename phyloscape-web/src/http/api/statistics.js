import http from '@/http/Http'
export function getStatisticsData(data){
  return http.get('/api/stat',data)
}