# lambda-watermark (forked)

This module places a watermark in the bottom right corner of your image. An S3
Lambda event can be used to watermark every image that is uploaded to S3.

Note: this is a forked version of
[lamda-watermark](https://github.com/prestonvanloon/lambda-watermark). Changes
include:

- addition of "position" property to the options object
- addition of "uploadACL" property to the options object
  - This allows you to specify the permissions of the newly created object
- use of an environment variable to specify destination S3 bucket
- additional logging

## How to use

- `npm install --save markadamfoster/lambda-watermark`
- Create your function (index.js)

```javascript
'use strict'
var LambdaWatermark = require('lambda-watermark')

var options = {
  watermarkImagePath: './watermark.png',
  relativeSize: 5,
  opacity: 50,
  position: 'Center',
  watermarkedImageACL: 'public-read'
}

exports.handler = function(event, context) {
  console.log('🚨 New image detected!')
  new LambdaWatermark(options)(event, context)
}
```

- [Set up Lambda service on AWS](http://docs.aws.amazon.com/lambda/latest/dg/getting-started.html)
- Zip up your directory (`index.js`, watermark image, and `node_modules`) and upload
  to your AWS Lambda function
- specify the destination bucket as an environment variable

## Configuration (options)

- `watermarkImagePath`: The relative path to your image
- `relativeSize`: The size of the watermark (percent relative to the parent
  image)
- `opacity`: How opaque the watermark should be. (100 is fully opaque, 0 is
  fully transparent)
- `position`: Where the watermark should be located on the image. (options are
  NorthWest|North|NorthEast|West|Center|East|SouthWest|South|SouthEast)
- watermarkedImageACL: ACL permissions on the final, watermarked image (i.e. 'public-read')
