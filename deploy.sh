#!/bin/sh

setup_git() {
    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "Travis CI"
}

git_commit() {
    git checkout --orphan prod
    timestamp=$(date "+%b %d %Y")
    git add bgm.min.json
    git commit -m "Travis CI update: $timestamp (Build $TRAVIS_BUILD_NUMBER)" -m "[skip ci]"
}

git_push() {
    git remote rm origin
    git remote add origin https://${GITHUB_TOKEN}@github.com/maplestory-music/maplebgm-db.git > /dev/null 2>&1
    git push origin prod --force --quiet > /dev/null 2>&1
}

setup_git
git_commit

if [ $? -eq 0 ]; then
    echo "Change in bgm.json detected. Pushing to prod branch..."
    git_push
else
    echo "No changes in bgm.json"
fi
