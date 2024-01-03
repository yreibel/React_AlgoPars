import '../css/CodeArea.css';

import LineNumbers from './LineNumbers';
import CodeEditor from './CodeEditor';

import useCode from '../hooks/useCode';
import useHighlightedLine from '../hooks/useHighLightedLine';

import { useEffect, useState, useRef, useLayoutEffect } from 'react';


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

  const {code, nbLines, handleCodeChange} = useCode(code_);
  const {highlightCurrentLine} = useHighlightedLine(overlayRef, textAreaRef);

  
  const [intervalMovingLayer, setIntervalMovingLayer] = useState(null);

  

  /**
   * handleOnStartExecution
   * 
   * @param {*} e 
   */
  const handleOnStartExecution = (e) =>{

        
        const code_value = textAreaRef.current.value.split("\n");
        let map_array = new Map(code_value.map((value, index) => [index + 1, value]));


        // Check if it's already being executed, if yes, stop the execution 
        if (intervalMovingLayer) {
            clearInterval(intervalMovingLayer);
        }

        let line = 1;

        const intervalId = setInterval(
            () => {
                if(line < nbLines+1){
                    console.log("YOO " + line);
                    
                    highlightCurrentLine(line);
                    line = line+1
                }
                else {
                    clearInterval(intervalId);
                }

            }, 200);

        setIntervalMovingLayer(intervalId);
        
        //setCurrentLine(line);

  }

 

  return (
    <div className="code_area">

        <div className="container_editor">

            <LineNumbers lines={nbLines}></LineNumbers>
            <CodeEditor textAreaRef={textAreaRef} overlayRef={overlayRef} nbLines={nbLines} code={code} handleCodeChange={handleCodeChange}></CodeEditor>

            

            <div ref={overlayRef} className="highlighted-overlay" />
           
            
           
           

        </div>
       
        <button onClick={handleOnStartExecution} className="start_execution_button"></button>
        

        
    </div>
  );
}


