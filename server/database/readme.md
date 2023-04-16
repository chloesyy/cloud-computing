# Setup PostgreSQL RDS database 

Setup RDS database

# Setup VPC and networks (If not already done earlier)
1. Create VPC and enable DNS host name for VPC. 
2. Create 2 private subnets and 1 public subnet. 
3. Create NAT gateway in public subnet 
4. Create Internet gateway and attach to VPC. 
5. Configure route table for public subnet (allow all IP addresses and source Internet Gateway)
6. Create route table for private subnet and link to NAT gateway. 

# Modify EC2 instance running front-end server
1. Create security group. 
Type: Enter Custom TCP Rule.
Protocol: Enter TCP.
Port Range: Enter 22.
Source: Enter the IP address of your local machine. By default, the source IP address is open to all, but you can restrict access to your local public IP address.

# Set up RDS instance
1. Create subnet group with the 2 private subnets. 
2. Create RDS instance with PostgreSQL with 2 private subnets
3. Create security group
Type: Enter Custom TCP Rule.
Protocol: Enter TCP.
Port Range: Enter the port of your RDS DB instance.
Source: Enter the private IP address of EC2 instance of front-end server.

# Initialise RDS database
1. SSH into EC2 instance of front-end server. 

The following steps are for running the initialisation code for RDS database on Jupyter Notebook. 
2. Install Miniconda by following https://varhowto.com/install-miniconda-ubuntu-20-04/ and https://medium.com/@GalarnykMichael/aws-ec2-part-3-installing-anaconda-on-ec2-linux-ubuntu-dbef0835818a
3. conda install jupyter
4. conda install psycopg2
5. install pandas
6. Connect to Jupyter Notebook (https://towardsdatascience.com/setting-up-and-using-jupyter-notebooks-on-aws-61a9648db6c5)
7. Run the relevant cells of Initialise DB.ipynb (cells 1-9)

