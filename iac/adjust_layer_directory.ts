import * as fs from 'fs'
import * as path from 'path'

const IAC_DIRECTORY_NAME = 'iac'
const SOURCE_DIRECTORY_NAME = 'dist/src'
const SHARED_DIR_NAME = 'shared'

export function adjustLayerDirectory(): void {
  // Get the root directory of the source directory
  const rootDirectory = path.join(__dirname, '..')
  const iacDirectory = path.join(rootDirectory, IAC_DIRECTORY_NAME)

  console.log(`Root directory: ${rootDirectory}`)
  console.log(`Root directory files: ${fs.readdirSync(rootDirectory)}`)
  console.log(`IaC directory: ${iacDirectory}`)
  console.log(`IaC directory files: ${fs.readdirSync(iacDirectory)}`)

  // Get the destination and source directory
  const sharedSourceDirectory = path.join(rootDirectory, SOURCE_DIRECTORY_NAME, SHARED_DIR_NAME)

  // Create the 'src/shared' directory if it doesn't exist
  const sharedDestinationDirectory = path.join(SHARED_DIR_NAME)
  fs.mkdirSync(sharedDestinationDirectory, { recursive: true })

  // Copy files from the source directory to the destination directory
  console.log(`Copying files from ${sharedSourceDirectory} to ${sharedDestinationDirectory}`)
  copyFolderSync(sharedSourceDirectory, sharedDestinationDirectory)
}

function copyFolderSync(src: string, dest: string): void {
  fs.mkdirSync(dest, { recursive: true })
  const files = fs.readdirSync(src)

  for (const file of files) {
    const current = fs.lstatSync(path.join(src, file))

    if (current.isDirectory()) {
      copyFolderSync(path.join(src, file), path.join(dest, file))
    } else if (current.isSymbolicLink()) {
      const symlink = fs.readlinkSync(path.join(src, file))
      fs.symlinkSync(symlink, path.join(dest, file))
    } else {
      fs.copyFileSync(path.join(src, file), path.join(dest, file))
    }
  }
}

if (require.main === module) {
  adjustLayerDirectory()
}