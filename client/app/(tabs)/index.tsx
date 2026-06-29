import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Conversation, UserStory } from '@/types'
import { useRouter } from 'expo-router';
import { dummyConversationData } from '@/assets/assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/assets/styles/MessagesScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { TextInput } from 'react-native-gesture-handler';
import StoryBar from '@/components/storyBar';
import StoryView from '@/components/StoryView';
import Convo from '@/components/Convo';


export default function MessagesScreen() {

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedStory, setSelectedStory] = useState<UserStory | null>(null);

  const router = useRouter();

  const fetchConversation = () =>{
    setLoading(true)
    setTimeout(() =>{
      setConversations(dummyConversationData as any)
      setLoading(false)
    }, 1000)
  }

  useEffect(() =>{
    fetchConversation()
  },[])

  const lowerSearch = search.toLowerCase()
  const filter = search ? conversations.filter(
    (c)=> c.participant?.name.toLowerCase().includes(lowerSearch)
    || c.participant?.handle.toLowerCase().includes(lowerSearch)
  ) : conversations;

  const openConvo = (c: Conversation)=>{
    router.push(`/chat/$(c._id)`)
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>

      {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Nexus chat</Text>
          <View style={styles.headerRight}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{conversations.length}</Text>
            </View>
          </View>
        </View>

     {/* Search */}
      <View style={styles.searchRow}>
        <Ionicons name='search' size={16} color={Colors.outlineVariant}/>
      <TextInput style={styles.searchInput}
      value={search}
      onChangeText={setSearch}
      placeholder='Search...'
      placeholderTextColor={Colors.outlineVariant}/>
      {search.length > 0 && (
        <TouchableOpacity onPress={()=> setSearch("")}>
          <Ionicons name='close-circle' size={16} 
          color={Colors.outlineVariant}/>
        </TouchableOpacity>
      )}

      </View>

      {/* Story */}
      <StoryBar onViewStory={(us)=> setSelectedStory(us)}/>

        {selectedStory && <StoryView userStory={selectedStory}
         onClose={()=> setSelectedStory(null)}/>}

       {/* Diveder */}
       <View style={styles.divider}/>


        {/* Conve list */}
        {loading ? (
          <ActivityIndicator style={{marginTop: 40}} color={Colors.primary}/>
        ) : (
          <FlatList 
          data={filter}
          keyExtractor={(c)=> c._id}
          contentContainerStyle={styles.listContent}
          renderItem={({item})=> <Convo convo={item} selected={false}
          onPress={()=> openConvo(item)}/>}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name='chatbubbles-outline' size={44}
              color={Colors.outlineVariant}/>
              <Text style={styles.emptyTitle}>No conversation yet</Text>
              <Text style={styles.emptySubtitle}>Find a friend to start chatting</Text>
            </View>
          }
          />
        )}


    </SafeAreaView>
  )
}
