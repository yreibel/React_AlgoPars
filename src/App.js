import './App.css';

import CodeArea from './components/CodeArea';
import OutputArea from './components/OutputArea';

import VariablesArea from './components/VariablesArea';

function App() {
  return (
    <div className="App">
        <div className='main_space'>
            <CodeArea></CodeArea>
            <OutputArea></OutputArea>

        </div>

        
        <VariablesArea></VariablesArea>



        
    </div>
  );
}

export default App;
