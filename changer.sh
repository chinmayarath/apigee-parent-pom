#!/bin/sh

echo " change in dev " >> onefile.txt

git add .
git commit -m "Added some change in  dev "

git checkout master

echo " change in master " >> onefile.txt

git add .
git commit -m "Added some change in master"

git push --all