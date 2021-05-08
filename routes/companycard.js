const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const pug = require('pug')
router.use(bodyParser.json())
router.post('/', function(req, res){
    const cardgroup = createInfobox(req.body)
    res.send(JSON.stringify(cardgroup))
})

function createInfobox(data){

    const infobox = pug.compileFile('views/companyCard.pug')
    const cardgroup = []
    for(let company of data){
        const pugLocals = {orgNumber: company.organisasjonsnummer, companyName: company.navn, address: company.forretningsadresse.adresse[0], naringskode1: company.naeringskode1.beskrivelse}
        //console.log(pugLocals)
        const card = infobox(pugLocals)
        cardgroup.push(card)
    }
    //console.log(cardgroup)
    return cardgroup
}
module.exports = router;