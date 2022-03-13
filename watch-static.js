import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_PATH = path.join(__dirname, 'dist');

const abortController = new AbortController();
const { signal } = abortController;

async function copyToDist(source) {
  try {
    const relativePath = path.relative(__dirname, source);
    await fs.promises.copyFile(source, path.join(DIST_PATH, relativePath));
    console.info('Copied', relativePath);
  } catch (ex) {
    if (ex.code === 'ENOENT') return;
    console.trace(ex);
  }
}

async function watchFile(filePath) {
  try {
    let timer = null;
    const watcher = fs.promises.watch(filePath, { signal });
    for await (const event of watcher) {
      if (event.eventType === 'change') {
        clearTimeout(timer);
        timer = setTimeout(() => copyToDist(filePath), 1000);
      } else {
        console.log(event);
      }
    }
  } catch (ex) {
    if (ex.code === 'ABORT_ERR') return;
    console.trace(ex);
  }
}

async function watchDir(dirPath) {
  const dirContents = await fs.promises.readdir(dirPath);
  for (const content of dirContents) {
    const contentPath = path.join(dirPath, content);
    const stat = await fs.promises.stat(contentPath);
    if (stat.isDirectory()) {
      await watchDir(contentPath);
    } else {
      watchFile(contentPath);
    }
  }
}

async function main() {
  try {
    await watchDir(path.join(__dirname, 'static'));
  } catch (ex) {
    console.trace(ex);
  }
}

main();
