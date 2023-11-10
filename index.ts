import PQueue from 'p-queue'
import fs from 'fs/promises'
import { exec } from 'child_process'

async function main() {
	console.log('starting...')
	let shouldLogMem = true
	const logMemory = async () => {
		while (shouldLogMem) {
			exec('cat /proc/meminfo', (error, stdout, stderr) => {
				if (stderr) console.log(stderr)
				console.log(stdout)
			})
			await new Promise((r) => setTimeout(r, 2000))
		}
	}
	const logProm = logMemory()
	const queue = new PQueue({ concurrency: 10000 })
	const copyFile = async (id: number) => {
		const data = await fs.readFile(`./assets/${id}.txt`)
		await fs.writeFile(`./public/${id}.txt`, data)
	}
	for (let i = 0; i < 1000; i++) {
		for (let i = 1; i <= 1000; i++) {
			queue.add(() => copyFile(i))
		}
	}
	await queue.onIdle()
	shouldLogMem = false
	await logProm
}

main()
	.then(() => console.log('done'))
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
