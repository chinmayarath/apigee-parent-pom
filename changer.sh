#!/bin/sh

git checkout master

echo " change in dev " >> onefile.txt

git add .
git commit -m "Added some change in  dev [alL:test]"

git push --all