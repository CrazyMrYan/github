import dayjs from 'dayjs';
import { REPO, COMMIT_ACTIVITY_ITEM, REPO_COMMINT_INFO } from '@/api/interface';
import { pick, inStartEndYear, inLastStartYear } from './utils';
import { REPOS_PICK_KEYS } from './constant';

interface ANY_OBJECT {
  [propName: string]: number
}

/**
 * 从仓库数据中我们可以分析什么
 * @param repos 所有仓库
 */
export const handleReposData = (repos: REPO[]) => {
  let starsResult = 0;
  let openIssuesResult = 0;
  let lastyearCreatedResult = 0;
  let toyearCreatedsResult = 0;

  const languageResult: ANY_OBJECT = {};
  let maxIssueCount = 0;
  let maxIssueIndex = 0;
  let dayEarliestTime = 0;
  let dayEarliestIndex = 0;
  let dayLatestTime = 0;
  let dayLatestIndex = 0;
  let latestUpdateTime = 0;
  let latestUpdateIndex = 0;

  const result = repos.map((repo: REPO, index: number) => {
    const repoTemp = pick(repo, REPOS_PICK_KEYS);
    const { stargazers_count, open_issues, created_at, updated_at } = repoTemp;
    const language = repoTemp.language || 'other';
    starsResult += stargazers_count;
    openIssuesResult += open_issues;
    languageResult[language] = languageResult[language] ? languageResult[language] + 1 : 1;

    if (inLastStartYear(created_at)) {
      lastyearCreatedResult += 1;
    }

    if (inStartEndYear(created_at)) {
      toyearCreatedsResult += 1;
    }

    if (inStartEndYear(updated_at)) {
      if (index === 0) {
        dayEarliestTime = updated_at;
        dayLatestTime = updated_at;
        latestUpdateTime = updated_at;
      }
      if (dayjs(updated_at).isBefore(dayjs(dayEarliestTime, 'second'))) {
        dayEarliestTime = updated_at;
        dayEarliestIndex = index;
      }
      if (dayjs(updated_at).isAfter(dayjs(dayLatestTime, 'second'))) {
        dayLatestTime = updated_at;
        dayLatestIndex = index;
      }
      if (dayjs(updated_at).isAfter(dayjs(dayLatestTime, 'second'))) {
        latestUpdateTime = updated_at;
        latestUpdateIndex = index;
      }
    }

    if (open_issues > maxIssueCount && language !== 'other') {
      maxIssueCount = open_issues;
      maxIssueIndex = index;
    }

    return repoTemp;
  });

  const all = {
    repos: result, // 所有仓库
    lastYearCreateds: lastyearCreatedResult, // 去年创建的仓库
    createds: toyearCreatedsResult, // 本年新创建的仓库
    latest: result[latestUpdateIndex], // 最近在更新的仓库
    stars: starsResult, // 点赞你的总数
    openIssues: openIssuesResult, // 打开的 issues 数
    maxIssues: result[maxIssueIndex], // open issues 最多的仓库
    dayEarliest: result[dayEarliestIndex], // 每天最早的 update
    dayLatest: result[dayLatestIndex], // 每天最迟的 update
    language: languageResult, // 语言
    mostStars: result.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count).slice(0, 5), // 点赞最多的 top 5
  };
  return all;
};

/**
 * 从你的点赞记录可以分析什么
 * @param repos 所有仓库
 */
export const handleStarsData = (repos: REPO[]) => {
  const languageResult: ANY_OBJECT = {};

  const result = repos.map((repo: REPO, index: number) => {
    const repoTemp = pick(repo, REPOS_PICK_KEYS);
    const language = repoTemp.language || 'other';

    languageResult[language] = languageResult[language] ? languageResult[language] + 1 : 1;

    return repoTemp;
  });
  return {
    stars: result, // 所有点赞
    language: languageResult, // 语言分布
    mostStars: result.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count).slice(0, 5), // 点赞最多的 top 5
  };
};

export const handleCommitsData = (repos: REPO_COMMINT_INFO[]) => {
  let commitTotal = 0;
  const time: any = {};
  let mostWeekTotal = 0;
  let mostWeekInfo = {};
  let mostDayTotal = 0;
  let mostDayInfo = {};

  repos.forEach((repo: REPO_COMMINT_INFO) => {
    const { commits, total }: any = repo;
    commitTotal += total;
    commits.forEach((commit: COMMIT_ACTIVITY_ITEM) => {
      const { week, days } = commit;
      if (time[week]) {
        time[week] += commit.total;
      } else {
        time[week] = commit.total;
      }
      if (commit.total >= mostWeekTotal) {
        mostWeekTotal = commit.total;
        const weekDayJsObject = dayjs.unix(week);
        mostWeekInfo = {
          repo: repo.repo,
          week: `${weekDayJsObject.format('YYYY-MM-DD')} ~ ${weekDayJsObject.add(7, 'day').format('YYYY-MM-DD')}`,
          total: commit.total,
        };
      }
      days.forEach((day: number, index: number) => {
        if (day >= mostDayTotal) {
          mostDayTotal = day;
          mostDayInfo = {
            repo: repo.repo,
            day: dayjs.unix(week).add(index, 'day').format('YYYY-MM-DD'),
            total: day,
          };
        }
      });
    });
  });
  const commitsRanks = repos.sort((a: REPO_COMMINT_INFO, b: REPO_COMMINT_INFO) => b.total - a.total);

  const weekRanks = Object.entries(time).sort((a: any, b: any) => a[0] - b[0]).map(((item: any, index: number) => {
    const dayJsObject = dayjs.unix(item[0]);
    return {
      week: dayJsObject.format(index === 0 ? 'YYYY-MM-DD' : 'MM-DD'),
      total: item[1],
    };
  }));

  return {
    total: commitTotal, // commits 总数
    ranks: commitsRanks.slice(0, 5), // commits top 5
    weekRanks, // 最勤奋的5周
    mostWeekRepo: mostWeekInfo, // 最勤奋的一周是贡献给哪个仓库
    mostDayRepo: mostDayInfo, // 最勤奋的一天是贡献给哪个仓库
  };
};
