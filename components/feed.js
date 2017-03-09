import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  RefreshControl,
  Image,
  Dimensions
} from 'react-native';
var width = Dimensions.get('window').width;
var feedData = require('./feedData');
const ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


import TopBar from './topBar';
export default class Feed extends Component {
  constructor(props) {
    super(props);
    
    this.state = {

      feedData:ds1.cloneWithRows([]),
      loading:true,
      refreshing:false
    };
  }

  componentDidMount(){
    this.setState({
      feedData: ds1.cloneWithRows(feedData),
      loading:false 
    })
    console.log("listo")
  }


   renderFeed(data){
    
      if(this.state.loading){
        return(
           <Text>Loading</Text>
          )
      }else{
        return(
          <View style={styles.container}>
             <ListView
             	style={styles.listView}	 
                initialListSize={5}
                enableEmptySections={true}
                dataSource={data}
                renderRow={this._renderRow.bind(this)}
                refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh.bind(this)}
                    />
                  }
                
                
              />
          </View>
          ) 
      }

    }

    _renderRow(rowData, rowID, sectionID, highlightRow){
     
    return(
      <View style={styles.container}>
      <View style={{ justifyContent: 'center',
    alignItems: 'center'}}>
           <Text>{rowData.username}</Text>
          <Image
            style={styles.picture}
            source={rowData.picture} 
           />
          
         
      </View>
           <Image
             style={styles.media}
            source={rowData.media}
           />
          
      </View>
      )
  }
  _onRefresh(){}


  render() {
    console.log(feedData)
        return (
        <View style={styles.container}>
       <TopBar />
       {this.renderFeed(this.state.feedData)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  listView:{
  	marginTop:0,
  	marginBottom:70,
  	width:width
  },
  picture:{
  	width:60,
  	height:60,
  	borderRadius:30
  },
  media:{
  width:width,
  height:width
  }
});


