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
