const validURL = urlString => {
    let url = urlString;
    var subStringThree = url.substring(0,3).toLowerCase();
    var subStringFour = url.substring(0,4).toLowerCase();
    if (subStringFour+"" != "http" && subStringThree+"" == "www" ) {
        url = 'http://'+url;
    } else if (subStringFour != "http" && subStringThree != "www" ) {
        url = 'http://www.'+url;
    } 
    return url;
}





export {
    validURL,
    // add future function to export
  }