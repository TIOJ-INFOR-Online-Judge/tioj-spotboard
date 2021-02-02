
module.exports = (f) => {
	return (args) => {
		return new Promise((resolve, reject) => {
			Promise.resolve(f(args)).catch(reject).then(o => {
				if (typeof o !== 'object') return resolve(args)
				resolve({ ...args, ...o })
			})
		})
	}
}
