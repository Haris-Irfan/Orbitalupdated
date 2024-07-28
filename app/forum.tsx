import { View, StyleSheet } from "react-native";
import Forum from "./screens/forum";

export default function ForumPage() {
    return (
        <View style={style.background}>
            <Forum />
        </View>
    );
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover'
    }
});