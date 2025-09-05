import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Email } from './types';
import { SwipeableEmailCard } from './SwipeableEmailCard';

interface EmailDeckProps {
  emails: Email[];
}

export function EmailDeck({ emails }: EmailDeckProps) {
  const [currentEmails, setCurrentEmails] = useState(emails);
  const [swipedIds, setSwipedIds] = useState<Set<string>>(new Set());

  const handleSwipe = (emailId: string) => {
    setSwipedIds(prev => new Set([...prev, emailId]));
    setTimeout(() => {
      setCurrentEmails(prev => prev.filter(email => email.id !== emailId));
    }, 300);
  };

  const visibleEmails = currentEmails.filter(email => !swipedIds.has(email.id));

  if (visibleEmails.length === 0) {
    return (
      <View style={styles.centered}>
        <View style={styles.doneIcon}>
          <Text style={{ fontSize: 32 }}>✅</Text>
        </View>
        <Text style={styles.doneTitle}>All caught up!</Text>
        <Text style={styles.doneSubtitle}>You've reviewed all your emails.</Text>
      </View>
    );
  }

  return (
    <View style={styles.deckContainer}>
      <View style={styles.cardStack}>
        {visibleEmails.slice(0, 3).map((email, index) => (
          <SwipeableEmailCard
            key={email.id}
            email={email}
            onSwipe={() => handleSwipe(email.id)}
            index={index}
          />
        ))}
      </View>
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{visibleEmails.length} remaining</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deckContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    position: 'relative',
    justifyContent: 'center',
  },
  cardStack: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterContainer: {
    position: 'absolute',
    top: 16,
    left: Dimensions.get('window').width / 2 - 60,
    width: 120,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 16,
    paddingVertical: 6,
    alignItems: 'center',
  },
  counterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  },
  doneIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  doneTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  doneSubtitle: {
    color: '#6b7280',
    fontSize: 14,
  },
});
