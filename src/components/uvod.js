
export default function Uvod(){
    return(
        <section className="h-screen flex flex-col justify-center items-center text-bila text-center" style={{backgroundImage: 'url("/img/pozadi.png")'}}>
            <nav className="font-extralight flex items-center justify-between w-11/12 mb-auto">
                <a href="#" className="text-4xl m-3">Kostnice v Sedlci</a>
                <div className="text-xl flex gap-28">
                    <div className="flex gap-2">
                        <a className="m-3" href="#">O nás</a>
                        <a className="m-3" href="#">Kontakt</a>
                    </div>
                    <a className="m-3" href="#">Přihlásit se</a>
                </div>
            </nav>
            <div className="flex items-center flex-col gap-10 mb-auto">
                <h1 className="text-6xl font-bold drop-shadow-2xl">Rezervační systém Kostnice v Sedlci</h1>
                <h4>Zarezervujte si neopakovatelné okamžiky v pohodlí domova.</h4>
            </div>
        </section>
    );
}