import User from "../models/User";
import BlackList from "../models/BlackList";
import { signInValid, signUpValid } from "../validation/userValid";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { response } from "express";

dotenv.config()

export const getAllUser = async (req,res) => {
  try {
    const data = await User.find()
    if(data && data.length){
      return res.status(200).json({
        message: "Lấy danh sách thông tin tài khoản thành công",
        data
      })
    }
    return res.status(400).json({
      message: "không tìm thấy thông tin tài khoản"
    })
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server"
    })
  }
}

export const getOneUser = async (req, res) => {
  try {
    const id = req.params.id_user
    const data = await User.find({ _id: id })
    if(data.length > 0){
      return res.status(200).json({
        message: "lấy 1 tài khoản người dùng thành công",
        data,
      })
    }
    return res.status(400).json({
      message: "không tìm thấy tài khoản"
    })
  } catch (error) {
    return res.status(500).json({
      message: "lỗi server"
    })
  }
}

export const signUp = async (req, res) => {
  try {
    /**
     * Bước 1: Validation values
     * Bước 2: Đã tồn tại email trong hệ thống chưa?
     * Bước 3: Mã hoá password
     * Bước 4: Xoá password trước khi gửi trả dữ liệu.
     * Bước 5: Gửi thông báo cho người dùng.
     */
    
    let newDataBody = {...req.body}
    if(!req.body.role){
      newDataBody.role = "member"
    }

    const { error } = signUpValid.validate(newDataBody, { abortEarly: false });
 
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    const checkEmail = await User.findOne({ email:newDataBody.email });

    if (checkEmail) {
      return res.status(400).json({
        message: "Email này đã được đăng ký, bạn có muốn đăng nhập không?",
      });
    }
    console.log(checkEmail)
    // B3: ma hoa pass

    // Cach 2: Dung bcryptjs
    const passwordHash = await bcryptjs.hash(newDataBody.password, 10);
    if (!passwordHash) {
      return res.status(400).json({
        message: "Ma hoa mat khau that bai!",
      });
    }
    
  
    
    const user = {
      username: newDataBody.username, 
      email: newDataBody.email,
      password: passwordHash,
      role:req.body.role
    };

    const data = await User.create(user);
   
    if (!data) {
      return res.status(400).json({
        message: "Dang ky that bai!",
        status: 1,
      });
    }
    data.password = undefined;
    return res.status(200).json({
      message: "Dang ky thanh cong!",
      data,
      status: 0,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Dang ky that bai!",
      detail: error.message,
    });
  }
};
// const token = jwt.sign({username: "aaab", password: "12345"}, "abcdefgh", { expiresIn: "1h"})
// try {
//   const verify = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYWIiLCJwYXNzd29yZCI6IjEyMzQ1IiwiaWF0IjoxNzA4MTAwOTM5LCJleHAiOjE3MDgxMDQ1Mzl9.XlER6311gw7uuLxiNHg6uTU_mXRqygbTK0OJmkwiwzI", "abcdefg")
//   console.log(verify)
// } catch (error) {
//   console.log("acc")
// }

export const signIn = async (req, res) => {
  try {
    const { error } = signInValid.validate(req.body, { abortEarly: false });
    console.log(error)
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // Buoc 2: Kiem tra email co ton tai trong he thong khong?

    const checkEmail = await User.findOne({ email: req.body.email });

    // Buoc 3: So sanh pass:

    if (!checkEmail) {
      return res.status(400).json({
        status:1,
        message: "Email chua duoc dang ky!",
      });
    }

    const checkPass = await bcryptjs.compare(
      req.body.password,
      checkEmail.password
    );
    console.log(checkPass);

    if (!checkPass) {
      return res.status(400).json({
        status:1,
        message: "Mat khau khong dung!",
      });
    }

    // Buoc 4: Tao token

    const token = jwt.sign({ id: checkEmail._id }, "WD18202");
    
    if (!token) {
      return res.status(400).json({
        message: "Tao token that bai!",
      });
    }

    // Buoc 5: Gui token cho nguoi dung
    checkEmail.password = undefined;
    return res.status(200).json({
      status:0,
      message: "Dang nhap thanh cong!",
      accessToken: token,
      user: checkEmail,
      
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({
        message: "Không có thông tin xác thực.",
      });
    }
    const token = authorizationHeader.split(' ')[1];
    await BlackList.create({token, expireAt: new Date()});
    return res.status(200).json({
      message: "Đăng xuất thành công"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Đăng xuất thất bại",
      name: error.name
    });
  }
};
