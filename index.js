module.exports = async app => {
  app.on('issues.opened', async context => {
    const params = context.issue({
      body: 'Hello World!'
    })
    await context.github.issues.createComment(params)
  })
}
