var React = require('react-native');
var RNChart = require('react-native-chart-justinmakaila');
var Main = require('./Main');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight
} = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5f99cf'
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff'
    },
    secondTitle: {
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        color: '#fff'
    },
    description: {
        marginTop:20,
        fontSize: 16,
        textAlign: 'center',
        color: '#fff'
    },
    chart: {
        marginTop: 10,
        height: 200,
        width: width - 20,
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
    }
});

class DailyDashboard extends React.Component{
    DailyChart() {
        return [{
            name:'BarChart',
            type:'bar',
            color:'gray',
            widthPercent:0.5,
            data:this.props.analytic.daily.datasets[0].data
        }]
    }
    DailyChartLabels() {
        var self = this;
        var tempLabels = [];
        this.props.analytic.daily.labels.forEach(function (v,i) {
            if ( i%2 ) {
                tempLabels[i] = '';
            } else {
                tempLabels[i] = v.split(':')[0];
            }
        })
        return tempLabels;
    }
    maxVote() {
        return Math.max.apply(Math, this.props.analytic.daily.datasets[0].data);
    }
    bestTime() {
        console.log(this.maxVote());
        var index = this.props.analytic.daily.datasets[0].data.indexOf(this.maxVote());
        console.log(index);
        return this.props.analytic.daily.labels[index];
    }
    handleSubmit() {
        this.props.navigator.popToTop();
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Top Posts by Day</Text>
                <Text style={styles.secondTitle}>(Your local time)</Text>
                <RNChart style={styles.chart}
                    chartData={this.DailyChart()}
                    verticalGridStep="3"
                    xLabels={this.DailyChartLabels()}>
                </RNChart>
                <Text style={styles.description}>Reddit Analytics analysed {this.props.analytic.daily.count} posts, recommand the best day is within {this.bestTime()}</Text>
                <TouchableHighlight
                    style= {styles.button}
                    onPress= {this.handleSubmit.bind(this)}
                    underlayColor="white">
                    <Text style={styles.buttonText}> ANOTHER SEARCH</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

DailyDashboard.propTypes = {
    analytic: React.PropTypes.object.isRequired,
}

module.exports = DailyDashboard;