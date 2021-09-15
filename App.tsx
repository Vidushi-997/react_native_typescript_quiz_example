
import React, { FC } from 'react';
import {
  SafeAreaView,
  Text,
} from 'react-native';
import HeaderClass from './src/components/Headers';
import Quiz from './src/screens/Quiz';


const App: FC=() => {
  

  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
      <HeaderClass title={"Quiz App"}/>
     <Quiz/>
    </SafeAreaView>
  );
};



export default App;
