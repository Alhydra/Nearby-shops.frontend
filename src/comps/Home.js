import React, { Component } from 'react';
import { Button, Segment, Form, Message } from 'semantic-ui-react'
import axios from "axios"

// Login and SignUp component
class LogInForm extends Component{

    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            errMsgVisible:false,
            errMsg:"error"
            
        }

        this.handleChange = this.handleChange.bind(this)

    }

    // handle keyboard input change
    handleChange = (e) => {
        e.persist()
        const {name,value} = e.target
        this.setState({[name]:value})
    }

    // Login
    Login=()=>{
        const {email,password} = this.state
        console.log(email,password)
        
        const body={
            email,
            password
        }

        // hide error message
        this.setState({errMsgVisible:false})

        axios.post("http://localhost:3001/auth",body)
        .then((res)=>{

            if(res.data.success){
                this.setState({errMsgVisible:false})

                //save roke, and user coordinates to local storage
                localStorage.setItem("MyToken",res.data.token)
                localStorage.setItem("Userlat",res.data.coord.lat)
                localStorage.setItem("UserLng",res.data.coord.lng)
                window.location = 'http://localhost:3000/nearby-shops';

            }else{
                // display error message
                this.setState({
                    errMsgVisible:true,
                    errMsg:res.data.message
                })
            }


        
        })
        .catch((err)=>{
            console.log(err);
            
        })

    }

    render(){
        const {email,password} = this.state


        // error message component
        const errMsg = (<Message
            onDismiss={this.handleDismiss}
            error
            header={this.state.header}
            content={this.state.errMsg}
          />)

       return (
           <div>
               {this.state.errMsgVisible?errMsg:null}
               <Form style={styles.LoginArea}>
                    <Form.Field>
                    </Form.Field>
                    <Form.Field>
                    <label>Email</label>
                    <input placeholder="123@mail.com"  name="email" value={email} onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                    <label>Password</label>
                    <input placeholder="password" type="password" name="password" value={password} onChange={this.handleChange}/>
                    </Form.Field>
                    <Button type="submit" onClick={this.Login}>Login</Button>
                    <Button type="submit">Sign up</Button>

                </Form>
        

           </div>
        
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

