/**
 * React Navigation组件
 * https://reactnavigation.org/docs/getting-started
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, TextInput, Button, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

function HomeScreen({route, navigation}) {
  /**
   * {route, navigation}为默认参数 https://reactnavigation.org/docs/navigation-prop/
   * navigation.navigate('栈名', params) 跳转screen/路由; params - 传参
   * navigation.push('栈名') 新push一个路由
   * navigation.goBack() 返回上一个路由
   * navigation.popToTop() 返回第一个screen
   * navigation.setOptions() 设置options
   */
  React.useEffect(() => {
    if (route.params?.post) {
      console.log('返回参数：', route.params?.post);
    }
  }, [route.params]);
  const {itemId} = route.params;
  // 内置设置右上角按钮，动态修改数据
  const [count, setCount] = React.useState(0);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount(c => c + 1)} title="Update count" />
      ),
    });
  }, [navigation, setCount]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
      }}>
      <Text>Home Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>返回参数Post: {route.params?.post}</Text>
      <Text>{count}</Text>
      <Button
        title="Go to Post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }
      />
      {/*<Button title="Go back" onPress={() => navigation.goBack()} /> //已是第一个screen，无法goBack*/}
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({title: 'Updated!'})}
      />
    </View>
  );
}

function CreatePostScreen({route, navigation}) {
  const [postText, setPostText] = React.useState('');
  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{height: 200, padding: 10, backgroundColor: 'white'}}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => navigation.navigate('Home', {post: postText})}
      />
    </>
  );
}

function DetailsScreen({route, navigation}) {
  /**
   * route: 路由对象
   * route.params: 入参
   */
  const {itemId, otherParam} = route.params;
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgreen',
      }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        // onPress={() => navigation.navigate('Details')} // 跳转当前无效
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        } // 路由堆栈（新push一个details页面）
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{width: 50, height: 50}}
      source={require('../EPL-logo.png')}
    />
  );
}

const Stack = createStackNavigator();

/**
 * Stack.Navigator: 路由栈容器
 * props.screenOptions: 通用配置
 * Stack.Screen(props): 一个路由页面screen
 * props.name: 路由名
 * props.component: 路由引用的组件
 * props.options: 配置项
 *  {
 *    title: header title
 *    headerStyle: { backgroundColor: '#f4511e',},
 *    headerTintColor: '#fff',
 *    headerTitleStyle: { fontWeight: 'bold',},
 *    headerTitle: () => {<></>} 自定义title
 *    headerRight: () => {<></>} 设置header右按钮
 *  }
 * props.initialParams: 初始化参数
 */
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'My home',
            headerStyle: {
              backgroundColor: '#f48f98',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          initialParams={{itemId: 42}} // 初始化参数
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={{
            headerTitle: props => <LogoTitle {...props} />, // 自定义header
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
              />
            ),
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({route}) => ({title: route.params.name})} // 参数作为title
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
