module.exports = {
    'pipes-app/**/*.ts': () => 'tsc --noEmit --project pipes-app/tsconfig.json',
    'country-app/**/*.ts': () => 'tsc --noEmit --project country-app/tsconfig.json',
    'gifs-app/**/*.ts': () => 'tsc --noEmit --project gifs-app/tsconfig.json',
    '02-bases/**/*.ts': () => 'tsc --noEmit --project 02-bases/tsconfig.json',
    '01-typescript/**/*.ts': () => 'tsc --noEmit --project 01-typescript/tsconfig.json',
};
