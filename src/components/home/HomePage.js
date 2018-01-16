import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import * as queueActions from '../../actions/queueActions';
import ReactPaginate from 'react-paginate';
import Pagination from './Pagination';

class HomePage extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
            queue :[{title:""
        }],
        displayItem:[{title:""}],
        inputenable:true
        };
        this.onTitleChange=this.onTitleChange.bind(this); 
        this.onClickSave=this.onClickSave.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        
    }
   
// update the new page item from child and set the input enable or disable
onChangePage(pageOfItems,enable) {
        this.setState({displayItem:pageOfItems})
        this.setState({inputenable:enable});
    }

// save the input value to state
onTitleChange(event)
{
    
    const queue=this.state.queue;
    queue.title=event.target.value;
    
    this.setState({queue:queue});
}
//disptach the action
onClickSave()
{
    var pass = this.state.queue.title;
    var reg = /^[A-Za-z0-9]+/;
    var test = reg.test(pass); 
    if(test){
this.props.dispatch(queueActions.SavetoQueue(this.state.queue));
alert(`saved ${this.state.queue.title}`);
this.setState({inputenable:false});
}
else{
    alert("Not valid entry");
}
}

// display the pagination value (output value)
courseRow (queue,index){
    return <div className="output" key={index}> <p > 
        <br/>
        <br />  
    {queue.title} </p>
    </div>;
}

render()
{
return(
<div>
    <div className="form-group col-sm-2">  
  {this.state.displayItem.map(this.courseRow)}

  <br />
  <br />     
    <h6>Enter a Number or Character</h6> <br/>
             
    <input type="text" name="text" disabled={this.state.inputenable === false ? 'disabled' : ''}
    onChange={this.onTitleChange} className="form-control" pattern="[a-z]{1,15}" 
    value={this.state.displayItem.title } required />
    <br/>
   
    <input type="submit" disabled={this.state.inputenable === false ? 'disabled' : ''}
    value="save" className="btn btn-primary btn-lg" 
    onClick={this.onClickSave} />
    <br/>
    <br/>
    <Pagination items={this.props.queues} onChangePage={this.onChangePage} />
    </div>
    
   
    <div>
    </div>
    </div>

    );
}

}

HomePage.propTypes={
    dispatch :PropTypes.func.isRequired,
    queues:PropTypes.array.isRequired
};

function mapStateToProps(state,ownProps){
    return {
        queues:state.queues
    };
}

export default connect(mapStateToProps)(HomePage);
