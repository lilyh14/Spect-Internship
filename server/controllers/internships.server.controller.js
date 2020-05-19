const Internship = require('../models/internship.model.js');

exports.update = function(req, res) {
    Internship.findOneAndUpdate({_id: req.params.id}, req.body, function(err, result){
            if(err){
                console.error("Error: " + err);
                res.status(500).send({ message: "Error Adding Internship"});
            }else{
                res.send(result);
            }
        }
    );
};

exports.findOne = function(req, res) {
    Internship.findById(req.params.id, function(err, result){
            if(err){
                console.error("Error");
                res.status(500).send({ message: "Error Adding Internship"});
            }else{
                res.send(result);
            }
        }
    );
};

exports.list = function(req, res) {
    Internship.find().exec(function(err, results){
            if(err){
                console.error("Error");
                res.status(500).send({ message: "Error loading Internships"});
            }else{
                res.send(results);
            }
        }
    );
};

exports.add = function(req, res) {
    var internship = new Internship({
        title: req.body.title,
        description: req.body.description,
        requirements: req.body.requirements,
        compensation: req.body.compensation,
        duration: req.body.duration,
        industry: req.body.industry,
        market: req.body.market,
        published: req.body.published,
        payment: req.body.payment,
        removed: false,
        applicationLink: req.body.applicationLink,
        company: req.body.company
    });

    internship.save(function (err, result) {
        if(err){
            console.error(err);
            res.status(500).send({ message: "Error Adding Internship" })
        }else{
            res.send({ message: "Success", result });
        }
    });
}

exports.delete = function(req, res) {
    Internship.findOneAndDelete({ _id: req.params.id }, function(err, results){
        if(err){    
            console.error(err);
            res.status(500).send({ message: "Error Deleting Internship"});
        }else{
            res.send({ message: "Success", results });
        }
    })
    
}