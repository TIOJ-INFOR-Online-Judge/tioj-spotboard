
const wf = require('./waterflow.js')

f = ({ sql, config, contest, user_map, problem_map }) => {

const { userBase: user_base, problemBase: problem_base } = config
const { id: contest_id, start_time, length, freeze_time} = contest

function convertToTeamId(user_id) {
	return user_map.get(user_id)
}

function convertToProblemId(problem_id) {
	return problem_map.get(problem_id)
}

return new Promise((resolve, reject) => {
	sql.query("select id, result, problem_id, user_id, created_at from submissions where contest_id=?", [contest_id], (err, submissions, fields) => {
		if (err) return reject(err)
		resolve(submissions)
	})
}).then(submissions => {
	if (submissions.length === 0) throw new Error(`Result has length 0, no submission found!`)
	const submission_base = submissions[0].id - 1

	runs = submissions
		.filter(({ result }) => result !== 'CE')
		.map(({ id, result, problem_id, user_id, created_at }) => ({ 
			id: id - submission_base,
			result: submissions.result === 'AC' ? 'Yes' : 'No',
			problem: convertToProblemId(problem_id),
			team: convertToTeamId(user_id),
			submission_time: Math.floor((created_at.valueOf() - start_time.valueOf()) / (60 * 1000)),
		}))

	runs.reduce((o, r) => { 
		return o || (r.submission_time >= length - freeze_time && (console.log(`The last submission before scoreboard frozen: ${r.id - 1}`), true))
	}, false) || console.log(`No submission after scoreboard frozen!`)

	return { runs: { runs } }
})

}

module.exports = wf(f)
