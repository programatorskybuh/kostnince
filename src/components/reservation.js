import { Button, ButtonGroup, Link, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function Reservation(){
    let dates = GenerateDates();
    return(
        <section className="h-screen flex flex-col justify-center items-center text-bila text-center" style={{backgroundImage: 'url("/img/pozadi.png")'}}>
            <div className="flex flex-col justify-start items-center bg-fialova opacity-80 min-w-60 min-h-80 rounded-3xl">
                <BezUctu dates={dates}/>
            </div>
        </section>
    );

    function GenerateDates(){
        let dates = [];
        let today = new Date();
        for (let i = 1; i < 11; i++) {
            let newDate = new Date(today);
            newDate.setDate(today.getDate() + i);
            dates.push(newDate.toLocaleDateString("cs-cz"));
        }
        return dates;
    }
}

function BezUctu({dates}){
    const [selectedDate, setSelectedDate] = useState();
    const [timePick, setTimePick] = useState();
    const [peopleAdult, setPeopleAdult] = useState("1");
    const [peopleHalf, setPeopleHalf] = useState("0");
    const [step, setStep] = useState(0);

    console.log(selectedDate);
    return(
        <div className="m-16 h-full flex flex-col justify-evenly items-center gap-5">
            <h4 className="text-bila">Zarezervujte si prohlídku</h4>
            {step == 0 ? 
            <>
                <Select label="Datum prohlídky" selectedKeys={[selectedDate]} onChange={(e) => setSelectedDate(e.target.value)} >
                {dates.map((date) => (
                    <SelectItem key={date} value={date}>
                        {date}
                    </SelectItem>
                ))}
                </Select>
                {selectedDate && (
                    <ButtonGroup>
                        <Button className={timePick == 1 ? "text-bila" : ""} onClick={() => setTimePick(1)} variant={timePick == 1 ? "bordered" : "solid"}>9:00</Button>
                        <Button className={timePick == 2 ? "text-bila" : ""} onClick={() => setTimePick(2)} variant={timePick == 2 ? "bordered" : "solid"}>11:00</Button>
                        <Button className={timePick == 3 ? "text-bila" : ""} onClick={() => setTimePick(3)} variant={timePick == 3 ? "bordered" : "solid"}>13:30</Button>
                        <Button className={timePick == 4 ? "text-bila" : ""} onClick={() => setTimePick(4)} variant={timePick == 4 ? "bordered" : "solid"}>15:00</Button>
                    </ButtonGroup>
                )}
                {timePick && (
                    <>
                        <div className="flex w-full gap-4">
                        <Select label="Dospělý" selectedKeys={[peopleAdult]} onChange={(e) => setPeopleAdult(e.target.value)}>
                            <SelectItem key={"0"} value={"0"}>0</SelectItem>
                            <SelectItem key={"1"} value={"1"}>1</SelectItem>
                            <SelectItem key={"2"} value={"2"}>2</SelectItem>
                            <SelectItem key={"3"} value={"3"}>3</SelectItem>
                            <SelectItem key={"4"} value={"4"}>4</SelectItem>
                            <SelectItem key={"5"} value={"5"}>5</SelectItem>
                        </Select>
                        <Select label="Dítě/Senior" selectedKeys={[peopleHalf]} onChange={(e) => setPeopleHalf(e.target.value)}>
                            <SelectItem  key={"0"} value={"0"}>0</SelectItem>
                            <SelectItem  key={"1"} value={"1"}>1</SelectItem>
                            <SelectItem  key={"2"} value={"2"}>2</SelectItem>
                            <SelectItem  key={"3"} value={"3"}>3</SelectItem>
                            <SelectItem  key={"4"} value={"4"}>4</SelectItem>
                            <SelectItem  key={"5"} value={"5"}>5</SelectItem>
                        </Select>
                        </div>
                        <Button className="bg-bila text-fialova" onClick={() => setStep(1)}>Pokračovat</Button>
                    </>
                )}
            </> : ""}
            {step == 1 ? 
            <>  
                <div className="flex justify-center items-center gap-2">
                    <p>Váš zarezervovaný termín: {selectedDate}</p>
                    <img onClick={() => setStep(0)} className="cursor-pointer" src="img/pencil.png" alt="Upravit" />
                </div>
                <Button className="bg-bila text-fialova" onClick={() => setStep(2)}>Zarezervovat</Button>
            </> : ""}
            {step == 2 ? 
            <>  
                <p>Děkujeme, Vaše rezervace na termín {selectedDate} byla úspěšně odeslána.</p>
            </> : ""}
            <p>Pro jednodušší rezervaci se přihlašte <RouterLink to={"/auth"}><Link underline="always" className="text-bila cursor-pointer">zde</Link></RouterLink></p>
        </div>
    );
}