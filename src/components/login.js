import React, { useState } from "react";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { Link as UrlLink, Route, BrowserRouter as Router, Routes  } from "react-router-dom";

export default function Auth(){
    const [state, setState] = useState(0);
    return(
        <section className="h-screen flex flex-col justify-center items-center text-bila text-center" style={{backgroundImage: 'url("/img/pozadi.png")'}}>
            <div className="flex flex-col justify-start items-center bg-fialova opacity-80 min-w-60 min-h-80 rounded-3xl">
                {state == 0 ? <Login setState={setState} /> : ""}
                {state == 1 ? <Register setState={setState} /> : ""}
            </div>
        </section>
    );
}

function Login({setState}){
    return(
        <div className="m-16 flex flex-col justify-center items-center gap-5">
            <img src="img/profile.png" alt="Profile pic" />
            <Input type="email" label="Email" />
            <Input type="password" label="Heslo" />
            <Button className="bg-bila text-fialova">Přihlásit se</Button>
            <p>Nemáte účet? Registrujte se <Link onClick={() => setState(1)} underline="always" className="text-bila cursor-pointer">zde</Link></p>
        </div>
    );
}

function Register({setState}){
    return(
        <div className="m-16 flex flex-col justify-center items-center gap-5">
            <img src="img/profile.png" alt="Profile pic" />
            <div className="flex gap-5">
                <Input type="text" label="Jméno" />
                <Input type="text" label="Příjmení" />
            </div>
            <Input type="email" label="Email" />
            <Input type="password" label="Heslo" />
            <Checkbox><p className="text-bila">Souhlasím s podmínkami</p></Checkbox>
            <Button className="bg-bila text-fialova">Registrovat se</Button>
            <p>Máte účet? Přihlaste se <Link onClick={() => setState(0)} underline="always" className="text-bila cursor-pointer">zde</Link></p>
        </div>
    );
}