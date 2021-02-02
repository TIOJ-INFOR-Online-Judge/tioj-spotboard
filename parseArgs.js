
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

module.exports = () => {

return yargs(hideBin(process.argv))
	.describe('run-output', 'The output folder of run file')
	.default('run-output', './webapp/src/sample/runs.json')

	.describe('stdout', 'Write run to stdout')

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

	.describe('contest', 'The contest id')

	.demandOption(['contest'])

	.argv

}
