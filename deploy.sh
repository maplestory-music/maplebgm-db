#!/bin/sh

setup_git() {
    git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"
    git config --global user.name "github-actions[bot]"
}

git_commit() {
    git checkout --orphan prod
    timestamp=$(date "+%b %d %Y")
    git add bgm.min.json
    git add playlist.min.json
    git commit -m "GitHub Actions: $timestamp (Build $GITHUB_RUN_NUMBER)"
}

git_push() {
    git remote rm origin
    git remote add origin https://${GITHUB_TOKEN}@github.com/maplestory-music/maplebgm-db.git > /dev/null 2>&1
    git push origin prod --force --quiet > /dev/null 2>&1
}

setup_git
changed=$(git diff --name-only HEAD~1 HEAD | grep -E "bgm/|locale/|playlist/" | wc -l)

if [ $changed -ne 0 ]; then
    echo "Change in files detected. Merging and pushing to prod branch..."
    yarn merge
    git_commit
    git_push
else
    echo "No change in files"
fi
