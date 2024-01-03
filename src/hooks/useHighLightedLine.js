import { useEffect, useState } from "react";

export default function useHighlightedLine(overlayRef, textAreaRef, code, nbLines){
    
    const [lineHeight, setLineHeight] = useState(0);

    const [effectCount, setEffectCount] = useState(0);
    
    useEffect(()=>{
        setLineHeight(textAreaRef.current.scrollHeight / textAreaRef.current.rows);
        overlayRef.current.style.display = 'block';
    }, []);

    
    useEffect(() => {
        if(code != undefined ){
            if(effectCount < 2){
                highlightCurrentLine(nbLines);
                textAreaRef.current.focus();
                setEffectCount(effectCount+1);
            }
        }
      }, [code]);


    const highlightCurrentLine = (currentLine) => {
        const topPosition = ((currentLine-1) * lineHeight)/9.9355;
        overlayRef.current.style.top = `${topPosition}px`;

    };

    
    return {
        highlightCurrentLine : highlightCurrentLine   
    }
}