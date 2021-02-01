
const mysql = require('mysql')

const host = '127.0.0.1' // TODO: param
const user = 'root' // TODO: param
const password = 'SAMPLE_PASSWORD' // TODO: param
const database = 'tioj_production' // TODO: param

const problem_base = 43 // 1-based TODO: param, permu
const user_base = 31 // 1-based TODO: param, permu

const contest_id = 9 // TODO: param

let contest_start_time
let contest_end_time
let contest_length
let contest_freeze_time

function convertToTeamId(user_id) {
	return user_id - user_base // TODO
}

function convertToProblemId(problem_id) {
	return problem_id - problem_base // TODO
}

const sql = mysql.createConnection({ host, user, password, database })

new Promise((resolve, reject) => {
	sql.connect(err => {
		if (err) return reject(err)
		resolve()
	})
}).then(() => console.log('connect success'))
.then(() => new Promise((resolve, reject) => {
	sql.query("select title, start_time, end_time, freeze_time from contests where id=?", [contest_id], (err, [contest], fields) => {
		if (!contest) reject(`No contest with id ${contest_id} found`)
		({ start_time: contest_start_time, end_time: contest_end_time, freeze_time: contest_freeze_time } = contest)
		contest_length = (contest_end_time.valueOf() - contest_start_time.valueOf()) / (60 * 1000)
		resolve()
	})
})).then(() => new Promise((resolve, reject) => {
	sql.query("select id, result, problem_id, user_id, created_at from submissions where contest_id=?", [contest_id], (err, submissions, fields) => {
		if (err) return reject(err)
		resolve(submissions)
	})
})).then(submissions => {
	if (submissions.length === 0) throw new Error(`Result has length 0, no submission found!`)
	const submission_base = submissions[0].id - 1

	return { runs: submissions
		.filter(({ result }) => result !== 'CE')
		.map(({ id, result, problem_id, user_id, created_at }) => ({ 
			id: id - submission_base,
			result: submissions.result === 'AC' ? 'Yes' : 'No',
			problem: convertToProblemId(problem_id),
			team: convertToTeamId(user_id),
			submission_time: Math.floor((created_at.valueOf() - contest_start_time.valueOf()) / (60 * 1000)),
		})) }
}).then(runs => {
	console.log(JSON.stringify(runs)) // TODO: param
})

.catch(console.error).then(sql.end).then(() => process.exit(0)).catch(console.error /* mysql package internal error */).then(() => process.exit(1))
