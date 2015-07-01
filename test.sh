

var=asdfds
arr=$(echo $var | tr "," " ")
for x in $arr
do 
	echo $x
done
