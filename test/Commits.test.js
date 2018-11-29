/* eslint-disable camelcase */
process.env.LOG_LEVEL = 'fatal'
const Commits = require('../lib/Commits')
test('that Commits is working', async () => {
  let context = {
    github: {
      paginate: jest.fn(),
      repos: {
        getCommits: jest.fn()
      }
    }
  }
  await new Commits(context.github, { owner: 'probot', repo: 'clean' })
    .after(new Date())
  expect(context.github.paginate).toHaveBeenCalled()
  expect(context.github.repos.getCommits).toHaveBeenCalled()
})
