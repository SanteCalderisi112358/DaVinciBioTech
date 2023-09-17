/*import { Injectable } from '@angular/core';
import { environment_AWS } from 'src/environments/environment';
import * as AWS from 'aws-sdk';
@Injectable({
  providedIn: 'root'
})
export class AwsService {
  private s3: AWS.S3 | undefined;
  constructor() {
    AWS.config.update({
      accessKeyId: environment_AWS.aws.accessKeyId,
      secretAccessKey: environment_AWS.aws.secretAccessKey,
      region: environment_AWS.aws.region,
    });
    this.s3 = new AWS.S3();
  }
  uploadImage(file: File, key: string): Promise<string> {
    const params = {
      Bucket: environment_AWS.aws.bucketName,
      Key: key, // Nome dell'oggetto in S3
      Body: file,
      ACL: 'public-read', // Imposta l'accesso dell'oggetto a pubblico
    };

    return new Promise<string>((resolve, reject) => {
      if(this.s3){
        this.s3.upload(params, (err:any, data:any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
      }

    });
  }
}*/
