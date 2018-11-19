const createScheduler = require('probot-scheduler')
module.exports = async app => {
  app.log('Probot Clean app is running successfully.')
  app.on('schedule.repository', async (context) => {
    app.log(`App is running as per schedule.repository`)
    app.log('Local Time: ' + new Date())
    const { owner, repo } = context.repo()
    app.log(`Repository: ${owner}/${repo}`)
    await context.github.issues.create({
      owner,
      repo,
      title: 'Waiting for release',
      body: 'Too long not released. \n Commits after latest release %s \n Outdated for %d days',
      labels: ['release-me']
    })
  })
  createScheduler(
    app,
    { interval: 12 * 60 * 60 * 1000 } // 12 hours
  )
}
