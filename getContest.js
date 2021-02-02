
const wf = require('./waterflow.js')

f = ({ sql, config: { contest: contest_id } }) => {

return wf(() => new Promise((resolve, reject) => {
	sql.query("select title, start_time, end_time, freeze_time from contests where id=?", [contest_id], (err, [contest], fields) => {
		if (!contest) reject(`No contest with id ${contest_id} found`);
		const { start_time, end_time, freeze_time } = contest;
		const length = (end_time.valueOf() - start_time.valueOf()) / (60 * 1000);
		resolve({ contest: {
			id: contest_id,
			length,
			...contest,
		} })
	})
}))().then(wf(() => new Promise((resolve, reject) => {
	sql.query("select distinct user_id from submissions where contest_id = ? order by user_id", [contest_id], (err, user_ids, fields) => {
		// TODO: add filter
		user_ids = user_ids.map(({ user_id }) => user_id)
		const user_map = new Map(user_ids.reduce((a, u, i) => { a.push([u, i + 1]); return a }, []))
		resolve({ user_ids, user_map })
	})
}))).then(wf(() => new Promise((resolve, reject) => {
	sql.query("select problem_id from contest_problem_joints where contest_id = ? order by id", [contest_id], (err, problem_ids, fields) => {
		problem_ids = problem_ids.map(({ problem_id }) => problem_id)
		const problem_map = new Map(problem_ids.reduce((a, p, i) => { a.push([p, i + 1]); return a }, []))
		resolve({ problem_ids, problem_map })
	})
})))

}

module.exports = wf(f)
