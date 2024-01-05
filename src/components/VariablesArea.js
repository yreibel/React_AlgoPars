import '../css/VariablesArea.css';

import { useVariablesStore } from '../stores/variablesStore';
import { useVariablesValueStore } from '../stores/variablesValueStore';

export default function VariablesArea() {

  const list_variables = useVariablesStore((state) => state.list_variables);
  const list_variables_value = useVariablesValueStore((state) => state.list_variables_value);


  return (
    <div className="variables_area">
        <h3 className='title'>Variables</h3>
        

      {list_variables.map(([key, value]) => (
        
        <div key={key} className='tracking'>
            <div  className='var'>{key}</div>
            <div  className='value'>{value}</div>
        </div>

      ))}

    {list_variables_value.map(([key, value]) => (
        
        <div key={key} className='tracking'>
            <div  className='var'>{key}</div>
            <div  className='value'>{value}</div>
        </div>

      ))}

        
         

        
    </div>
  );
}


