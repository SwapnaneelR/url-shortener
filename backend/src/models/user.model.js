import mongoose from 'mongoose';
import crypto from 'crypto';
const userSchema = new mongoose.Schema({
  username: {    
    type: String,
    required: true,
  },
    password: {
    type: String,
    required: true, 
    },
    email: {
    type: String,   
    required: true,
    unique: true,
    },
    avatar: {
    type: String,
    default: function() {
      return createHash(this.email);
    }
  }
})

function createHash(email){
    const hash = crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex');
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
}
const User = mongoose.model('User', userSchema);
export default User;    
