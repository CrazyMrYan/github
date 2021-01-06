import axios from '@/lib/axios';
import { githubTokenPath } from './api';

export const fetchGithubTokenService = async (
  payload = {},
): Promise<any> => {
  const response = await axios(githubTokenPath, payload, 'post');
  return response;
};