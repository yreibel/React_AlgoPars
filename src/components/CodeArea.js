import '../css/CodeArea.css';

import LineNumbers from './LineNumbers';
import CodeEditor from './CodeEditor';

import useCode from '../hooks/useCode';
import useHighlightedLine from '../hooks/useHighLightedLine';

import {CodeParse} from '../scripts/codeParsing'; 

import { useState, useRef } from 'react';
import { useVariablesStore } from '../stores/variablesStore';
import { useVariablesValueStore } from '../stores/variablesValueStore';


const code_ = `a:entier
b:entier
b  <=      4

a,b<=5
`;

export default function CodeArea() {

  const textAreaRef = useRef();
  const overlayRef = useRef();

  const {code, nbLines, handleCodeChange} = useCode(code_);
  const {highlightCurrentLine} = useHighlightedLine(overlayRef, textAreaRef);

  
  const [intervalMovingLayer, setIntervalMovingLayer] = useState(null);


  const setTrackVariables = useVariablesStore((state) => state.setTrackVariables);
  const setVariablesValue = useVariablesValueStore((state) => state.setVariablesValue);

  

  /**
   * handleOnStartExecution
   * 
   * @param {*} e 
   */
  const handleOnStartExecution = (e) =>{

        
        console.log("START");
       
        let codeParse = new CodeParse(code);
        let arrVariables = codeParse.loopExtractVariables()
        console.log(arrVariables);
        console.log("boom")

        setTrackVariables(arrVariables)
        
       

        // Check if it's already being executed, if yes, stop the execution 
        if (intervalMovingLayer) {
            clearInterval(intervalMovingLayer);
        }

        let line = 0;

        const intervalId = setInterval(
            () => {
                if(line < nbLines){
                    let arr_var_value = codeParse.processLine(line);
                    setVariablesValue(arr_var_value);
                    // Highlight
                    highlightCurrentLine(line+1);
                    line = line+1
                }
                else {
                    console.log("boom end");
                    codeParse.showTraceExec();
                    clearInterval(intervalId);
                }

            }, 1000);

        
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


