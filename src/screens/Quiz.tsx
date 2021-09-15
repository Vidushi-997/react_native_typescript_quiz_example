
 import React, { FC ,useEffect,useRef,useState} from 'react';
 import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   ActivityIndicator
 } from 'react-native';
import { getquestiojns, Question } from '../utils/api';
import Questions from '../components/Question';
import Answers from '../components/Answers';
import { Icon } from 'react-native-elements';




 export type AnswerObject={
   question:string,
   answer:string,
   correct:boolean,
   correctanswer:string
 }
 
 const Quiz: FC=(props) => {
   const [loader,setloader]=useState(false)
   const [question,setquestion]=useState<Question[]>([])
   const [useranswers,setuseranswers]=useState<AnswerObject[]>([])
   const [score,setscore]=useState(0)
   const [number,setnumber]=useState(0)
   const [totalquestion]=useState(10)
   const [gameover,setgameover]=useState(true)
   const setcorrectanswer=useRef(null)
   const [correcta,setcorrecta]=useState("")
 
  useEffect(()=>{
   
      startQuiz()
  },[])
   const startQuiz=async ()=>{
    setnumber(0)
       setloader(true)
       setgameover(false)
       const newquestions=await getquestiojns()
       console.log(newquestions)
       setquestion(newquestions)
       setscore(0)
       setuseranswers([])
       setloader(false)
       
   }
   const nextQuestion=()=>{
     
     const nextq=number+1
     if(nextq==totalquestion)
     {
       setgameover(true)
     }
     else{
       setnumber(nextq)
     }
   }
   const checkanswer=()=>{
     if(!gameover)
     {
       const answer=setcorrectanswer.current
      
       const correcta=question[number].correct_answer===answer
      
      if(correcta) setscore((prev)=>prev+1)
    
      const answerobject={
        question:question[number].question,
        answer,
        correcta,
        correctanswer:question[number].correct_answer
      }

      setuseranswers((prev)=>[...prev,answerobject])
      setTimeout(() => {
        nextQuestion()
      }, 1000);
     }
   }
   
   return (
        <View style={{flex:1}}>
          {!loader?<View>
            <View style={styles.container}>
              <Text style={styles.textstyle}>Questions</Text>
              <Text style={styles.textstyle}>{number+1}/{totalquestion}</Text>
           </View>
           <View style={{marginLeft:20}}>
              <Text style={styles.textstyle}>Score : {score}</Text>
           </View>
         {question.length>0? 
         <>
         <Questions QuestionNo={number+1} Question={question[number].question}/>
          <Answers answers={question[number].answers}
            {...{setcorrectanswer,checkanswer}}
          useranswer={useranswers?useranswers[number]:undefined}
          />
          </>
          :    null}
        </View>:
        <ActivityIndicator style={{justifyContent:'center',top:200}} size={50} color="black"/>}
        
        <View>
             
                {!gameover && !loader && number!=totalquestion-1 ?
                    <TouchableOpacity onPress={()=>nextQuestion()} >
                    <Icon name="arrowright" size={40} color="black" type="antdesign" style={{left:130,margin:20}}  />
                    </TouchableOpacity>
                 : (number==totalquestion-1? <TouchableOpacity onPress={()=>startQuiz()}>
                 <Icon name="controller-play" size={40} color="black" type="entypo"  style={{left:130,margin:20}}/>
               </TouchableOpacity> :null)
                  }

        </View>

         </View>
   );
 };
 
 const styles=StyleSheet.create({


     container:{flexDirection:'row',justifyContent:'space-between',marginTop:70,backgroundColor:'white'},
     textstyle:{padding:15,fontSize:15,color:'blue'},
     bottomview:{padding:13,backgroundColor:'blue',borderRadius:300,width:70,height:70,position:'absolute',right:20,top:550},
     questioncontainer:{flexDirection:'row',alignItems:'center',backgroundColor:'white',marginTop:10,paddingRight:16},
    iconstyle:{backgroundColor:'blue',borderRadius:50,width: 70,height: 70,margin:5,top:100,left:260 },
 
})
 
 
 export default Quiz;
 