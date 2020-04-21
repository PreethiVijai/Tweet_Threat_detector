npm run-script build
docker build -t gcr.io/idyllic-kit-269502/app:latest/reactui:v1 .
docker push gcr.io/idyllic-kit-269502/app:latest/reactui:v1
kubectl apply -f deployment.yaml
