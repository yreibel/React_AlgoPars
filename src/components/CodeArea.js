import './CodeArea.css';

import LineNumbers from './LineNumbers';

import { useEffect, useState, useRef } from 'react';

const code_ = `.container_editor{
    display: flex;
    width: 100%;
    height: fit-content;
}

.code_editor{

    margin-left: 5px;

    
    width:100%;

 
    

}


`;


export default function CodeArea() {

  const textAreaRef = useRef();
  const overlayRef = useRef();
  const [currentLine, setCurrentLine] = useState(1);

  const [code, setCode] = useState('');
  const [nbLines, setNbLines] = useState(1);

  const [lineHeight, setLineHeight] = useState(0);

  
  useEffect(()=>{

   
      console.log("RERENDERING");
    
      const split_code = code_.split("\n");
      setNbLines(split_code.length);
      setCode(code_);

      setLineHeight(textAreaRef.current.scrollHeight / textAreaRef.current.rows);

      // Set the focus on text area
      textAreaRef.current.focus();

      //highlightCurrentLine(split_code.length);


  }, []);


  const handleFocus = (e) => {
    console.log("HELLO TEST");
    console.log(e.target.selectionStart);
    const lineNumber = e.target.value.substr(0, e.target.selectionStart).split('\n').length;
    
    highlightCurrentLine(lineNumber);
    
  };
  


  
  const handleKeyDown = (e) =>{

        // Up
        if(e.keyCode == 38){
            const lineNumber = e.target.value.substr(0, e.target.selectionStart).split('\n').length;
            if(lineNumber >1)
                highlightCurrentLine(lineNumber-1);
        }

        // Return
        if(e.keyCode == 8){
            const lineNumber = e.target.value.substr(0, e.target.selectionStart).split('\n').length;
            const positionInCode = e.target.value.substr(0, e.target.selectionStart).split('\n');

            if(positionInCode[positionInCode.length-1] == ""){
                if(lineNumber >1)
                    highlightCurrentLine(lineNumber-1);
            }
            console.log(positionInCode[positionInCode.length-1]);
            
        }

        // Left arrow
        if(e.keyCode == 37){
            const lineNumber = e.target.value.substr(0, e.target.selectionStart).split('\n').length;
            const positionInCode = e.target.value.substr(0, e.target.selectionStart).split('\n');

            if(positionInCode[positionInCode.length-1] == ""){
                if(lineNumber >1)
                    highlightCurrentLine(lineNumber-1);
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
                if(lineNumber<nbLines)
                    highlightCurrentLine(lineNumber+1);
            }
            
           
        }


        // Down
        if(e.keyCode == 40){
            const lineNumber = e.target.value.substr(0, e.target.selectionStart).split('\n').length;
            if(lineNumber <nbLines)
                highlightCurrentLine(lineNumber+1);
        } 

        // Enter
        if(e.keyCode == 13){
            const lineNumber = e.target.value.substr(0, e.target.selectionStart).split('\n').length;
            if(lineNumber <nbLines || lineNumber == nbLines)
                highlightCurrentLine(lineNumber+1);
        } 
        
        
  }
    

  const handleCodeChange = (e) =>{
        setCode(e.target.value);
        const split_code = e.target.value.split("\n");
        setNbLines(split_code.length);

       
        

  }  


  const highlightCurrentLine = (currentLine) => {
        //const lineHeight = textAreaRef.current.scrollHeight / textAreaRef.current.rows;
        const topPosition = ((currentLine-1) * lineHeight)/9.94;
        overlayRef.current.style.top = `${topPosition}px`;

  };


  const handleLineClick = (e, line) =>{
        //console.log(line);
        setCurrentLine(line);

        highlightCurrentLine(line);



  }

  return (
    <div className="code_area">

        <div className="container_editor">

            <LineNumbers lines={nbLines}></LineNumbers>
            <textarea
                ref={textAreaRef}
                className="code_editor"
                value={code}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                onChange={handleCodeChange}
                onClick={(e) => {
                const lineNumber = e.target.value.substr(0, e.target.selectionStart).split('\n').length;
                handleLineClick(e, lineNumber);
                }}
                placeholder="Type your code here..."
            />

            <div ref={overlayRef} className="highlighted-overlay" />
            
           
           

        </div>
        
        

        
    </div>
  );
}


