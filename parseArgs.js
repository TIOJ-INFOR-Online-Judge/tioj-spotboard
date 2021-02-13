
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

module.exports = () => {

return yargs(hideBin(process.argv))
	.usage('Usage $0 --cid <cid>')

	.describe('run-output', 'The output folder of run file')
	.default('run-output', './webapp/src/sample/runs.json')

	.describe('contest-output', 'The output folder of contest file')
	.default('contest-output', './webapp/src/sample/contest.json')

	.describe('stdout', 'Write everything to stdout instead of files')

	.alias('h', 'host')
	.describe('host', 'The MySQL host')
	.default('host', 'localhost')

	.alias('p', 'password')
	.describe('password', 'The MySQL password')

	.alias('P', 'port')
	.describe('port', 'The MySQL port')
	.default('port', 3306)

	.alias('u', 'user')
	.describe('user', 'The MySQL user')
	.default('user', 'root')

	.alias('db', 'database')
	.describe('database', 'The MySQL database name')
	.default('database', 'tioj_production')

	.alias('cid', 'contest')
	.describe('contest', 'The contest id')

	.demandOption(['cid'])

	.argv

}
