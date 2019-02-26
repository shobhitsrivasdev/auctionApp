# auctionApp
Auction Api to find the Winner of Each Auction


# The Application has been build on NodeJs and MongoDb
# There are 3 Schema being used here Auction, Bids and User

2.Apis

GET : "/getauctionItemDetails": To fetch the details of all the auctions.

POST:

1. "/auctionItemDetails": To create auction items
2. "/getUser": To Add the Authorised User Details.
3. "/getBidDetails": To fetch The Bid of the particular user  and update
4. "/getAllBids": To fetch all the bids submitted by a User
5. "/getNewBidDetails": Add new Bids to Bids Collection
6. "/getItemDetails":API to list details of an item.
                     a. If the item is already aucitoned should give the details of buyer and the
                     amount
                     b. If the item is currently in auction, should list the highest bid amount
7. Crons Jobs for  Run a task to automatically find the winner of each auciton when it hits the endTime.
Send an email to all users who bid for the item with details of the winner and final
amount.(Modifed, if the winner is null, it will run the jobs and send the email).

8. The Email client used is sendgrid.


TO RUN THE APP PLEASE RUN THIS COMMAND: "npm start"

9. The Application is being deployed on heroku: https://immense-chamber-24727.herokuapp.com

