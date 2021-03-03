while :
do
	clear
	echo "Press [CTRL+C] to stop.."
	rsync -a --ignore-existing sagnikd@172.27.19.10:/users/misc/sagnikd/mpiPOutputs/ /home/sagnik/Desktop/HPC/CSVdata/
	python report2csv.py /home/sagnik/Desktop/HPC/CSVdata/ 
	sleep 15
done

