import { View, StyleSheet } from "react-native";
import SignupForm from "./screens/signup_page";

export default function SignupPage() {
    return (
        <View style={style.background}>
            <SignupForm />
        </View>
    );
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover'
    }
});