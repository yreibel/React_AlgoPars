import '../css/CodeEditor.css';

import { useState, useEffect } from 'react';

import useHighlightedLine from '../hooks/useHighLightedLine';


export default function CodeEditor({textAreaRef, overlayRef, nbLines, code, handleCodeChange}) {


    const [currentLine, setCurrentLine] = useState(1);

    const {highlightCurrentLine} = useHighlightedLine(overlayRef, textAreaRef, code, nbLines);


    const handleFocus = (e) => {
        const lineNumber = e.target.value.substr(0, e.target.selectionStart).split('\n').length;
        console.log("Boughhh" + lineNumber);
        highlightCurrentLine(lineNumber);
        
    };

    const handleKeyDown = (e) =>{

        // Up
        if(e.keyCode == 38){
            const lineNumber = e.target.value.substr(0, e.target.selectionStart).split('\n').length;
            if(lineNumber >1){
                highlightCurrentLine(lineNumber-1); // Go to the previous line
                setCurrentLine(lineNumber); // lineNumber because consider the line on which the action is taken
                console.log("UP LINE" + lineNumber);
            }
        }

        // Return
        if(e.keyCode == 8){
            const lineNumber = e.target.value.substr(0, e.target.selectionStart).split('\n').length;
            const positionInCode = e.target.value.substr(0, e.target.selectionStart).split('\n');

            if(positionInCode[positionInCode.length-1] == ""){
                if(lineNumber >1){
                    highlightCurrentLine(lineNumber-1);
                    setCurrentLine(lineNumber);
                    console.log("RETURN LINE" + lineNumber);
                }
            }
            console.log(positionInCode[positionInCode.length-1]);
            
        }

        // Left arrow
        if(e.keyCode == 37){
            const lineNumber = e.target.value.substr(0, e.target.selectionStart).split('\n').length;
            const positionInCode = e.target.value.substr(0, e.target.selectionStart).split('\n');

            if(positionInCode[positionInCode.length-1] == ""){
                if(lineNumber >1){
                    highlightCurrentLine(lineNumber-1);
                    setCurrentLine(lineNumber);
                    console.log("LEFT LINE" + lineNumber);
                }
            }
            console.log(positionInCode[positionInCode.length-1]);
            //highlightCurrentLine(lineNumber);
        }

        // Right arrow
        if(e.keyCode == 39){
            const lineNumber = e.target.value.substr(0, e.target.selectionStart).split('\n').length;
            const positionInCode = e.target.value.substr(0, e.target.selectionStart+1).split('\n');


            console.log(positionInCode[positionInCode.length-1]);

            if(positionInCode[positionInCode.length-1] == ""){
                if(lineNumber<nbLines){
                    highlightCurrentLine(lineNumber+1);
                    setCurrentLine(lineNumber);
                    console.log("RIGHT LINE" + lineNumber);
                }
            }
            
        
        }


        // Down
        if(e.keyCode == 40){
            const lineNumber = e.target.value.substr(0, e.target.selectionStart).split('\n').length;
            if(lineNumber <nbLines){
                highlightCurrentLine(lineNumber+1);
                setCurrentLine(lineNumber);
                console.log("DOWN LINE" + lineNumber);
            }
        } 

        // Enter
        if(e.keyCode == 13){
            const lineNumber = e.target.value.substr(0, e.target.selectionStart).split('\n').length;
            if(lineNumber <nbLines || lineNumber == nbLines){
                highlightCurrentLine(lineNumber+1);
                setCurrentLine(lineNumber);
                console.log("ENTER LINE" + lineNumber);
            }
        } 
        
        
    }

   
    const handleLineClick = (e) =>{
        const lineNumber = e.target.value.substr(0, e.target.selectionStart).split('\n').length;

        setCurrentLine(lineNumber);

        highlightCurrentLine(lineNumber);

    }

  return (
    <>
        <textarea
            ref={textAreaRef}
            className="code_editor"
            value={code}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            onChange={handleCodeChange}
            onClick={handleLineClick}
            placeholder="Type your code here..."
        />
    </>
    
  );
}


