import * as UtilsService from './utilsService';
import * as ConstantsUtil from './constantsUtil';
import * as ToolClassService from '../service/toolClassService';
import * as OSS from '../../static/js/aliyun-oss-sdk-4.4.4.min.js';

/**
 * 2018-05-15 董浩
 * 上传图片
 * params: files(input元素的files)；key(文件上传路径：例如/doctor/80c5b313-bc8d-4da3-ba93-984aac1bdae6)；imageSize(图片上传大小限制)；
 * 上传成功回调函数：uploadImageCallBack(successNum, files, uploadUrls, data)
 * successNum：上传成功数量，需要在回调函数中自行判断上传成功数量是否等于上传文件数量successNum === files.length
 * files：input元素的files
 * uploadUrls：上传成功后的所有文件路径，String类型，多张以分号分隔
 * data：每次上传成功后OSS返回的数据
 * */
export function uploadImage(files, key, uploadImageCallBack, imageSize) {
  let size = ConstantsUtil.IMAGE_SIZE;
  if (!UtilsService.isStringBlank(imageSize)) {
    size = imageSize;
  }
  for (let file of files) {
    if (file.size > size) {
      uploadImageCallBack(null, null, null, 'error');
      return false;
    }
  }
  ToolClassService.getAliyunStsMessage().then(result => {
    if (result && result.code === 0) {
      let client = new OSS.Wrapper({
        accessKeyId: result.data.AccessKeyId,
        accessKeySecret: result.data.AccessKeySecret,
        stsToken: result.data.SecurityToken,
        endpoint: ConstantsUtil.ALI_CLOUD_ENDPOINT,
        bucket: ConstantsUtil.ALI_CLOUD_BUCKET,
        secure: true
      });

      let i = 0;
      let successNum = 0;
      let uploadUrls = '';

      for (let file of files) {
        i++;
        let urlSplit = file.name.split('.');
        let uploadUrl = key + '/' + new Date().toString('yyyyMMddHHmmsssss') + i + '.' + urlSplit[urlSplit.length - 1];

        client.multipartUpload(uploadUrl, file).then(data => {
          successNum++;

          uploadUrls = uploadUrls + uploadUrl + ';';
          uploadImageCallBack(successNum, files, uploadUrls.substring(0, uploadUrls.length - 1), data);
        })
          .catch(e => {
            console.log(e);
            uploadImageCallBack();
          });
      }
    }
    else {
      console.log('getAliyunStsMessage error');
      uploadImageCallBack();
    }
  });
}
