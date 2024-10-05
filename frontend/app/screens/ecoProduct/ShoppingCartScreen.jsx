import React, { useState } from 'react'
import { View, Text, Button, Image, StyleSheet } from 'react-native'

const items = [
  { id: 1, name: 'Item 1', price: '$10', quantity: 1, image: 'https://www.bootdey.com/image/280x280/00FFFF/000000' },
  { id: 2, name: 'Item 2', price: '$20', quantity: 1, image: 'https://www.bootdey.com/image/280x280/FF00FF/000000' },
  { id: 3, name: 'Item 3', price: '$30', quantity: 1, image: 'https://www.bootdey.com/image/280x280/FF7F50/000000' },
]

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState(items)

  const addItem = item => {
    setCartItems([...cartItems, item])
  }

  const removeItem = item => {
    setCartItems(cartItems.filter(i => i !== item))
  }

  const increaseQuantity = item => {
    const newCartItems = cartItems.map(i => {
      if (i === item) {
        return { ...i, quantity: i.quantity + 1 }
      }
      return i
    })
    setCartItems(newCartItems)
  }

  const decreaseQuantity = item => {
    const newCartItems = cartItems.map(i => {
      if (i === item && i.quantity > 1) {
        return { ...i, quantity: i.quantity - 1 }
      }
      return i
    })
    setCartItems(newCartItems)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Shopping Cart</Text>
      {cartItems.map(item => (
        <View key={item.id} style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <Button title="-" onPress={() => decreaseQuantity(item)} />
            <Text style={styles.quantity}>{item.quantity}</Text>
            <Button title="+" onPress={() => increaseQuantity(item)} />
          </View>
          <View style={styles.removeButton}>
            <Button title="Remove" onPress={() => removeItem(item)} />
          </View>
        </View>
      ))}
      <Button
        title="Add Item"
        onPress={() =>
          addItem({
            id: Math.random(),
            name: 'Item 1',
            price: '$10',
            image: 'https://www.bootdey.com/image/280x280/00FFFF/000000',
            quantity: 1,
          })
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:10,
  },
  tittle:{
    fontSize:24,
    marginBottom:20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#cccccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  removeButton: {
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    marginRight: 10,
  },
})

export default ShoppingCart