const mongoose = require('mongoose');
var express = require('express');
//const databaseURL = 'mongodb+srv://admin:ntMpb3yLMRHIRYxO@cluster0.xkcpi.mongodb.net/recipeHistory?retryWrites=true&w=majority';
const recipeHistorySchema =  mongoose.Schema({
    username : String,
    recipe : Array
 });
 
 
 function AddRecipe(user){
    const connect = mongoose.createConnection('mongodb+srv://admin:ntMpb3yLMRHIRYxO@cluster0.xkcpi.mongodb.net/recipeHistory?retryWrites=true&w=majority',
        {useUnifiedTopology: true,
        useNewUrlParser: true});
    connect.on('connected', function(){
        console.log('connected')
    });
    const history = mongoose. model('history', recipeHistorySchema);
    const newhistory = new history({
        username: user,
        recipe: ['apple', 'banana']
    });
    newhistory.save().then(result =>{
        console.log(result)
    }).catch(err => {
        console.log(err);
    })
    //var userrecipe = ({
     //   username : user,
     //   recipe : ['beef', 'apple']
    //});
    //history.create(userrecipe, function(err, docs){
       // if(err) console.log(err);
      //  console.log('succeed' + userrecipe);
    //})

}
    

module.exports = {
    AddRecipe
}

 AddRecipe('kuma');