import ReactWrapper from "../modules/ReactWrapper";
// import AngularWrapper from ;
import Head from 'next/head';

import dynamic from 'next/dynamic'

const AngularWrapper = dynamic(
  () => import("../modules/AngularWrapper"),
  { ssr: false }
)


class Home extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        processInstance: 'some ID',
        complexInstance: {id: 'some ID'},
        value: 'some ID'
      }
  }

  changePI = newValue => {
    console.log('changed')
    this.setState({processInstance: this.state.value, complexInstance: {id: this.state.value}});
  }

  handleSubmit = evt => {
    console.log(evt);
    this.changePI();
    evt.preventDefault();
  }

  handleChange = evt => {
    this.setState({value: evt.target.value});
  }

  render() {
    return <div>
      <Head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" crossOrigin="anonymous" />
      </Head>
      <ReactWrapper>
        <form onSubmit={this.handleSubmit}>
          <label>
            Process ID: &nbsp;
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Set ID" />
        </form>
        <br />
        {this.state.processInstance}
      </ReactWrapper>
      <hr />
      <AngularWrapper processInstance={this.state.processInstance}/>
    </div>
  }
}

export default Home
