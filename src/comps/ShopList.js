import React, { Component } from 'react';
import axios from "axios"
import { Button, Segment, Image, Grid } from 'semantic-ui-react'
import Header from "./Header"
import _ from "lodash"
import moment from "moment"

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
    constructor(props){
        super(props)
        this.state={
            shop:{},
        }
        this.removeShop=this.removeShop.bind(this)
        this.likeShop=this.likeShop.bind(this)
        this.dislikeShop=this.dislikeShop.bind(this)


    }

    dislikeShop(){

        // Use the local storage to save the disliked shops list as a String
        // Get the current list and add the new disliked shop to it 
        const currentList = JSON.parse(localStorage.getItem("DislikeList"))
        var dislikeList = []
        const shopId = this.props.shop._id
        var time = moment(new Date())

        if(currentList){

            // add the previous liked shops to the list
            // if the list is empty make a new one
            // check if the new disliked shop already exists and add accordingly
            dislikeList.push(...currentList)

            var shopExists=false
            currentList.map((m,i)=>{
                if(m.id === this.props.shop._id){
                    shopExists=true
                }
            })

            if(!shopExists){
                dislikeList.push({id:shopId,at:time})

            }
            




        }else{
            dislikeList.push({id:shopId,at:time})
        }

        this.props.handleupdate(this.props.shop)

        localStorage.setItem("DislikeList",JSON.stringify(dislikeList))

    }
    likeShop(){
        const likedArray = this.props.shop.likes
        const userEmail = this.props.userEmail

        // Update the likes list
        var userExist = false

        likedArray.map((n,i)=>{
            if(n === userEmail){
                userExist=true
            }
        })

        
        if(!userExist){
            likedArray.push(userEmail)
            console.log("liked",userExist)

            
        }


        const body = {
            likes:likedArray
        }
        axios.put(`http://localhost:3001/api/shop/${this.props.shop._id}`,body)
            .then((res)=>{
            
                // remove shop from the list
                this.props.handleupdate(this.props.shop)
    
        })
        .catch((err)=>{
              console.log(err);
              
        })
        

    }

    removeShop(){
        const likedArray = this.props.shop.likes
        const userEmail = this.props.userEmail

        // Update the likes list
        likedArray.map((n,i)=>{
            if(n === userEmail){
                likedArray.splice(i,1)
            }
        })


        const body = {
            likes:likedArray
        }
        axios.put(`http://localhost:3001/api/shop/${this.props.shop._id}`,body)
            .then((res)=>{
            
                // remove shop from the list
                this.props.handleupdate(this.props.shop)
    
        })
        .catch((err)=>{
              console.log(err);
              
        })
        

    }
    render(){
        //Shop item for nearby shops
        const ShopItem = (
            <Segment style={styles.card}>
                <h3 style={{marginBottom:10}}>{this.props.shop.name}</h3>
                <Image style={styles.thumb} src={this.props.shop.imageUrl} />
                <div style={styles.buttons}>
                    <Button color="red" onClick={this.dislikeShop}>Dislike</Button>
                    <Button color="green" onClick={this.likeShop}>Like</Button>
                </div>
            </Segment>
        )
        // Shop item for the preferred shops
        const PrefShopItel = (
            <Segment style={styles.card}>
                <h3 style={{marginBottom:10}}>{this.props.shop.name}</h3>
                <Image style={styles.thumb} src={this.props.shop.imageUrl} />
                <div style={styles.buttons}>
                    <Button color="red" onClick={this.removeShop}>Remove</Button>
                </div>
            </Segment>
        )

       return (
        <Grid.Column >
                {this.props.path ==="/nearby-shops"?ShopItem:PrefShopItel}
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

        this.updateRemovedOrLikedShops=this.updateRemovedOrLikedShops.bind(this)

    }

    updateRemovedOrLikedShops(shop){

        const currentShopsList = this.state.shopsList
        const index = _.findIndex(currentShopsList, (shopId)=> shopId._id=== shop._id)
        console.log("shop index",index)

        currentShopsList.splice(index,1)

        this.setState({
            shopsList:currentShopsList
        })
    }

    updateShopList(shopslist,pathname){
            // calculate distance from shop to user
            shopslist.map((m)=>{
                m.distance=getDistanceFromLatLonInKm(m.lat,m.lng,this.state.userLat,this.state.userLng)
                //shops.push(m)
            })

            // add the liked shops and main shops lists variables
            const likedShops = []
            const mainShopList =[]

            // get likes shops from the main list
            shopslist.map((m,i)=>{
                // if the current path is nearby shops
                // check if the user email is included in the likes and remove the shops
                // if the current path is preferred shops
                // display only liked shops

                // check if the shop is liked by the user
                var userExists=false
                var shopDisliked=false
                m.likes.map((n,j)=>{
                    if(n === this.state.userEmail){
                        userExists=true
                    }
                })

                // check if the shop is disliked by the user
                // if the disliking act is less than 120 hours, hide it
                // if it's more than 120 minutes restore the shop to the main list
                const currentList = JSON.parse(localStorage.getItem("DislikeList"))
                if(currentList){
                    currentList.map((n,j)=>{
                        if(n.id === m._id){
                            const shopTime= moment(n.at)
                            const now = moment(new Date())
                            const duration = moment.duration(now.diff(shopTime)).asMinutes()
                            if(duration>=120){
                                currentList.pop(j)
                                localStorage.setItem("DislikeList",JSON.stringify(currentList))
    
                            }else{
                                shopDisliked=true
    
                            }
    
                        }
    
                    })

                }
                

                // if the user likes the shop add it to the likedshops list
                // if not add it to the main shops list 
                if(userExists){
                    likedShops.push(shopslist[i])

                }else{
                    if(!shopDisliked){
                        mainShopList.push(shopslist[i])
                    }

                }



  
            })
            if(pathname ==="/nearby-shops"){
                // add the shops list to the state 
                this.setState({
                    shopsList:_.sortBy(mainShopList, "distance"),  // sort the list by distance
                    shops:shopslist

                })

            }else if(pathname ==="/my-prefered-shops"){
                // add liked shops to the state
                this.setState({
                    shopsList:_.sortBy(likedShops, "distance"), // sort the list by distance
                    shops:shopslist
                })
            }
            
            
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
            //this.setState({shops:res.data.data})
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
                <ShopItem key={i} shop={m} userEmail={this.state.userEmail} path={this.state.pathName} handleupdate={this.updateRemovedOrLikedShops}/>
            )
        })



        // render shops list component
        return (
            <div>
                <Header />
                <div style={styles.shopList} >
                    {
                        <Grid style={{width:"60%"}} centered columns={4}>
                            {this.state.shopsList.length>0?list:<h1 style={{color:"#085394"}}>No shop found</h1>}
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
  