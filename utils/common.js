const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkForValidProfile = (data) => {
    if(!data.email  && !data.password){
        throw new Error("Email and password is required");
    }
    const profile = data;
    profile.email = profile.email.toLocaleLowerCase();
    if(profile.firstName?.length > 20 || profile.lastName?.length > 20){
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
const makeHashPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainPassword, salt);
}
const isPasswordMatch = async (password) => {
    return await bcrypt.compare(password, password);
}
const createJWT = async (_id) => {
    const SECRET = 'alphaMale1' || process.env.JWT_SECRET;
    return  await jwt.sign({id: _id}, SECRET, {expiresIn: '1h'} );
}
const editValidProfile = (profile) => {
    const restrictedFields = ['password', 'createdAt', 'updatedAt'];
    restrictedFields.forEach(field => {
        if(profile[field]){
            delete profile[field];
        }
    })

    return profile;
}

module.exports = { checkForValidProfile, makeHashPassword, isPasswordMatch, createJWT, editValidProfile };