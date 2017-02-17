# Binary files in API Gateway/Lambda test



## 1. aws credential configure
```
$ aws configure --profile default
```

## 2. Local Test
### 2-1. Start serverless offline mode
```
$ sls offline
```

### 2-2. Download from S3
curl -H "Accept: application/pdf" http://localhost:3000/<bucket>/<key> | openssl base64 -A -d > <localfile_path>
```
$ curl -H "Accept: application/pdf" http://localhost:3000/training-sally/1487242615968 | openssl base64 -A -d > test.pdf
```


### 2-3. Upload to S3
curl -v -H "Content-Type:application/octet-stream" -X PUT -F "file=@<localfile_path>" localhost:3000/<bucket>
```
$ curl -v -X PUT -F "file=@data/doc.pdf" localhost:3000/training-sally

$ curl -v -H "Content-Type:application/octet-stream" -X PUT -F "file=@data/doc.pdf" localhost:3000/training-sally

curl -v -H "Content-Type:application/octet-stream" -H "Content-Transfer-Encoding:base64" -X PUT -F "file=@data/doc.pdf" localhost:3000/training-sally

```

## 3. AWS Deployment & Test
### 3-1. deploy to AWS, add Binary support and re-deploy -- important!
* ```$ sls deploy```
* Login to AWS and go to API Gateway console
* Add */* as a media type under the Binary Support section of the dev-serverless-thumbnail API.
* ```$ sls deploy```

### 3-2. Download from S3
```
$ curl -H "Accept: application/pdf" https://p28xmrsz9k.execute-api.ap-northeast-1.amazonaws.com/dev/training-sally/1487242615968 -o 1487242615968.pdf
```

### 3-3. Upload to S3
curl -v -X PUT -F "file=@<localfile_path>" localhost:3000/<bucket>
```
$ curl -v -X PUT -F "file=@data/doc.pdf" https://p28xmrsz9k.execute-api.ap-northeast-1.amazonaws.com/dev/training-sally

curl -v -H "Content-Type:application/pdf" -X PUT -F "file=@data/doc.pdf" https://p28xmrsz9k.execute-api.ap-northeast-1.amazonaws.com/dev/training-sally

curl -v -H "Content-Type:application/pdf" -X PUT --data-binary "@./data/doc.pdf" https://p28xmrsz9k.execute-api.ap-northeast-1.amazonaws.com/dev/training-sally
```