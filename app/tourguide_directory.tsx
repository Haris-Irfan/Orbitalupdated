import { View, StyleSheet } from "react-native";
import TourGroups from "./screens/tourguide_directory";

export default function TourDirectory() {
    return (
        <View style={style.background}>
            < TourGroups/>
        </View>
    );
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', 
    }
});