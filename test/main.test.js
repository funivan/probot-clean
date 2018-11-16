/* eslint-disable camelcase */
process.env.LOG_LEVEL = 'fatal'
const {Application} = require('probot')
const BotClean = require('../lib/bot-clean')
const notFoundError = {
  code: 404,
  status: 'Not Found',
  headers: {}
}

describe('bot', () => {
  let app
  let github
  beforeEach(() => {
    app = new Application()
    const issueAction = jest.fn().mockImplementation(() => Promise.resolve(notFoundError))
    // Mock out the GitHub API
    github = {
      integrations: {
        getInstallations: jest.fn()
      },
      issues: {
        create: issueAction
      }
    }
    // Mock out GitHub client
    app.auth = () => Promise.resolve(github)
  })

  test(
    'Should create issue',
    async () => {
      let bot = new BotClean(github, {owner: 'probot', repo: 'test', logger: app.log})
      await bot.create()
      // @todo Create issue - test this behavior
      expect(1).toBe(1)
    }
  )
})
