# S3 Proxy API in API Gateway/Lambda

* Need to [re-deploy](#3-1-deploy-to-aws) after turn on AWS API Gateway Binary Support. 
* The current serverless-offline plugin(3.8.3) does not have Binary Support as AWS API Gateway does.
* Because of that the logic is different for PUT/POST methods to S3.
* Because of that the GET method to access a S3 resource in offline mode will retrieve base64.


## 1. Preparation
### 1-1. Install serverless
frameworkVersion: ">=1.0.0 <2.0.0"
```
$ npm install -g serverless
```

### 1-2. AWS credential configure
* ```$ aws configure --profile default```
* Make sure you have the specified profile which is used in serverless.yml
* ```$ cat ~/.aws/credentials```

## 2. Local Test
### 2-1. Start serverless offline mode
```
$ sls offline
```

### 2-2. GET from S3
```
$ curl -v -H "Accept: application/octet-stream" http://localhost:3000/<bucket>/<key> | openssl base64 -A -d > <localfile_path>
```

```
$ curl -v -H "Accept: application/octet-stream" http://localhost:3000/training-sally/1487366163793 | openssl base64 -A -d > test.pdf

$ curl -v -H "Accept: application/octet-stream" http://localhost:3000/training-sally/1487369499363 | openssl base64 -A -d > test.zip
```

### 2-3. PUT to S3
```
$ curl -v -H "Content-Type:application/octet-stream" -X PUT --data-binary "@<localfile_path>" localhost:3000/<bucket>
```

```
$ curl -v -H "Content-Type:application/octet-stream" -X PUT --data-binary "@./data/doc.pdf" localhost:3000/training-sally

$ curl -v -H "Content-Type:application/octet-stream" -X PUT --data-binary "@./data/test.pdf.zip" localhost:3000/training-sally
```

### 2-4. POST to S3
```
$ curl -v -H "Content-Type:application/octet-stream" -X POST --data-binary "@<localfile_path>" localhost:3000/<bucket>/<key>
```

```
$ curl -v -H "Content-Type:application/octet-stream" -X POST --data-binary "@./data/doc.pdf" localhost:3000/training-sally/doc.pdf

$ curl -v -H "Content-Type:application/octet-stream" -X POST --data-binary "@./data/test.pdf.zip" localhost:3000/training-sally/test.pdf.zip
```


## 3. AWS Deployment & Test
### 3-1. deploy to AWS
Need to add Binary support and re-deploy!
* ```$ sls deploy```
* Login to AWS and go to API Gateway console
* Add */* as a media type under the Binary Support section of this API.
* ```$ sls deploy```

### 3-2. GET from S3
* ```$ curl -v -H "Accept: application/octet-stream" https://z4bf9rzv53.execute-api.ap-northeast-1.amazonaws.com/dev/training-sally/doc.pdf -o 1487350952348.pdf```
* Or paste the url in browser directly.

### 3-3. PUT to S3
```
$ curl -v -H "Content-Type:application/octet-stream" -X PUT --data-binary "@<localfile_path>" https://<api_gateway_path>/dev/<bucket>
```

```
$ curl -v -H "Content-Type:application/octet-stream" -X PUT --data-binary "@./data/doc.pdf" https://z4bf9rzv53.execute-api.ap-northeast-1.amazonaws.com/dev/training-sally

$ curl -v -H "Content-Type:application/octet-stream" -X PUT --data-binary "@./data/test.pdf.zip" https://z4bf9rzv53.execute-api.ap-northeast-1.amazonaws.com/dev/training-sally

$ curl -v -H "Content-Type:application/octet-stream" -X PUT --data-binary "@./data/pic.png" https://z4bf9rzv53.execute-api.ap-northeast-1.amazonaws.com/dev/training-sally
```

### 3-4. POST to S3
```
$ curl -v -H "Content-Type:application/octet-stream" -X POST --data-binary "@<localfile_path>" <api_gateway_path>/dev/<bucket>/<key>
```

```
$ curl -v -H "Content-Type:application/octet-stream" -X POST --data-binary "@./data/doc.pdf" https://z4bf9rzv53.execute-api.ap-northeast-1.amazonaws.com/dev/training-sally/doc.pdf

$ curl -v -H "Content-Type:application/octet-stream" -X POST --data-binary "@./data/test.pdf.zip" https://z4bf9rzv53.execute-api.ap-northeast-1.amazonaws.com/dev/training-sally/test.pdf.zip

$ curl -v -H "Content-Type:application/octet-stream" -X POST --data-binary "@./data/pic.png" https://z4bf9rzv53.execute-api.ap-northeast-1.amazonaws.com/dev/training-sally/pic.png
```


# TODO:
* 1. Upgrade to future serverless-offline plugin for offline mode's Binary Support.
* 2. PUT mode for multipart upload.
* 3. Check how to specify metadata like file name.