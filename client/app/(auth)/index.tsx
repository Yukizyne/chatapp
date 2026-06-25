import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '@/assets/styles/AuthScreen.styles'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import { SvgXml } from 'react-native-svg'
import { Ionicons } from "@expo/vector-icons"
 
type Mode = "login" | "register"

export default function AuthScreen() {
  const [mode, setMode] = useState<Mode>("login")
  const [name, setName] = useState("")
  const [handle, setHandle] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)

  const router = useRouter();

    const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() =>{
      setLoading(false)
      setVerifying(true)
    }, 1500)
   }

   const handleVerify = async () => {
    setLoading(true);
    setTimeout(() =>{
      setLoading(false)
      router.replace("/(tabs)")
    }, 1500)

   }

  const svgMarkup = `<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="35.003" cy="35.005" r="14.001" fill="#fff"/>
  <path d="M35.906.012A34.84 34.84 0 0 1 56.85 7.655c-4.245 2.367-7.243 6.7-7.765 11.766A20.93 20.93 0 0 0 35.003 14C23.403 14 14 23.403 14 35.003s9.404 21.003 21.003 21.003 21.003-9.404 21.003-21.003q-.001-.594-.034-1.18a15.2 15.2 0 0 0 8.306 2.455c2.025 0 3.957-.396 5.725-1.111l-.009.74c-.48 18.913-15.962 34.099-34.991 34.099l-.903-.012C15.486 69.523.483 54.52.012 35.906L0 35.003C0 15.67 15.671 0 35.003 0z" fill="#fff"/>
  </svg>`

  if(verifying){
    return (
      <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.kav} behavior={Platform.OS === "ios"
        ? "padding" : undefined}>
          <ScrollView contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          >
            {/* Logo */}
            <View style={styles.logoRow}>
              <LinearGradient colors={[Colors.primary,
                Colors.primaryContainer]} style={styles.logoBox}>
                  <SvgXml xml={svgMarkup}
                   width="50%" height="50%"/>
              </LinearGradient>
              <Text style={styles.appName}>Circle Chat</Text>
            </View>

            {/* Hero Text */}
            <Text style={styles.heading}>Verify Email</Text>
             <Text style={styles.subheading}>We have sent a 
              6-digit verification code to {email}.
             </Text>

             {/* Form */}
             <View style={styles.form}>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Verification Code</Text>
                <TextInput 
                  style={styles.input}
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  placeholder='Enter 6-digit code'
                  placeholderTextColor={Colors.outlineVariant}
                  autoCapitalize='none'
                  keyboardType='number-pad'/>
              </View>
              {/* Back to sign up */}
                <View style={styles.toggleRow}>
                  <Text style={styles.toggleText}>Did 
                    not receive a code?</Text>
                  <TouchableOpacity onPress={()=> setVerifying(false)}>
                    <Text style={styles.toggleLink}>Resend again</Text>
                  </TouchableOpacity>
                </View>
               {/* submit */}
               <TouchableOpacity onPress={handleVerify} disabled={loading} 
               activeOpacity={0.88} style={styles.btnWrapper}>
                <LinearGradient colors={[Colors.primary, 
                  Colors.primaryContainer]}
                  start={{x:0 , y:0}}
                  end={{x:1, y:1}}
                  style={styles.btn}>
                    {loading ? (
                      <ActivityIndicator color={Colors.onPrimary}
                      size="small"/>
                    ) : (
                      <>
                      <Text style={styles.btnText}>Verify Code</Text>
                      <Ionicons name='arrow-forward' size={18}
                      color={Colors.onPrimary}/>
                      </>
                    )}
                </LinearGradient>
               </TouchableOpacity>

             </View>
          </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.kav} behavior={Platform.OS === "ios"
        ? "padding" : undefined}>
          <ScrollView contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          >
            {/* Logo */}
            <View style={styles.logoRow}>
              <LinearGradient colors={[Colors.primary,
                Colors.primaryContainer]} style={styles.logoBox}>
                  <SvgXml xml={svgMarkup}
                   width="50%" height="50%"/>
              </LinearGradient>
              <Text style={styles.appName}>Circle Chat</Text>
            </View>

            {/* Hero Text */}
            <Text style={styles.heading}>{mode === "login" ? "Welcome back"
             : "Create account"}</Text>
             <Text style={styles.subheading}>{mode === "login" ?
              "Sign in to continue chatting"
             : "Fill in your details to get started"}</Text>

             {/* Form */}
             <View style={styles.form}>
              {mode === "register" && (
                <>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Full Name</Text>
                  <TextInput 
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder='Your name'
                  placeholderTextColor={Colors.outlineVariant}
                  autoCapitalize='words'/>
                </View>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Username</Text>
                  <View style={styles.handleRow}>
                    <Text style={styles.atSign}>@</Text>
                    <TextInput
                    style={[styles.input, styles.handleInput]}
                    value={handle}
                    onChangeText={(v)=>setHandle(v.toLowerCase().replace(
                      /\s/g, ""))}
                      placeholder='username'
                      placeholderTextColor={Colors.outlineVariant}
                      autoCapitalize='none'/>
                  </View>
                </View>
                </>
              )}

              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Email</Text>
                <TextInput 
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder='you@example.com'
                  placeholderTextColor={Colors.outlineVariant}
                  autoCapitalize='none'
                  keyboardType='email-address'/>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Password</Text>
                <TextInput 
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder='••••••••'
                  placeholderTextColor={Colors.outlineVariant}
                  secureTextEntry={true}
                  />
              </View>

               {/* Toggle mode */}
               <View style={styles.toggleRow}>
                <Text style={styles.toggleText}>
                  {mode === "login" ? 
                  "Don't have an account? " 
                  : "Already have an account? "}
                </Text>
                <TouchableOpacity onPress={()=> setMode(mode ===
                  "login" ? "register" : "login")}>
                  <Text>{mode === 'login' ? "Sign up"
                  : "Sign in"}</Text>
                </TouchableOpacity>
               </View>

               {/* submit */}
               <TouchableOpacity onPress={handleSubmit} disabled={loading} 
               activeOpacity={0.88} style={styles.btnWrapper}>
                <LinearGradient colors={[Colors.primary, 
                  Colors.primaryContainer]}
                  start={{x:0 , y:0}}
                  end={{x:1, y:1}}
                  style={styles.btn}>
                    {loading ? (
                      <ActivityIndicator color={Colors.onPrimary}
                      size="small"/>
                    ) : (
                      <>
                      <Text style={styles.btnText}>{mode === 'login' ? "Sign In" 
                      : "Create Account"}</Text>
                      <Ionicons name='arrow-forward' size={18}
                      color={Colors.onPrimary}/>
                      </>
                    )}
                </LinearGradient>
               </TouchableOpacity>

             </View>
          </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}