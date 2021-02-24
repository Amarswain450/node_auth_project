const User = require('../../src/models/user');
const bcrypt = require('bcrypt');

function registerController(){
    return{
        register(req,res){
            res.render('register');
        },
        async postRegister(req,res){
            const {username,email,password} = req.body;
            //console.log(req.body);
            //validate request
            if(!username || !email || !password){
                req.flash('error','All fields are required');
                req.flash('username',username);
                req.flash('email',email);
                return res.redirect('/register');
            }
            //check if email exist
            User.exists({email: email}, (err,result) => {
                if(result){
                    req.flash('error','Email already taken');
                    req.flash('username',username);
                    req.flash('email',email);
                    return res.redirect('/register');
                }
            });
            //hash password
            const hashedPassword = await bcrypt.hash(password,10)
            //create user
            const user = new User({
                name: username,
                email: email,
                password: hashedPassword
            });
            user.save().then((user) => {
                return res.redirect('/');
            }).catch(() => {
                req.flash('error','Something went wrong');
                return res.redirect('/register');
            });
        }
    }
}

module.exports=registerController;