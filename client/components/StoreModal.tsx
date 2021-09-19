import React, { useEffect, useRef, useState } from "react";
import { Text, View } from './Themed';
import { Image, StyleSheet, useColorScheme, Pressable, Modal, ScrollView, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { MonumentInfo } from "../types";
import Animated, { EasingNode } from 'react-native-reanimated';
import { TransactionModal } from "./TransactionModal";



interface StoreModalProps {
    data: MonumentInfo
    useModalOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};


export const StoreModal: React.FC<StoreModalProps> = ({ data, useModalOpen }) => {
    const colorScheme = useColorScheme();

    const [modalOpen, setModalOpen] = useModalOpen;
    const [transactionModalOpen, setTransactionModalOpen] = useState(false);
    const [smallImg, setSmallImg] = useState(false);

    const heightAnim = useRef(new Animated.Value(400)).current


    useEffect(() => {
        if (smallImg) {
            Animated.timing(
                heightAnim,
                {
                    toValue: 200,
                    duration: 200,
                    easing: EasingNode.ease
                }
            ).start();
        } else {
            Animated.timing(
                heightAnim,
                {
                    toValue: 400,
                    duration: 200,
                    easing: EasingNode.ease
                }
            ).start();
        }
    }, [heightAnim, smallImg])

    const styles = StyleSheet.create({
        imgAnim: {
            width: "100%",
            maxHeight: 400
        },
        image: {
            width: "100%",
            height: "100%",
        },
        textbox: {
            margin: 16
        },
        title: {
            fontSize: 36,
            marginVertical: 8,
            color: Colors[colorScheme!].title,
        },
        text: {
            fontSize: 16,
            color: Colors[colorScheme!].text,
            marginVertical: 8,
        },
        btnShade: {
            width: "100%",
            height: 64,
            position: "absolute",
            zIndex: 1
        },
        btnContainer: {
            width: 24,
            height: 24,

            position: "absolute",
            right: 16,
            top: 16
        },
        icon: {
            marginRight: 8
        },
        iconNums: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 8,
        },
        iconNumValue: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexGrow: 1
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

    

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (!smallImg && e.nativeEvent.contentOffset.y > 30) {
            setSmallImg(true);
        }
        else if (smallImg && e.nativeEvent.contentOffset.y < -20) {
            setSmallImg(false);
        }
    }

    return (
        <Modal animationType="slide" visible={modalOpen} presentationStyle="formSheet">


            <LinearGradient
                colors={["rgba(0,0,0,0.75)", "rgba(0,0,0,0)"]}
                style={styles.btnShade}
            >
                <Pressable style={styles.btnContainer} onPress={() => {
                    setModalOpen(false);
                }}>
                    <FontAwesome5 size={24} name="times" color={Colors[colorScheme!].tabIconDefault} />
                </Pressable>
            </LinearGradient>

            <Animated.View style={[styles.imgAnim, {
                height: heightAnim
            }]}>
                <Image
                    style={styles.image}
                    source={{ uri: data.image }}
                />
            </Animated.View>
            <ScrollView style={styles.textbox}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <Text style={styles.title}>{data.name}</Text>

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
            </ScrollView>

            <Pressable style={styles.button} onPress={() => {
                setTransactionModalOpen(true);
            }}>
                <View style={styles.btnBg}>
                    <Text style={styles.btnText}>Buy Monument</Text>
                </View>
            </Pressable>

            <TransactionModal useModalOpen={[transactionModalOpen, setTransactionModalOpen]} />
        </Modal>
    );
};