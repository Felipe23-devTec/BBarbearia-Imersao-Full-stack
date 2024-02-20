"use client";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
interface SearchProps {
    texto: string;
}
export default function Search(props: SearchProps) {
  return (
    <div className="flex items-center md:w-1/2">
       <Input placeholder={props.texto} className="bg-gray-200"/>
       <Button variant="outline" size="icon" className="bg-[#45309f]">
            <SearchIcon size={22} color="#fff"/>
       </Button>
    </div>
  )
}
