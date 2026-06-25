import { View, Text, ScrollView, Touchable, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { dummyUserProfile } from '@/assets/assets'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/assets/styles/ProfileScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Avatar from '@/components/Avatar';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

export default function profile() {

  const { auth } = {auth: {user: dummyUserProfile}}

  const user = auth.user;
  const [edit, setEdit] = useState(false)
  const [profileName, setProfileName] = useState(auth.user?.name || "")
  const [profileHandle, setProfileHandle] = useState(auth.user?.handle || "")
  const [profileBio, setProfileBio] = useState(auth.user?.bio || "")
  const [avatarUri, setAvatarUri] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const displayAva = avatarUri || user?.avatar

  const pickAva = async () => {
    const { status } = await ImagePicker.
    requestMediaLibraryPermissionsAsync();

    if(status !== 'granted'){
      Alert.alert("Permission needed",
        "Allow access to your photos to change avatar")
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      allowsEditing: true,
      aspect: [1,1]
    });
    if(!result.canceled && result.assets[0]){
      setAvatarUri(result.assets[0].uri)
    }
  }

  const saveProfile = async () =>{
    setLoading(true)
    setTimeout(()=>{
      setEdit(false)
      setAvatarUri(null)
      setLoading(false)
    }, 2000)
  }

  const handleLogout = async () =>{
    Alert.alert("Log out", "Are you sure you want to log out?", [
      {text: "Cancel", style: "cancel"},
      {text: "Log out", style: "destructive", onPress: ()=>{

      }}
    ])
  }



  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          {!edit && (
            <TouchableOpacity style={styles.editBtn} onPress={
              ()=> setEdit(true)
            }>
              <Ionicons name='pencil' size={16} color={Colors.primary}/>
              <Text style={styles.editBtnText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* avatar */}
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={edit ? pickAva : undefined}
          activeOpacity={edit ? 0.7 : 1}>
            <View style={styles.avatarWrapper}>
              <Avatar name={user?.name || "?"} src={displayAva} size={100}/>
              {edit && (
                <View style={styles.cameraOverlay}>
                  <Ionicons name='camera' size={22} color='fff'/>
                </View>
              )}
            </View>
          </TouchableOpacity>
          {!edit && (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userHandle}>{user?.handle}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              {user?.bio && <Text style={styles.userBio}>{user?.bio}</Text>}
              
            </View>
          )}
        </View>


        {/* edit form */}
          {edit && (
            <View style={styles.form}>
              {/* Name */}
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Name</Text>
                <TextInput
                style={styles.input}
                value={profileName}
                onChangeText={setProfileName}
                placeholder='Your name'
                placeholderTextColor={Colors.outlineVariant}
                autoCapitalize='words'
                />
              </View>
              {/* Handle */}
                <View style={styles.field}>
                <Text style={styles.fieldLabel}>Username</Text>
                <View style={styles.handleRow}>
                <Text style={styles.atSign}>@</Text>
                <TextInput
                style={[styles.input, styles.handleInput]}
                value={profileHandle}
                onChangeText={(v)=>setProfileHandle(v.toLowerCase()
                .replace(/\s/g, ""))}
                placeholder='username'
                placeholderTextColor={Colors.outlineVariant}
                autoCapitalize='none'
                />
                </View>
                
              </View>
              {/* Bio */}
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Bio</Text>
                <TextInput
                style={[styles.input, styles.bioInput]}
                value={profileBio}
                onChangeText={setProfileBio}
                placeholder='Tell us about yourself...'
                placeholderTextColor={Colors.outlineVariant}
                multiline
                numberOfLines={3}
                />
              </View>
              {/* Save Bottom */}
              <TouchableOpacity onPress={saveProfile} disabled={loading}
              style={styles.saveWrapper}
              activeOpacity={0.88}
              >
                <LinearGradient 
                colors={[Colors.primary, Colors.primaryContainer]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.saveBtn}>

                {loading ? (
                  <ActivityIndicator color={Colors.primary}/>
                ) : (
                  <Text style={styles.saveBtnText}>Save changes</Text>
                )}
                

                </LinearGradient>
              </TouchableOpacity>

              {/* Cancel Button */}
              <TouchableOpacity style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>Cancel</Text>

               
              </TouchableOpacity>
            </View>
          )}

        {/* profile Options */}
        {!edit && (
          <View style={styles.optionsSection}>
            <TouchableOpacity style={styles.optionRow}>
              <View>
                <Ionicons name='settings-outline' size={20} color={
                  Colors.onSurfaceVariant
                }/>
              </View>
              <Text style={styles.optionText}> Settings</Text>
              <Ionicons name='chevron-forward' size={16} color={
                Colors.outlineVariant
              }/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionRow}>
              <View>
                <Ionicons name='notifications-outline' size={20} color={
                  Colors.onSurfaceVariant
                }/>
              </View>
              <Text style={styles.optionText}> Notifications</Text>
              <Ionicons name='chevron-forward' size={16} color={
                Colors.outlineVariant
              }/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionRow}>
              <View>
                <Ionicons name='lock-closed-outline' size={20} color={
                  Colors.onSurfaceVariant
                }/>
              </View>
              <Text style={styles.optionText}> Privacy & Security</Text>
              <Ionicons name='chevron-forward' size={16} color={
                Colors.outlineVariant
              }/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionRow}>
              <View>
                <Ionicons name='help-circle-outline' size={20} color={
                  Colors.onSurfaceVariant
                }/>
              </View>
              <Text style={styles.optionText}> Help & Support</Text>
              <Ionicons name='chevron-forward' size={16} color={
                Colors.outlineVariant
              }/>
            </TouchableOpacity>
          </View>
        )}

        {/* sign out */}

        <View style={styles.signOutSection}>
          <TouchableOpacity style={styles.signOutBtn}
          onPress={handleLogout}>
            <Ionicons name='log-out-outline' size={18}
            color={Colors.error}/>
            <Text style={styles.signOutText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}