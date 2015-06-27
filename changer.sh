#!/bin/sh

echo " change " >> onefile.txt

git add .
git commit -m "Added some change"
git push
