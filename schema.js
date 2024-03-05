const mongoose = require("mongoose");

const expense_tracker_schema = new mongoose.Schema({
    name: {type:String},
    amount: {type:Number},
    date: {type:String},
});
const Expense = mongoose.model('expensedetails',expense_tracker_schema)

module.exports={Expense}