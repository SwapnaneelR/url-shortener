# URL SHORTENER 

### This is a URL shortener project (MERN stack)
 
________________ 

### Features : 

- Complete JWT authentication with cookies
- Shortening URL with custom slug
- Saving shortened URL and corresponding Long URLS
- Unauthorized users can shorten URLs with backend generated Random string

___________
###   Tech Stack : 

- Frontend : React 
- Backend : Express
- Database : MongoDB (mongoose ODM)

___________

### Schemas :

##### Short URL schema : 
```
const shorturlschema = new mongoose.Schema({
    full_url : {
        type : String,
        require : true
    },
    short_url : {
        type : String,
        require : true,
        index : true,
        unique : true
    },
    clicks : {
        type : Number,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
})

```


#### User Schema : 
```
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

```

### Video Link 
> This  is a small video demonstrating the Website : 



### [Youtube Video Link](https://youtu.be/bqTt_j-l3vM)

