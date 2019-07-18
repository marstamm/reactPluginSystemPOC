function ReactWrapper(props) {
  return (
    <div>
      <h1>This is rendered in React:</h1>
      {props.children}
    </div>
  )
}

export default ReactWrapper;