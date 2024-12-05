const checkForValidProfile = (data) => {
    const profile = data;
    profile.email = profile.email.toLocaleLowerCase();
    if(profile.firstName.length > 20 || profile.lastName.length > 20){
        throw new Error(data.firstName.length > 20 ? "First name should not more than 20" : "Last name should not more than 20");
    }
    if(profile?.contact){
        const digit = profile?.contact === 0 ? 1 : Math.floor(Math.log10(Math.abs(profile?.contact))) + 1;
        if(digit > 50){
            throw new Error("Mobile number should be greater than 50");
        }
    }
    if(profile?.skills){
        if(profile.skills.length > 50){
            throw new Error("Skills should be greater than 3");
        }
    }
    return profile;
}

module.exports = checkForValidProfile;