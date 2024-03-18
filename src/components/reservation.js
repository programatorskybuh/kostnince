import { Button, ButtonGroup, Link } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
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
    const [selected, setSelected] = useState();
    console.log(selected);
    return(
        <div className="m-16 h-full flex flex-col justify-evenly items-center gap-5">
            <h4 className="text-bila">Zarezervujte si prohlídku</h4>
            <Select label="Datum prohlídky" onSelectionChange={setSelected} >
                {dates.map((date) => (
                    <SelectItem key={date} value={date}>
                        {date}
                    </SelectItem>
                ))}
            </Select>
            {selected && (
                <ButtonGroup>
                    <Button>9:00 - 10:00</Button>
                    <Button>9:00 - 10:00</Button>
                    <Button>9:00 - 10:00</Button>
                    <Button>9:00 - 10:00</Button>
                </ButtonGroup>
            )}
            <p>Pro jednodušší rezervaci se přihlašte <RouterLink to={"/auth"}><Link underline="always" className="text-bila cursor-pointer">zde</Link></RouterLink></p>
        </div>
    );
}