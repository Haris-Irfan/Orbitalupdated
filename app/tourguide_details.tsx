import { View, StyleSheet } from "react-native";
import TourGuideDetails from "./screens/tourguide_details";

export default function TourDetails() {
    return (
        <View style={style.background}>
            < TourGuideDetails/>
        </View>
    );
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', 
    }
});