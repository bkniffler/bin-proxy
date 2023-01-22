import { resolve }from 'path';
import { execSync } from 'child_process';

export default (cmd: string, base: string) => {
  const { argv } = process;

  const command = `${resolve(base, '../node_modules/.bin', cmd)} ${argv
    .slice(2)
    .join(' ')}`;
  // console.log(`Running <${command}>`);
  execSync(command, {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
  });
};
