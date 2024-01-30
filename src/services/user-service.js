const UserRepository = require('../repository/user-repository');
const jwt =  require('jsonwebtoken');
const {JWT_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong on service layer");
            throw error;
        }
    }  

    async signIn(email, plainPassword){
        try {
            // fetch user using email
            const user = await this.userRepository.getByEmail(email);
            if (!user) {
                console.log("Couldn't find user by this email");
                throw {error: 'User not found'};
            }
            // check password
            const isPasswordMatch = this.#checkPassword(plainPassword, user.password);
            if (!isPasswordMatch) {
                console.log("Invalid password");
                throw {error: 'Invalid password'};
            }
            // create token
            const jwt_token = this.#createToken({email: user.email, id: user.id});
            return jwt_token;
        } catch (error) {
            console.log("Something went wrong on service layer");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
          const response = this.verifytoken(token); // {email: '', id: '', iat: '',exp: ''}
          if(!response){
            throw {error: "Invalid token"};
          }
          const user = await this.userRepository.getById(response.id);
          if(!user){
            throw {error: "User not found corresponding to token"};
          }
          return user.id;
        } catch (error) {
            console.log("Something went wrong on service layer");
            throw error;
        }
    }
    
    //private function
    #createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: "24h" });
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    //public function can be used in middileware
    verifytoken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation");
            throw error;
        }
    }

    //private function
    #checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("something went wrong in password validation");
            throw error;
        }
    }    
}

module.exports = UserService;