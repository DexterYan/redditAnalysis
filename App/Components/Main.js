var React = require('react-native');
var { Icon, } = require('react-native-icons');
var api = require('../Utils/Api');
var Dashboard = require('./Dashboard');

var {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    marginTop: 25,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5f99cf'
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  facebook: {
    width: 70,
    height: 70,
    margin: 10
  }
});

class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            subreddit: '',
            threshold: '',
            isLoading: false,
            error: false
        }
    }
    handleSubredditChange(event) {
        this.setState({
            subreddit: event.nativeEvent.text
        })
    }
    handleVoteChange(event) {
        this.setState({
            threshold: event.nativeEvent.text
        })
    }
    handleSubmit() {
        this.setState({
            isLoading: true
        })
        api.getAnalytic(this.state.subreddit, this.state.threshold)
            .then((res) => {
                console.log(res);
                this.setState({
                    isLoading: false
                })
                this.props.navigator.push({
                    title: 'Reddit Analytic',
                    component: Dashboard,
                    passProps: {analytic: res}
                })
            })
    }
    render() {
        return(
            <View style={styles.mainContainer}>
                <Icon name='fontawesome|reddit-square' size={70} color='#3b5998' style={styles.facebook}/>
                <Text style={styles.title}>Which subreddit are you interested in</Text>
                <TextInput
                    style= {styles.searchInput}
                    value = {this.state.subreddit}
                    onChange= {this.handleSubredditChange.bind(this)}/>
                <Text style={styles.title}>Select a minimum vote value </Text>
                <TextInput
                    style= {styles.searchInput}
                    keyboardType= 'numeric'
                    value = {this.state.threshold}
                    onChange= {this.handleVoteChange.bind(this)}/>
                <TouchableHighlight
                    style= {styles.button}
                    onPress= {this.handleSubmit.bind(this)}
                    underlayColor="white">
                    <Text style={styles.buttonText}> SEARCH </Text>
                </TouchableHighlight>
                <ActivityIndicatorIOS
                    animating={this.state.isLoading}
                    color= '#111'
                    size= 'large'></ActivityIndicatorIOS>
            </View>
        )
    }
};

module.exports = Main;