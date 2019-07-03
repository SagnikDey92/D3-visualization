import random 
import csv
labels=["Bcast","Gather","Scatter","Reduce","Send","Recv","Isend","Irecv","Wait","Barrier"]
site=[17,14,28,6,15,32]
y1=int(input("Enter Starting limit of snapshot "));
y2=int(input("Enter Ending limit of snapshot "));
time=[]
app=[]
cov=[]
v=int(input("Enter starting range for App "));
w=int(input("Enter ending range for App "));
x=int(input("Enter starting range for Time "));
y=int(input("Enter ending range for Time " ));
z=int(input("Enter the ending range for the ranks "));
for l in range(y2-y1):
	for i in range(z):
		for j in range(6): 
			time.append(random.uniform(x,y))
			app.append(random.uniform(v,w))	
			cov.append(random.uniform(0,2))
		Matrix =[["Label","Call","Site","Time","App","MPI","COV"]]
        	for k in range(6):
			timeval=random.choice(time)
			Matrix.append([k+1,random.choice(labels),random.choice(site),timeval,random.choice(app),timeval*6,random.choice(cov)])
		myfile=open("cg."+str(l+1)+"."+str(i+1)+".tsv",'wt')
		with myfile:
			writer=csv.writer(myfile,delimiter='\t')
			writer.writerows(Matrix)
	
print("Writing Complete")
