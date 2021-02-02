
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

module.exports = () => {

return yargs(hideBin(process.argv))
	.usage('Usage $0 --uid <uid> --pid <pid> --cid <cid>')

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

	.alias('cid', 'contest')
	.describe('contest', 'The contest id')

	.alias('pid', 'problem-base')
	.describe('pid', 'The problem id base. If the first problem id is x, please set as x - 1')

	.alias('uid', 'user-base')
	.describe('uid', 'The user id base. If the first user id is x, please set a x - 1')

	.demandOption(['cid', 'problem-base', 'user-base'])

	.argv

}
