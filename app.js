var profileDataArgs = process.argv.slice(
    2, process.argv.length
    );
console.log(profileDataArgs);

console.log('================');

const printProfileData = profileDataArr => {
    profileDataArr.forEach((profileItem) => console.log(profileItem));
};

printProfileData(profileDataArgs);