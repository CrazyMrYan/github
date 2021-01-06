export const COLORS = [
  '#D76B00',
  '#264f87',
  '#5ab1ef',
  '#d87a80',
  '#e5cf0d',
  '#97b552',
  '#95706d',
  '#dc69aa',
  '#07a2a4',
  '#9a7fd1',
  '#f5994e',
  '#c05050',
  '#c9ab00',
  '#7eb00a',
  '#c14089',
];

export const YEAR_LAST_FORMAT = 2019;
export const YEAR_START_FORMAT = 2020;
export const YEAR_LAST = new Date('2019-01-01');
export const YEAR_START = new Date('2020-01-01');
export const YEAR_END = new Date('2021-01-01');
export const ONE_HOUR = 1000 * 60 * 60;
export const ONE_DAY = ONE_HOUR * 24;
export const ONE_WEEK = ONE_DAY * 7;
// 565c060a0765b51359b3
// 0de8447e3549278871a3ff4cae5ec2153a49fbbe
export const CLIENT_ID = process.env.NODE_ENV === 'production' ? '565c060a0765b51359b3' : '565c060a0765b51359b3';
export const CLIENT_SECRET = process.env.NODE_ENV === 'production' ? '0de8447e3549278871a3ff4cae5ec2153a49fbbe' : '0de8447e3549278871a3ff4cae5ec2153a49fbbe';

export const GITHUB_YEARLY_REPORT_PRE = 'GITHUB_YEARLY_REPORT';
export const GITHUB_TOKEN = `${GITHUB_YEARLY_REPORT_PRE}_GITHUB_TOKEN`;
export const GITHUB_CODE = `${GITHUB_YEARLY_REPORT_PRE}_GITHUB_CODE`;

export const HOME_STATUS = {
  INIT: 0, // 初始状态
  BEGIN: 1, // 开始生成数据
  FINISH: 2, // 结束生成数据
  ERROR: -1, // 出错
};

export const TIMEOUT = 3000;

export const USERINFO_PICK_KEYS: string[] = [
  'login',
  'id',
  'name',
  'avatar_url',
  'location',
  'bio',
  'public_repos',
  'public_gists',
  'followers',
  'following',
  'created_at',
  'updated_at',
];

export const REPOS_PICK_KEYS: string[] = [
  'name', // 项目
  'full_name', // 项目名
  'description', // 项目描述
  'fork', // 是否是 fork 别人的
  'created_at', // 创建时间
  'updated_at', // 更新时间
  'stargazers_count', // star 数
  'language', // 主要语言
  'forks_count', // fork 数
  'open_issues', // 打开的 issue 数
];

export const ORGS_PICK_KEYS: string[] = [
  'login', // 组织名
  'name', // 组织名
  'description', // 组织介绍
  'avatar_url', // 头像
];
