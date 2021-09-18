import React, { useRef } from "react";
import { TextInput, View, StyleSheet, useColorScheme, Pressable } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from "../constants/Colors";

interface SearchBarProps {
    useInput: [string, React.Dispatch<React.SetStateAction<string>>];
};

export const SearchBar: React.FC<SearchBarProps> = ({ useInput }) => {

    const colorScheme = useColorScheme();
    const [input, setInput] = useInput;

    const ref = useRef<TextInput | null>(null);

    const styles = StyleSheet.create({
        container: {
            paddingBottom: 8,
            width: "100%",
            backgroundColor: Colors[colorScheme!].background,
        },
        searchBar: {
            flexDirection: "row",

            width: "100%",

            marginTop: 16,
            padding: 8,

            borderWidth: 1,
            borderColor: Colors[colorScheme!].tabIconDefault,
            borderRadius: 64,
        },
        searchInput: {
            fontSize: 18
        },
        searchIcon: {
            marginBottom: -2,
            marginLeft: 4,
            marginRight: 16
        }
    });

    return (
        <View style={styles.container}>
            <Pressable style={styles.searchBar} onPress={() => {
                ref.current?.focus();
            }}>

                <FontAwesome5 size={24} style={styles.searchIcon} name="search" color={Colors[colorScheme!].tabIconDefault} />

                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={input}
                    onChangeText={setInput}
                    ref={ref}
                />
            </Pressable>
        </View>
    );
};