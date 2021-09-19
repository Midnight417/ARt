import React from "react";
import { Text, View } from './Themed';
import { Image, StyleSheet, useColorScheme, Pressable, Modal, ScrollView } from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { MonumentInfo } from "../types";


interface MonumentModalProps {
    data: MonumentInfo
    useModalOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};


export const MonumentModal: React.FC<MonumentModalProps> = ({ data, useModalOpen }) => {
    const colorScheme = useColorScheme();

    const [modalOpen, setModalOpen] = useModalOpen;

    const styles = StyleSheet.create({
        image: {
            width: "100%",
            height: "100%",
            maxHeight: 400
        },
        textbox: {
            margin: 16
        },
        title: {
            fontSize: 36,
            marginBottom: 16,
            color: Colors[colorScheme!].title,
        },
        owner: {
            fontSize: 16,
            color: Colors[colorScheme!].text,
            marginBottom: 16
        },
        text: {
            fontSize: 16,
            color: Colors[colorScheme!].text,
        },
        btnShade: {
            width: "100%",
            height: 64,
            position: "absolute",
            zIndex: 5
        },
        btnContainer: {
            width: 24,
            height: 24,

            position: "absolute",
            right: 16,
            top: 16
        },
        searchIcon: {
            marginBottom: -2,
        }
    })

    return (
        <Modal animationType="slide" visible={modalOpen} presentationStyle="formSheet">


            <LinearGradient
                colors={["rgba(0,0,0,0.75)", "rgba(0,0,0,0)"]}
                style={styles.btnShade}
            >
                <Pressable style={styles.btnContainer} onPress={() => {
                    setModalOpen(false);
                }}>
                    <FontAwesome5 size={24} style={styles.searchIcon} name="times" color={Colors[colorScheme!].tabIconDefault} />
                </Pressable>
            </LinearGradient>

            <Image
                style={styles.image}
                source={{ uri: data.image }}
            />
            <ScrollView style={styles.textbox}>
                <Text style={styles.title}>{data.name}</Text>
                <Text style={styles.owner}>Owned by: {data.owner}</Text>
                <Text style={styles.owner}>Created by: {data.creator}</Text>
                <Text style={styles.text}>{data.description}</Text>
            </ScrollView>
            {/* <Pressable style={styles.button} onPress={() => {
                setModalOpen(true);
            }}>
                <View style={styles.btnBg}>
                    <Text style={styles.btnText}>{btnText || "View Details"}</Text>
                </View>
            </Pressable> */}

        </Modal>
    );
};