// @ts-ignore
declare var process: Process;

interface Process {
  env: Env;
}

interface Env {
  MAPS_API_KEY: string;
}

interface GlobalEnvironment {
  process: Process;
}
