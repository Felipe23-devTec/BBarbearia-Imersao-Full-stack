import Header from "@/components/header";
import {format} from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Home() {
  return (
    <div>
      <Header/>
      <div className="pt-5 px-5">
        <h2 className="text-xl font-bold">Olá, João</h2>
        <p className="capitalize text-sm">{format(new Date(), "EEEE',' d 'de' MMMM",{
            locale: ptBR
        })}</p>
      </div>
      
    </div>
  )
}
