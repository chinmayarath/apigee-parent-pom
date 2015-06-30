#!/bin/sh

git checkout dev

echo " change in dev " >> onefile.txt

git add .
git commit -m "Added some change in  dev [  skip_cI  ]"

git push --all