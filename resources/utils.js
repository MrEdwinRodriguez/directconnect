

  exports.sortArray = function (array) {
	return array.sort((a, b) => b.from - a.from)
};

// sort profile by user last name, then first_name
//user object must be populated
function sortProfileByUserName(profiles) {
  console.log('sorting profile by user name')
  profiles.sort(function(a, b){
    let aUserLastName = a.user.last_name.toLowerCase();
    let bUserLastName = b.user.last_name.toLowerCase();
    if (aUserLastName != bUserLastName) {
      if(aUserLastName < bUserLastName) { return -1; }
      if(aUserLastName > bUserLastName) { return 1; }
      return 0;	
    } else {
      let aUserFirstName = a.user.first_name.toLowerCase();
      let bUserFirstName = b.user.first_name.toLowerCase();
      if(aUserFirstName < bUserFirstName) { return -1; }
      if(aUserFirstName > bUserFirstName) { return 1; }
      return 0;
    }	
  })
  return profiles
}
exports.sortProfileByUserName = sortProfileByUserName;