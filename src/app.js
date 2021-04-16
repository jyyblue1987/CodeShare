const express = require("express");
const app = express();
const CodeSnippet = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.post('/code_snippets/', (req, res) => {
    var title = req.body.title;
    var code = req.body.code;
    var comments = [];
    var code = new CodeSnippet({title, code, comments});

    code.save()
        .then(function(doc) {            
            res.json({
                code: 200,
                data: {
                    id: doc._id,
                    title: doc.title,
                    code: doc.code,
                    comments: doc.comments
                }
            });
        })
        .catch(function(error) {
            res.json({
                'code': 201,
                'message': 'Code Save Error'
            });
        });
});

app.post('/code_snippets/:id/comments/', (req, res) => {
    CodeSnippet.findByIdAndUpdate(req.params["id"], {
            "$push": {
                comments: req.body["comment"]
            }
        }, {
            "new": true
        },
        (err, docs) => {
            if (err) {
                res.json({
                    "error": "The comment was not successfully added."
                });
            } else {
                res.json({
                    "message": "Change was successful",
                    "docs": docs
                });
            }
        }
    );

});

app.get('/code_snippets/', (req, res) => {
    CodeSnippet.find({})
        .then(function(docs) {
            res.json({
                'code': 200,
                'docs': docs
            });
        })
        .catch(function(error) {
            res.json({
                'code': 201,
                'message': error.message
            });
        });
});

const port = 3000;

app.listen(port, () => {console.log(`Server is listening on ${port}`)});
