
const fs = require('fs')

const wf = require('./waterflow.js')

f = ({ submissions, contest: { start_time, length, freeze_time }, config: { stdout, runOutput } }) => {
	const submission_base = submissions[0].id - 1

	let runs = submissions
		.filter(({ result }) => result !== 'CE')
		.map(({ id, result, problem_id, user_id, created_at }) => ({ 
			id: id - submission_base,
			result: result === 'AC' ? 'Yes' : 'No',
			problem: problem_id,
			team: user_id,
			submissionTime: Math.floor((created_at.valueOf() - start_time.valueOf()) / (60 * 1000)),
		}))

	runs.reduce((o, r) => { 
		return o || (r.submission_time >= length - freeze_time && (console.log(`The last submission before scoreboard frozen: ${r.id - 1}`), true))
	}, false) || console.log(`No submission after scoreboard frozen!`)

	runs = JSON.stringify({ runs }, null, 2)
	if (stdout) {
		return console.log(runs)
	}
	fs.writeFileSync(runOutput, runs)
	console.log(`Runs successfully write into file ${runOutput}`)
}

module.exports = wf(f)
