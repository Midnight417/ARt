import React from "react";
import { Text, View } from '../components/Themed';
import { Image, Button } from "react-native";

interface MonumentBlockProps {
    name: string;
    owner: string;
    details: string;
    image: string;
};

export const MonumentBlock: React.FC<MonumentsBlockProps> = ({ name, owner, creator, details, image }) => {

    return(
        <View>
            <Image
                source={ "https://www.biography.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTE5NTU2MzE2MzcyODk1MjQz/socrates-9488126-1-402.jpg" }
            />
            <Text>{{ name }}</Text>
            <View>
                <Text>{{ owner }}</Text>
                <Text>{{ details }}</Text>
                <Button>View in store</Button>
            </View>
        </View>
    );
};