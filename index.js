const createScheduler = require('probot-scheduler')
const Commits = require('./lib/Commits')
const DaysDiff = require('./lib/DaysDiff')
const Issue = require('./lib/Issue')
const SilentIssue = require('./lib/SilentIssue')
const LastReleaseDate = require('./lib/LastReleaseDate')
module.exports = async app => {
  // @todo read data from config
  const MAX_DAYS_WAIT = 20
  const MAX_COMMITS = 5
  app.log('Probot app is running successfully.')
  app.on('schedule.repository', async (context) => {
    app.log('App is running as per schedule.repository')
    app.log('Local Time: ' + new Date())
    const { owner, repo, github } = context.repo()
    const releaseDate = new LastReleaseDate(github, { owner, repo }).date()
    if (releaseDate !== null) {
      const days = new DaysDiff(new Date(), releaseDate).value()
      if (days > MAX_DAYS_WAIT) {
        const commits = new Commits(github, owner, repo).after(releaseDate).size
        if (commits > MAX_COMMITS) {
          new SilentIssue(new Issue(days, { github, owner, repo }), app.log).create()
        }
      }
    }
  })
  createScheduler(
    app,
    { interval: 12 * 60 * 60 * 1000 } // 12 hours
  )
}
