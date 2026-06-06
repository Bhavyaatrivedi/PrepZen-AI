import { useQuery } from 'react-query';
import API from '../services/api';

export function useMoodHistory() {
  return useQuery('moodHistory', async () => {
    const response = await API.get('/mood/history');
    return response.data;
  }, {
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
    retry: 1
  });
}
