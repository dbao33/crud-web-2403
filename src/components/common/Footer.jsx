import React, { useEffect, useState } from "react";
import imgLogo from "../../assets/images/footer_logo.png";
import classes from "../../assets/styles/Footer.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";

const Footer = () => {
  const [token, setToken] = useState()
  const navigate = useNavigate()
  const handleSignOut = () => {
    localStorage.removeItem('userToken')
    navigate('/login')
  }
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    setToken(userToken)
  }, [token])
  return (
    <div className={classes.footer}>
      <div className="container">
        <div className="d-flex justify-content-between">
          <div>
            <Link to="/" className={`${classes.logo} d-inline-flex`}>
              <img src={imgLogo} alt="logo" />
            </Link>
            <p className={classes.desc}>
              Cras incident lobotids feudist makes viramas sagittas eu valuta.
            </p>
          </div>
          <div>
            <h4>RESOURCES</h4>
            <ul className="d-flex flex-column row-gap-3">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/user-list">User List</Link>
              </li>
              <li>
                {token ? (
                  <Button className={classes.btn__out}
                    onClick={handleSignOut}
                  >
                    Logout
                  </Button>
                ) : (<Link
                  to="/login"
                >Login
                </Link>)}

              </li>
            </ul>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <p className="mt-5 mb-4">
            Copyright © RESTINA 2024. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
