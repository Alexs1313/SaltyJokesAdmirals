import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const SmallButton = ({ onPress, style, title, type }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.shareBtn, style]}
    >
      <Text style={styles.btnText}>{title}</Text>
      {type === 'Share' ? (
        <Image source={require('../assets/icons/share.png')} />
      ) : (
        <Image source={require('../assets/icons/retry.png')} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontWeight: 'bold',
    fontSize: 11,
    color: '#0F4398',
  },
  shareBtn: {
    minWidth: '33%',
    height: 42,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,

    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
  },
});

export default SmallButton;
