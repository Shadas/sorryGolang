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

class Screen extends Component {
	render() {
		return (
			<img src={"http://emilyxiner.xin:8081/gif/" + this.props.gifId} alt="gif"/>
		);
	}
}

class Words extends Component {

	url = "http://emilyxiner.xin:8081/generateGif";

	constructor(props) {
		super(props);
		this.state = {
			wordList : [
				"武林来冲140！",
				"wow来打大boss！",
				"帝国来干no mercy！",
				"金晨曦怒了，撤了撤了",
			],
			templateType: "wangjingze",
			gifId: "",
		};
	}

	Submit() {
		var payload = {
			"words" : this.state.wordList,
			"template_type": this.state.templateType,
		};
		var payloadStr = JSON.stringify(payload);
		
		fetch(this.url, {
			method: "POST",
			headers:{
				// "Content-Type":"application/json",
			},
			body:payloadStr,
		}).then(function(res){
			if (res.ok) {
				return res.json();
			} else {
				alert("not ok status:"+res.status);
			}
		}, function(e) {
			alert("exception"+e);
		}).then(function(text){
			var gifId = text.data;
			this.setState({
				gifId: gifId,
			});
		}.bind(this));

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
		case 4:
			value = this.refs.input4.value;
			break;
		case 5:
			value = this.refs.input5.value;
			break;
		case 6:
			value = this.refs.input6.value;
			break;
		case 7:
			value = this.refs.input7.value;
			break;
		case 8:
			value = this.refs.input8.value;
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
		var newType = this.refs.templateType.value;

		var wordList = [];
		if (newType === "wangjingze") {
			wordList = [
				"武林来冲140！",
				"wow来打大boss！",
				"帝国来干no mercy！",
				"金晨曦怒了，撤了撤了",
			];
		} else if (newType === "sorry") {
			wordList = [
				"好吧",
				"就算我武林不练级",
				"就算我wow不上线",
				"就算我帝国打一半",
				"可是我有金晨曦",
				"有金晨曦你了不起啊",
				"对不起，有金晨曦就是了不起",
				"我鸽了他也没办法",
				"没办法没办法",
			];
		}
		this.setState({
			templateType: newType,
			wordList: wordList,
		});

	}

	renderWord() {
		if (this.state.templateType === "wangjingze") {
			return (
				<ul>
					<li><input type="text" ref="input0" value={this.state.wordList[0]} onChange={()=>this.handleChange(0)}/></li>
					<li><input type="text" ref="input1" value={this.state.wordList[1]} onChange={()=>this.handleChange(1)}/></li>
					<li><input type="text" ref="input2" value={this.state.wordList[2]} onChange={()=>this.handleChange(2)}/></li>
					<li><input type="text" ref="input3" value={this.state.wordList[3]} onChange={()=>this.handleChange(3)}/></li>
				</ul>
			);
		} else if (this.state.templateType === "sorry") {
			return (
				<ul>
					<li><input type="text" ref="input0" value={this.state.wordList[0]} onChange={()=>this.handleChange(0)}/></li>
					<li><input type="text" ref="input1" value={this.state.wordList[1]} onChange={()=>this.handleChange(1)}/></li>
					<li><input type="text" ref="input2" value={this.state.wordList[2]} onChange={()=>this.handleChange(2)}/></li>
					<li><input type="text" ref="input3" value={this.state.wordList[3]} onChange={()=>this.handleChange(3)}/></li>
					<li><input type="text" ref="input4" value={this.state.wordList[4]} onChange={()=>this.handleChange(4)}/></li>
					<li><input type="text" ref="input5" value={this.state.wordList[5]} onChange={()=>this.handleChange(5)}/></li>
					<li><input type="text" ref="input6" value={this.state.wordList[6]} onChange={()=>this.handleChange(6)}/></li>
					<li><input type="text" ref="input7" value={this.state.wordList[7]} onChange={()=>this.handleChange(7)}/></li>
					<li><input type="text" ref="input8" value={this.state.wordList[8]} onChange={()=>this.handleChange(8)}/></li>
				</ul>
			);
		}
	}	

	render() {
		return (
			<div>
				{this.renderWord()}

				<span>模板</span>


				<select ref="templateType" value={this.state.templateType} onChange={()=>this.handleChangeTemplateType()}>
					<option value="wangjingze">王境泽</option>
					<option value="sorry">sorry</option>
				</select>

				<p>
				<button onClick={()=>this.Submit()}>
					提交
				</button>
				</p>

				<p>
				<Screen gifId={this.state.gifId}>
				</Screen>
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