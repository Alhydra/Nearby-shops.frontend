import React, { Component } from 'react';
import axios from "axios"
import { Button, Segment, Image, Grid } from 'semantic-ui-react'


// List Item layout component
class ShopItem extends Component{
    render(){
       return (
        <Grid.Column >
            <Segment style={styles.card}>
                <h3 style={{marginBottom:10}}>{this.props.shop.name}</h3>
                <Image style={styles.thumb} src={this.props.shop.imageUrl} />
                <div style={styles.buttons}>
                    <Button color="red">Dislike</Button>
                    <Button color="green">Like</Button>
                </div>
            </Segment>
        </Grid.Column>
        
       )
    }
 }

// Shops list general component
class ShopList extends Component {

    constructor(props){
        super(props)

        // initialise initial state
        this.state={
            shops:[]
        }
    }

    componentWillMount(){

        // get shops list from the server
        const token= localStorage.getItem("MyToken")
        const header = {
            headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8','x-access-token':token }
        }
        axios.get("http://localhost:3001/api/shop",header)
            .then((res)=>{
            
            // add the shops list to the state 
            this.setState({
              shops:res.data.data
            })
              
            })
            .catch((err)=>{
              console.log(err);
              
            })

    }
    render() {
        // generate shops list card items based on state data
        const list = this.state.shops.map((m,i)=>{
            return(
                <ShopItem key={i} shop={m} />
            )
        })

        // render shops list component
        return (
            <div style={styles.shopList} >
                {
                    <Grid style={{width:"60%"}} centered columns={4}>
                        {list}
                    </Grid >
                
                }
            </div>
        );
    }
}


// CSS styles object

const styles = {
    shopList:{
    padding:20,
    display:"flex",
    justifyContent:"center"
  },
  thumb:{
      width:200,
      height:200,
      marginBottom:10
  },
  card:{
      width:220,
      marginRight:20
  },
  buttons:{
      display:"flex",
      justifyContent:"center"
      
  }
}
  
export default ShopList;
  