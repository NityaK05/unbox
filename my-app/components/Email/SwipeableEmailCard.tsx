import React from 'react';
import { Animated, PanResponder, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Badge } from './Badge';
import { Email } from './types';

interface SwipeableEmailCardProps {
  email: Email;
  onSwipe: () => void;
  index: number;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export function SwipeableEmailCard({ email, onSwipe, index }: SwipeableEmailCardProps) {
  const position = React.useRef(new Animated.ValueXY()).current;
  const [swiped, setSwiped] = React.useState(false);

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 10,
      onPanResponderMove: Animated.event([
        null,
        { dx: position.x, dy: position.y },
      ], { useNativeDriver: false }),
      onPanResponderRelease: (_, gesture) => {
        if (Math.abs(gesture.dx) > 100) {
          Animated.timing(position, {
            toValue: { x: gesture.dx > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH, y: 0 },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            setSwiped(true);
            onSwipe();
          });
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  if (swiped) return null;

  // Card stacking effect
  const cardStyle = {
    transform: [
      { translateX: position.x },
      { translateY: index * 8 },
      { scale: 1 - index * 0.02 },
      { rotate: position.x.interpolate({
          inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
          outputRange: ['-15deg', '0deg', '15deg'],
        }) },
    ],
    zIndex: 10 - index,
    position: 'absolute' as const,
    width: SCREEN_WIDTH - 48,
    left: 24,
    top: 0,
  };

  return (
    <Animated.View style={[styles.card, cardStyle]} {...panResponder.panHandlers}>
      <View style={styles.gradient} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sender}>{email.sender}</Text>
            <Text style={styles.time}>{email.time}</Text>
          </View>
          {!email.read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.subject}>{email.subject}</Text>
        <Text style={styles.preview}>{email.preview}</Text>
        <View style={styles.badgeRow}>
          {email.aiSummary.map((tag, idx) => (
            <Badge key={idx}>{tag}</Badge>
          ))}
        </View>
        <View style={styles.swipeIndicator}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    overflow: 'hidden',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  content: {
    padding: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sender: {
    fontWeight: '600',
    color: '#111827',
    fontSize: 20,
  },
  time: {
    color: '#6b7280',
    fontSize: 13,
    marginTop: 2,
  },
  subject: {
    fontWeight: '500',
    color: '#111827',
    fontSize: 18,
    marginBottom: 8,
  },
  preview: {
    color: '#374151',
    fontSize: 15,
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  unreadDot: {
    width: 12,
    height: 12,
    backgroundColor: '#3b82f6',
    borderRadius: 6,
    marginLeft: 8,
    marginTop: 2,
  },
  swipeIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#d1d5db',
    marginHorizontal: 2,
  },
});
