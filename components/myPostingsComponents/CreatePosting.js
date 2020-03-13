import React, { Component } from 'react'
import { Text, View, Button, ScrollView, Picker, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker'

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

    openImagePickerAsync = async () => {
        let permissionResult = true;//await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

        if (pickerResult.cancelled == true) {
            alert('Image picker cancelled or failed');
            return;
        }

        const fileNameSplit = pickerResult.uri.split('/');
        const fileName = fileNameSplit[fileNameSplit.length - 1];

        let stateImages =  this.state.images;
        if (stateImages.length>=4) {
            alert("You can only select a maximum of 4 images!")
        } else {
            stateImages.push(
                {
                    uri: pickerResult.uri,
                    name: fileName,
                    type: 'image/jpeg'
                }
            )
            this.setState({images: stateImages})
        }

        /* let postForm = new FormData();
        postForm.append('myFiles', {
            uri: pickerResult.uri,
            name: fileName,
            type: 'image/jpeg'
        });
        postForm.append('foo', 'bar');

        console.log(postForm); */

    }

    inputHandler = (text, name) => {
        this.setState({ [name]: text })
    }

    submitHandler = () => {
        //Get date in format dd-mm-yyyy
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = dd+'-'+mm+'-'+yyyy;

        let form = new FormData();
        form.append("idUser", this.props.idUser);
        form.append("title", this.state.title);
        form.append("description", this.state.description);
        form.append("category", this.state.category);
        form.append("location", this.state.location);
        form.append("price", this.state.price);
        form.append("dateOfPosting", today);
        form.append("deliveryType", this.state.deliveryType);
        form.append("sellerInfo", this.state.sellerInfo);
        this.state.images.map(x=>{
            form.append('images', x);
        })

        fetch(this.props.apiURI + '/products', {
            method: 'POST',
            body: form,
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
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Create Posting</Text>
                    </View>
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

                    <View style={{ flex: 1, flexDirection: "row", marginVertical: 5, marginHorizontal: 5 }}>
                        <Text style={{ flex: 3, textAlignVertical: 'center', textAlign: "center" }}>Images</Text>
                        <View style={{ flex: 7, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{marginRight: 10}}>({this.state.images.length})</Text>
                            <TouchableOpacity onPress={this.openImagePickerAsync} style={{ borderWidth: 1, borderColor: 'black' }}>
                                <Text style={{ padding: 5 }}>Pick a photo</Text>
                            </TouchableOpacity>
                        </View>
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
                                height: 100
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

