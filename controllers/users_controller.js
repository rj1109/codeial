module.exports.profile = function(req, res){
    res.render("usersProfile",{
        title: "Users Profile"
    })
}

module.exports.posts = function(req, res){
    res.render("usersPosts",{
        title: "Your Posts"
    })
}