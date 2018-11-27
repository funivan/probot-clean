module.exports = class BotClean {
  constructor (github, { owner, repo }) {
    this.github = github
    this.owner = owner
    this.repo = repo
  }

  async create () {
    return this.github.issues.create({
      owner: this.owner,
      repo: this.repo,
      title: 'Too long not released',
      body: 'Commits after latest release %s \n Outdated for %d days',
      labels: ['release-me']
    })
  }
}
