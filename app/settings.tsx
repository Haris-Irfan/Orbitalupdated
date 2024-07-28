import { View, StyleSheet } from "react-native";
import Settings from "./screens/settings";

export default function SettingsPage() {
    return (
        <View style={style.background}>
            <Settings />
        </View>
    );
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover'
    }
});