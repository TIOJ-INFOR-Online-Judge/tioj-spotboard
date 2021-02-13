
const wf = require('./waterflow.js')

f = ({ sql, contest }) => {

const { id: contest_id, start_time, length, freeze_time} = contest

return new Promise((resolve, reject) => {
	sql.query("select id, result, problem_id, user_id, created_at from submissions where contest_id=?", [contest_id], (err, submissions, fields) => {
		if (err) return reject(err)
		resolve(submissions)
	})
}).then(submissions => {
	if (submissions.length === 0) throw new Error(`Result has length 0, no submission found!`)
	return { submissions }
})

}

module.exports = wf(f)
