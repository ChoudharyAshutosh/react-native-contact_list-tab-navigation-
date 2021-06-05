import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Linking } from 'react-native'
import ContactListItem from '../components/ContactListItem'
import {fetchContacts} from '../utils/api'
import getURLParams from '../utils/getURLParams'
import store from '../store'
const keyExtractor=({phone})=>phone
export default function Contacts({navigation}){
    const [state, setState]=useState({
        contacts:store.getState().contacts,
        loading:store.getState().ifFetchingContacts,
        error:store.getState().error
    })
    useEffect(()=>{
        (async()=>{
            Contacts.unsubscribe=store.onChange(()=>
                setState({
                    contacts:store.getState().contacts,
                    loading:store.getState().isFetchingContacts,
                    error:store.getState().error
                })
            )
            const contacts=await fetchContacts()
            store.setState({contacts, isFetchingContacts:false})
            Linking.addEventListener('url', handleOpenUrl)
            const url=await Linking.getInitialURL()
           handleOpenUrl({url})
        })()
        return()=>{
            Linking.removeEventListener('url',handleOpenUrl)
            Contacts.unsubscribe()
        }
    },[])
    const handleOpenUrl=event=>{
        const {url}=event
        const params=getURLParams(url)
        if(params.name){
            const queriedContact=store.getState().contacts.find(contact=>
                contact.name.split(' ')[0].toLowerCase()==params.name.toLowerCase())
                if(queriedContact)
                    navigation.navigate('Profile', {name:queriedContact.name,contact:queriedContact})
        }
    }
    const renderContact=({item})=>{
        const {name, avatar, phone}=item
        return <ContactListItem name={name} avatar={avatar} phone={phone} onPress={()=>navigation.navigate('Profile',{name:name,contact:item})}/>
    }
    const {loading, contacts, error}=state
    const contactsSorted=contacts.sort((a,b)=>{
        a.name.localeCompare(b.name)
    })
    return(
        <View style={styles.container}>
            {loading && <ActivityIndicator size='large'/>}
            {error && <Text>Error...</Text>}
            {!loading && !error &&
                (
                    <FlatList data={contactsSorted} keyExtractor={keyExtractor} renderItem={renderContact}/>
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
    }
})