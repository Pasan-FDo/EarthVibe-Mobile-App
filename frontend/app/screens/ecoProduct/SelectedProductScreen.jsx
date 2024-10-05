import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const SelectedProductScreen = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      statusPhotos: [
        { id: 1, image: 'https://www.bootdey.com/image/250x250/FF0000/FF0000', description: 'Tap the image to see the next' },
        { id: 2, image: 'https://www.bootdey.com/image/250x250/008B8B/008B8B', description: 'Tap another user to see the status' },
      ],
    },
    {
      id: 2,
      name: 'Alice',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      statusPhotos: [
        { id: 1, image: 'https://www.bootdey.com/image/250x250/7FFF00/7FFF00', description: '1 This is the description' },
        { id: 2, image: 'https://www.bootdey.com/image/250x250/6495ED/6495ED', description: '2 This is the description' },
        { id: 3, image: 'https://www.bootdey.com/image/250x250/008B8B/008B8B', description: '3 This is the description'},
        { id: 4, image: 'https://www.bootdey.com/image/250x250/00008B/00008B', description: '4 This is the description' },
      ],
    },
    {
      id: 3,
      name: 'Alice',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      statusPhotos: [
        { id: 1, image: 'https://www.bootdey.com/image/250x250/00CED1/00CED1', description: 'Tap the image to see the next' },
        { id: 2, image: 'https://www.bootdey.com/image/250x250/00CED1/00CED1', description: 'Tap another user to see the status' },
      ],
    },
    {
      id: 4,
      name: 'Alice',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar4.png',
      statusPhotos: [{ id: 1, image: 'https://www.bootdey.com/image/250x250/BA55D3/BA55D3', description: 'Alice enjoying the sunset' }],
    },
    {
      id: 5,
      name: 'Alice',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar5.png',
      statusPhotos: [{ id: 1, image: 'https://www.bootdey.com/image/250x250/FF4500/FF4500', description: 'Alice enjoying the sunset' }],
    },
    {
      id: 6,
      name: 'Alice',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar6.png',
      statusPhotos: [{ id: 1, image: 'https://www.bootdey.com/image/250x250/00FF00/00FF00', description: 'Alice enjoying the sunset' }],
    },
    {
      id: 7,
      name: 'Alice',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar7.png',
      statusPhotos: [{ id: 1, image: 'https://www.bootdey.com/image/250x250/FF4500/FF4500', description: 'Alice enjoying the sunset' }],
    },
    {
      id: 8,
      name: 'Alice',
      avatar: 'https://bootdey.com/img/Content/avatar/avatar8.png',
      statusPhotos: [{ id: 1, image: 'https://www.bootdey.com/image/250x250/191970/191970', description: 'Alice enjoying the sunset' }],
    },
  ]);
  const [selectedUser, setSelectedUser] = useState(1);
  const [statusPhotos, setStatusPhotos] = useState(users[0].statusPhotos);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);



  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
    setStatusPhotos(users.find((user) => user.id === userId)?.statusPhotos || []);
    setCurrentPhotoIndex(0);
  };

  const handleStatusPhotoPress = () => {
    if (statusPhotos.length > 0) {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % statusPhotos.length);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {users.map((user) => (
            <TouchableOpacity
              key={user.id}
              onPress={() => handleUserSelect(user.id)}
              style={styles.userItem}
            >
              <Image source={{ uri: user.avatar }} style={styles.userPhoto} />
              <Text style={selectedUser === user.id ? styles.selectedUserName : styles.userName}>{user.name}</Text>
              <Text style={styles.statusIndicator}>{user.statusPhotos.length}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {selectedUser && (
        <View style={styles.statusContainer}>
          <TouchableOpacity onPress={handleStatusPhotoPress}>
            <Image
              source={
                statusPhotos.length > 0
                  ? { uri: statusPhotos[currentPhotoIndex].image }
                  : { uri: users.find((user) => user.id === selectedUser)?.avatar }
              }
              style={styles.statusPhoto}
              resizeMode="cover"
            />
          </TouchableOpacity>
          {statusPhotos.length > 0 && (
            <Text style={styles.statusDescription}>{statusPhotos[currentPhotoIndex].description}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:60,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  userItem: {
    marginRight: 10,

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userName: {
    marginTop: 5,
    textAlign: 'center',
  },
  selectedUserName: {
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#DC143C'
  },
  statusIndicator: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 12,
    color: 'gray',
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPhoto: {
    width: windowWidth,
    height: windowHeight - 300,
  },
  statusDescription: {
    fontSize:18,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default SelectedProductScreen;