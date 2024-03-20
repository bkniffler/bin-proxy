import { resolve }from 'path';
import { execSync } from 'child_process';
import { existsSync } from 'fs';


export function resolveFirst(paths, throwError = true) {
  for (const path of paths) {
    if (existsSync(path)) {
      return path;
    }
  }
  if (throwError)
    throw new Error(
      `Could not find any of the following paths: ${paths.join(', ')}`
    );
}

export default (cmd: string, base: string) => {
  const { argv } = process;

  const bin = resolveFirst([
    resolve(base, '../node_modules/.bin', cmd),
    resolve(base, '../../node_modules/.bin', cmd),
    resolve(base, '../../../node_modules/.bin', cmd),
    resolve(base, '../../../../node_modules/.bin', cmd),
  ])
  const command = `${bin} ${argv
    .slice(2)
    .join(' ')}`;
  // console.log(`Running <${command}>`);
  execSync(command, {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
  });
};
