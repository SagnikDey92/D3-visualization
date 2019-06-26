import random 
import csv
#print("Enter file name")
st=input("Enter file name within quotes ");
i=int(input("Enter starting range "));
j=int(input("Enter ending range " ));
arr=[]
Matrix =[["Snapshots","Ranks","Time"]]
for x in range(10):
	arr.append(random.uniform(i,j))
#print(arr)
for x in range(10):
	Matrix.append([1,x+1,arr[x]])
print(Matrix)
myfile=open(st,'wt')
with myfile:
	writer=csv.writer(myfile,delimiter='\t')
	writer.writerows(Matrix)
print("Writing Complete")
