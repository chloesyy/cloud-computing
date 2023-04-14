# Setup PostgreSQL RDS database 

PostgreSQL RDS in private subnet and access through EC2 instance in public subnet (EC2 as bastion host)

# Setup VPC and networks
1. Create VPC and enable DNS host name for VPC. 
2. Create 2 private subnets and 1 public subnet. 
3. Create NAT gateway in public subnet 
4. Create Internet gateway and attach to VPC. 
5. Configure route table for public subnet (allow all IP addresses and source Internet Gateway)
6. Create route table for private subnet and link to NAT gateway. 

# Set up EC2 instance
1. Create EC2 instance in public subnet and with auto-assign public IP enabled. 
2. Create security group. 
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
Source: Enter the private IP address of your EC2 instance.

# Set up EC2 instance to connect to RDS instance in Python
1. Connect to EC2 instance via SSH 
2. Install Miniconda by following https://varhowto.com/install-miniconda-ubuntu-20-04/ and https://medium.com/@GalarnykMichael/aws-ec2-part-3-installing-anaconda-on-ec2-linux-ubuntu-dbef0835818a
3. conda install jupyter
4. conda install psycopg2
5. Connect to Jupyter Notebook (https://towardsdatascience.com/setting-up-and-using-jupyter-notebooks-on-aws-61a9648db6c5)

# Connect to RDS instance 
import psycopg2

engine = psycopg2.connect(
    database="postgres",
    user="my_user_name", #master user name
    password="abc123def345", #master password
    host="my-rds-table-name.123456.us-east-1.rds.amazonaws.com", #RDS hostname
    port='5432'
)

https://stackoverflow.com/questions/54300263/connect-to-aws-rds-postgres-database-with-python
