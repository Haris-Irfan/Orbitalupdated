import { View, StyleSheet } from "react-native";
import Map from "./screens/map";

export default function MapPage() {
    return (
        <View style={style.background}>
            <Map />
        </View>
    );
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', 
    }
});