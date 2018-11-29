/* eslint-disable camelcase */
process.env.LOG_LEVEL = 'fatal'
const LastReleaseDate = require('../lib/LastReleaseDate')
test(
  'Date should be null',
  async () => {
    let github = {
      repos: {
        getLatestRelease: jest.fn().mockImplementation(() => Promise.resolve({}))
      }
    }
    expect(
      await new LastReleaseDate(github, { owner: 'probot', repo: 'test' }).date()
    ).toBeNull()
  }
)
test(
  'Date should be valid',
  async () => {
    let github = {
      repos: {
        getLatestRelease: jest.fn().mockImplementation(() => Promise.resolve({
          data: {
            published_at: '2013-02-27T19:35:32Z'
          }
        }))
      }
    }
    let date = (await new LastReleaseDate(github, { owner: 'probot', repo: 'test' }).date()).toString()
    expect(date).toBe(new Date('2013-02-27T19:35:32Z').toString())
  }
)
