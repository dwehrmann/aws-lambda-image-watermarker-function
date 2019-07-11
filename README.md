# Sample Image Watermark

This project is the code for setting up an image watermarking process on Amazon
S3 Lambda. I use it for watermarking sample images for my Photo Invoice project,
but it can be used for any project where watermarks should be automatically
applied to images hosted on Amazon S3.

## How it works

1. The Lambda function is set up to be triggered whenever a new object (image)
   is created in the specified location of an S3 bucket of your choosing.
2. The new image is then watermarked (by this function).
3. The watermarked image is then uploaded to the specified destination S3
   bucket/location.

## Installation & Initial Setup

1. Clone this repo
2. `npm install`
3. Update the `watermark.png` file to your choice
4. Change the `options` object in `index.js` as needed
5. Command click (to select) the `node_modules`, `index.js`, and `watermark.png`
   files, choose "Compress" to create a .zip of just those files.
6. Create a Lambda function on AWS:

- for its role, create/use one that has full S3 read/write access
- for its trigger, select S3, choose the bucket and enter the directory prefix
  as appropriate
- for its code, upload the .zip file created in step 4
- under "Environment variables", add `S3_DESTINATION_BUCKET` as the key, and the
  name of your output bucket for the value
- under Basic settings, increase the timeout to 20s (not sure how high this
  needs to be, but 3s is too short)

Note: it's best to create 2 copies of this function, one for testing with your
dev environment, and one for production. The only differences between the two
would be the trigger bucket you specify and the `S3_DESTINATION_BUCKET` value.

## Making changes

Most changes are actually needed to be made in my forked version of the [lambda-watermark](https://github.com/markadamfoster/lambda-watermark) library.

After making edits:

1. Command click (to select) the `node_modules`, `index.js`, and `watermark.png` files, choose "Compress" to create a .zip of just those files.
2. Upload that .zip file to the appropriate place in AWS Lambda for testing.
3. Once testing clears, upload the same .zip to the production-facing Lambda function.
