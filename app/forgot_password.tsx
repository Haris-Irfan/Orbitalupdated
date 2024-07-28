import { View, StyleSheet } from "react-native";
import Events from "./screens/forgot_password";

export default function ForumPage() {
    return (
        <View style={style.background}>
            <Events />
        </View>
    );
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover'
    }
});