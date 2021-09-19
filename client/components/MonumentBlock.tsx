import React, { useState } from "react";
import { Text, View } from './Themed';
import { Image, StyleSheet, useColorScheme, Pressable, Dimensions } from "react-native";
import Colors from "../constants/Colors";
import { MonumentModal } from "./MonumentModal";

interface MonumentBlockProps {
    name: string;
    owner: string;
    children: string;
    image: string;
    pos?: "last";
    btnText?: string;
};


export const MonumentBlock: React.FC<MonumentBlockProps> = ({ name, owner, image, children, pos, btnText }) => {
    const colorScheme = useColorScheme();

    const width = Dimensions.get('window').width - 40;

    const styles = StyleSheet.create({
        image: {
            width: "100%",
            height: 250,
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8
        },
        container: {
            backgroundColor: Colors[colorScheme!].background,

            borderWidth: 1,
            borderColor: Colors[colorScheme!].tabIconDefault,
            borderRadius: 8,

            height: 425,
            width: width,

            marginBottom: pos == "last" ? 196 : 24,

            display: "flex",
            alignItems: "center",
        },
        textbox: {
            display: "flex",
            alignItems: "flex-start",
            width: "100%",

            flexGrow: 1,

            padding: 8
        },
        title: {
            fontSize: 24,
            marginBottom: 4
        },
        owner: {
            fontSize: 16,
            color: Colors[colorScheme!].tabIconDefault,
            marginBottom: 8
        },
        text: {
            fontSize: 16,
            color: Colors[colorScheme!].tabIconDefault,
        },
        button: {
            padding: 8,

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

    const [modalOpen, setModalOpen] = useState(false)

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: image }}
            />
            <View style={styles.textbox}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.owner}>Owned by: {owner}</Text>
                <Text style={styles.text} numberOfLines={2}>{children}</Text>
            </View>
            <Pressable style={styles.button} onPress={() => {
                setModalOpen(true);
            }}>
                <View style={styles.btnBg}>
                    <Text style={styles.btnText}>{btnText || "View Details"}</Text>
                </View>
            </Pressable>

            <MonumentModal {...{ name, owner, image, children, pos, btnText, visible: modalOpen }} />
        </View>
    );
};