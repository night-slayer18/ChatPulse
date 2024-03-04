const signupUser = async (req, res) => {
    try{
        const {fullName, username, email, password, confirmPassword, gender} = req.body;
    }
    catch(err){
        console.log(err)
    }
}
const loginUser = async (req, res) => {
    res.send('loginUser')
    console.log('loginUser')
};

const logoutUser = async (req, res) => {
    res.send('logoutUser')
    console.log('logoutUser')
}

module.exports = { loginUser, signupUser, logoutUser };