import { View, StyleSheet } from "react-native";
import EventDetails from "./screens/event_details";

export default function ForumPage() {
    return (
        <View style={style.background}>
            <EventDetails />
        </View>
    );
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover'
    }
});