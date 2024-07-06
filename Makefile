install:
    npm ci

gendiff:
    node bin/gendiff.js

fix:
    npx prettier --write .
    npx eslint --fix .

publish:
    npm publish --dry-run

lint:
    npx eslint .