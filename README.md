# CS5224 Cloud Computing

Cloud-based data science web application for breast cancer detection

## Quick Start (run locally)

- Activate virtual environment:

```terminal
source venv/Scripts/activate # macOS

venv\Scripts\activate # windows
```

- Set up config file & fill required credentials:

```terminal
cd server
cp config.example.json config.json
```

- Run backend:

```terminal
python app.py
```

- Run frontend:

```terminal
cd client
npm i
npm start
```

**Note: Need to start both frontend and backend to get a working prototype.**

## Making & Committing Deployment Changes

### Configure AWS Settings

- Get AWS credentials (access_key / secret_access_key / session_token)

```terminal
cat ~/.aws/credentials
```

- Set AWS credentials (access_key / scret_access_key / region)

```terminal
aws configure
```

**Note: You will not be able to set session token here.**

- Alternatively, set all AWS credentials or add session token

``` terminal
vim ~/.aws/credentials
```

### Commit Frontend Changes

- The script builds the frontend package and stores it in a pre-configured AWS S3 bucket

```terminal
cd client
./deploy_frontend.sh
```

### Commit Backend Changes

- The script dockerizes the backend and stores it in AWS Elastic Container Registry (ECR). Ensure that Docker Desktop is open when running the script. The Docker image is then used to run on AWS Elastic Beanstalk

```terminal
cd server
./deploy_backend.sh
```

### Access Website

```url
https://d18mq98qvad2m0.cloudfront.net/
```

**Note: You will need to adjust the credentials in the respective shell scrips accordingly (get URI from ECR).**

**Note: For more information on deployment: <https://adamraudonis.medium.com/how-to-deploy-a-website-on-aws-with-docker-flask-react-from-scratch-d0845ebd9da4>.**
