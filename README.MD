# Binary files in API Gateway/Lambda test

Note: For this to work in a browser you have to add "\*/\*" to binary Media Types in API Gateway console.

If you don't need to support browsers you can instead add "application/pdf" there, and request with Accept header like so:

```
$ curl -H "Accept: application/pdf" https://xxxxxxxx.execute-api.eu-west-1.amazonaws.com/training-sally/1487231190964_log-loss.pdf | openssl base64 -A -d > testtt.pdf
```

## aws credential configure
```
$ aws configure --profile default
```

## Local Test
### Start serverless offline mode
```
$ sls offline
```

### Download from S3
curl -H "Accept: application/pdf" http://localhost:3000/<bucket>/<key> | openssl base64 -A -d > <localfile_path>
```
$ curl -H "Accept: application/pdf" http://localhost:3000/training-sally/1487242615968 | openssl base64 -A -d > test.pdf
```


### Upload to S3
curl -v -X PUT -F "file=@<localfile_path>" localhost:3000/<bucket>
```
$ curl -v -X PUT -F "file=@data/doc.pdf" localhost:3000/training-sally
```
