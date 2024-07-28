import React, { useState } from 'react';
import { Alert, ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { useRouter } from 'expo-router';

export default function SignupForm() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const router = useRouter();

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, username, password);
            Alert.alert("Signup Successfully!", "You can now log in.");
            router.push('/');
        } catch (error: any) {
            Alert.alert("Signup Failed", error.message);
        }
    };

    return (
        <ImageBackground source={require('../../../assets/images/VI-SG-IT-UIbackground.png')} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder='EMAIL'
                        value={username}
                        onChangeText={setUsername}
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='PASSWORD'
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='CONFIRM PASSWORD'
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.buttonView}>
                    <Pressable style={styles.button} onPress={handleSignup}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    inputView: {
        gap: 15,
        width: "100%",
        paddingHorizontal: 40,
        marginBottom: 5,
    },
    input: {
        height: 50,
        paddingHorizontal: 20,
        borderColor: "maroon",
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: '#fff', // White background for inputs
    },
    button: {
        backgroundColor: "maroon",
        height: 45,
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    buttonView: {
        width: "100%",
        paddingHorizontal: 50,
    }
});
