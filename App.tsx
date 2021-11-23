import React, {useState} from 'react';
import shortid from 'shortid';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

import {WeightInfoItem} from './components';

interface IWeightItem {
  id: string;
  qty: number;
  weight: number;
}

const App = (): React.ReactElement => {
  const [weightsList, setWeightsList] = useState<IWeightItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [weightValue, setWeighValue] = useState('');
  const [weightQty, setWeightQty] = useState('');
  const [barWeight, setBarWeight] = useState('');
  const [totalWeight, setTotalWeight] = useState('');
  const [responseText, setResponseText] = useState('');

  const clearInputs = () => {
    setWeighValue('');
    setWeightQty('');
  };

  const addWeight = () => {
    const id = shortid.generate();
    const item = {id, qty: +weightQty, weight: +weightValue};
    setWeightsList(prevList => [...prevList, item]);
    clearInputs();
  };

  const calculateStack = () => {
    let weight = +totalWeight - +barWeight;
    let neededDisks: [number, number][] = [];
    for (const weightItem of weightsList) {
      const reamainingQty = weightItem.qty;
      let neededQty = 0;
      for (let i = reamainingQty; i > 0; i--) {
        if (weight - +weightItem.weight * 2 < 0) break;
        weight -= +weightItem.weight * 2;
        neededQty++;
      }
      if (neededQty <= 0) continue;
      neededDisks = [...neededDisks, [+weightItem.weight, neededQty]];
      if (weight === 0) break;
    }
    let text = '';
    for (const [index, item] of neededDisks.entries()) {
      const [value, quantity] = item;
      text += `${quantity} pair${quantity > 1 ? 's' : ''} of ${value} lbs${
        index === neededDisks.length - 2
          ? ' and '
          : index < neededDisks.length - 1
          ? ', '
          : ''
      }`;
    }
    text =
      weight === 0
        ? `You need to stack ${text} per side in order to lift ${totalWeight} lbs with a bar of ${barWeight} lbs`
        : `You don't have the necesary equipment to lift ${totalWeight} lbs with a ${barWeight} lbs bar, but you can stack ${text} per side to lift ${
            +totalWeight - weight
          } lbs`;
    setResponseText(text);
  };

  return (
    <SafeAreaView style={styles.mainCointaner}>
      <FlatList
        data={weightsList}
        renderItem={({item}) => (
          <WeightInfoItem qty={item.qty} weight={item.weight} />
        )}
        keyExtractor={item => item.id}
      />
      <ScrollView>
        <Text style={styles.label}>
          Input the disk weight and quantity in pairs (If you have two, just
          enter 1)
        </Text>
        <View style={styles.weightInputsContainer}>
          <TextInput
            value={weightValue}
            style={styles.weightField}
            placeholder="Enter weight"
            keyboardType="number-pad"
            onChangeText={value => {
              setWeighValue(value);
            }}
          />
          <Text style={{marginHorizontal: 10}}> x </Text>
          <TextInput
            style={styles.weightField}
            value={weightQty}
            placeholder="Qty"
            keyboardType="number-pad"
            onChangeText={value => {
              setWeightQty(value);
            }}
          />
        </View>
        <View style={styles.btnsContainer}>
          <TouchableOpacity style={styles.controlBtn} onPress={clearInputs}>
            <Text style={styles.controlBtnText}>
              {isEditing ? 'Cancel' : 'Clear'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.controlBtn, {marginLeft: 10}]}
            onPress={addWeight}>
            <Text style={styles.controlBtnText}>Add disk</Text>
          </TouchableOpacity>
        </View>
        <Text style={{marginTop: 20, marginBottom: 10}}>
          Weight you want to lift:
        </Text>
        <TextInput
          style={[styles.weightField, {alignSelf: 'flex-start'}]}
          placeholder="Weight"
          keyboardType="number-pad"
          value={totalWeight}
          onChangeText={value => setTotalWeight(value)}
        />
        <Text style={{marginTop: 10, marginBottom: 10}}>Bar weight:</Text>
        <TextInput
          style={[
            styles.weightField,
            {marginBottom: 20, alignSelf: 'flex-start'},
          ]}
          placeholder="Weight"
          keyboardType="number-pad"
          value={barWeight}
          onChangeText={value => setBarWeight(value)}
        />
        <TouchableOpacity style={styles.controlBtn} onPress={calculateStack}>
          <Text style={styles.controlBtnText}>Stack weights</Text>
        </TouchableOpacity>
        <Text style={{marginTop: 10}}>{responseText}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainCointaner: {
    padding: 10,
  },

  weightInputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  weightField: {
    borderWidth: 1,
    padding: 8,
  },

  label: {
    marginVertical: 20,
  },

  btnsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  controlBtn: {
    borderWidth: 1,
    flex: 1,
    padding: 10,
  },

  controlBtnText: {
    textAlign: 'center',
  },
});

export default App;
