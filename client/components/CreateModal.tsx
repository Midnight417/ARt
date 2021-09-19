import React, { useState } from "react";
import { Text, StyleSheet, useColorScheme, Pressable, Modal, ScrollView, Image, TextInput } from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome5 } from '@expo/vector-icons';
import { MonumentInfo } from "../types";
import { View } from "./Themed";
import { createNFT } from "../blockchain/walletTest";


interface CreateModalProps {
    useModalOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};


export const CreateModal: React.FC<CreateModalProps> = ({ useModalOpen }) => {
    const colorScheme = useColorScheme();

    const [value, setValue] = useState({ modelUri: "", previewUri: "", title: "", lat: "", long: "", description: "" })
    const [modalOpen, setModalOpen] = useModalOpen;

    const styles = StyleSheet.create({
        image: {
            width: "100%",
            height: 400,
            marginVertical: 16,
        },
        textbox: {
            margin: 16
        },
        title: {
            fontSize: 36,
            marginVertical: 8,
            color: Colors[colorScheme!].title,
            marginTop: 16
        },
        btnContainer: {
            width: 24,
            height: 24,

            position: "absolute",
            right: 16,
            top: 32,

            zIndex: 1
        },
        button: {
            width: "100%",
            marginTop: 32
        },
        btnBg: {
            backgroundColor: Colors[colorScheme!].tabIconSelected,
            borderRadius: 8,
        },
        btnText: {
            color: Colors[colorScheme!].background,

            padding: 8,

            textAlign: "center"
        },
        input: {
            fontSize: 24,
            marginVertical: 8
        }
    })

    return (
        <Modal animationType="slide" visible={modalOpen} presentationStyle="formSheet">

            <Pressable style={styles.btnContainer} onPress={() => {
                setModalOpen(false);
            }}>
                <FontAwesome5 size={24} name="times" color={Colors[colorScheme!].tabIconDefault} />
            </Pressable>

            <ScrollView style={styles.textbox}>

                <Text style={styles.title}>Upload Monument</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={value.title}
                    onChangeText={(string: string) => { setValue({ ...value, title: string }) }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="modelUri"
                    value={value.modelUri}
                    onChangeText={(string: string) => { setValue({ ...value, modelUri: string }) }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="previewUri"
                    value={value.previewUri}
                    onChangeText={(string: string) => { setValue({ ...value, previewUri: string }) }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="lat"
                    value={value.lat}
                    onChangeText={(string: string) => { setValue({ ...value, lat: string }) }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="long"
                    value={value.long}
                    onChangeText={(string: string) => { setValue({ ...value, long: string }) }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="lat"
                    value={value.lat}
                    onChangeText={(string: string) => { setValue({ ...value, lat: string }) }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="description"
                    value={value.description}
                    onChangeText={(string: string) => { setValue({ ...value, description: string }) }}
                />

                <Pressable style={styles.button} onPress={() => {

                    createNFT("0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d", value)

                    setModalOpen(false);
                }}>
                    <View style={styles.btnBg}>
                        <Text style={styles.btnText}>Create Monument</Text>
                    </View>
                </Pressable>

            </ScrollView>


        </Modal>
    );
};