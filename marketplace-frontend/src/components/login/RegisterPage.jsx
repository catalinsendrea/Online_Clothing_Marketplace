import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";
import AuthService from "../../services/AuthService";


const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Acest camp este obligatoriu.
        </div>
      );
    }
};
  

const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          Acesta nu este un email valid.
        </div>
      );
    }
};


const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          Username-ul trebuie sa fie intre 3 si 20 caractere.
        </div>
      );
    }
};
  

const vpassword = (value) => {
    if (value.length < 4 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          Parola trebuie sa fie intre 4 si 40 caractere.
        </div>
      );
    }
  
};


const RegisterPage = (props) => {

    const form = useRef();
    const checkBtn = useRef();
  
    const [username, setUsername] = useState("");
    const [nume, setNume] = useState("");
    const [prenume, setPrenume] = useState("");
    const [telefon, setTelefon] = useState("");
    const [email, setEmail] = useState("");
    const [sex, setSex] = useState("");
    const [adresa, setAdresa] = useState("");
    const [codpostal, setCodPostal] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
  
  

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeNume = (e) => {
        const nume = e.target.value;
        setNume(nume);
    };

    const onChangePrenume = (e) => {
        const prenume = e.target.value;
        setPrenume(prenume);
    };

    const onChangeTelefon = (e) => {
        const telefon = e.target.value;
        setTelefon(telefon);
    };
  
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    
    const onChangeSex = (e) => {
        const sex = e.target.value;
        setSex(sex);
    };

    const onChangeAdresa = (e) => {
        const adresa = e.target.value;
        setAdresa(adresa);
    };

    const onChangeCodPostal = (e) => {
        const codpostal = e.target.value;
        setCodPostal(codpostal);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const doCancel = () => {
        props.history.push("/");
    }
  

    const handleRegister = (e) => {
      e.preventDefault();
  
      setMessage("");
      setSuccessful(false);
      setLoading(true);
  
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        AuthService.register(username, email, password, nume, prenume, telefon, sex, adresa, codpostal).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
              setLoading(false);
  
            setMessage(resMessage);
            setSuccessful(false);
            setLoading(false);
          }
        );
      }
  };
  
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
  
          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username" style={{marginRight: "195px"}}>Username:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nume" style={{marginRight: "225px"}}>Nume:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="nume"
                    value={nume}
                    onChange={onChangeNume}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prenume" style={{marginRight: "203px"}}>Prenume:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="prenume"
                    value={prenume}
                    onChange={onChangePrenume}
                    validations={[required]}
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="email" style={{marginRight: "228px"}}>Email:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefon" style={{marginRight: "217px"}}>Telefon:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="telefon"
                    value={telefon}
                    onChange={onChangeTelefon}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sex" style={{marginRight: "239px"}}>Sex:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="sex"
                    value={sex}
                    onChange={onChangeSex}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="adresa" style={{marginRight: "215px"}}>Adresa:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="adresa"
                    value={adresa}
                    onChange={onChangeAdresa}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="codpostal" style={{marginRight: "189px"}}>Cod Postal:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="codpostal"
                    value={codpostal}
                    onChange={onChangeCodPostal}
                    validations={[required]}
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="password" style={{marginRight: "197px"}}>Parola:</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
  
                <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Inregistreaza-te</span>
                    </button>
                </div>

                <div className="form-group">
                    <button onClick = {doCancel} className="btn btn-danger btn-block" >Inapoi</button>
                </div>

              </div>
            )}
  
            {message && (
              <div className="form-group">
                <div
                  className={ successful ? "alert alert-success" : "alert alert-danger" }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    );
};
  
export default RegisterPage;