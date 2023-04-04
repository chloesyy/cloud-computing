echo "Deploying Frontend..."
set REACT_APP_API_URL=/api
npm run build
aws s3 sync build/ s3://helf-frontend
