import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Navigation,
  NavigatorIOS,
} from 'react-native';
import Constants from 'expo-constants';

const HistoryBtn = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.historyBtnContainer}>
      <Text style={styles.historyBtnText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const HomePage = ({route,navigation}) => {
  const [getPrice, setPrice] = useState(0);
  const [getDiscount, setDiscount] = useState(0);
  const [getSaving, setSaving] = useState(0);
  const [getFinalPrice, setFinalPrice] = useState(0);
  const [getError, setError] = useState("");
  const [getShowButton, setShowButton] = useState(false);
  
  const [getHistory, setHistory] = useState(
    [{
      price: "",
      discount: "",
      finalPrice: ""
    }]
  );

  const updatePrice = (Price) => {
    var enteredPrice = Price;
    setPrice(enteredPrice);
    setShowButton(true);
    var saving = enteredPrice * (getDiscount / 100);
    setSaving(saving);
    var finalPrice = enteredPrice-saving;
    setFinalPrice(finalPrice);
    if (finalPrice == 0 || getDiscount == 0)
      setShowButton(false);
    else
      setShowButton(true);
  }
  
  const updateGetDiscount = (Discount) => {
    var enteredDiscount = Discount;
    setDiscount(enteredDiscount);
    var saving = (getPrice * (enteredDiscount / 100));
    setSaving(saving);
    var finalPrice = getPrice-saving;
    setFinalPrice(finalPrice);
    if (enteredDiscount == 0)
      setShowButton(false);
    else if (enteredDiscount > 100) {
      setError("Discount % must be <= 100");
      setShowButton(false);
    }
    else if (enteredDiscount != 0 && enteredDiscount != 0) {
      setError("");
      setShowButton(true);
    } 
  }

  const saveHistory = () => {
    setHistory([...getHistory, {
      price: getPrice,
      discount: getDiscount,
      finalPrice: getFinalPrice
    }]);
    setShowButton(false);
  }

  const showHistory = () => {
    navigation.navigate('History',{
      history: getHistory
    });
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>DISCOUNT CALCULATOR</Text>
        <HistoryBtn title="⟳" onPress = {showHistory}/>
      </View>
      <View style={styles.container}>
        <TextInput
          style = {styles.input}
          placeholder = "Actual Price"
          keyboardType = 'numeric'
          onChangeText = { Price => updatePrice(Price) }
        />
        <TextInput
          style = {styles.input}
          placeholder="Discount %"
          keyboardType='numeric'
          onChangeText={ Discount => updateGetDiscount(Discount) }
        />
        <Text>{getError}</Text>
        <Text>Actual Price: {getPrice}</Text>
        <Text>Discount: {getDiscount}</Text>
        <Text>You Save: {getSaving} </Text>
        <Text>Final Price: {getFinalPrice}</Text>
        { getShowButton ? <Button title="Save" onPress={saveHistory}/> : null }
      </View>
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: '#ffc87c',
  },
  input: {
    height: 50,
    width: 150,
    margin: 15,
    textAlign: 'center',
    borderRadius: 5,
    borderColor: '#964B00',
    borderWidth: 3
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop:20,
    marginLeft: 50,
    marginRight: 10
  },
  historyBtnContainer: {
    elevation: 8,
    backgroundColor: "green",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginTop: 5,
    marginRight: 40,
    width: 45,
    height: 60
  },
  historyBtnText: {
    fontSize: 35,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
