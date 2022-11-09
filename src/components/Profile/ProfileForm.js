import classes from "./ProfileForm.module.css";
import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContex from "../../store/auth-contex";

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContex);
  const token = authCtx.token;

  const changePasswordHandler = (event) => {
    event.preventDefault();

    const newPassword = newPasswordRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBedZcmNqyR2OzUvwzJfn-OwVSlmlswY2g",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: newPassword,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        history.replace("/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <form className={classes.form} onSubmit={changePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
