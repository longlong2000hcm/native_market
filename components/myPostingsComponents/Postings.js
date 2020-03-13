import React, { Component } from 'react'
import { Text, View, Button, ScrollView, Image } from 'react-native'

export default class Postings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsList: [
                {
                    "id": 1,
                    "title": "bike 1",
                    "description": "for cycling",
                    "category": "machine",
                    "location": "Oulu",
                    "images": [
                        "https://cdn.shopify.com/s/files/1/2081/1519/products/1600x1067_US_B_Blue_PROFILE_1600x1067.jpg?v=1573931859"
                        , "https://www.rosebikes.fi/images/v7PsIuvrqBrm6SfrEscV6HwbKiS_T5yjnFBa05QXZ80/resize:fit:1800:1200:1/gravity:no/background:E5E8EB/bG9jYWw6Ly8vcHJvZHVjdC8yMjc2Mjk2XzEucG5n.jpeg"
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
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', marginTop: "10%" }}>
                <View style={{ flex: 0, flexDirection: "row" }}>
                    <View style={{ flex: 7, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>My Postings</Text>
                    </View>
                    <View style={{ flex: 3, height: "100%", paddingHorizontal: 20 }}>
                        <Button
                            title="Logout"
                            onPress={this.props.onLogout}
                            style={{ flex: 1 }}
                        />
                    </View>

                </View>

                <View style={{ flex: 0, flexDirection: "row", marginTop: 10 }}>
                    <View style={{ flex: 6, alignItems: "center", justifyContent: "center" }}></View>
                    <View style={{ flex: 4, height: "100%", paddingHorizontal: 20 }}>
                        <Button
                            title="Create Posting"
                            onPress={() => this.props.navigation.navigate('CreatePosting')}
                            style={{ flex: 1 }}
                        />
                    </View>

                </View>

                <ScrollView style={{ flex: 9, width: "100%", marginTop: 10 }}>
                    {this.state.productsList.map((item, index) =>
                        <View key={index} style={{
                            flex: 1, margin: "5%",
                            padding: "5%",
                            borderColor: "gray",
                            borderWidth: 1,
                            backgroundColor: "white",
                        }}>
                            <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginBottom: 5}}>
                                <Button title="Edit" style={{flex: 1}}></Button>
                                
                                <Button title="Delete" style={{flex: 1}} ></Button>
                            </View>
                            <View style={{
                                flex: 1,
                                flexDirection: "row",

                            }}>
                                <View style={{ flex: 4, paddingRight: 10 }}>
                                    {item.images.map((x, i) =>
                                        <Image
                                            key={i}
                                            style={{
                                                flex: 1,
                                                marginTop: 5,
                                                width: null,
                                                height: null,
                                                resizeMode: 'contain'
                                            }}
                                            source={{ uri: x }}

                                        />
                                    )}
                                </View>

                                <View style={{ flex: 6 }}>
                                    <Text>Id: {item.id}</Text>
                                    <Text>Tittle: {item.title}</Text>
                                    <Text>Price: {item.price}</Text>
                                    <Text>Category: {item.category}</Text>
                                    <Text>Location: {item.location}</Text>
                                    <Text>Date of posting: {item.dateOfPosting}</Text>
                                    <Text>Delivery type: {item.deliveryType}</Text>
                                    <Text>Description: {item.description}</Text>
                                    <Text>Seller info: {item.sellerInfo}</Text>

                                </View>
                            </View>
                        </View>
                    )}
                </ScrollView>

            </View>
        )
    }
}