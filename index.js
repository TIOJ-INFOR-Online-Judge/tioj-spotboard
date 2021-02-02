
const config = require('./parseArgs.js')()
const connectSql = require('./connectSql.js')
const getContest = require('./getContest.js')
const getSubmission = require('./getSubmission.js')
const outputRuns = require('./outputRuns.js')

if (config.testYargs) {
	return console.log(config)
}

connectSql({ config })
.then(getContest)
.then(getSubmission)
.then(outputRuns)

.then(() => process.exit(0)).catch(console.error).then(() => process.exit(1))

