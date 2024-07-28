import { View, StyleSheet } from "react-native";
import PasswordRecovery from "./screens/directory";

export default function DirectoryPage() {
    return (
        <View style={style.background}>
            < PasswordRecovery/>
        </View>
    );
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    }
});