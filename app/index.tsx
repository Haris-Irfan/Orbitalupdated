import { View, StyleSheet } from "react-native";
import LoginForm from "./screens/login_page";

export default function Index() {
    return (
        <View style={style.background}>
            < LoginForm/>
        </View>
    );
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    }
});