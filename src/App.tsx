import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';

interface Props {
}
interface State {
  msg: String
}
class Home extends React.Component<Props, State> {
  password: any = '';
  loginName: any = '';
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      msg: 'Welcome ！'
    }
  }
  render() {
    return(
      <div className="container">
        <h1>{this.state.msg}</h1>
        <div className="InuptBox">
          <input id="loginName" placeholder="Username" onKeyDown={e => this.onKeyDownchange(e)} autoFocus={true} onChange={e => this.changeText(e, 0)} />
          <input id="loginName" placeholder="Password" onKeyDown={e => this.onKeyDownchange(e)} autoFocus={true} onChange={e => this.changeText(e, 0)} />
        </div>
        <div className="Hello">
          <button type="button" onClick={this.handleSubmit.bind(this)}>
            🔑unlock
          </button>
        </div>
      </div>
    )
  }
  onKeyDownchange(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode == 13) {
      this.handleSubmit();
      //事件操作
    }
  }
  changeText(e: any, index: number) {
    if (index == 0) {
      this.loginName = e.target.value;
    } else {
      this.password = e.target.value;
    }
  }
  handleSubmit() {
    console.log('submit');
    if(this.loginName == 123 && this.password == 123) {
      this.unlock();
    } else {
      this.setState({
        msg: 'username or password error!'
      });
    }
  }
  unlock() {
    const ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.send('unclock');
  }
}
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}
