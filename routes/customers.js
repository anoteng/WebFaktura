var express = require('express');
var router = express.Router();
var db = require('../database');

router.get("/all", function(req, res) {
    db.Customer.findAll()
        .then( persons => {
            res.status(200).send(JSON.stringify(persons));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.get('/table', function(req, res){
    db.Customer.findAll()
        .then( persons => {
            for(let key in persons){
                const id  = persons[key].id
                db.Invoices.findAll({
                    where: {
                        customer: id
                    },
                    attributes: [[sequelize.fn('SUM', sequelize.col('subTotal')), sumTotals],
                    [sequelize.fn('SUM', sequelize.col('paidAmount')), sumPaid]]
                })
                    .then(results => {
                        persons[key].debt = results.sumTotals - results.sumPaid
                    })
                    .catch(err => {res.status(500).send(JSON.stringify(err))})
            }
            res.status(200).send(pug.render('views/customerlist.pug', {persons}));
        })
        .catch(err => {res.status(500).send(JSON.stringify(err))})
})

router.get("/:id", function(req, res) {
    db.Customer.findByPk(req.params.id)
        .then( person => {
            res.status(200).send(JSON.stringify(person));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.post("/", function(req, res) {
    console.log(req.body);
    db.Customer.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isCompany: req.body.isCompany,
        companyName: req.body.companyName,
        address: req.body.address,
        postCode: req.body.postCode,
        city: req.body.city,
        email: req.body.email,
        country: req.body.country,
        orgNumber: req.body.orgNumber
    })
        .then( person => {
            res.status(200).send(JSON.stringify(person));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.delete("/:id", function(req, res) {
    db.Customer.destroy({
        where: {
            id: req.params.id
        }
    })
        .then( () => {
            res.status(200).send();
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

module.exports = router;