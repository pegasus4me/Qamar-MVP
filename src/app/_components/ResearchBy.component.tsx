"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Tsearch = {
    value: React.ChangeEventHandler<HTMLInputElement>;
    search: () => void;
};


const Research = ({value, search} : Tsearch) => {
    return <div className="flex gap-4 max-w-[500px]">
    <Input
    placeholder="search ex:Business operator"
    onChange={value}
    />
    <Button
    onClick={search}
    >search</Button>
    </div> 
    
}

export default Research;