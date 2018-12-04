module.exports = class Issue {
  /**
   * @param {number} days
   * @param {GitHubAPI} github
   * @param {string} owner
   * @param {string} repo
   */
  constructor (days, { github, owner, repo }) {
    this.days = days
    this.github = github
    this.owner = owner
    this.repo = repo
  }

  async create () {
    return this.github.issues.create({
      owner: this.owner,
      repo: this.repo,
      title: 'Too long not released',
      body: 'Outdated for ' + this.days + ' days',
      labels: ['release-me']
    })
  }
}
