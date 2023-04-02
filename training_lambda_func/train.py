import boto3
import pandas as pd
import numpy as np
import xgboost as xgb
import pickle
import os
import psycopg2

class RDSdatabase:
    def __init__(self, masterUserName, masterPassword, rdsHostName, rdsDBName, rdsPort):
        self.masterEngine = psycopg2.connect(
            database = rdsDBName, #postgres
            user=masterUserName, #"masteruser"
            password=masterPassword, #"hishmaster123"
            host=rdsHostName, #"hish-db-01.cfwyts8tlkjs.us-east-1.rds.amazonaws.com"
            port=rdsPort #5432
        )

        self.masterCursor = self.masterEngine.cursor()
        self.masterEngine.autocommit = True
        self.databaseName = rdsDBName
        self.hostName = rdsHostName
        self.portNum = rdsPort

# Get train_data from rds, by default we will have a table in the rds instance that is specific for training
RDS = RDSdatabase(masterUserName = 'masteruser', masterPassword = "hishmaster123", rdsHostName = 'hish-db-01.cfwyts8tlkjs.us-east-1.rds.amazonaws.com', rdsDBName= 'postgres', rdsPort=5432)
#RDS = RDSdatabase(masterUserName = 'postgres', masterPassword = 123456789, rdsHostName = 'database-2.cji9asuwmz4i.us-east-1.rds.amazonaws.com', rdsDBName= 'postgres', rdsPort=5432)
#df_rds = pd.read_sql_query("""SELECT * FROM PATIENT""", RDS.masterEngine)
df_rds = pd.read_sql_query("""SELECT * FROM joint_table""", RDS.masterEngine)
df_rds['diagnosis'] = df_rds['diagnosis'].map({'B': 0, 'M': 1})

# Get S3 bucket to upload   
s3 = boto3.resource('s3') #credentials will already be setup in the ec2 instance
bucket_name = 'myhealth-storage2' 

cols_interest = list(df_rds.columns).remove("diagnosis")
print(df_rds.shape)
df_rds = df_rds.drop_duplicates(subset = cols_interest)
print(df_rds.shape)

X = df_rds.drop(['diagnosis'],axis=1)
y = df_rds['diagnosis']


# Train the model
model = xgb.XGBClassifier()
model.fit(X,y)
pickle.dump(model, open('xgb_breast_classifier.pkl', "wb"))

# Upload the model to s3 output
s3.meta.client.upload_file('xgb_breast_classifier.pkl', bucket_name, 'model/xgb_breast_classifier.pkl')