const express = require('express');
const router = express.Router();
const Post = require('../model/Post');

router.get('/', async (req,res)=>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.status(500).json({message: 'server error'});
    }
});

router.post('/', async (req,res)=>{
    console.log('success')
    try{const post = new Post({
        title: req.body.title,
        author: req.body.author
    });
    
    const savedPost = await post.save();
        res.send(savedPost);
    }catch(err){
        console.error(err);
        res.send({maessage:err});
    }

});
router.get('/:postId', async (req,res)=>{
    try{
   const post = await Post.findById(req.param.postId);
   res.json(post);
   }catch(err){
    res.json({maessage:err});
}
});

router.delete('/:postId', async (req,res)=>{
    try{
   const removedPost = await Post.remove({_id: req.param.postId});
   res.json(removedPost);
   }catch(err){
    res.json({maessage:err});
}
});

router.put('/:postId', async (req,res)=>{
    try{
   const updatedPost = await Post.updateOne(
    {_id: req.param.postId},
    { $set: {title: req.body.title}}
    );
   res.json(updatedPost);
   }catch(err){
    res.json({maessage:err});
}
});

module.exports = router;