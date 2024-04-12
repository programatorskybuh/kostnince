import { Button, ButtonGroup, Link, Select, SelectItem, Input } from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";


export default function Reservation(){
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: ""
    });

    const [reservations, setReservations] = useState({});

    useEffect(() =>{
        if(localStorage.getItem("id")){
            setUser({...user, id: localStorage.getItem("id"), name: localStorage.getItem("name"), email: localStorage.getItem("email")})
        } 
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get('https://jelinek.soskolin.eu/maturita/php/getReservations.php');
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    let dates = GenerateDates();
    return(
        <section className="h-screen flex flex-col justify-center items-center text-bila text-center" style={{backgroundImage: 'url("img/pozadi.webp")'}}>
            <div className="flex flex-col justify-start items-center bg-fialova opacity-80 md:min-w-96 md:w-auto w-full min-h-80 rounded-3xl">
                {user.id !== "" ? 
                <>
                    <SUctem dates={dates} reservations={reservations} userInfo={user} />
                </> : 
                <>
                    <BezUctu dates={dates} reservations={reservations}/>
                </>}          
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

function SUctem({dates, reservations, userInfo}){
    const [selectedDate, setSelectedDate] = useState("");
    const [timePick, setTimePick] = useState();
    const [peopleAdult, setPeopleAdult] = useState("1");
    const [peopleHalf, setPeopleHalf] = useState("0");
    const [step, setStep] = useState(0);
    const [personalInfo, setPersonalInfo] = useState(userInfo);
    const [usedDates, setUsedDates] = useState([
        false,
        false,
        false,
        false
    ]);

    //console.log(personalInfo)
    useEffect(() =>{
        try{
            //console.log(reservations.filter(item => item.date === selectedDate));
            setTimePick();
            let object = [
                false,
                false,
                false,
                false
            ];
            reservations.filter(item => item.date === selectedDate).forEach(element => {
                object[element.time - 1] = true;
            });
            setUsedDates(object);
        }
        catch{
            //console.log("nic nic", reservations)
        }
    }, [selectedDate])


    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    async function handleSend(){
        if(isValidEmail(personalInfo.email) === true){
            setStep(1);
            let data = {
                date: selectedDate,
                time: timePick,
                email: personalInfo.email,
                ID_user: personalInfo.id
            }
            const response = await axios.post("https://jelinek.soskolin.eu/maturita/php/createReservation.php", data)
            console.log(response.data);
            if(response.data === "New reservation created successfully"){
                try {
                    const response = await axios.post('https://jelinek.soskolin.eu/maturita/php/mail/reservation.php', {email: personalInfo.email, date: selectedDate});
                    console.log(response.data); // Success message from the server
                } catch (error) {
                    console.error('Error:', error); // Handle error
                }
            }
        }
        else toast.warning("Vyplňte všechny podstatné informace ve správném tvaru.")

    }

    return(
        <div className="m-16 h-full w-11/12 md:w-auto flex flex-col justify-evenly items-center gap-5">
            <h4 className="text-bila">Zarezervujte si prohlídku</h4>
            {step === 0 ? 
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
                        <Button isDisabled={usedDates[0] === true ? true : false} className={timePick === 1 ? "text-bila" : ""} onClick={() => setTimePick(1)} variant={timePick === 1 ? "bordered" : "solid"}>9:00</Button>
                        <Button isDisabled={usedDates[1] === true ? true : false} className={timePick === 2 ? "text-bila" : ""} onClick={() => setTimePick(2)} variant={timePick === 2 ? "bordered" : "solid"}>11:00</Button>
                        <Button isDisabled={usedDates[2] === true ? true : false} className={timePick === 3 ? "text-bila" : ""} onClick={() => setTimePick(3)} variant={timePick === 3 ? "bordered" : "solid"}>13:30</Button>
                        <Button isDisabled={usedDates[3] === true ? true : false} className={timePick === 4 ? "text-bila" : ""} onClick={() => setTimePick(4)} variant={timePick === 4 ? "bordered" : "solid"}>15:00</Button>
                    </ButtonGroup>
                )}
                {timePick && (
                    <>
                        <div className="flex w-11/12 md:w-full gap-4">
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
                        <Button className="bg-bila text-fialova" onClick={handleSend}>Rezervovat</Button>
                    </>
                )}
            </> : ""}
            {step === 1 ? 
            <>  
                <p>Děkujeme, Vaše rezervace na termín {selectedDate} byla úspěšně odeslána.</p>
            </> : ""}
            <p>Jste přihlášený pod jménem: <strong>{personalInfo.name}</strong></p>
        </div>
    );
}

function BezUctu({dates, reservations}){
    const [selectedDate, setSelectedDate] = useState("");
    const [timePick, setTimePick] = useState();
    const [peopleAdult, setPeopleAdult] = useState("1");
    const [peopleHalf, setPeopleHalf] = useState("0");
    const [personalInfo, setPersonalInfo] = useState({
        name: "",
        surname: "",
        email: "",
        phone: ""
    });
    const [step, setStep] = useState(0);
    const [usedDates, setUsedDates] = useState([
        false,
        false,
        false,
        false
    ]);

    useEffect(() =>{
        try{
            //console.log(reservations.filter(item => item.date === selectedDate));
            setTimePick();
            let object = [
                false,
                false,
                false,
                false
            ];
            reservations.filter(item => item.date === selectedDate).forEach(element => {
                object[element.time - 1] = true;
            });
            setUsedDates(object);
        }
        catch{
            //console.log("nic nic", reservations)
        }
    }, [selectedDate])

    const handleChange = (e) => {
        setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
    };

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    async function handleSend(){
        if(isValidEmail(personalInfo.email) === true){
            setStep(2);
            let data = {
                date: selectedDate,
                time: timePick,
                email: personalInfo.email,
                ID_user: null
            }
            const response = await axios.post("https://jelinek.soskolin.eu/maturita/php/createReservation.php", data)
            console.log(response.data);
            if(response.data === "New reservation created successfully"){
                try {
                    const response = await axios.post('https://jelinek.soskolin.eu/maturita/php/mail/reservation.php', {email: personalInfo.email, date: selectedDate});
                    console.log(response.data); // Success message from the server
                } catch (error) {
                    console.error('Error:', error); // Handle error
                }
            }
        }
        else toast.warning("Vyplňte všechny podstatné informace ve správném tvaru.")

    }

    return(
        <div className="m-16 h-full w-11/12 md:w-auto flex flex-col justify-evenly items-center gap-5">
            <h4 className="text-bila">Zarezervujte si prohlídku</h4>
            {step === 0 ? 
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
                        <Button isDisabled={usedDates[0] === true ? true : false} className={timePick === 1 ? "text-bila" : ""} onClick={() => setTimePick(1)} variant={timePick === 1 ? "bordered" : "solid"}>9:00</Button>
                        <Button isDisabled={usedDates[1] === true ? true : false} className={timePick === 2 ? "text-bila" : ""} onClick={() => setTimePick(2)} variant={timePick === 2 ? "bordered" : "solid"}>11:00</Button>
                        <Button isDisabled={usedDates[2] === true ? true : false} className={timePick === 3 ? "text-bila" : ""} onClick={() => setTimePick(3)} variant={timePick === 3 ? "bordered" : "solid"}>13:30</Button>
                        <Button isDisabled={usedDates[3] === true ? true : false} className={timePick === 4 ? "text-bila" : ""} onClick={() => setTimePick(4)} variant={timePick === 4 ? "bordered" : "solid"}>15:00</Button>
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
            {step === 1 ? 
            <>  
                <div className="flex justify-center items-center gap-2">
                    <p>Váš zarezervovaný termín: {selectedDate}</p>
                    
                    <img onClick={() => setStep(0)} className="cursor-pointer" src="img/pencil.webp" alt="Upravit" />
                </div>
                <div className="flex gap-5">
                    <Input type="text" name="name" label="Jméno" value={personalInfo.name} onChange={handleChange} />
                    <Input type="text" name="surname" label="Příjmení" value={personalInfo.surname} onChange={handleChange} />
                </div>
                <Input type="text" name="email" label="Email*" value={personalInfo.email} onChange={handleChange} />
                <Input type="text" name="phone" label="Telefonní číslo" value={personalInfo.phone} onChange={handleChange} />
                <Button className="bg-bila text-fialova" onClick={handleSend}>Zarezervovat</Button>
            </> : ""}
            {step === 2 ? 
            <>  
                <p>Děkujeme, Vaše rezervace na termín {selectedDate} byla úspěšně odeslána.</p>
            </> : ""}
            <p>Pro jednodušší rezervaci se přihlašte <RouterLink to={"/auth"}><Link underline="always" className="text-bila cursor-pointer">zde</Link></RouterLink></p>
        </div>
    );
}