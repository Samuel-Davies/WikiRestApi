const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const Article = require('./models/articles');

// dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.listen(PORT, ()=>{
    console.log("Server is running on port " + PORT);
})



// app.route('/')
//     .get(async (req, res)=>{
//         await Article.create({
//             title: "Cyber Workshop",
//             content: "i am having fun in a cyber workshop"
//         })
//         res.send("Welcome")
//     })
//     .post((req, res)=>{
//     res.send("this is a post request");
//     });

app.route('/articles')
    .get(async (req, res)=>{
        await Article.find({})
                        .then((allArticles)=>{
                            console.log('got all documents');
                            res.send(allArticles);
                        })
                        .catch((err)=>{
                            console.log(err);
                            res.send(err);
                        });

       
    })
    .post(async (req, res)=>{
        await Article.create({
            title: req.body.title,
            content: req.body.content
        })
        .then(()=>{
            res.send("Successfully added a new article.");
        })
        .catch((err)=>{
            res.send(err);
        })
       
    })
    .delete(async (req, res)=>{
        await Article.deleteOne()
            .then(()=>{
                res.send("Successfully deleted");
            })
            .catch((err)=>{
                res.send(err);
            })
    });



app.route('/articles/:articleTitle')
    
    .get(async (req, res)=>{
        await Article.findOne({title: req.params.articleTitle})
        .then((specificArticle)=>{
            res.send(specificArticle);
        })
        .catch((err)=>{
            res.send(` No article found with that title, ${err}`);
        })
    })
    .put(async (req, res)=>{
        await Article.updateOne(
            {title: req.params.articleTitle},
            {
                title: req.body.title, 
                content: req.body.content
            }
        ).then(()=>{
            res.send("Updated Article Successfully");
        }).catch((err)=>{
            res.send(err);
        })
    })
    .patch(async (req, res)=>{
        await Article.updateOne(
            {title: req.params.articleTitle},
            {$set: req.body}
        )
        .then(()=>{
            res.send("Successfully Updated article")
        })
        .catch((err)=>{
            res.send(err)
        })
    });