import { StyleSheet, Text, View } from 'react-native'
import React ,{useState}from 'react'

const Debug = () => {
        const [debugInfo, setDebugInfo] = useState(""); // Debug info storage
        const [debugVisible, setDebugVisible] = useState(true); // Control debug view visibility
    return (
        <View>
            {debugVisible && (
                <View style={styles.debugContainer}>
                    <Text style={styles.debugText}>Debug Information:</Text>
                    <Text style={styles.debugText}>{debugInfo}</Text>
                </View>)}
        </View>)
    }

export default Debug

// <Debug debugVisible={debugVisible} setDebugInfo={setDebugInfo} debugVisible={debugVisible} setDebugVisible={setDebugVisible} /> 
// setDebugInfo((prev) => `${prev}\n debug information`)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    debugContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        width: "90%",
    },
    debugText: {
        fontSize: 12,
        color: "#444",
    },
});