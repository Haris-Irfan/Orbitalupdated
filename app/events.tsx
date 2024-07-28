import { View, StyleSheet } from "react-native";
import Events from "./screens/events";

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