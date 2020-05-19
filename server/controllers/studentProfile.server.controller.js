const Student = require('../models/student.model.js');

exports.update = function(req, res){
    Student.findOneAndUpdate({_id: req.params.id}, req.body, function(err,result){
        if(err){
            console.errror("Error");
            res.status(500).send({message: "Error Adding Student Profile"});
        }
        else{
            console.log(result);
            res.send(result);
        }
    }
);
};

exports.findOne = function(req, res) {
    Student.findById(req.params.id, function(err, result){
            if(err){
                console.error("Error");
                res.status(500).send({ message: "Error Adding Student Profile"});
            }else{
                res.send(result);
            }
        }
    );
};

exports.list = function(req,res){
    Student.find().exec(function(err,results){
        if(err){
            console.error("Error");
            res.status(500).send({message: "Error loading Student Profiles"});
        }
        else{
            console.log("Result" + results);
            res.send(results);
        }
        }
    );
};

exports.add = function(req, res){
    var student_profile = new Student({
        name: req.body.name,
        address: req.body.address,
        userAccount: req.body.userAccount,
        email: req.body.email,
        description: req.body.description,
        skills1: req.body.skills1,
        skills2: req.body.skills2,
        skills3: req.body.skills3,
        removed: false
    });

    student_profile.save(function (err, result) {
        if(err){
            console.error(err);
            res.status(500).send({ message: "Error Adding Student Profile" })
        }else{
            res.send({ message: "Success", result });
        }
    });

}