# Setup periodic training pipeline with AWS lambda and EC2

To facilitate periodic training of new data contributed by various healthcare organisation, this pipeline trains a model with new data on a daily basis using AWS lambda and Event bridge

# Set up Ec2
1. Run an Ec2 instance
2. Upload the train.py into the home directory
3. Ensure .aws is updated with credentials because train.py requires access to s3 buckets
4. Run pip3 install -r requirements.txt to set up environment to run train.py 
4. Ensure that Ec2 is able to communicate with Rds with all the table information and s3 bucket to upload trained model 


# Setup AWS Lambda
1. Create AWS lambda function
2. In the code portion, copy and paste the `lambda_function.py`, ensure that all credentials are input correctly and there is an S3 bucket with your RSA key (ie. *.pem file)
3. Since the paramiko package is needed for lambda to communicate with Ec2, we need to import this package into the lambda function. This can be done using lambda layers, more information about how to import paramiko into lambda can be found here https://medium.com/@amitjs2017/aws-lambda-how-to-add-external-dependencies-like-paramiko-for-python-aws-lambdas-functions-ae1e563b89f1
4. Deploy the code and test to ensure no error

# Setup AWS event bridge (enables periodic training)
1. In the AWS lambda function, click add triggers
2. Select event bridge
3. Set the scheduled time to 1 day
4. Check that the s3 shared model is updated or check the logs in cloudwatch to determine if it is working