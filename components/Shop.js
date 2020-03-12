import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';


export default class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsList = [
                {
                    "id": 1,
                    "title": "bike",
                    "description": "for cycling",
                    "category": "machine",
                    "location": "Oulu",
                    "images": [
                        "download (1).jpg"
                    ],
                    "price": "100$",
                    "dateOfPosting": "23/2/2020",
                    "deliveryType": "shipping",
                    "sellerInfo": "sellerInfo1"
                },
                {
                    "id": 2,
                    "title": "bike",
                    "description": "for cycling",
                    "category": "machine",
                    "location": "Oulu",
                    "images": [
                        "download (1).jpg"
                    ],
                    "price": "100$",
                    "dateOfPosting": "23/2/2020",
                    "deliveryType": "shipping",
                    "sellerInfo": "sellerInfo1"
                }
            ]
        }
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Shop!</Text>
            </View>
        )
    }
}
