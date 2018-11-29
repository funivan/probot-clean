module.exports = class Commits {
  constructor (github, { owner, repo }) {
    this.github = github
    this.owner = owner
    this.repo = repo
  }

  /**
   *
   * @returns {Promise<Any[]>}
   * @param {Date} date
   */
  async after (date) {
    return this.github.paginate(
      this.github.repos.getCommits({
        owner: this.owner,
        repo: this.repo,
        since: date.toISOString(),
        per_page: 100
      }),
      res => res.data
    )
  }
}
