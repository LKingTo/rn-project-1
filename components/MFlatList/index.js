import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from 'react-native';

/**
 * FlatList https://reactnative.cn/docs/flatlist/
 * 继承所有ScrollView 的 Props
 * @props
 * @renderItem: renderItem({item, index, separators})
 * @ItemSeparatorComponent: 行与行之间的分隔线组件。
 * @ListEmptyComponent: 列表为空时渲染该组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element。
 */
class MFlatList extends React.Component {
  constructor(props) {
    super(props);
  }
  _onPress = item => {
    console.log('onPress', item);
  };
  _createList = () => {
    let list = [];
    for (let i = 1; i <= 30; i += 1) {
      list.push({title: `list item ${i}`, key: `item${i}`});
    }
    return list;
  };
  render() {
    const ITEM_HEIGHT = 50;
    return (
      <View>
        <Text style={styles.text}>FlatList 1</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Button
            style={styles.text}
            title="scrollToEnd"
            onPress={() => {
              this._flatList.scrollToEnd();
            }}
          />
          <Button
            style={styles.text}
            title="scrollToTop"
            onPress={() => {
              this._flatList.scrollToIndex({index: 0});
            }}
          />
        </View>
        <View style={[styles.container]}>
          <FlatList
            ref={flatList => (this._flatList = flatList)}
            ItemSeparatorComponent={
              Platform.OS !== 'android' &&
              (({highlighted}) => (
                <View
                  style={[styles.separator, highlighted && {marginLeft: 0}]}
                />
              ))
            }
            ListEmptyComponent={
              <Text style={{textAlign: 'center', lineHeight: 30}}>
                暂无数据
              </Text>
            }
            ListHeaderComponent={
              <Text style={{textAlign: 'center', lineHeight: 30}}>列表头</Text>
            }
            ListFooterComponent={
              <Text style={{textAlign: 'center', lineHeight: 30}}>列表尾</Text>
            }
            data={this._createList()}
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            initialNumToRender={10} /* 初始渲染数量 */
            initialScrollIndex={5} /* 定位到第几个 */
            // inverted={true} /* 倒序 */
            keyExtractor={(item, index) => item.title} /*设置key，默认取'key'*/
            // numColumns={2} /*多列设置*/
            onEndReachedThreshold={
              0.3
            } /*当距离内容最底部还有多远时触发onEndReached回调，值为比例非像素*/
            onEndReached={({distanceFromEnd}) => {
              console.log(distanceFromEnd);
            }}
            // refreshing={true}
            renderItem={({item, index, separators}) => (
              <TouchableHighlight
                onPress={() => this._onPress(item)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <View style={{backgroundColor: 'pink', padding: 10}}>
                  <Text>{item.title}</Text>
                </View>
              </TouchableHighlight>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 500,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  text: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
});

export default MFlatList;
