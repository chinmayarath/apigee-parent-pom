#!/bin/sh

git checkout dev

echo " change in dev " >> onefile.txt

git add .
git commit -m "Added some change in  dev [all:test]"

git push --all