#!/bin/sh
#
# This is the script you need to provide to launch a reactui service
#
npm run-script build
docker build -t gcr.io/idyllic-kit-269502/threat-detector-ui:v1 .
docker push gcr.io/idyllic-kit-269502/threat-detector-ui:v1
kubectl apply -f ../kube_deploy/react_ui_deployment.yaml
