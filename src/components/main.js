
export default function Main(){
    return(
        <section className="w-full bg-fialova text-bila">
            <Onas />
            <Info />
            <Pruvodci />
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
        <section className="flex gap-9 p-16 justify-center items-center w-3/4 m-auto text-xl text-center">
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
                <button className="bg-bila text-fialova">Zarezervujte si prohlídku!</button>
            </div>
        </section>
    );
}

function Pruvodci(){
    return(
        <section className="flex flex-col gap-9 p-16 justify-center items-center w-3/4 m-auto text-xl text-center">
            <h2 className="font-medium text-5xl">Kdo vás bude provádět?</h2>
            <div className="flex">
                <div>
                    <img />
                    <h4>Honza</h4>
                    <p>Honza, náš tajemný průvodce v kostnici, je vysoký 
                    muž s hnědými vlasy a záhadným pohledem. Jeho 
                    znalost historie a schopnost číst příběhy vyryté do kostí 
                    dává kostnici nový rozměr – místo, kde minulost ožívá ve stínu 
                    mrtvých.</p>
                </div>
                <div>
                    <img />
                    <h4>Big Boss</h4>
                    <p>Radka, naše odvážná průvodkyně kostnicí, vystupuje s jasným úsměvem uprostřed morbidní atmosféry. S krátkými vlasy a pestrobarevným šátkem kolem krku, působí jako světýlko ve tmě. S každým krokem odhaluje příběhy minulosti s nakažlivým nadšením.</p>
                </div>
                <div>
                    <img />
                    <h4>Nikča</h4>
                    <p>Nikča, naše tajemná průvodkyně v kostnici, je postava zahalena do temných šatů a s krátkými, vlnitými vlasy, které jí padají do tváře. S podmanivým pohledem, který proniká do nejtemnějších koutů, odhaluje tajemství minulosti.</p>
                </div>
            </div>
        </section>
    );
}