import React, {useState, useContext} from 'react';

const nestinLevel = 2500;

const MyContext = React.createContext(0);

function CompositionComponent(props) {
  if(props.count > nestinLevel) {
    return <div>{props.importantValue}</div>
  } else {
    return <CompositionComponent count={props.count+1} importantValue={props.importantValue} />
  }
}

function ContextComponent(props) {
  if(props.count > nestinLevel) {
    return <MyContext.Consumer>
      {value => {
        return <div>{value}</div>
      }}
    </MyContext.Consumer>
  } else {
    return <ContextComponent count={props.count+1}/>
  }
}



function App() {
  const [foo, setFoo] = useState(0);

  return (


    <div>
      <MyContext.Provider value={foo}>
        <CompositionComponent importantValue={foo} count={0}></CompositionComponent>
        <ContextComponent count={0}></ContextComponent>
        <button onClick={() => {setFoo(foo+1)}}>Set Value</button>
     </MyContext.Provider>
    </div>
  );
}

export default App;
