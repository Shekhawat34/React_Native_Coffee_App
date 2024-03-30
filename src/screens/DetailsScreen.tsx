import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';


const DetailsScreen = ({navigation,route}:any) => {
  const ItemOfIndex=useStore((state:any)=>
  route.params.type=="Coffee"?state.CoffeeList:state.BeanList,
  )[route.params.index];

  const addToFavoriteList=useStore((state:any)=>
  state.addToFavoriteList);
  const deleteFromFavoriteList=useStore((state:any)=>
  state.deleteFromFavoriteList);
const ToggleFavourite=(
  favourite:boolean,type:string,id:string
)=>{
  favourite?deleteFromFavoriteList(type,id):addToFavoriteList(type,id)

};
const BackHandler=()=>{
  navigation.pop();
}

const [fullDesc,setFulDesc]=useState(false);

  return (
    <View style={styles.ScreenContainer}>
    <StatusBar backgroundColor={COLORS.primaryBlackHex}/> 
    <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.ScrollViewFlex}
    >
      <ImageBackgroundInfo
      EnableBackHandler={true}
      imagelink_portrait={ItemOfIndex.imagelink_portrait}
      type={ItemOfIndex.type}
      id= {ItemOfIndex.id}
      favourite={ItemOfIndex.favourite}
      name= {ItemOfIndex.name}
      special_ingredient= {ItemOfIndex.special_ingredient}
      ingredients= {ItemOfIndex.ingredients}
      average_rating= {ItemOfIndex.average_rating}
      ratings_count= {ItemOfIndex.ratings_count}
      roasted= {ItemOfIndex.roasted}
      BackHandler={BackHandler}
      ToggleFavourite={ToggleFavourite}
      />
      <View style={styles.FontInfoArea}>
        <Text style={styles.InfoTitle}>Description</Text>
        {fullDesc?(<TouchableWithoutFeedback onPress={()=>{setFulDesc(prev=>!prev)}}>
          <Text style={styles.DescriptionText}>{ItemOfIndex.description}</Text>
        </TouchableWithoutFeedback>):
        (<TouchableWithoutFeedback onPress={()=>{setFulDesc(prev=>!prev)}}>
          <Text numberOfLines={3} style={styles.DescriptionText}>{ItemOfIndex.description}</Text>
        </TouchableWithoutFeedback>)}

      <Text style={styles.InfoTitle}>Size</Text>
      <View style={styles.SizeOuterContainer}>
        {ItemOfIndex.prices.map((data:any)=>(
          <TouchableOpacity key={data.size}>
            <Text>{data.size}</Text>
          </TouchableOpacity>
        ))}

      </View>

      </View>
      

    </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
    backgroundColor:COLORS.primaryBlackHex,
  },
  ScrollViewFlex:{
    flexGrow:1,  // it will grow the flex value to the entire scrolled screen size.
  },
  FontInfoArea:{
    padding:SPACING.space_20,

  },
  InfoTitle:{
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_16,
    color:COLORS.primaryWhiteHex,
    marginBottom:SPACING.space_10,

  },
  DescriptionText:{
    letterSpacing:0.5,
    fontFamily:FONTFAMILY.poppins_regular,
    fontSize:FONTSIZE.size_14,
    color:COLORS.primaryWhiteHex,
    marginBottom:SPACING.space_30,

  },
  SizeOuterContainer:{

  },
});
export default DetailsScreen;