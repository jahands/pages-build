import PQueue from 'p-queue'
import fs from 'fs/promises'

async function main() {
	console.log('starting...')
	const queue = new PQueue({ concurrency: 500 })
	const copyFile = async (id: number) => {
		const data = await fs.readFile(`./assets/${id}.txt`)
		await fs.writeFile(`./public/${id}.txt`, data)
	}
	for (let i = 0; i < 1000; i++) {
		for (let i = 1; i <= 1000; i++) {
			queue.add(() => copyFile(i))
		}
		await queue.onIdle()
	}
}

main()
	.then(() => console.log('done'))
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
