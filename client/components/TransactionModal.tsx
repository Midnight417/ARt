import React, { } from "react";
import { Text, StyleSheet, useColorScheme, Pressable, Modal, ScrollView, Image } from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome5 } from '@expo/vector-icons';
import { MonumentInfo } from "../types";
import { View } from "./Themed";


interface TransactionModalProps {
    useModalOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

const data: MonumentInfo = {
    id: "1",
    name: "Socrates Statue",
    owner: "Leo Tian",
    creator: "Leo Tian",
    coordinates: { latitude: 51.5078788, longitude: -0.0877321 },
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Socrates_Louvre.jpg",
    description: " A statue of Socrates. Socrates was a Greek philosopher from Athens who is credited as a founder of Western philosophy and the first moral philosopher of the Western ethical tradition of thought.",
    value: 0.1,
    views: 16
};


export const TransactionModal: React.FC<TransactionModalProps> = ({ useModalOpen }) => {
    const colorScheme = useColorScheme();

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
        name: {
            fontSize: 24,
            marginVertical: 8,
            color: Colors[colorScheme!].title,
            marginTop: 32
        },
        text: {
            fontSize: 16,
            color: Colors[colorScheme!].text,
            marginVertical: 8,
        },
        btnContainer: {
            width: 24,
            height: 24,

            position: "absolute",
            right: 16,
            top: 32,

            zIndex: 1
        },
        icon: {
            marginRight: 8
        },
        iconNums: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 16,
        },
        iconNumValue: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexGrow: 1
        },
        transactionValue: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 8,
        },
        button: {
            width: "100%",
        },
        btnBg: {
            backgroundColor: Colors[colorScheme!].tabIconSelected,
            borderRadius: 8,
        },
        btnText: {
            color: Colors[colorScheme!].background,

            padding: 8,

            textAlign: "center"
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

                <Text style={styles.title}>Transactions</Text>

                <Text style={styles.name}>{data.name}</Text>

                <View style={styles.iconNums}>
                    <View style={styles.iconNumValue}>
                        <FontAwesome5 size={24} style={styles.icon} name="eye" color={Colors[colorScheme!].text} />
                        <Text>{data.views}</Text>
                    </View>
                    <View style={styles.iconNumValue}>
                        <FontAwesome5 size={24} style={styles.icon} name="coins" color={Colors[colorScheme!].text} />
                        <Text>{data.value}</Text>
                    </View>
                    <View style={styles.iconNumValue}>
                        <FontAwesome5 size={24} style={styles.icon} name="user-tag" color={Colors[colorScheme!].text} />
                        <Text>{data.creator}</Text>
                    </View>
                </View>


                <Text style={styles.text}>{data.description}</Text>

                <Image
                    style={styles.image}
                    source={{ uri: data.image }}
                />

                <View style={styles.iconNums}>
                    <View style={styles.iconNumValue}>
                        <FontAwesome5 size={24} style={styles.icon} name="tag" color={Colors[colorScheme!].text} />
                        <Text>{data.views}</Text>
                    </View>
                    <View style={styles.iconNumValue}>
                        <FontAwesome5 size={24} style={styles.icon} name="piggy-bank" color={Colors[colorScheme!].text} />
                        <Text>{data.value}</Text>
                    </View>
                </View>

                <Pressable style={styles.button} onPress={() => {
                    setModalOpen(true);
                }}>
                    <View style={styles.btnBg}>
                        <Text style={styles.btnText}>Buy Monument</Text>
                    </View>
                </Pressable>

            </ScrollView>


        </Modal>
    );
};