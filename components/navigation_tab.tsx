import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link, usePathname } from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function NavigationTab() {
    const currentRoute = usePathname();

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <Link href="/map" style={styles.tab}>
                    <View style={styles.tabContent}>
                        <FontAwesome 
                            name="map-o" 
                            size={20} 
                            style={[
                                styles.icon, 
                                currentRoute === "/map" && styles.activeIcon
                            ]} 
                        />
                        <Text style={[
                            styles.tabText, 
                            currentRoute === "/map" && styles.activeTabText
                        ]}>Map</Text>
                    </View>
                </Link>
                <Link href="/events" style={styles.tab}>
                    <View style={styles.tabContent}>
                        <FontAwesome 
                            name="calendar" 
                            size={20} 
                            style={[
                                styles.icon, 
                                currentRoute === "/events" && styles.activeIcon
                            ]} 
                        />
                        <Text style={[
                            styles.tabText, 
                            currentRoute === "/events" && styles.activeTabText
                        ]}>Events</Text>
                    </View>
                </Link>
                <Link href="/directory" style={styles.tab}>
                    <View style={styles.tabContent}>
                        <FontAwesome 
                            name="book" 
                            size={20} 
                            style={[
                                styles.icon, 
                                currentRoute === "/directory" && styles.activeIcon
                            ]} 
                        />
                        <Text style={[
                            styles.tabText, 
                            currentRoute === "/directory" && styles.activeTabText
                        ]}>Directory</Text>
                    </View>
                </Link>
                <View style={styles.spacer1}/>
                <View style={styles.centerTab}>
                    <Link href="/qr_scanner" style={styles.qrTab}>
                        <View style={styles.qrTabContent}>
                            <FontAwesome 
                                name="qrcode" 
                                size={40} 
                                style={styles.qrIcon} 
                            />
                        </View>
                    </Link>
                </View>
                <View style={styles.spacer2}/>
                <Link href="/tourguide_directory" style={styles.tab}>
                    <View style={styles.tabContent}>
                        <FontAwesome 
                            name="users" 
                            size={20} 
                            style={[
                                styles.icon, 
                                currentRoute === "/tourguide_directory" && styles.activeIcon
                            ]} 
                        />
                        <Text style={[
                            styles.tabText, 
                            currentRoute === "/tourguide_directory" && styles.activeTabText
                        ]}>Tour Groups</Text>
                    </View>
                </Link>
                <View style={styles.spacer3}/>
                <Link href="/forum" style={styles.tab}>
                    <View style={styles.tabContent}>
                        <FontAwesome 
                            name="wechat" 
                            size={20} 
                            style={[
                                styles.icon, 
                                currentRoute === "/forum" && styles.activeIcon
                            ]} 
                        />
                        <Text style={[
                            styles.tabText, 
                            currentRoute === "/forum" && styles.activeTabText
                        ]}>Forum</Text>
                    </View>
                </Link>
                <Link href="/settings" style={styles.tab}>
                    <View style={styles.tabContent}>
                        <FontAwesome 
                            name="gear" 
                            size={20} 
                            style={[
                                styles.icon, 
                                currentRoute === "/settings" && styles.activeIcon
                            ]} 
                        />
                        <Text style={[
                            styles.tabText, 
                            currentRoute === "/settings" && styles.activeTabText
                        ]}>Settings</Text>
                    </View>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around', 
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around', 
        paddingVertical: 17,
        paddingHorizontal: 0,
        paddingLeft: 50,
        backgroundColor: 'plum',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        borderRadius: 30,
        borderLeftWidth: 4, 
        borderRightWidth: 4, 
        position: 'absolute',
        bottom: 5, 
        left: -215,
        width: '100%',
        height: 80,
        shadowColor: '#006',
        shadowOpacity: 1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    tab: {
        flex: 1,
        alignItems: 'center',
    },
    tabContent: {
        alignItems: 'center',
    },
    icon: {
       
        top: 10,
        marginBottom: 4,
        color: 'black', 
        alignContent: 'center',
        right: 15
    },
    activeIcon: {
        color: 'white', 
    },
    tabText: {
        top: 10,
        fontSize: 10,
        color: 'black', 
        textAlign: 'center',
        right: 15,
    },
    activeTabText: {
        color: 'white', 
    },
    centerTab: {
        position: 'absolute',
        bottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'tomato',
        zIndex: 10,
        // borderColor: 'white',
        // borderWidth: 2,
        left: 175,
    },
    qrTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrTabContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: 3
    },
    qrIcon: {
        color: 'white',
    },
    spacer1: {
        width: 20
    },
    spacer2: {
        width: 30,
    },
    spacer3: {
        width: 10,
    }
});
