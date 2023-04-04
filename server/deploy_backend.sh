echo "Deploying Backend..."
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 153733439609.dkr.ecr.us-east-1.amazonaws.com/helf-backend
docker build -t helf-backend .
docker tag helf-backend:latest 153733439609.dkr.ecr.us-east-1.amazonaws.com/helf-backend:latest
docker push 153733439609.dkr.ecr.us-east-1.amazonaws.com/helf-backend:latest
cd aws_deploy
eb deploy