import _ from './Constants';

// let url = _.PORT.LOCAL_ENV;
let url = _.PORT.TESTING_ENV


export async function subscribeToAsset(subscribeAssetRequest) {
  let response = await fetch(url + _.PATHS.SUBSCRIBE_TO_ASSET, {
    method: 'post',
    headers: { "Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(subscribeAssetRequest)
  })
  let data= await response.json();
  return data;
}