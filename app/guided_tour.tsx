import { View, StyleSheet } from "react-native";
import GuidedTour from "./screens/guided_tour";

export default function QrScannerPage() {
    return (
        <View style={style.background}>
            <GuidedTour />
        </View>
    );
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover'
    }
});