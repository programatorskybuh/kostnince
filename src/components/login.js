import React, { useState } from "react";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { toast } from "react-toastify";
import axios from "axios";

//radek 48 pred nahranim

export default function Auth(){
    const [page, setPage] = useState(0);
    return(
        <section className="h-screen flex flex-col justify-center items-center text-bila text-center" style={{backgroundImage: 'url("/img/pozadi.png")'}}>
            <div className="flex flex-col justify-start items-center bg-fialova opacity-80 min-w-60 min-h-80 rounded-3xl">
                {page === 0 ? <Login setPage={setPage} /> : ""}
                {page === 1 ? <Register setPage={setPage} /> : ""}
            </div>
        </section>
    );
}

function Login({setPage}){
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === '' || formData.password === '') {
        toast.error("Vyplňte všechny položky.");
        return;
    }

    try {
      const response = await axios.post('http://jelinek.soskolin.eu/maturita/php/login.php', formData);
      console.log(response.data); // Success message from the server 

      if(response.data.error === "Email not found"){
        toast.warning("Email nebyl nalezen.");
      }
      else if(response.data.error === "Invalid password"){
        toast.warning("Špatné heslo.");
      }
      else if(response.data.success === "Login successful"){
        toast.success("Přihlášení proběhlo v pořádku.");
        localStorage.setItem("id", response.data.ID_user);       
        window.location = "/";
      }
      
    } catch (error) {
      console.error('Error:', error); // Handle error
    }
  };

  return(
    <div className="m-16 flex flex-col justify-center items-center gap-5">
        <img src="img/profile.png" alt="Profile pic" />
        <Input type="email" label="Email" name="email" onChange={handleChange} value={formData.email} />
        <Input type="password" label="Heslo" name="password" onChange={handleChange} value={formData.password} />
        <Button className="bg-bila text-fialova" onClick={handleSubmit}>Přihlásit se</Button>
        <p>Nemáte účet? Registrujte se <Link onClick={() => setPage(1)} underline="always" className="text-bila cursor-pointer">zde</Link></p>
    </div>
  );
}

function Register({setPage}){
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        surname: ''
      });

      const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.email === '' || formData.password === '' || formData.name === '' || formData.surname === '') {
            toast.error("Vyplňte všechny položky.");
            return;
        }

        if(isValidEmail(formData.email) === false){
            toast.error("Zadejte email ve správném tvaru.");
            return;
        }

        try {
          const response = await axios.post('http://jelinek.soskolin.eu/maturita/php/createUser.php', formData);
          console.log(response.data); // Success message from the server
          if(response.data === "Email already exists"){
            toast.warning("Účet s tímto emailem již exituje.");
          }
          else if(response.data === "New record created successfully"){
            toast.success("Účet úspěšně vytvořen.");
            setPage(0); 
          }
        } catch (error) {
          console.error('Error:', error); // Handle error
        }
      };
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    return(
        <div className="m-16 flex flex-col justify-center items-center gap-5">
            <img src="img/profile.png" alt="Profile pic" />
            <div className="flex gap-5">
                <Input type="text" name="name" label="Jméno" value={formData.name} onChange={handleChange} />
                <Input type="text" name="surname" label="Příjmení" value={formData.surname} onChange={handleChange} />
            </div>
            <Input type="email" name="email" label="Email" value={formData.email} onChange={handleChange} />
            <Input type="password" name="password" label="Heslo" value={formData.password} onChange={handleChange} />
            <Checkbox><p className="text-bila">Souhlasím s podmínkami</p></Checkbox>
            <Button className="bg-bila text-fialova" onClick={handleSubmit}>Registrovat se</Button>
            <p>Máte účet? Přihlaste se <Link onClick={() => setPage(0)} underline="always" className="text-bila cursor-pointer">zde</Link></p>
        </div>
    );
}