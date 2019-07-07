import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

export default function ActionButton({onPress, styles, text, color}){
  return(
    <TouchableOpacity style={[styles.actionBtn, {backgroundColor: color}]} onPress={onPress}>
      <Text style={styles.submitBtnText}>{text}</Text>
    </TouchableOpacity>
  ) 
}