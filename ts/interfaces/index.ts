export interface ICliOptions {
  commonjs?: boolean;
  skiplibcheck?: boolean;
  production?: boolean;
  bundler: 'parcel' | 'esbuild' | 'rollup'
}

export interface IEnvTransportOptions {
  cwd: string;
  from: string;
  to: string;
  mode: 'test' | 'production',
  argv: ICliOptions
}
