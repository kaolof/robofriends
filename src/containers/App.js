import React, {Component} from 'react';
import CardList from '../components/CardList';
import SerachBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
import '../index.css'
import './app.css'

const state = {
   
}

class App extends Component{
    constructor(){
        super()
        this.state={
            robots: [],
            searchField: ''
        }
    }
    
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            return response.json();
        })
        .then(users=>{
            this.setState({robots: users})
        })
        
    }

    onSearchChange=(event)=>{
        this.setState({searchField: event.target.value})


    }

    render(){
        const {robots,searchField}=this.state;
        const filteredRobots= robots.filter(robot=>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        //operador ternario
        return !robots.length? 
        <h1 className='tc'>Loading...</h1> :
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SerachBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots}/> 
                    </ErrorBoundry>
                </Scroll>
                
            </div>
            
        )
    }
}

export default App;