
const correctStorageURL = urlString => {
    var splitString = urlString.split('/');
    let bucketName = splitString[splitString.length-2];
    let objectName = splitString[splitString.length-1]; 
    return "http://storage.googleapis.com/"+bucketName +"/" + objectName;
}
export default correctStorageURL;