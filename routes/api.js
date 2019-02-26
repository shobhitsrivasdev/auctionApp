const express = require('express');
const router = express.Router();
const Auction = require('../models/auction');
const Bids = require('../models/bids');
const User = require('../models/user');
const cron = require("node-cron");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



router.get('/getauctionItemDetails', (req, res, next) => {
    Auction.find().then((items) => {
        res.send(items);
    })
});

router.post('/auctionItemDetails', (req, res, next) => {
    Auction.create(req.body).then((detail) => {
        res.send(detail);

    }).catch(next);

});

router.post('/getUser', (req, res, next) => {
    User.create(req.body).then((detail) => {
        res.send(detail);

    }).catch(next);

});

router.post('/getBidDetails', (req, res, next) => {

    Bids.find({
        item_name: req.body.name,
        $and: [{ user_name: req.body.user }]
    }).then((res) => {
        console.log("the ID", res[0].id);
        Bids.findByIdAndUpdate({ "_id": res[0].id })
    }).then((details) => {
        console.log("details and", details)
        res.send(details)
    })
});


router.post('/getAllBids', (req, res, next) => {

    console.log("name", req.body.user);

    Bids.find({
        "user_name": req.body.user
    }).then((details) => {
        console.log("total Bids", details)
        var arr = [];
        details.forEach((elem) => {

            arr.push({
                "Item name": elem.item_name,
                "Bids": elem.amount
            })

        });
        res.send(arr)

    })
});

router.post('/getNewBidDetails', (req, res, next) => {
    Bids.create(req.body).then((detail) => {
        res.send(detail);

    }).catch(next);

});

router.post('/getItemDetails', (req, res, next) => {
    console.log("Req Body", req.body)
    Auction.find({
        "item_name": req.body.name
    }).then((detail) => {
        console.log("deatils", detail);
        if (detail[0].winner != null) {
            console.log("winner", detail[0].winner);
            Bids.find({
                "user_name": detail[0].winner
            }).then((detail) => {
                res.send({
                    "Winner Name": detail[0].user_name,
                    "Bid Amount": detail[0].amount
                })
            })

        }
        else {
            Bids.find().sort({ amount: -1 }).limit(1).then((detail) => {

                console.log("Highest Bid Amount", detail[0].amount);

                res.send({
                    "Highest Bid": detail[0].amount
                })
            })

        }
    }).catch(next);

});

cron.schedule("* * * * *", function () {
    console.log('running a task every minute');
    Auction.find().then((items) => {
        console.log(items);
        items.forEach((it) => {
            if (it.winner == null) {
                Bids.find({
                    "item_name": it.item_name
                }).sort({ amount: -1 }).limit(1).then((detail) => {

                    console.log("item details", detail);
                    var winner = detail;
                    Auction.findOneAndUpdate({ "item_name": detail[0].item_name }, { $set: { "winner": detail[0].user_name } }).then((res) => {
                        console.log("Updated Result", res);

                        Bids.find({ "item_name": res.item_name }).then((result) => {
                            console.log("results", result);
                            result.forEach((element) => {
                                User.find({ "user_name": element.user_name }).then((userdetail) => {
                                    console.log("userdetail", userdetail);
                                    console.log("userEmail", userdetail[0].user_email);
                                    const msg = {
                                        to: userdetail[0].user_email,
                                        from: 'shobs.max@gmail.com',
                                        subject: 'Winner of Auction',
                                        details: winner,
                                    };
                                    sgMail.send(msg);

                                }).catch(next);
                            })
                        })


                    })

                })

            }
        });

    })
});

module.exports = router;