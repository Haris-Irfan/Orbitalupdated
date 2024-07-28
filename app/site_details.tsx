import { View, StyleSheet } from "react-native";
import SiteDetails from "./screens/site_details";

export default function SiteDetailPage() {
    return (
        <View style={style.background}>
            <SiteDetails />
        </View>
    );
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover'
    }
});