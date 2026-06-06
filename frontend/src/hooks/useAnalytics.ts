import { useQuery } from 'react-query';
import API from '../services/api';

export function useAnalytics() {
  return useQuery('analytics', async () => {
    const response = await API.get('/analytics');
    return response.data;
  }, {
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
    retry: 1
  });
}
