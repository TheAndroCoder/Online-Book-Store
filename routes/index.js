const express = require('express')
const path = require('path')
const moment = require('moment')
const fs = require('fs')
var router = express.Router()



//************** Routes *****************//
router.get('/',(req,res,next)=>{
    return res.redirect('/home')
});
////// ********** PAGES ********* ///////
router.get('/login',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../pages/login.html'));
});
router.get('/home',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../pages/home.html'));
});
router.get('/register',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../pages/register.html'));
})
router.get('/cart',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../pages/cart.html'));
})
router.get('/admin',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../pages/admin.html'));
})

////// ******* REST API ********** /////////
router.post('/login',(req,res,next)=>{
    const email = req.body.email;
    const pass = req.body.password;
    console.log('In Login '+email)
    req.getConnection((err,conn)=>{
        if(err)res.json({success:false,result:'Unable to connect to Database'})
        else{
            conn.query("select * from users where email=? and password=?",[email,pass],(err,rows,fields)=>{
                if(err)res.json({success:false,result:sqlMessage})
                else{
                    if(rows.length==0){
                        res.json({success:false,result:'Invalid Credentials'})
                    }else{
                        res.json({success:true,result:rows[0]})
                    }
                }
                
            });
        }
    });
});
router.post('/register',(req,res,next)=>{
    //const fullname = req.body.fullname
    const email = req.body.email
    const pass = req.body.password
    const nowTime = new Date()
    req.getConnection((err,conn)=>{
        if(err)res.json({success:false,result:'Unable to connect to Database'})
        else{
            conn.query("insert into users(email,password,createdon) values(?,?,?)",[email,pass,nowTime],(err,rows,fields)=>{
                if(err)res.json({success:false,result:err.sqlMessage})
                else
                {
                    console.log(rows)
                    res.json({success:true,result:'Registered Successfully'})
                }
            });
        }
    });
});
router.get('/search',(req,res,next)=>{
    const text = req.query.text
    req.getConnection((err,conn)=>{
        if(err)res.json({success:false,result:'Unable to connect to DB'});
        else{
            conn.query("select * from users where fullname like '%"+text+"%' or mobile like '%"+text+"%'",[],(err,rows,fields)=>{
                if(err)res.json({success:false,result:err.sqlMessage})
                else
                res.json({success:true,result:rows})
            });
        }
    });
});
router.get('/delete',(req,res,next)=>{
    const id = req.query.id;
    console.log(id);
    return res.json({success:true,result:'Deleted'});
})
router.get('/books',(req,res,next)=>{
    console.log('In Books')
    req.getConnection((err,conn)=>{
        if(err)return res.json({success:false,result:err.sqlMessage})
        conn.query("select * from books",[],(err,rows,fields)=>{
            if(err)return res.json({success:false,result:err.sqlMessage})
            console.log(rows)
            res.json({success:true,result:rows})
        })
    })
})
router.get('/userbyid',(req,res,next)=>{
    const userid=req.query.userid
    req.getConnection((err,conn)=>{
        if(err)res.json({success:false,result:'Unable to connect to DB'})
        else{
            conn.query("select * from users where userid=?",[userid],(err,rows,fields)=>{
                if(err)res.json({success:false,result:err.sqlMessage})
                else
                res.json({success:true,result:rows[0]})
            });
        }
    });
});
//Export Module
module.exports=router;