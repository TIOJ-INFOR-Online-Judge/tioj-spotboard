
const fs = require('fs')

const wf = require('./waterflow.js')

function getRandomColor() {
	const colors = [
		'red', 'orange', 'white', 'blue', 'yellow',
		'ivory', 'deeppink', 'brown', 'darkgreen',
		'pink', 'skyblue', 'purple',
	]
	return colors[Math.floor(Math.random() * colors.length)]
}

f = ({ contest: { title }, problem_ids, user_ids, problems, users, config: { stdout, contestOutput } }) => {
	problems = problem_ids.map((id, i) => {
		return {
			id,
			name: String.fromCharCode(i + 65),
			color: getRandomColor(),
			title: problems.get(id),
		}
	})
	const teams = user_ids.map((id, i) => {
		return {
			id,
			name: users.get(id),
			// TODO: add (<university>) information
		}
	})
	contest = { 
		title, 
		problems,
		teams,
	}
	contest = JSON.stringify(contest, null, 2)
	if (stdout) {
		return console.log(contest)
	}
	fs.writeFileSync(contestOutput, contest)
	console.log(`Contests successfully write into file ${contestOutput}`)
}

module.exports = wf(f)
