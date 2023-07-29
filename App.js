import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, SafeAreaView, Animated } from 'react-native';

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
const ESPACIO = 10;

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <FlatList 
        data={imagenes} 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 200}}
        decelerationRate={0}
        snapToInterval={ANCHO_CONTENEDOR}
        scrollEventThrottle={16}
        keyExtractor={item => item}
        renderItem={({ item, index }) => {
          return (
            <View style={{width: ANCHO_CONTENEDOR}}>
              <View 
                style={{
                  marginHorizontal: ESPACIO,
                  padding: ESPACIO,
                  borderRadius: 34,
                  backgroundColor: '#fff',
                  alignItems: 'center'
                }}>
                  <Image source={{uri: item}} style={styles.posterImage}/>
                </View>
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
