
 import React, { FC, Fragment } from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
 } from 'react-native';
 import Buttons from '../components/Buttons';
import { AnswerObject } from '../screens/Quiz';

 interface Answers{
  useranswer:AnswerObject | undefined,
  answers:string[],
  setcorrectanswer:any,
  checkanswer:()=>void,
 }


 const Answers: FC<Answers>=(props) => {
   return (
     <SafeAreaView >
         <View style={{marginTop:10,paddingHorizontal:20}}>

             {props.answers.map((answer,key)=>{
                    return (
                      <View key={answer}>
                          <Buttons {...{key,answer}}
                          correct={props.useranswer?.correctanswer===answer}
                          disabled={props.useranswer?true:false}
                          onPress={()=>{
                              props.setcorrectanswer.current=answer,
                              props.checkanswer()
                            }}
                          />
                          </View>
                    )
             })
            }

           
           </View>
     </SafeAreaView>
   );
 };
 
 const styles=StyleSheet.create({
    questioncontainer:{flexDirection:'row',alignItems:'center',backgroundColor:'white',marginTop:10,paddingRight:16},
     
    textstyle:{padding:15,fontSize:15,color:'blue'},
 })
 
 
 export default Answers;
 