import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const WeightInfoItem = ({qty, weight}) => {
  return (
    <View style={styles.weightsInfoContainer}>
      <Text>
        {qty} pair{qty > 1 ? 's' : ''} of {weight} lbs disks
      </Text>
      <View style={styles.weightsInforBtnsContainer}>
        <TouchableOpacity>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[{marginLeft: 10}]}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weightsInfoContainer: {
    borderBottomWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  weightsInforBtnsContainer: {
    flexDirection: 'row',
  },
});

export default WeightInfoItem;
