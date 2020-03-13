import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Image, ScrollView, Picker } from 'react-native';


export default class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiURI: "http://87.92.86.121:3000",
            searchText: "",
            searchBy: "",
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

    componentDidMount() {
        fetch(this.state.apiURI + '/products', {
            method: 'GET',
        })
            .then(response => {
                if (response.ok == false) {
                    throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
                }
                console.log(response.json);
                return response.json();
            })
            .then(result => {
                this.setState({ productsList: result.data })
            })
    }

    handleSearchTextChange = (text) => {
        this.setState({ searchText: text })
    }
    search = (event) => {
        let text = this.state.searchText;
        if (text !== "" && this.state.searchBy !== "") {
            fetch(this.state.apiURI + '/search/' + this.state.searchBy + '/' + text, {
                method: 'GET',
            })
                .then(response => {
                    if (response.ok == false) {
                        throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
                    }
                    console.log(response.json);
                    return response.json();
                })
                .then(result => {
                    this.setState({ productsList: result.data })
                })
        }
        else {
            fetch(this.state.apiURI + '/products', {
                method: 'GET',
            })
                .then(response => {
                    if (response.ok == false) {
                        throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
                    }
                    console.log(response.json);
                    return response.json();
                })
                .then(result => {
                    this.setState({ productsList: result.data })
                })
        }

    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', marginTop: "10%" }}>
                <View style={{ flex: 0, flexDirection: "row" }}>
                    <TextInput
                        style={{
                            flex: 11, height: 40, borderColor: 'gray',
                            borderWidth: 1, width: "100%", backgroundColor: "white",
                            paddingHorizontal: "5%"
                        }}
                        onChangeText={text => this.handleSearchTextChange(text)}
                        onSubmitEditing={text => this.search(text)}
                        value={this.state.searchText}
                        placeholder="Search..."
                    />
                    <Picker
                        selectedValue={this.state.searchBy}
                        style={{ flex: 9, height: 50, width: 100 }}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({ searchBy: itemValue });
                        }
                        }>
                        <Picker.Item label="by" value="" />
                        <Picker.Item label="Category" value="category" />
                        <Picker.Item label="Location" value="location" />
                        <Picker.Item label="Date" value="date" />
                    </Picker>
                </View>

                <ScrollView style={{ flex: 9, width: "100%" }}>
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

                    )}
                </ScrollView>

            </View>
        )
    }
}
