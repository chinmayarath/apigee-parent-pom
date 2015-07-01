#!/bin/sh

git checkout master

echo " change in master " >> onefile.txt 

git add .

git commit -m "Added some change in  dev [ aLL : test ] "
>>>>>>> dev

git push --all