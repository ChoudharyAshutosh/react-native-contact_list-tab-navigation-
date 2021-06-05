import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native'
import { fetchContacts } from '../utils/api'
import ContactThumbnail from '../components/ContactThumbnail'
import store from '../store'
const keyExtractor=({phone})=>phone
export default function Favourites({navigation}){
    const [state, setState]=useState({
        contacts:store.getState().contacts,
        loading:store.getState().isFetchingContacts,
        error:store.getState().error
    })
    useEffect(()=>{
        (async()=>{
            const {contacts}=state
            Favourites.unsubscribe=store.onChange(()=>
                setState({
                    contacts:store.getState().contacts,
                    loading:store.getState().isFetchingContacts,
                    error:store.getState().error
                })
            )
            if(contacts.length==0){
                const fetchedContacts=await fetchContacts()
                store.setState({contacts:fetchContacts, isFetchingContacts:false})
            }
        })()
        return ()=>{
            Favourites.unsubscribe()
        }
    },[])
    const renderContact=({item})=>{
        const {name, avatar, phone}=item
        return <ContactThumbnail avatar={avatar} onPress={()=>navigation.navigate('Profile',{name:name,contact:item})}/>
    }
    const {loading, contacts, error}=state
    const favourites=contacts.filter(contact=>contact.favorite);
    return(
        <View style={styles.container}>
            {loading && <ActivityIndicator size='large'/>}
            {error && <Text>Error...</Text>}
            {!loading && !error &&
                (
                    <FlatList data={favourites} numColumns={3} contentContainerStyle={styles.list} keyExtractor={keyExtractor} renderItem={renderContact}/>
                )
            }
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        justifyContent:'center',
        flex:1
    },
    list:{
        alignItems:'center'
    }
})