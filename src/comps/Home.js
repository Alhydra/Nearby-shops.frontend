import React, { Component } from 'react';
import { Button, Segment, Form, Grid } from 'semantic-ui-react'

// Login and SignUp component
class LogInForm extends Component{

    constructor(props){
        super(props)
        this.state={
            email:"",
            password:""
        }

        this.handleChange = this.handleChange.bind(this)

    }

    // handle keyboard input change
    handleChange = (e) => {
        e.persist()
        const {name,value} = e.target
        this.setState({[name]:value})
    }

    render(){
        const {email,password} = this.state

       return (
        <Form style={styles.LoginArea}>
            <Form.Field>
            <label>Email</label>
            <input placeholder="123@mail.com"  name="email" value={email} onChange={this.handleChange}/>
            </Form.Field>
            <Form.Field>
            <label>Password</label>
            <input placeholder="password" type="password" name="password" value={password} onChange={this.handleChange}/>
            </Form.Field>
            <Button type="submit">Login</Button>
            <Button type="submit">Sign up</Button>

        </Form>
        
       )
    }
}



class Home extends Component{
    render(){
       return (
        <div style={styles.main}>
            <Segment>
                <LogInForm />
            </Segment>
        </div>
        
       )
    }
}

const styles = {
    main:{
        height:"100%",
        backgroundColor:"#eee",
        padding:"20%"
    },
    LoginArea:{
    }
}
export default Home;

