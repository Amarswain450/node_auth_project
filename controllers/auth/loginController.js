const passport = require('passport');

function loginController(){
    return{
        login(req,res){
            res.render('login');
        },
        postLogin(req,res,next){
            passport.authenticate('local', (err,user,info) => {
                if(err){
                    req.flash('error',info.message);
                    return next(err);
                }
                if(!user){
                    req.flash('error',info.message);
                    return res.redirect('/login'); 
                }
                req.login(user, (err) => {
                    if(err){
                        req.flash('error',info.message);
                        return next(err);
                    }
                    return res.redirect('/'); 
                });
            })(req,res,next);
        },
        logout(req,res){
            req.logout();
            return res.redirect('/login');
        }
    }
}

module.exports=loginController;