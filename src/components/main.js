import React from "react";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function Main(){
    return(
        <section className="w-full bg-fialova text-bila">
            <Uvod />
            <Onas />
            <Info />
            <Pruvodci />
            <Kontakt />
            <Footer />
        </section>
    );
}
function Uvod(){
    return(
        <section className="h-screen flex flex-col justify-center items-center text-bila text-center" style={{backgroundImage: 'url("/img/pozadi.png")'}}>
            <nav className="font-extralight flex items-center justify-between w-11/12 mb-auto">
                <a href="#" className="md:text-4xl text-lg m-3">Kostnice v Sedlci</a>
                <div className="text-xl flex gap-28">
                    <div className="md:flex gap-2 hidden">
                        <a className="m-3" href="#">O nás</a>
                        <a className="m-3" href="#">Kontakt</a>
                    </div>
                    <Link to={"/auth"}><a className="m-3 text-sm" href="#">Přihlásit se</a></Link>
                </div>
            </nav>
            <div className="flex items-center flex-col gap-10 mb-auto">
                <h1 className="md:text-6xl text-4xl font-bold drop-shadow-2xl">Rezervační systém Kostnice v Sedlci</h1>
                <h4 className="text-lg">Zarezervujte si neopakovatelné okamžiky v pohodlí domova.</h4>
            </div>
        </section>
    );
}

function Onas(){
    return(
        <section className="flex flex-col justify-center items-center w-3/4 m-auto">
            <h2 className="text-5xl font-medium drop-shadow-2xl pt-12">O Nás</h2>
            <p className="text-xl font-light p-8 text-center">Vítejte v rezervačním systému Kostnice v Sedlci! Jsme tým nadšených jednotlivců spojených 
                láskou k historii. Naším cílem je vám usnadnit návštěvu této unikátní lokality. S námi můžete snadno zarezervovat 
                svou návštěvu, abyste si plně užili atmosféru Kostnice v Sedlci. Těšíme se na vaši návštěvu!</p>
        </section>
    );
}

function Info(){
    return(
        <section className="flex md:flex-row flex-col gap-9 p-16 justify-center items-center w-3/4 m-auto text-xl text-center">
            <div>
                <p>Otevřeno:</p>
                <p className="font-light">9:00 - 16:00</p>
            </div>
            <div>
                <p>Cena:</p>
                <p className="font-light">499 Kč, Dospělý</p>
                <p className="font-light">299 Kč, Senior/Dítě</p>
            </div>
            <div>
                <Button className="bg-bila text-fialova hover:-translate-y-1">Zarezervujte si prohlídku!</Button>
            </div>
        </section>
    );
}

function Pruvodci(){
    return(
        <section className="flex flex-col gap-9 p-16 justify-center items-center w-3/4 m-auto text-xl text-center">
            <h2 className="font-medium text-5xl">Kdo vás bude provádět?</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <div className="md:w-[540px] w-2/3">
                    <img src="img/honza.png" alt="Honza" />
                    <h4 className="text-2xl m-2">Honza</h4>
                    <p className="font-light text-lg">Honza, náš tajemný průvodce v kostnici, je vysoký 
                    muž s hnědými vlasy a záhadným pohledem. Jeho 
                    znalost historie a schopnost číst příběhy vyryté do kostí 
                    dává kostnici nový rozměr – místo, kde minulost ožívá ve stínu 
                    mrtvých.</p>
                </div>
                <div className="md:w-[540px] w-2/3">
                    <img src="img/bigboss.png" alt="BigBoss" />
                    <h4 className="text-2xl m-2">Big Boss</h4>
                    <p className="font-light text-lg">Radka, naše odvážná průvodkyně kostnicí, vystupuje s jasným úsměvem uprostřed morbidní atmosféry. S krátkými vlasy a pestrobarevným šátkem kolem krku, působí jako světýlko ve tmě. S každým krokem odhaluje příběhy minulosti s nakažlivým nadšením.</p>
                </div>
                <div className="md:w-[540px] w-2/3">
                    <img src="img/nikca.png" alt="Nikca"/>
                    <h4 className="text-2xl m-2">Nikča</h4>
                    <p className="font-light text-lg">Nikča, naše tajemná průvodkyně v kostnici, je postava zahalena do temných šatů a s krátkými, vlnitými vlasy, které jí padají do tváře. S podmanivým pohledem, který proniká do nejtemnějších koutů, odhaluje tajemství minulosti.</p>
                </div>
            </div>
        </section>
    );
}

function Kontakt(){
    return(
        <section className="flex flex-col justify-center items-center text-center">
            <h2 className="font-medium text-5xl m-4">Kontakt</h2>
            <div className="font-light text-xl flex flex-col md:flex-row gap-5 justify-center m-4">
                <p className="flex items-center gap-2"><img src="img/phone.png"/>+420 327 561 147</p>
                <p className="flex items-center gap-2"><img src="img/email.png"/>info@sedlec.info</p>
                <p className="flex items-center gap-2"><img src="img/mapa.png"/>Zámecká 279, Kutná Hora</p>
            </div>
            <iframe className="w-full" height="450" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2566.723390010863!2d15.286433576914842!3d49.960291122534684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470c40fc635ac54f%3A0x320cc9caa5f1508e!2sKostnice%20Sedlec!5e0!3m2!1scs!2scz!4v1709640910708!5m2!1scs!2scz" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </section>
    );
}

function Footer(){
    return(
        <section className="flex flex-col justify-center items-center text-center">
            <img className="m-14 w-2/3 md:w-auto" src="img/logo.png" alt="log"/>
            <p className="text-xl font-light">©2024</p>
        </section>
    );
}