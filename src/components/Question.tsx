
 import React, { FC } from 'react';
 import {
   SafeAreaView,
     StyleSheet,
   Text,
   View,
   TouchableOpacity,
 } from 'react-native';
 
 interface Question{
  QuestionNo:number,
  Question:string
 }


 const Questions: FC<Question>=(props) => {
   return (
     <SafeAreaView >
         <View style={styles.questioncontainer}>
              <Text style={styles.textstyle}>{props.QuestionNo}</Text>
              <Text style={{fontSize:15,color:'black',textAlign:'left',marginRight:7}}>{props.Question}</Text>
           </View>
     </SafeAreaView>
   );
 };
 
 const styles=StyleSheet.create({
    questioncontainer:{flexDirection:'row',alignItems:'center',backgroundColor:'white',marginTop:10,paddingRight:16},
     
    textstyle:{padding:15,fontSize:15,color:'blue'},
 })
 
 
 export default Questions;
 