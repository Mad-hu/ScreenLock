import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import { ipcRenderer } from "electron";
import styles from './App.scss';
interface Props {
}
interface State {
  msg: String,
  isLogining: Boolean
}
class Home extends React.Component<Props, State> {
  password: any = '';
  loginName: any = '';
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      msg: 'Welcome ！',
      isLogining: false,
    }
  }
  componentDidMount() {
    this.lock();
  }
  render() {
    return(
      <div className="container">
        <h1>{this.state.msg}</h1>
        <div className="InuptBox">
          <input id="loginName" placeholder="Username" onKeyDown={e => this.onKeyDownchange(e)} autoFocus={true} onChange={e => this.changeText(e, 0)} />
          <input id="loginName" placeholder="Password" onKeyDown={e => this.onKeyDownchange(e)} autoFocus={true} onChange={e => this.changeText(e, 1)} />
        </div>
        <div className="Hello">
          <button type="button" onClick={this.handleSubmit.bind(this)}>
            🔑unlock
          </button>
        </div>
        {this.renderLoading()}
      </div>
    )
  }
  renderLoading() {
    let loading;
    if (this.state.isLogining) {
      loading = (
        <div className={styles.lock}>
          <div className={styles["ant-spin"]}>
            <span className={styles["ant-spin-dot-spin"] + ' ' + styles["ant-spin-dot"]}>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </span>
          </div>
        </div>
      );
    } else {
      loading = null;
    }
    return loading;
  }
  onKeyDownchange(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode == 13) {
      this.handleSubmit();
    }
  }
  changeText(e: any, index: number) {
    if (index == 0) {
      this.loginName = e.target.value;
    } else {
      this.password = e.target.value;
    }
  }
  loadingVisible(show: boolean) {
    this.setState({ isLogining: show });
  }

  handleSubmit() {
    console.log(this.loginName,this.password);
    this.loadingVisible(true);
    if(this.loginName == 123 && this.password == 123) {
      setTimeout(() => {
        this.loadingVisible(false);
        this.unlock();
        this.closeWindows();
      }, 500);
    } else {
      setTimeout(() => {
        this.setState({
          msg: 'username or password error!,123 you can try!',
          isLogining: false
        });
      }, 500);
    }
  }
  closeWindows() {
    setTimeout(() => {
      ipcRenderer.send('close-window');
    }, 1000);
  }
  unlock() {
    ipcRenderer.send('unclock');
  }
  lock() {
    ipcRenderer.send('clock');
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
