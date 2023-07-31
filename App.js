import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, SafeAreaView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const imagenes = [
  'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
  'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
  'https://rickandmortyapi.com/api/character/avatar/5.jpeg'
];

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO_LATERAL = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 0.5;

function BackDrop({ scrollX }) {
  return (
    <View 
      style={([{ 
        height: ALTURA_BACKDROP, 
        width, 
        position: 'absolute', 
        top: 0 
      }],
      StyleSheet.absoluteFillObject
    )}>
      {imagenes.map((imagen, index) => {
        const inputRange = [
          (index - 1) * ANCHO_CONTENEDOR,
          index * ANCHO_CONTENEDOR,
          (index + 1) * ANCHO_CONTENEDOR
        ];
        const outputRange = [0, 1, 0];
        const opacity = scrollX.interpolate({ inputRange, outputRange })

        return <Animated.Image 
          source={{uri: imagen}} 
          key={index}
          blurRadius={10}
          style={[{ 
            height: ALTURA_BACKDROP, 
            width, 
            position: 'absolute', 
            top: 0,
            opacity
          }]}/>
      })}

      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
        start={[0, 0]}
        end={[0, 1]}
        style={{
          height: ALTURA_BACKDROP,
          width,
          position: 'absolute',
          top: 0
        }}
      />
    </View>
  )
};

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <BackDrop scrollX={scrollX}/>
      <StatusBar hidden />
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX }}}],
          { useNativeDriver: true }
        )} 
        data={imagenes} 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 200, paddingHorizontal: ESPACIO_LATERAL }}
        decelerationRate={0}
        snapToInterval={ANCHO_CONTENEDOR}
        scrollEventThrottle={16}
        keyExtractor={item => item}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ANCHO_CONTENEDOR,
            index * ANCHO_CONTENEDOR,
            (index + 1) * ANCHO_CONTENEDOR
          ];
          const outputRange = [0, -50, 0];
          const translateY = scrollX.interpolate({ inputRange, outputRange })

          return (
            <View style={{width: ANCHO_CONTENEDOR}}>
              <Animated.View 
                style={{
                  marginHorizontal: ESPACIO,
                  padding: ESPACIO,
                  borderRadius: 34,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  transform: [{ translateY }]
                }}>
                  <Image source={{uri: item}} style={styles.posterImage}/>
                </Animated.View>
            </View>
          )
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterImage: {
    width: '100%',
    height: ANCHO_CONTENEDOR * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10
  }
});
