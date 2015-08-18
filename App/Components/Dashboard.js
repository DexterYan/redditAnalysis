var React = require('react-native');
var RNChart = require('react-native-chart-justinmakaila');
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
    chart: {
        marginTop: 10,
        height: 200,
        width: width - 20,
    }
});

var chartData = [
    {
        name:'BarChart',
        type:'bar',
        color:'purple',
        widthPercent:0.6,
        data:[
            30, 1, 1, 2, 3, 5, 21, 13, 21, 34, 55, 30
        ]
    }
];


class Dashboard extends React.Component{
    HourlyChart() {
        return [{
            name:'BarChart',
            type:'bar',
            color:'gray',
            widthPercent:0.5,
            data:this.props.analytic.hourly.datasets[0].data
        }]
    }
    HourlyChartLabels() {
        var self = this;
        this.props.analytic.hourly.labels.forEach(function (v,i) {
            if ( i%4 && i !== 23) {
                self.props.analytic.hourly.labels[i] = '';
            } else {
                self.props.analytic.hourly.labels[i] = v.split(':')[0];
            }
        })
        return this.props.analytic.hourly.labels;
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Top Posts by Hour of Day (your local time)</Text>
                <RNChart style={styles.chart}
                    chartData={this.HourlyChart()}
                    verticalGridStep="3"
                    xLabels={this.HourlyChartLabels()}>
                </RNChart>
            </View>
        )
    }
}

module.exports = Dashboard;