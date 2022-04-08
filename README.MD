# OpenCV Server


## **Requirement**
---
    npm = 14.x
    yarn > 2.x
    os: Linux
## **Installing**
---
You should install cmake and build-essential before npm install
```
npm install
```

## **Docker**
---
**Image**: node image (npm satisfied version) or you can choose for your own

- Should use ubuntu for best result

- Edit dockerfile.sample and create your container

```Dockerfile
FROM ubuntu:18.04
# you can add more packages here 
RUN apt-get update 
# apt-get install -y <package>
EXPOSE 6001 
```

- dockerfile in this root is complete dockerfile with docker-compose
## **Docker Compose**
---
- You should install docker-compose first

- Run this command below in your directory contain docker-compose.yml 

```bash
docker-compose up -d #Run in background with -d option
```
   
