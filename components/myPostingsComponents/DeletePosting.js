import React, { Component } from 'react'
import { Text, View, Button, ScrollView, Picker, TouchableOpacity, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker'

export default class EditPosting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            category: "",
            location: "",
            images: [],
            price: "",
            dateOfPosting: "",
            deliveryType: "shipping",
            sellerInfo: ""
        }
    }

    componentDidMount() {
        console.log(this.props.route.params)
        this.setState({
            title: this.props.route.params.title,
            description: this.props.route.params.description,
            category: this.props.route.params.category,
            location: this.props.route.params.location,
            images: this.props.route.params.images,
            price: this.props.route.params.price,
            dateOfPosting: this.props.route.params.dateOfPosting,
            deliveryType: this.props.route.params.deliveryType,
            sellerInfo: this.props.route.params.sellerInfo
        })
    }



    submitHandler = () => {
        fetch(this.props.apiURI + '/products/' + this.props.route.params.id, {
            method: 'DELETE',
            headers: {
                "Content-type": "multipart/form-data",
                "Authorization": "Bearer " + this.props.jwt
            }
        })
            .then(response => {
                if (response.ok == false) {
                    throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
                }
                return response.json();
            })
            .then(json => {
                console.log(json)
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'ActionCompleted' }],
                })
            })
            .catch(error => {
                console.log("Error message:")
                console.log(error.message)
            });
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', marginTop: "10%" }}>

                <View style={{ flex: 0, flexDirection: "row-reverse", marginTop: 10 }}>
                    <View style={{ flex: 7, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontWeight: "100", fontSize: 20 }}>Delete</Text>
                    </View>
                    <View style={{ flex: 3, height: "100%", paddingHorizontal: 20 }}>
                        <Button
                            title="Back"
                            onPress={() => this.props.navigation.navigate('Postings')}
                            style={{ flex: 1 }}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>Are you sure to delete this product?</Text>
                </View>

                <View style={{
                    flex: 6, margin: "5%",
                    padding: "5%",
                    width: "100%",
                    borderColor: "gray",
                    borderWidth: 1,
                    backgroundColor: "white",
                }}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                        }}>
                            <View style={{ flex: 4, paddingRight: 10 }}>
                                {this.state.images.map((x, i) =>
                                    <Image
                                        key={i}
                                        style={{
                                            flex: 1,
                                            marginTop: 5,
                                            width: null,
                                            height: null,
                                            resizeMode: 'contain'
                                        }}
                                        source={{ uri: `${this.props.apiURI}/images/${x}` }}

                                    />
                                )}
                            </View>

                            <View style={{ flex: 6 }}>
                                <Text>Id: {this.state.id}</Text>
                                <Text>Tittle: {this.state.title}</Text>
                                <Text>Price: {this.state.price} {'\u20AC'}</Text>
                                <Text>Category: {this.state.category}</Text>
                                <Text>Location: {this.state.location}</Text>
                                <Text>Date of posting: {this.state.dateOfPosting}</Text>
                                <Text>Delivery type: {this.state.deliveryType}</Text>
                                <Text>Description: {this.state.description}</Text>
                                <Text>Seller info: {this.state.sellerInfo}</Text>

                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity
                        style={{ backgroundColor: "red", padding: 10, borderRadius: 3, width: 100 }}
                        onPress={this.submitHandler}
                    >
                        <Text style={{ color: "white", textAlign: "center" }}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>


        )
    }
}

