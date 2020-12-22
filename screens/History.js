import React, { useState } from 'react';
import {
  View,
  FlatList,
  Button,
  StyleSheet
} from 'react-native';
import { DataTable } from 'react-native-paper';
import Constants from 'expo-constants';

const History = ({route,navigation}) => {
  const [getHistory, setHistory] = useState(route.params.history);
  
  const clearHistory = () => {
    setHistory ({
      price: "",
      discount: "",
      finalPrice: ""
    })
  }

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data = {getHistory}
          renderItem = {({item}) => (
            <View>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Price</DataTable.Title>
                  <DataTable.Title>Discount</DataTable.Title>
                  <DataTable.Title>Final Price</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>{item.price}</DataTable.Cell>
                  <DataTable.Cell>{item.discount} %</DataTable.Cell>
                  <DataTable.Cell>{item.finalPrice}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Pagination
                  page = {1}
                  numberOfPages = {3}
                  onPageChange = {page => {
                  }}
                  label="1-2 of 6"
                />
              </DataTable> 
            </View>
          )}
          keyExtractor={(item, index) => item.id} 
        />
        <Button title="Clear All" onPress = {clearHistory}/>
      </View>
    </View>
  );
}

export default History;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1
  }
});