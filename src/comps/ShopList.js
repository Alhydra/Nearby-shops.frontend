import React, { Component } from 'react';
import axios from "axios"
import { Button, Segment, Image, Grid } from 'semantic-ui-react'

// calculate distance between 2 coordinance and return distance in Km
const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2)=> {
    // Radius of the earth in km
    const R = 6371
    // deg2rad below
    const dLat = deg2rad(lat2-lat1)
    const dLon = deg2rad(lon2-lon1)
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
       
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    // Distance in km
    const d = R * c 
    return d
  }

// convert degree to radian
const deg2rad=(deg) =>{
    return deg * (Math.PI/180)
}


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

        console.log("user",this.props.user)
        // get shops list from the server
        const token= localStorage.getItem("MyToken")
        const header = {
            headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8','x-access-token':token }
        }
        axios.get("http://localhost:3001/api/shop",header)
            .then((res)=>{
            
            var shops=[]
            res.data.data.map((m)=>{
                m.distance=getDistanceFromLatLonInKm(m.lat,m.lng,this.props.user.lat,this.props.user.lng)
                shops.push(m)
            })
            
            // add the shops list to the state 
            this.setState({
              shops
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
  