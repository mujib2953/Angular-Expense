import React                                from 'react';
import { 
    ActivityIndicator,
    StyleSheet,
    View }                                  from 'react-native';

export default class Loader extends React.Component {
    render() { 
        return (
            <View style={ styles.container }>
                <ActivityIndicator size="large" color="#FF0000" />
            </View>
        )  
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        opacity: 0.5,
        justifyContent: 'center'
    },
    horzontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});