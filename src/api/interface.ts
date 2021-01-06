export interface ANY_OBJECT {
  [propName: string]: any;
}

export interface USERINFO {
  login?: string
  id?: number
  avatar_url?: string
  name?: string
  location?: string
  bio?: string
  public_repos?: number
  public_gists?: number
  followers?: number
  following?: number
  created_at?: string
  updated_at?: string
  [propName: string]: any
}

export interface REPO {
  name?: string
  full_name?: string
  description?: string
  fork?: boolean
  created_at?: string
  updated_at?: string
  stargazers_count?: number
  watchers_count?: number
  language?: string
  forks_count?: number
  open_issues?: number
  forks?: number
  watchers?: number
  [propName: string]: any
}

export interface REPOS_INFO {
  repos?: REPO[]
  stars?: number
  forks?: number
  forked?: number
  openIssues?: number
  language?: ANY_OBJECT
  maxIssues?: REPO
  createds?: number
  dayEarliest?: REPO
  dayLatest?: REPO
  lastYearCreateds?: number
  latest?: REPO
}

export interface STARS_INFO {
  stars?: REPO[]
  language?: ANY_OBJECT
  mostStars?: REPO[]
}

export interface ORG {
  login?: string
  name?: string
  description?: string
  avatar_url?: string
}

export interface COMMIT_ACTIVITY_ITEM {
  total: number
  week: number
  days: number[]
}

export interface REPO_COMMINT_INFO {
  repo?: string
  commits?: COMMIT_ACTIVITY_ITEM[]
  total: number
}

export interface ORGS_INFO {
  orgs?: ORG[]
}
