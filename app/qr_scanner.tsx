import { View, StyleSheet } from "react-native";
import QrScanner from "./screens/qr_scanner";

export default function QrScannerPage() {
    return (
        <View style={style.background}>
            <QrScanner />
        </View>
    );
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover'
    }
});