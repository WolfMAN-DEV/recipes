import React, {useEffect} from 'react';
import {StyleSheet, View, ImageBackground, ScrollView, Text} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from "../components/HeaderButton";
import {useDispatch, useSelector} from "react-redux";
import {addRecipeToFavorites, removeRecipeFromFavorites} from "../actions";

const RecipeScreen = ({navigation: {getParam, setParams}}) => {
    const {complexity, duration, affordability, ingredients, steps, isGlutenFree, isLactoseFree, isVegan, isVegetarian, imageUrl} = getParam('recipe');

    const dispatch = useDispatch();

    const favoriteRecipes = useSelector(({favoriteRecipes}) => favoriteRecipes);

    useEffect(() => {
        setParams({
            dispatch,
            favoriteRecipes
        });
    }, [favoriteRecipes]);

    return (
        <ScrollView>
            <View style={styles.screen}>
                <ImageBackground source={{
                    uri: imageUrl
                }} style={styles.image}/>
            </View>
            <View style={{...styles.screen, padding: 10}}>
                <View style={styles.recipeDetail}>
                    <Text style={{...styles.text}}>{complexity}</Text>
                    <Text style={styles.text}>{duration}m</Text>
                    <Text style={styles.text}>{affordability}</Text>
                </View>
                <Text style={styles.title}>Ingredients</Text>
                {ingredients.map(ingredient => <Text key={ingredient} style={styles.ingredient}>{ingredient}</Text>)}
                <Text style={styles.steps}>{steps.join('\n')}</Text>
                <View style={styles.detailRow}>
                    <Text style={styles.text}>Gluten Free</Text>
                    <Text styles={styles.text}>{isGlutenFree ? 'Yes' : 'No'}</Text>
                </View>
                <View style={styles.line}/>
                <View style={styles.detailRow}>
                    <Text style={styles.text}>Lactose Free</Text>
                    <Text styles={styles.text}>{isLactoseFree ? 'Yes' : 'No'}</Text>
                </View>
                <View style={styles.line}/>
                <View style={styles.detailRow}>
                    <Text style={styles.text}>Vegan</Text>
                    <Text styles={styles.text}>{isVegan ? 'Yes' : 'No'}</Text>
                </View>
                <View style={styles.line}/>
                <View style={styles.detailRow}>
                    <Text style={styles.text}>Vegetarian</Text>
                    <Text styles={styles.text}>{isVegetarian ? 'Yes' : 'No'}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

RecipeScreen.navigationOptions = ({navigation: {getParam, toggleDrawer}}) => {
    const {id, title} = getParam('recipe');

    const {color} = getParam('category');

    const dispatch = getParam('dispatch');

    const favoriteRecipes = getParam('favoriteRecipes');

    const isFav = favoriteRecipes ? favoriteRecipes.includes(id) : getParam('isFav');

    return {
        headerTitle: `${title} Recipes`,
        headerStyle: {
            backgroundColor: color
        },
        headerTintColor: '#f5f6f7',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                {isFav ?
                    <Item title="Favorite" iconName="ios-star" onPress={() => {
                        dispatch(removeRecipeFromFavorites(id));
                    }
                    }/> :
                    <Item title="Favorite" iconName="ios-star-outline" onPress={() => {
                        dispatch(addRecipeToFavorites(id));
                    }
                    }/>
                }
            </HeaderButtons>
        ),
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="menu" iconName="ios-menu" onPress={() => toggleDrawer()}/>
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    recipeDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    text: {
        color: '#232425',
        fontFamily: 'libre-baskerville'
    },
    title: {
        fontSize: 24,
        fontFamily: 'libre-baskerville-bold',
        marginBottom: 10,
        marginTop: 12
    },
    ingredient: {
        fontSize: 16,
        fontFamily: 'libre-baskerville-italic',
        marginLeft: 10
    },
    steps: {
        fontSize: 14,
        margin: 4,
        fontFamily: 'libre-baskerville'
    },
    detailRow: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    line: {
        height: 2,
        marginHorizontal: 30,
        backgroundColor: '#232425'
    },
    image: {
        width: '100%',
        height: 200
    }
});

export default RecipeScreen;