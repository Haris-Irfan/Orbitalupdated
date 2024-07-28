import { View, StyleSheet } from "react-native";
import Chat from "./screens/chat";

export default function ChatPage() {
    return (
        <View style={style.background}>
            < Chat/>
        </View>
    );
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    }
});