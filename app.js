const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const User = require('./model/Users');





const Product = require('./model/Product');
const e = require('express');
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended:false}));


app.get('/', (req,res,next) => {
       res.render('index');
})
app.get('/products', (req,res,next) => {
      
       Product.find((err, products)=>{
          if(products){
               res.render('products',{
                      products : products
               })
          }
          else{
                 console.log(err)
          }
       })
       
})
app.get('/login', (req,res,next) => {
       res.render('login');
})
app.get('/signin', (req,res,next) => {
       res.render('signin');
})
app.get('/add-products', (req,res,next) => {
       res.render('add-products');
})


app.get('/product/:_id', (req,res,next) => {
       const _id = req.params._id;
       Product.findById({_id : _id},(err,product)=>{
            if(product){
             res.render('oneProduct',{
                    product : product
             })
            }
            else{
                   console.log(err)
            }
       });

})


app.post('/signin',  (req,res,next) => {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const password2 = req.body.password2;

      User.find({email : email})
         .then((user)=>{
             if(user.length <1){
                    console.log('User dose Not Exiist!')
                    if(password === password2){
                          bcrypt.hash(password,12,(err,hashPassword)=>{
                              if(!err){
                                     const user = new User({
                                            name:name,
                                            email : email,
                                            password: hashPassword
                                     });
                                     user.save()
                                       .then((user)=>{
                                            console.log(user)
                                            console.log('Signup successFul !');
                                            res.redirect('/login');
                                       })
                                       .catch((err)=>{
                                            console.log(err)
                                            console.log('signin Failed !');
                                       })
                              }
                              else{
                                     console.log('Password DoseNot hashed Error occur in Bcrypt');
                              }
                          })
                    }
                    else{
                           console.log('password dosenot Matched !');
                    }
                    
             }
             else{
                    console.log('user alredy Exist !');
                    res.redirect('/signin')
             }
         })
         .catch((err)=>{
               console.log(err);
         })      
})

app.post('/add-products', (req,res,next) => {
       const title = req.body.title;
       const desc = req.body.desc;
       const image = req.body.image;
       const price = req.body.price;

        const products = new Product({
               title : title,
               desc : desc,
               image : image,
               price : price
        })

        products.save()
          .then(()=>{
                 console.log('products added');
                 res.redirect('/');
          })
          .catch(()=>{
                 console.log('Product Not added !');
          })
})


app.get('/edit/:_id', (req,res,next)=>{
       const _id = req.params._id;
       Product.findById({_id:_id}, (err, product)=>{
              if(product){
                  console.log(product)
                  res.render('edit', {
                         product : product
                  })
              }
              else{
                     console.log(err)
              }
         })
      
})

app.post('/product/edit/:_id', (req,res,next)=>{
        const _id = req.params._id;
        const title = req.body.title;
        const desc = req.body.desc;
        const image = req.body.image;
        const price = req.body.price;

        console.log('hello')
        console.log(_id)

         Product.findByIdAndUpdate({_id:_id},{title:title,desc:desc,image: image,price:price},(err, result)=>{
               if(result){
                   console.log('updated SuccessFully!');
                   console.log(result);
                   res.redirect('/products');
               }
               else{
                      console.log(err)
               }
         })
        
})


app.get('/delete/:_id',(req,res,next)=>{
       const _id = req.params._id;
       console.log(_id)

       Product.findByIdAndDelete(_id, (er, result)=>{
           if(result){
               console.log('Products Deleted!');
               res.redirect('/products');
           }
           else{
                  console.log(err)
           }
       })
})

app.get('/cart/:_id',(req,res,next)=>{
      const _id = req.params._id;
      
    
       Product.findById({_id:_id}, (err,product)=>{
           
           if(product){
              //  console.log(product)
                res.render('cart', {
                       product : product
                })
           }
           else{
                  console.log('Error Product Not Found');
           }
       })
})

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
         console.log('connected');
         app.listen(3000, () => console.log('Express Running On 3000'));
  })
  .catch(()=>{
         console.log('not  connedted');
  })
