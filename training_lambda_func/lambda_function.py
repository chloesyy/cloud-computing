import json
import paramiko
import boto3
import time
import os


print('Loading function')


def lambda_handler(event, context):
    
    instance_id = 'i-0dda0663457c3f233'
    
    # from s3 get pem file for authentication
    s3_client = boto3.resource('s3',region_name='XXXXXXXXXXX',aws_access_key_id = 'XXXXXXXXXXXXXXXXX',aws_secret_access_key = 'XXXXXXXXXXXXXXXXXXXX',aws_session_token = 'XXXXXXXXXXXXXXXXX')
    
    bucket_name = 'myhealth-storage1'
    file_name = 'mykeypair_.pem'
    location_file = '/tmp/mykeypair.pem'
    
    s3_client.meta.client.download_file(bucket_name, file_name, location_file)
    
    time.sleep(5) # allow for download
    
    ec2 = boto3.resource('ec2', region_name='XXXXXXXXXXXXXXXX',aws_access_key_id = 'XXXXXXXXXXXXXXXXXXXXXX',aws_secret_access_key = 'XXXXXXXXXXXXXXXXXXXXX',aws_session_token = 'XXXXXXXXXXXXXXX')
    instance = ec2.Instance(id=instance_id)
    instance.start()
    instance.wait_until_running()
    instance.load()
    time.sleep(30)
    
    current_instance = list(ec2.instances.filter(InstanceIds=[instance_id]))
    ip_address = current_instance[0].public_ip_address
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    privkey = paramiko.RSAKey.from_private_key_file(location_file)
    ssh.connect(hostname=ip_address, port=22,username='ubuntu', pkey=privkey)
    
    stdin, stdout, stderr = ssh.exec_command('''
        python3 train.py
    ''')
    print('stdout:', stdout.read())
    print('stderr:', stderr.read())
    
    log_ = "Updated model"
    instance.stop_instance()
    
    return log_
