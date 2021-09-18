import React from "react";
import { SafeAreaView, TextInput, View, StyleSheet } from "react-native";

interface SearchBarProps {
    useInput: [string, React.Dispatch<React.SetStateAction<string>>];
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBar: {

    },
    searchInput: {

    }
});

export const SearchBar: React.FC<SearchBarProps> = ({ useInput }) => {

    const [input, setInput] = useInput;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={input}
                    onChangeText={setInput}
                />
            </View>
        </SafeAreaView>
    );
};