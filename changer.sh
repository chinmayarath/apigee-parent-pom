#!/bin/sh

cat " change " >> ./onefile.txt

git add .
git commit -m "Added som change"
git push
