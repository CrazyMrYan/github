import Octokit from '@octokit/rest';
import { fetchGithubTokenService } from '@/api/service';
import {
  CLIENT_ID,
  CLIENT_SECRET,
  GITHUB_TOKEN,
} from '@/lib/constant';

/**
 * 拿 code
 */
export const login = () => {
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=public_repo`;
};

/**
 * 拿 token
 * @param code code
 */
export const fetchToken = async (code: string) => {
  await fetchGithubTokenService({
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  }).then(res => {
    const token = res.access_token;
    sessionStorage.setItem(GITHUB_TOKEN, token);
  }).catch(() => {});
};

/**
 * 把 token 给 octokit，放 request header 里
 * @returns Octokit 实例对象
 */
export const authenticate = () => new Octokit({
  auth: sessionStorage.getItem(GITHUB_TOKEN) || '',
});
