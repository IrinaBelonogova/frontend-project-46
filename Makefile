install:
    npm ci

gendiff:
    node gendiff.js

fix:
    npx prettier --write .
    npx eslint --fix .

publish:
    npm publish --dry-run

lint:
    npx eslint .