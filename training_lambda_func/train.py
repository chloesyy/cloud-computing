import boto3
import pandas as pd
import numpy as np
import xgboost as xgb
import pickle
import os

# Get train_data from rds

# For testing we will be using a test data uploaded in s3 bucket
s3 = boto3.resource('s3') #credentials will already be setup in the ec2 instance
bucket_name = 'myhealth-storage1' 
file_name = 'train_set/data_interest.csv'
location = 'data_interest.csv'

s3.meta.client.download_file(bucket_name, file_name, location)


# Read data
df = pd.read_csv('data/data_interest.csv').drop(['Unnamed: 0'],axis=1)
df['diagnosis'] = df['diagnosis'].map({'B': 0, 'M': 1})

X = df.drop(['diagnosis','id'],axis=1)
y = df['diagnosis']


# Train the model
model = xgb.XGBClassifier()
model.fit(X,y)
pickle.dump(model, open('xgb_breast_classifier.pkl', "wb"))

# Upload the model to s3 output
s3.meta.client.upload_file('xgb_breast_classifier.pkl', bucket_name, 'model/trained_model.pkl')