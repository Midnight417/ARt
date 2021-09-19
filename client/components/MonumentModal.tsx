import React from "react";
import { Text, View } from './Themed';
import { Image, Button, StyleSheet, useColorScheme, Pressable, Dimensions, Modal } from "react-native";
import Colors from "../constants/Colors";

interface MonumentModalProps {
    name: string;
    owner: string;
    children: string;
    image: string;
    pos?: "last";
    btnText?: string;
    visible: boolean;
};


export const MonumentModal: React.FC<MonumentModalProps> = ({ name, owner, image, children, pos, btnText, visible }) => {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        image: {
            width: "100%",
            height: "100%",
            maxHeight: 400
        },
        textbox: {
            margin: 8
        },
        title: {
            fontSize: 36,
            marginBottom: 8,
            color: Colors[colorScheme!].title,
        },
        owner: {
            fontSize: 16,
            color: Colors[colorScheme!].text,
            marginBottom: 8
        },
        text: {
            fontSize: 16,
            color: Colors[colorScheme!].text,
        },
        button: {
        },
        btnBg: {
        },
        btnText: {
        },
        searchIcon: {
            marginBottom: -2,
            marginLeft: 4,
            marginRight: 16
        }
    })

    return (
        <Modal animationType="slide" visible={visible} presentationStyle="formSheet">

            <Image
                style={styles.image}
                source={{ uri: image }}
            />
            <View style={styles.textbox}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.owner}>Owned by: {owner}</Text>
                <Text style={styles.text}>{children}</Text>
            </View>
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