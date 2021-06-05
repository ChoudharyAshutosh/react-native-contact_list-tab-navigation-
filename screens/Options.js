import React,{useLayoutEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DetailListItem from '../components/DetailListItem';
import colors from '../utils/colors';
export default function Options({navigation}){
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Options',
            headerLeft:()=>(
                <MaterialIcons name="close" size={24} style={{color: colors.black, marginLeft: 10}} onPress={()=>navigation.goBack()}/>
            )
        })
    },[])
    return (
        <View style={styles.container}>
            <DetailListItem title="Update Profile" />
            <DetailListItem title="Change Language" />
            <DetailListItem title="Sign Out" />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: 'white',
    },
});