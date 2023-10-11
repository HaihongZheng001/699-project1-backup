
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';




const getIconName = (icon) => {
  if (icon.includes('Clear')) {
    return <Ionicons name="ios-sunny" size={24} color="black" />
  } else if (icon.includes('Clouds')) {
    return <Ionicons name="rainy" size={24} color="black" />
  } else if (icon.includes('Rain')) {
    return <Ionicons name="cloudy-sharp" size={24} color="black" />
  } else {
    return <AntDesign name="questioncircle" size={24} color="black" />
  }
}

const getTime = () => {
  const date = new Date()
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
  return formattedDate;
}

function Weather({name, temp, icon}) {
  return (
    <View style={styles.weatherBox}>
      <View style={styles.weatherData}>
        <Text style={[styles.weatherlabel, {color:'grey'}]}>{name}</Text>
      </View>
      <View style={styles.weatherData}>
        <Text style={styles.weatherlabel}>{temp} ℉</Text>
      </View>
      <View style={styles.weatherData}>
        {getIconName(icon)}
      </View>
   </View>
  )
}

function App() {
  const [weatherList, setWeatherList] = useState([]);
  const [city, setCity] = useState('')
  const [curTime, setCurTime] = useState('')
  const mainCities = ['Ann Arbor', 'Chicago', 'Toronto', 'Seattle', 'London']

  useEffect(() => {
    mainCities.forEach(city => getWeather(city));
    // refreshWeather();
    setCurTime(getTime());
  }, []);

  const getWeather = async (city) => {
    
    let weatherResponse = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=2bad15c7bfb437be522ce24dc2de9631&units=imperial')
    // console.log(weatherResponse.status)
    if (weatherResponse.status === 200) {
      let weatherJson = await weatherResponse.json();
      let weatherObj =
        {
          name: weatherJson.name,
          temp: Math.round(weatherJson.main.temp),
          icon: weatherJson.weather[0].main
        }
      setWeatherList(prev => {
        // const updatedList = prev.filter(item => item.name !== city);
        // return [...updatedList, weatherObj];

        const updatedList = prev.filter(item => item.name !== city);
        const newList = [...updatedList, weatherObj];
        newList.sort((a, b) => {
          // mainCities.indexOf(a.name) - mainCities.indexOf(b.name)
          const indexA = mainCities.indexOf(a.name);
          const indexB = mainCities.indexOf(b.name);
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;

          return indexA - indexB;
        });
        return newList;
      })
    } else {
      let weatherJson = await weatherResponse.json();
      let weatherObj =
        {
          name: city,
          temp: '??',
          icon: 'unknown'
        }
      setWeatherList(prev => {
        const updatedList = prev.filter(item => item.name !== city);
        return [...updatedList, weatherObj];
      })

      setWeatherList(prev => {
        // const updatedList = prev.filter(item => item.name !== city);
        // return [...updatedList, weatherObj];

        const updatedList = prev.filter(item => item.name !== city);
        const newList = [...updatedList, weatherObj];
        newList.sort((a, b) => {
          // mainCities.indexOf(a.name) - mainCities.indexOf(b.name)
          const indexA = mainCities.indexOf(a.name);
          const indexB = mainCities.indexOf(b.name);
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;

          return indexA - indexB;
        });
        return newList;
      })

    }
  }



  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.heading}>
          Channel 669 Weather
        </Text>
      </View>

      <View style={styles.body}>


        <View style={styles.topBox}>
          {/* <View style={styles.topLeft}> */}
            <TextInput
              placeholder='enter city name'
              style={styles.inputBox}
              onChangeText={text=>setCity(text)}
              value={city}

            >
            </TextInput>
          {/* </View> */}
          <View style={styles.square} >
            <TouchableOpacity
              onPress={() => getWeather(city)}
            >
              <Entypo name="circle-with-plus" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.midBox}>
          <FlatList
            data={weatherList}
            renderItem={({item}) => { 
              // console.log({item})
              return (
                <Weather name={item.name} temp={item.temp} icon={item.icon}/>
              );
            }}
          />
        </View >

        <View style={styles.bottomBox}>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={() => {
              // refreshWeather();
              mainCities.forEach(city => getWeather(city));
              const date = getTime();
              setCurTime(date)
            }}
          >
            <Text style={styles.refreshLabel}>Refresh</Text>
          </TouchableOpacity>
          <Text style={styles.updateLabel}>Last updated: {curTime}</Text>
        </View>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    backgroundColor: '#00274C',
    alignItems: 'center',
    // justifyContent:'center',
  },
  body: {
    flex: 4,
    backgroundColor: 'pink',
  },
  heading: {
    color: '#FFCB05',
    fontSize: 28,
    paddingTop: '25%',
  
  },
  topBox: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  // topLeft: {
  //   backgroundColor: 'pink',
  //   height: '30%',
  //   width: '40%',
  // },

  inputBox: {
    backgroundColor: 'white',
    borderColor: 'black',
    height: '30%',
    width: '50%',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: '1%'
  },

  square: {
    backgroundColor: '#FFCB05',
    height: '30%',
    width: '8%',
    marginLeft: '1%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  bottomBox: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  refreshButton: {
    backgroundColor: '#FFCB05',
    width: '25%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: '1'
  },
  refreshLabel: {
    fontSize: 20,
  },
 updateLabel: {
  marginTop: '2%',
  fontSize: 12,
 },
 midBox: {
  flex: 4,
  backgroundColor: 'white',
},
 weatherBox: {
  // flex: 1,
  flexDirection: 'row',
  marginLeft: '12%',
  width: '100%'
 },
 weatherData: {
  flex: 1,
  marginTop: '3%',
 },
 weatherlabel: {
  fontSize: 16,
 }

});

export default App;
