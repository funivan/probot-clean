module.exports = class LastReleaseDate {
  constructor (github, { owner, repo }) {
    this.github = github
    this.owner = owner
    this.repo = repo
  }

  /**
   * @returns {Promise<Date|null>}
   */
  async date () {
    let data = (await this.github.repos.getLatestRelease({ owner: this.owner, repo: this.repo })).data
    if (data === {} || typeof data === 'undefined') {
      return null
    }
    return new Date(data.published_at)
  }
}
