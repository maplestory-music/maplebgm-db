#!/bin/sh

setup_git() {
    git config --global user.email "deploy@travis-ci.org"
    git config --global user.name "Deployment Bot (from Travis CI)"
}

git_commit() {
    git checkout --orphan prod
    timestamp=$(date "+%b %d %Y")
    git add bgm.min.json
    git commit -m "Travis CI update: $timestamp (Build $TRAVIS_BUILD_NUMBER)"
}

git_push() {
    git remote rm origin
    git remote add origin https://${GITHUB_TOKEN}@github.com/maplestory-music/maplebgm-db.git > /dev/null 2>&1
    git push origin prod --force --quiet > /dev/null 2>&1
}

setup_git
changed=$(git diff --name-only HEAD~1 HEAD | grep "bgm/" | wc -l)

if [ $changed -ne 0 ]; then
    echo "Change in ./bgm detected. Merging and pushing to prod branch..."
    yarn merge
    git_commit
    git_push
else
    echo "No changes in ./bgm"
fi
