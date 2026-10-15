import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const viteCli = fileURLToPath(new URL('../node_modules/vite/bin/vite.js', import.meta.url))
const wranglerCli = fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js', import.meta.url))
const commands = [
  { name: 'Vite', args: [viteCli, ...process.argv.slice(2)] },
  { name: 'Admin API worker', args: [wranglerCli, 'dev', '--port', '8787'] },
]

let shuttingDown = false
let exitCode = 0
let activeProcesses = commands.length

function stopAll(code) {
  if (shuttingDown) return
  shuttingDown = true
  exitCode = code
  for (const child of children) child.kill()
}

const children = commands.map(({ name, args }) => {
  const child = spawn(process.execPath, args, {
    cwd: projectRoot,
    env: process.env,
    stdio: 'inherit',
    windowsHide: true,
  })

  child.on('error', (error) => {
    console.error(`${name} gagal dijalankan: ${error.message}`)
    stopAll(1)
  })

  child.on('exit', (code) => {
    if (!shuttingDown) stopAll(code ?? 1)
    activeProcesses -= 1
    if (activeProcesses === 0) process.exitCode = exitCode
  })

  return child
})

process.on('SIGINT', () => stopAll(130))
process.on('SIGTERM', () => stopAll(143))
