const createScheduler = require('probot-scheduler')
const BotClean = require('lib/bot-clean')
const Commits = require('lib/commits')
module.exports = async app => {
  app.log('Probot Clean app is running successfully.')
  app.on('schedule.repository', async (context) => {
    app.log(`App is running as per schedule.repository`)
    app.log('Local Time: ' + new Date())
    const { owner, repo, github } = context.repo()
    let bot = new BotClean(github, { owner, repo, logger: app.log })
    // @todo fetch last release date
    // @todo fetch commits after the date
    app.log(`Repository: ${owner}/${repo}`)
    if (new Commits(github, owner, repo).unreleased().size > 5) {
      await bot.create()
    }
  })
  createScheduler(
    app,
    { interval: 12 * 60 * 60 * 1000 } // 12 hours
  )
}
