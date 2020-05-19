const Market = require('../models/market.model.js');

exports.update = function(req, res) {
    Market.findOneAndUpdate({_id: req.params.id}, req.body, function(err, result){
            if(err){
                console.error("Error");
                res.status(500).send({ message: "Error Adding Market"});
            }else{
                console.log(JSON.stringify(result));
                res.send(result);
            }
        }
    );
};

exports.list = function(req, res) {
         Market.find().exec(function(err, results) {
            if(err){
                console.error("Error");
                res.status(500).send({ message: "Error Loading Markets"});
            }else{
                console.log(JSON.stringify(results));
                res.send(results);
            }
        } );
    
};

exports.add = function(req, res) {
    var market = new Market({
        name: req.body.name,
        published: req.body.published,
        removed: false,
    });

    market.save(function (err, result) {
        if(err){
            console.error(err);
            res.status(500).send({ message: "Error Adding Market" })
        }else{
            res.send(result);
        }
    });
}