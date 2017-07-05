var listnote;
var note_div;
class Note extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			onEdit: false
		}
		note_div = this;
	}
	detete(){
		$.post("/delete", {id_del: this.props.id}, function(list){
			listnote.setState({list_note: list})
		})
		ReactDOM.unmountComponentAtNode(document.getElementById	("div-input"));
	}
	edit(){
		this.setState({onEdit: true})
		ReactDOM.unmountComponentAtNode(document.getElementById	("div-input"));
	}
	save(){
		var note = this;
		$.post("/save", {id_save: this.props.id, content_save: this.refs.edit.value}, function(list){
			listnote.setState({list_note: list});
			note.setState({onEdit: false});
		})
	}
	cancel(){
		this.setState({onEdit: false});
	}
	render(){
		if(!this.state.onEdit){
			return (
			<div className="div-note">
				<img src="img/delete.png" id="delete" onClick={this.detete.bind(this)}/>
				<img src="img/edit.ico" id="edit" onClick={this.edit.bind(this)}/>
				<p>{this.props.children}</p>
			</div>
			)	
		}
		return (
			<div className="div-note">
				<img src="img/cancel.png" id="cancel" onClick={this.cancel.bind(this)}/>
				<img src="img/save.png" id="save" onClick={this.save.bind(this)}/>
				<div className="text-area"><textarea rows="2" ref="edit" defaultValue={this.props.children}/></div>
			</div>
		)
	}
}
function addInputDiv(){
	if(document.getElementById("empty-content")){
		document.getElementById("empty-content").innerHTML = "";
	}
	ReactDOM.render(
		<InputDiv/>,
		document.getElementById("div-input")
	)
}
class ListNote extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			list_note: []
		}
		listnote = this;
	}

	render(){
		if(!this.state.list_note.length){
			return (
			<div>
			<div className="header">
				<p id="header">Note Management System</p>
			</div>
			<div className="div-list">
			<div id="div-input"></div>
			</div>
			<div className="empty-list">
				<p id="empty-content">
					Your do not have any notes here. 
					Click add button to create one.
				</p>
			</div>
			<img src="img/add.png" id="add" onClick={addInputDiv}/>	
			</div>
			)	
		}
		return(
			<div>
			<div className="header">
				<p id="header">Note Management System</p>
			</div>
			<div className="div-list">
				<p/>
				<div id="div-input"></div>
				{
					this.state.list_note.map(function(note, index){
						return <Note id={index} key={index}>{note}</Note>
					})
				}
				<p/>
			</div>
			<img src="img/add.png" id="add" onClick={addInputDiv}/>	
			</div>
		)
	}
	componentDidMount(){
		var that = this;
		$.post("/getNotes", function(list){
			that.setState({list_note: list})
		})
	}

}

class InputDiv extends React.Component{
	constructor(props){
		super(props);
	}
	cancel(){
		ReactDOM.unmountComponentAtNode(document.getElementById	("div-input"));
		if(document.getElementById("empty-content")){
			document.getElementById("empty-content")
			.innerHTML = "Your do not have any notes here. Click add button to create one.";
	}
	}
	add(){
		if(this.refs.note.value != ""){
			$.post("/add", {content: this.refs.note.value}, function(list){
				listnote.setState({list_note: list});
			})
		} else {
			if(document.getElementById("empty-content")){
				document.getElementById("empty-content")
				.innerHTML = "Your do not have any notes here.Click add button to create one.";
	}
		}
		ReactDOM.unmountComponentAtNode(document.getElementById	("div-input"));
	}
	render(){
		return(
			<div className="div-note">
				<img src="img/cancel.png" id="cancel" onClick={this.cancel.bind(this)}/>
				<img src="img/save.png" id="save" onClick={this.add.bind(this)}/>
				<div className="text-area"><textarea autoFocus rows="2" ref="note" defaultValue={this.props.children}/></div>
			</div>
		)
	}

}
ReactDOM.render(
	<div>
		<ListNote/>
	</div>,
	document.getElementById("root")
);