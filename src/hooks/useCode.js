import { useEffect, useState } from "react";

export default function useCode(default_code){
    const [code, setCode] = useState('');
    const [nbLines, setNbLines] = useState(1);

    useEffect(()=>{
        if(default_code != undefined){
            const split_code = default_code.split("\n");
            setNbLines(split_code.length);
            setCode(default_code);
        }
    }, [])

    const onChange = (e) =>{
        setCode(e.target.value);
        const split_code = e.target.value.split("\n");
        setNbLines(split_code.length);

    } 

    return {
        code,
        nbLines,
        handleCodeChange : onChange
        
    }
}