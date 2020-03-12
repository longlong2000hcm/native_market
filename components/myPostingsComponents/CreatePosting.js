import React, { Component } from 'react'
import { Text, View, Button, ScrollView, Picker } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

export default class CreatePosting extends Component {
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

    inputHandler = (text, name) => {
        this.setState({[name]: text})
    }

    submitHandler = () => {
        console.log(this.state)
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', marginTop: "10%" }}>

                <View style={{ flex: 0, flexDirection: "row-reverse", marginTop: 10 }}>
                    <View style={{ flex: 7, alignItems: "center", justifyContent: "center" }}></View>
                    <View style={{ flex: 3, height: "100%", paddingHorizontal: 20 }}>
                        <Button
                            title="Back"
                            onPress={() => this.props.navigation.navigate('Postings')}
                            style={{ flex: 1 }}
                        />
                    </View>
                </View>
                <ScrollView style={{ flex: 9, width: "100%", marginTop: 10 }}>

                    <View style={{ flex: 1, flexDirection: "row", marginVertical: 3, marginHorizontal: 5 }}>
                        <Text style={{ flex: 3, textAlignVertical: 'center', textAlign: "center" }}>Title</Text>
                        <TextInput
                            onChangeText={text => this.inputHandler(text, "title")}
                            value={this.state.searchText}
                            placeholder="Title"
                            style={{
                                flex: 7, height: 40, borderColor: 'gray',
                                borderWidth: 1, width: "100%", backgroundColor: "white",
                                paddingHorizontal: "5%"
                            }} />
                    </View>

                    <View style={{ flex: 1, flexDirection: "row", marginVertical: 3, marginHorizontal: 5 }}>
                        <Text style={{ flex: 3, textAlignVertical: 'center', textAlign: "center" }}>Description</Text>
                        <TextInput
                            onChangeText={text => this.inputHandler(text, "description")}
                            value={this.state.searchText}
                            placeholder="Description"
                            style={{
                                flex: 7, height: 40, borderColor: 'gray',
                                borderWidth: 1, width: "100%", backgroundColor: "white",
                                paddingHorizontal: "5%"
                            }} />
                    </View>

                    <View style={{ flex: 1, flexDirection: "row", marginVertical: 3, marginHorizontal: 5 }}>
                        <Text style={{ flex: 3, textAlignVertical: 'center', textAlign: "center" }}>Category</Text>
                        <TextInput
                            onChangeText={text => this.inputHandler(text, "category")}
                            value={this.state.searchText}
                            placeholder="Category"
                            style={{
                                flex: 7, height: 40, borderColor: 'gray',
                                borderWidth: 1, width: "100%", backgroundColor: "white",
                                paddingHorizontal: "5%"
                            }} />
                    </View>

                    <View style={{ flex: 1, flexDirection: "row", marginVertical: 3, marginHorizontal: 5 }}>
                        <Text style={{ flex: 3, textAlignVertical: 'center', textAlign: "center" }}>Location</Text>
                        <TextInput
                            onChangeText={text => this.inputHandler(text, "location")}
                            value={this.state.searchText}
                            placeholder="Location"
                            style={{
                                flex: 7, height: 40, borderColor: 'gray',
                                borderWidth: 1, width: "100%", backgroundColor: "white",
                                paddingHorizontal: "5%"
                            }} />
                    </View>

                    <View style={{ flex: 1, flexDirection: "row", marginVertical: 3, marginHorizontal: 5 }}>
                        <Text style={{ flex: 3, textAlignVertical: 'center', textAlign: "center" }}>Price</Text>
                        <TextInput
                            onChangeText={text => this.inputHandler(text, "price")}
                            value={this.state.searchText}
                            placeholder="Price"
                            style={{
                                flex: 5, height: 40, borderColor: 'gray',
                                borderWidth: 1, width: "100%", backgroundColor: "white",
                                paddingHorizontal: "5%"
                            }}
                            keyboardType={'numeric'} />
                        <Text style={{ flex: 2, textAlignVertical: 'center', textAlign: "center" }}>euro</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row", marginVertical: 3, marginHorizontal: 5 }}>
                        <Text style={{ flex: 3, textAlignVertical: 'center', textAlign: "center" }}>Delivery type</Text>
                        <Picker
                            selectedValue={this.state.deliveryType}
                            style={{ flex: 7, height: 50, width: 100 }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ deliveryType: itemValue })
                            }>
                            <Picker.Item label="Shipping" value="shipping" />
                            <Picker.Item label="Pickup" value="pickup" />
                        </Picker>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row", marginVertical: 3, marginHorizontal: 5 }}>
                        <Text style={{ flex: 3, textAlignVertical: 'center', textAlign: "center" }}>Seller info</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={text => this.inputHandler(text, "sellerInfo")}
                            value={this.state.searchText}
                            placeholder="Seller info"
                            style={{
                                flex: 7, height: 40, borderColor: 'gray',
                                borderWidth: 1, width: "100%", backgroundColor: "white",
                                paddingHorizontal: "5%",
                                height:100
                            }} />
                    </View>

                    <View style={{ flex: 1, flexDirection: "row", marginVertical: 10, marginHorizontal: 5, justifyContent: "center", alignItems: "center" }}>
                        <Button
                            title="Create Posting"
                            onPress={this.submitHandler}
                            style={{ flex: 1 }}
                        />
                    </View>

                </ScrollView>
            </View>
        )
    }
}

