module.exports = class Commits {
  constructor (github, { owner, repo }) {
    this.github = github
    this.owner = owner
    this.repo = repo
  }

  async unreleased () {
    return this.github.paginate(
      this.github.repos.getCommits({
        owner: this.owner,
        repo: this.repo,
        per_page: 100
      }),
      res => res.data
    )
  }
}
