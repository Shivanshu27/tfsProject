import { db } from "../config/sql.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Producer from "../publisher/producer.js";
const producer = new Producer();


export const register= (req,res)=>{
    const q= "SELECT * FROM users WHERE email= ? OR username= ?";
    db.query(q, [req.body.email, req.body.username], (err,data)=>{
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("user already exists");
        const hash = bcrypt.hashSync(req.body.password, 10);

        const q= "INSERT INTO users (`username`,`email`,`password`) VALUES(?)";
        const values= [req.body.username, req.body.email, hash];
        db.query(q, [values], async (err,data)=>{
            if(err) return res.status(500).json(err);
            await producer.publishMessage("Info", `${req.body.username} has created an account`);
            return res.status(200).json("user has been created");
        });
    });
};

export const login=(req,res)=>{
    const q= "SELECT * FROM users WHERE username= ?";
    db.query(q, [req.body.username], (err, data)=>{
        if (err) return res.status(500).json(err);
        if (data.length==0) return res.status(404).json("user not found!");

        const isPasswordCorrect= bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPasswordCorrect)
        return res.status(400).json("Wrong username or password!");

        const token= jwt.sign({id: data[0].id}, "jwtkey");
        const {password, ...other}= data[0];
        res.cookie('access_token', token, {
            httpOnly:true,
        }).status(200).json(other);
    })
}

export const logout = (req, res) => {
    res.clearCookie("access_token",{
      sameSite:"none",
      secure:true
    }).status(200).json("User has been logged out.")
  };

