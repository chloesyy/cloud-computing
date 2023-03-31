# This script is to test rds connection and insert a sample table inside
from psycopg2 import sql
import psycopg2
import boto3
import pandas as pd

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


    def createNewTable(self):
        
        # Check if table exists
        self.masterCursor.execute("select * from information_schema.tables where table_name=%s", ('patient',))
        if bool(self.masterCursor.fetchall()):
            print("Delete Table")
            self.masterCursor.execute('''DROP TABLE PATIENT ''')

        sqlQuery = sql.SQL('''CREATE TABLE PATIENT
      (CONCAVITY_MEAN float8 NOT NULL,
      AREA_SE float8 NOT NULL,
      AREA_WORST float8 NOT NULL,
      CONCAVITY_WORST float8 NOT NULL,
      CONCAVITY_SE float8 NOT NULL,
      TEXTURE_MEAN float8 NOT NULL,
      AREA_MEAN float8 NOT NULL,
      SYMMETRY_MEAN float8 NOT NULL, 
	  DIAGNOSIS VARCHAR (100) NOT NULL);''')
        self.masterCursor.execute(sqlQuery)

    def insert_csv(self,df):
        cols_names = ','.join(df.columns)
        
        
        #sql  = "INSERT INTO PATIENT ({sql_cols}) VALUES ({placeholders})".format(sql_cols = ", ".join([i for i in df.columns]), placeholders = ", ".join(["%s" for i in df.columns]))
        sql  = "INSERT INTO joint_table ({sql_cols}) VALUES ({placeholders})".format(sql_cols = ", ".join([i for i in df.columns]), placeholders = ", ".join(["%s" for i in df.columns]))
                    
        self.masterCursor.executemany(sql, df.values.tolist())

    def show_all(self):
        #q = sql.SQL('''SELECT * FROM PATIENT''')
        q = sql.SQL('''SELECT * FROM joint_table;''')
        self.masterCursor.execute(q)
        print(self.masterCursor.fetchall()[:10])
        

if __name__ == "__main__":
    
    # Get the data from s3 bucket
    s3 = boto3.resource('s3') #credentials will already be setup in the ec2 instance
    bucket_name = 'myhealth-storage2' 
    file_name = 'sample/data_interest.csv'
    location = 'data_interest.csv'

    s3.meta.client.download_file(bucket_name, file_name, location)

    # Read data
    df = pd.read_csv('data_interest.csv').drop(['Unnamed: 0','id'],axis=1)
    
    # Initiate connection to rds
    RDS = RDSdatabase(masterUserName = 'masteruser', masterPassword = "hishmaster123", rdsHostName = 'hish-db-01.cfwyts8tlkjs.us-east-1.rds.amazonaws.com', rdsDBName= 'postgres', rdsPort=5432)
    #RDS = RDSdatabase(masterUserName = 'postgres', masterPassword = 123456789, rdsHostName = 'database-2.cji9asuwmz4i.us-east-1.rds.amazonaws.com', rdsDBName= 'postgres', rdsPort=5432)

    # Create table
    #RDS.createNewTable()

    #insert_csv
    RDS.insert_csv(df)

    RDS.show_all()

	#Convert to pandas
    #df_rds = pd.read_sql_query("""SELECT * FROM PATIENT""", RDS.masterEngine)
    df_rds = pd.read_sql_query("""SELECT * FROM joint_table""", RDS.masterEngine)
	df_rds['diagnosis'] = df_rds['diagnosis'].map({'B': 0, 'M': 1})
	print(df_rds.head())
