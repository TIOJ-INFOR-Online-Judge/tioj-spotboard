
const wf = require('./waterflow.js')

f = ({ sql, config: { contest: contest_id } }) => {

return new Promise((resolve, reject) => {
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
})

}

module.exports = wf(f)
