import React, { Component } from 'react'
import { Text, View, Button, ScrollView, Image } from 'react-native'
import { EvilIcons } from 'react-native-vector-icons';

export default class Postings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsList: []
        }
    }
    componentDidMount() {
        fetch(this.props.apiURI + '/products/getByIdUser/' + this.props.idUser, {
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
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', marginTop: "10%" }}>
                <View style={{ flex: 0, flexDirection: "row" }}>
                    <View style={{ flex: 7, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontWeight: "100", fontSize: 20 }}>
                            <EvilIcons name="user" color="black" size={25} />
                            {this.props.username}
                        </Text>
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
                    <View style={{ flex: 6, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontWeight: "100", fontSize: 20 }}>My Postings</Text>
                    </View>
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
                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginBottom: 5 }}>
                                <Button title="Edit"
                                    onPress={() => this.props.navigation.navigate('EditPosting', { ...item })}
                                    style={{ flex: 1 }}
                                />

                                <Button title="Delete"
                                    onPress={() => this.props.navigation.navigate('DeletePosting', { ...item })}
                                    style={{ flex: 1 }} ></Button>
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
                                                width: "100%",
                                                height: 100,
                                                resizeMode: 'contain'
                                            }}
                                            source={{ uri: `${this.props.apiURI}/images/${x}` }}

                                        />
                                    )}
                                </View>

                                <View style={{ flex: 6 }}>
                                    <Text>Id: {item.id}</Text>
                                    <Text>Tittle: {item.title}</Text>
                                    <Text>Price: {item.price} {'\u20AC'}</Text>
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
