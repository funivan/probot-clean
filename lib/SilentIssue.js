module.exports = class SilentIssue {
  /**
   * @param {Issue} issue
   * @param {LoggerWithTarget} logger
   */
  constructor (issue, logger) {
    this.issue = issue
    this.logger = logger
  }

  async create () {
    // @todo check if we should create issue
    this.logger('Check if repository already has opened issue')
    return this.issue.create()
  }
}
