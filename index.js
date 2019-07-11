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
