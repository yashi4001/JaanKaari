const express = require('express');
const router = express.Router();
const post = require('../models/posts')
const { ensureAuthenticated } = require('../config/auth');


router.use('/',express.static("./public")); 

router.get('/dashboard',function(req,res){
    res.render('homedash',{user:req.user});
})

router.get("/blog", async (req,res)=>{
    const foundpost=await post.find().sort({update: 'desc'})
    res.render('bloguser',{post: foundpost})
    
});


router.get("/post/:id",ensureAuthenticated,function(request,response){
    const search=request.params.id;
    post.findOne({_id: search},function(err,finditem){
       response.render("viewpost",{title: finditem.title,postBody: finditem.postBody,picname: finditem.picname,author:finditem.authorname});
    });
});




router.get('/store',function(req,res){
    res.render('store');
})
router.get('/contribute',function(req,res){
    res.render('contribute');
})
module.exports = router;