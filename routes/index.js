var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Akshay Dhonde'
    });
});

router.get('/healthCheck', function (req, res) {
    var responseObject = {
        message: "OK"
    };
    res.send(responseObject);
});

var database = [];

router.post('/ilike/:icecreamChoice/:name', function (req, res) {
    if (req.body.formfactor) {
        console.log(req.body.formfactor);
    } else {
        console.log("No form factor");
    }
    var choice = req.params.icecreamChoice;
    var name = req.params.name;
    database.push({
        choice: choice,
        name: name
    });
    var responseObject = {
        message: "Hey " + name + "! I Like " + choice + " too!"
    };
    res.send(responseObject);
});

router.get('/likes', function (req, res) {
    var logValue = req.headers['log'];
    if (logValue && logValue == 'info') {
        console.log("Request received for likes")
    }

    var select = req.query.select;
    if (database.length == 0) {
        var responseObject = undefined;
        if (select && select == 'count') {
            responseObject = {
                count: 0
            };
        }
        res.status(404).send(responseObject);
    } else {
        var responseObject = database;
        if (select && select == 'count') {
            responseObject = {
                count: database.length
            };
        }
        res.send(responseObject);
    }
});

module.exports = router;