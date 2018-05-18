import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }


class Words extends Component {

	url = "http://emilyxiner.xin:8081/generateGif";

	constructor(props) {
		super(props);
		// const url = "http://emilyxiner.xin:8081/generateGif";
		this.state = {
			wordList : [],
			templateType: "wangjingze",
		};
	}

	Submit() {
		var payload = {
			"words" : this.state.wordList,
			"template_type": this.state.templateType,
		};
		var payloadStr = JSON.stringify(payload);
		alert(payloadStr);
	}

	
	handleChange(i) {
		var tmpwordList = this.state.wordList.slice();
		var value;
		switch(i){
		case 0:
			value = this.refs.input0.value;
			break;
		case 1:
			value = this.refs.input1.value;
			break;
		case 2:
			value = this.refs.input2.value;
			break;
		case 3:
			value = this.refs.input3.value;
			break;
		default:
			value = "";
		}
		
		tmpwordList[i] = value;
		this.setState({
			wordList : tmpwordList,
		});
	}

	handleChangeTemplateType() {
		this.setState({
			templateType: this.refs.templateType.value,
		});
	}

	renderWord(i) {
		var thisref = "input"+i;
		return (
			<input type="text" ref={thisref} value={this.state.wordList[i]} onChange={()=>this.handleChange(i)}/>
		);
	}	

	render() {
		return (
			<div>
				<p>
				<ul>
					<li>{this.renderWord(0)}</li>
					<li>{this.renderWord(1)}</li>
					<li>{this.renderWord(2)}</li>
					<li>{this.renderWord(3)}</li>
				</ul>
				</p>

				<span>模板</span>
				<input type="text" ref="templateType" value={this.state.templateType} onChange={()=>this.handleChangeTemplateType()}/>

				<p>
				<button onClick={()=>this.Submit()}>
					提交
				</button>
				</p>
			</div>
		);
	}
}

class Sorry extends Component {
  render() {
    return (
      <div className="Sorry">
      	<Words className="Words">
      	</Words>
      </div>
    );
  }
}

export default Sorry;