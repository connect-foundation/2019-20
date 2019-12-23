import aws from 'aws-sdk';

aws.config.update({
  accessKeyId: process.env.OBJSTRaccessKeyId,
  secretAccessKey: process.env.OBJSTRsecretAccessKey,
});

const { region } = process.env;
const endpoint = new aws.Endpoint(process.env.OBJSTRendpoint);

const s3 = new aws.S3({
  endpoint,
  region,
});

export default s3;
