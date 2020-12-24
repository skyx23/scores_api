const router = require('express').Router();
const Candidate = require('./candidateSchema');
const Scores = require('./scores');


router.post('/newcandidate',async (req,res) => {
        

    const emailExist = await Candidate.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already Exist');
    
    const candidate = new Candidate({
            name : req.body.name,
            email : req.body.email
        })

        const scores = new Scores({
            name : req.body.name,
            first_round : req.body.first_round,
            second_round : req.body.second_round,
            third_round : req.body.third_round
        })

        try {
            await candidate.save();
            await scores.save();
            res.send("x");
        }catch (err){
            res.status(400).send(err)
        }
})

router.get('/highestscore', async (req,res) => {
    const firsthighest = await Scores.find().sort({first_round : -1}).limit(1);
    const secondhighest = await Scores.find().sort({second_round : -1}).limit(1);
    const thirdhighest = await Scores.find().sort({third_round : -1}).limit(1);
    
    let arr = [firsthighest[0].first_round,secondhighest[0].second_round,thirdhighest[0].third_round];
    arr = arr.sort();
    res.send(`highest score is ${arr[2]}`);
    
})

router.get('/averagescore', async (req,res) => {
    const firstavg = await Scores.find().sort({first_round : -1});
    let avg1 = 0 ;
    let avg2 = 0;
    let avg3 = 0;
    for (var i = 0; i<firstavg.length; i++) {
        avg1 += firstavg[i].first_round;
        avg2 += firstavg[i].second_round;
        avg3 += firstavg[i].third_round;
    };

    avg1 = avg1 / (firstavg.length);
    avg2 = avg2 / (firstavg.length);
    avg3 = avg3 / (firstavg.length);

    res.send(`Average Score for first round, second round and third round are ${avg1}, ${avg2} and ${avg3} respectively`);

 })


module.exports = router;
