import React, { Component } from 'react';
import axios from "axios"
import { Button, Segment, Image, Grid } from 'semantic-ui-react'
import Header from "./Header"
import _ from "lodash"

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
        const userLat = localStorage.getItem("userLat")
        const userLng = localStorage.getItem("userLng")
        const userEmail = localStorage.getItem("Email")

        this.state={
            shops:[],
            shopsList:[],
            userLat,
            userLng,
            userEmail,
            pathName: this.props.location.pathname
        }

        this.props.history.listen((location, action) => {
            console.log()
            this.setState({pathName:location.pathname})
            this.updateShopList(this.state.shops,location.pathname)
          })

    }

    updateShopList(shopslist,pathname){
            // calculate distance from shop to user
            var shops=[]
            shopslist.map((m)=>{
                m.distance=getDistanceFromLatLonInKm(m.lat,m.lng,this.state.userLat,this.state.userLng)
                shops.push(m)
            })


            // sort shops array by distance
            const sortedArray = _.sortBy(shops, 'distance')
            const likedShops = []


            // remove likes shops from the main list
            sortedArray.map((m,i)=>{
                // if the current path is nearby shops
                // check if the user email is included in the likes and remove the shops
                // if the current path is preferred shops
                // display only liked shops

                m.likes.map((n)=>{
                    if(n === this.state.userEmail){
                        console.log("likes",n,this.state.userEmail,i)
                        likedShops.push(sortedArray[i])
                        sortedArray.splice(i,1)
                    }
                })

                
                if(pathname ==="/nearby-shops"){
                    // add the shops list to the state 
                    console.log("nearby")
                    this.setState({
                        shopsList:sortedArray
                    })

                }else if(pathname ==="/my-prefered-shops"){
                    // add liked shops to the state
                    console.log("pref")

                    this.setState({
                        shopsList:likedShops
                    })
                }
                

                
            })

            console.log("sorted",sortedArray)
            console.log("liked",likedShops)
            
    }

    
    
    
    

    componentWillMount(){
        const token = localStorage.getItem('MyToken');

        if(!token){
            window.location = 'http://localhost:3000';

        }
        // get shops list from the server
        const header = {
            headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8','x-access-token':token }
        }
        axios.get("http://localhost:3001/api/shop",header)
            .then((res)=>{
            this.setState({shops:res.data.data})
            this.updateShopList(res.data.data,this.state.pathName)
            
            
            
              
            })
            .catch((err)=>{
              console.log(err);
              
            })

    }
    render() {
        
        // generate shops list card items based on state data
        const list = this.state.shopsList.map((m,i)=>{
            return(
                <ShopItem key={i} shop={m} />
            )
        })

        // render shops list component
        return (
            <div>
                <Header />
                <div style={styles.shopList} >
                    {
                        <Grid style={{width:"60%"}} centered columns={4}>
                            {list}
                        </Grid >
                    
                    }
                </div>
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
  