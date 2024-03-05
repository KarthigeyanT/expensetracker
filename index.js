const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const {Expense}  = require('./schema.js') 

const app = express();
app.use(bodyParser.json())

const port =   8000

async function connectToDb(){
    try{
        await mongoose.connect("mongodb+srv://root:root123@cluster.zst6eqj.mongodb.net/expense_tracker?retryWrites=true&w=majority&appName=cluster")
    app.listen(port,function(){
        console.log(`listening  on port ${port}`);
    })
    }
    catch(error){
        console.log("error")
        console.log("couldn't establish connection")
    }
}

connectToDb();
app.post('/add-expense',async(request,response)=>{
    try {
        await Expense.create({
            name:request.body.name,
            amount:request.body.amount,
            date:request.body.date
        })
        response.status(201).json({
            "status":"success",
            "message":"entry added successfully"
        })
    } catch(error){
        response.status(500).json({
            "status" : "failure",
            "message" : "something went wrong"
        })
    }
})
app.get("/get-expense", async (request, response) => {
  try {
    const expensedata = await Expense.find(); // asynchronous
    response.status(200).json(expensedata);
  } catch (error) {
    response.status(500).json({
      status: "failed",
      message: "failed to reterive data",
      error: error,
    });
  }
});
app.delete('/delete-expense/:id',async function(request,response){
const expenseData = await Expense.findByIdAndDelete(request.params.id)
if(expenseData){
    await Expense.findByIdAndDelete(request.params.id)
    response.status(200).json({
        "status":"success",
        "message":"deleted successfully"
    })
}
else{
    response.status(404).json({
        "status":"failure",
        "message":"something went wrong"
    })
}
})
app.patch("/edit-expense/:id", async (request, response) => {
    try {
      const expenseid = await Expense.findById(request.params.id);
      console.log(expenseid);
      if (expenseid) {
        await expenseid.updateOne({
          amount: request.body.amount,
          category: request.body.category,
          date: request.body.date,
        });
        response.status(200).json({
          status: "success",
          message: "updated an entry",
        });
      } else {
        response.status(404).json({
          status: "failed",
          message: "file not found",
        });
      }
    } catch (error) {
      response.status(500).json({
        status: "failed",
        message: "internal error",
      });
    }
  });













 