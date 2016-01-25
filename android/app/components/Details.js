'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
  View,
  TouchableNativeFeedback,
  TouchableHighlight,
} = React;


var Details = React.createClass({
  readBook(book) {
    // fix for iOS/Android dismiss keyboard needs to be added
    this.props.navigator.push({
      title: book.title,
      name: 'reader',
      book: book,
    });
  },
  render() {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    // want to replace this with URI for local database   'http://localhost:5984/demoapp'   ... + this.props.book.thumbnail
    var imageURI = 'https://raw.githubusercontent.com/' + this.props.book.full_name + '/master/cover.jpg';
    var book = this.props.book;
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.mainSection}>
          {/* $FlowIssue #7363964 - There's a bug in Flow where you cannot
            * omit a property or set it to undefined if it's inside a shape,
            * even if it isn't required */}
          <View style={styles.rightPane}>
            <Text style={styles.movieTitle}>{this.props.book.title}</Text>
            <Image 
              source={{uri: imageURI}} 
              style={styles.thumbnail} />
          </View>
          <TouchableElement
            background={TouchableElement.Ripple()}
            onPress={() => this.readBook(book)} >
            <View style={styles.button} >
              <Text style={styles.title}>Read</Text>
            </View>
          </TouchableElement>
        </View>
      </ScrollView>
    );
  },
});



var styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
  rightPane: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  movieTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  rating: {
    marginTop: 10,
  },
  mainSection: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  thumbnail: {
    width: 134,
    height: 200,
    backgroundColor: '#eaeaea',
    marginRight: 10,
  },
  button: {
    marginBottom: 7,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d6d7da',
    backgroundColor: '#33b5e5',
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = Details;