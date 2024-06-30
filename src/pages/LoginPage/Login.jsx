import React, { useEffect, useState } from "react";
import classes from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const userDefault = {
    userName: 'dbao',
    password: '123',
  }
  const [user, setUser] = useState({
    userName: '',
    password: '',
  })
  const [messageError, setMessageError] = useState({
    userName: '',
    password: '',
    invalidAccount: '',
  })
  const msgError = {
    userName: '',
    password: '',
    invalidAccount: '',

  }
  const navigate = useNavigate()
  const handleChangeUser = (e) => {
    e.preventDefault()
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }
  const handleSignIn = () => {

    // validate user name and password
    if (!user?.userName.trim().length) {
      msgError.userName = '💀User name is require'
    }
    if (!user?.password.trim().length) {
      msgError.password = '💀Password is require'

    } else if (user?.userName.trim() !== userDefault.userName ||
      user?.password.trim() !== userDefault.password
    ) {
      msgError.invalidAccount = '💀Incorrect username or password'
    } else {
      localStorage.setItem('userToken', '4G02zBeVAt2GMF5aV0P77PeDxoIGKpQhquQkohHcVfQPbVvPkisHs2qAkyq1lcq6')
      navigate('/')
      toast.success("Login thành công!");

      setUser({
        ...user,
        userName: '',
        password: '',
      })
    }

    setMessageError({
      ...messageError,
      userName: msgError.userName,
      password: msgError.password,
      invalidAccount: msgError.invalidAccount,
    }
    )
  }

  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    if (!userToken) {
      navigate('/login')
    } else {
      navigate('/')

    }
  }, [])
  return (
    <div className={`position-relative ${classes.login}`}>
      <div className="container">
        <div className={classes.form}>
          <div className={classes.message__error}>
            <p>{messageError?.userName}</p>
            <p>{messageError?.password}</p>
            <p>{messageError?.invalidAccount}</p>
          </div>
          <div className={classes.form__item}>
            <label htmlFor="username">User Name</label>
            <input type="text" placeholder="Enter your user name"
              name="userName"
              value={user?.userName}
              onChange={handleChangeUser}
            />

          </div>
          <div className={classes.form__item}>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter your password"
              name="password"
              value={user?.password}
              onChange={handleChangeUser}
            />

          </div>
          <div className={classes.form__item}>
            <button onClick={handleSignIn}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
