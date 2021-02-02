
const fs = require('fs')

const wf = require('./waterflow.js')

f = ({ runs, config: { stdout, runOutput } }) => {

	runs = JSON.stringify(runs)
	if (stdout) {
		return console.log(runs)
	}
	fs.writeFileSync(runOutput, runs)
	console.log(`runs successfully write into file ${runOutput}`)

}

module.exports = wf(f)
