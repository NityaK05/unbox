// components/Email/SwipeableEmailCard.tsx
import React from 'react';
import {
  Animated,
  PanResponder,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Badge } from './Badge';
import { Email } from './types';

type Props = {
  email: Email;
  onSwipe: () => void;
  index: number;   // 0 = top (interactive)
  isTop: boolean;
};

export function SwipeableEmailCard({ email, onSwipe, index, isTop }: Props) {
  const { width } = useWindowDimensions();

  // horizontal translation only
  const x = React.useRef(new Animated.Value(0)).current;

  // once we complete a swipe, disable handlers to avoid post-unmount calls
  const disabledRef = React.useRef(false);

  const THRESH = width * 0.25;
  const OFF = width * 1.2;
  const INSET = 16;

  // When this card becomes top again, re-enable and reset translation
  React.useEffect(() => {
    if (isTop) {
      disabledRef.current = false;
      x.stopAnimation();
      x.setValue(0);
    }
  }, [isTop, x]);

  const finishSwipe = (toValue: number) => {
    disabledRef.current = true;
    Animated.timing(x, {
      toValue,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      onSwipe(); // parent removes the card
    });
  };

  // IMPORTANT: create PanResponder when `isTop` changes
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_evt, g) =>
          isTop && !disabledRef.current && Math.abs(g.dx) > 10,

        onPanResponderMove: (_evt, g) => {
          if (disabledRef.current) return;
          x.setValue(g.dx); // no Animated.event → avoids Hermes edge case
        },

        onPanResponderRelease: (_evt, g) => {
          if (disabledRef.current) return;
          const goRight = g.dx > THRESH || g.vx > 0.8;
          const goLeft = g.dx < -THRESH || g.vx < -0.8;

          if (goRight) return finishSwipe(OFF);
          if (goLeft) return finishSwipe(-OFF);

          Animated.spring(x, {
            toValue: 0,
            bounciness: 6,
            speed: 16,
            useNativeDriver: true,
          }).start();
        },

        onPanResponderTerminate: () => {
          if (disabledRef.current) return;
          Animated.spring(x, {
            toValue: 0,
            bounciness: 6,
            speed: 16,
            useNativeDriver: true,
          }).start();
        },
      }),
    [isTop, THRESH, OFF, x]
  );

  // subtle tilt for flair
  const rotate = x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['-8deg', '0deg', '8deg'],
  });

  // stacked deck look (translateY/scale by index)
  const cardStyle = {
    transform: [
      { translateX: x },
      { translateY: index * 8 },
      { scale: 1 - index * 0.02 },
      { rotate },
    ],
    zIndex: 10 - index,
    position: 'absolute' as const,
    left: INSET,
    right: INSET,
    top: INSET,
    bottom: INSET,
  };

  // stop any running animation on unmount
  React.useEffect(() => {
    return () => {
      x.stopAnimation();
      disabledRef.current = true;
    };
  }, [x]);

  return (
    <Animated.View
      style={[styles.card, cardStyle]}
      pointerEvents={isTop ? 'auto' : 'none'}
      {...(isTop ? panResponder.panHandlers : {})}
      accessibilityLabel={`Email from ${email.sender}, ${email.subject}`}
    >
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
    borderRadius: 24, // set to 0 for true edge-to-edge
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  content: {
    padding: 24,
    minHeight: 420,
    justifyContent: 'flex-start',
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
