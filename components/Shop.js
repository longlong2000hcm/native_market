import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';


export default class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            productsList: [
                {
                    "id": 1,
                    "title": "bike 1",
                    "description": "for cycling",
                    "category": "machine",
                    "location": "Oulu",
                    "images": [
                        "https://cdn.shopify.com/s/files/1/2081/1519/products/1600x1067_US_B_Blue_PROFILE_1600x1067.jpg?v=1573931859"
                    ],
                    "price": "100$",
                    "dateOfPosting": "23/2/2020",
                    "deliveryType": "shipping",
                    "sellerInfo": "sellerInfo1"
                },
                {
                    "id": 2,
                    "title": "bike 2",
                    "description": "for cycling",
                    "category": "machine",
                    "location": "Oulu",
                    "images": [
                        "https://www.rosebikes.fi/images/v7PsIuvrqBrm6SfrEscV6HwbKiS_T5yjnFBa05QXZ80/resize:fit:1800:1200:1/gravity:no/background:E5E8EB/bG9jYWw6Ly8vcHJvZHVjdC8yMjc2Mjk2XzEucG5n.jpeg"
                    ],
                    "price": "200$",
                    "dateOfPosting": "23/2/2020",
                    "deliveryType": "shipping",
                    "sellerInfo": "sellerInfo1"
                }
            ]
        }
    }
    handleSearchTextChange = (text) => {
        this.setState({ searchText: text })
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', marginTop: "10%" }}>
                <TextInput
                    style={{
                        height: 40, borderColor: 'gray',
                        borderWidth: 1, width: "100%", backgroundColor: "white",
                        paddingHorizontal: "5%"
                    }}
                    onChangeText={text => this.handleSearchTextChange(text)}
                    value={this.state.searchText}
                    placeholder="Search..."
                />
                {this.state.productsList.map((item, index) =>
                    <View key={index} style={{
                        flex: 1,
                        flexDirection: "row",
                        margin: "5%",
                        padding: "5%",
                        borderColor: "gray",
                        borderWidth: 1,
                        backgroundColor: "white",
                    }}>
                        <Image
                            style={{ flex: 1, width: 50, height: 50 }}
                            source={{ uri: item.images[0] }}
                        />
                        <View style={{ flex: 1 }}>
                            <Text >{item.title}</Text>
                            <Text>{item.price}</Text>
                        </View>
                    </View>

                )}
            </View>
        )
    }
}
