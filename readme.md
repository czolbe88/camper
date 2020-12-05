To build docker image

- docker build -t <username>/<imagename> .

- docker run -d <username>/<imagename>


Steps for deploying in prd

- after committing code to repo, github will build image from source code and push the image to dockerhub

- ensure the .env file within ec2 is up to date

- run $ docker run --env-file ./prd.env

- run docker-compose up from within ec2 instance
