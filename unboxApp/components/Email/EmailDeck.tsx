// components/Email/EmailDeck.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StyleSheetProperties } from 'react-native';
import { Email } from './types';
import { SwipeableEmailCard } from './SwipeableEmailCard';

interface EmailDeckProps {
  emails: Email[];
}

export function EmailDeck({ emails }: EmailDeckProps) {
  const [currentEmails, setCurrentEmails] = useState<Email[]>(emails);
  const [swipedIds, setSwipedIds] = useState<Set<string>>(new Set());

  const handleSwipe = (emailId: string) => {
    // mark as swiped and remove immediately for snappy UX
    setSwipedIds(prev => new Set(prev).add(emailId));
    setCurrentEmails(prev => prev.filter(e => e.id !== emailId));
  };

  const visibleEmails = useMemo(
    () => currentEmails.filter(e => !swipedIds.has(e.id)),
    [currentEmails, swipedIds]
  );

  if (visibleEmails.length === 0) {
    return (
      <View style={styles.emptyWrap}>
        <View style={styles.doneIcon}>
          <Text style={{ fontSize: 32 }}>✅</Text>
        </View>
        <Text style={styles.doneTitle}>All caught up!</Text>
        <Text style={styles.doneSubtitle}>You've reviewed all your emails.</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {/* Counter (centered) */}
      <View style={styles.counterWrap}>
        <View style={styles.counterPill}>
          <Text style={styles.counterText}>{visibleEmails.length} remaining</Text>
        </View>
      </View>

      {/* Deck area */}
      <View style={styles.deck}>
        {/* Two subtle peeking cards behind the active stack */}
        <View style={[styles.peek, { transform: [{ scale: 0.98 }, { translateY: 10 }] }]} />
        <View style={[styles.peek, { transform: [{ scale: 0.96 }, { translateY: 20 }] }]} />

        {/* Active + next cards */}
        {visibleEmails.slice(0, 3).map((email, index) => (
          <SwipeableEmailCard
            key={email.id}
            email={email}
            onSwipe={() => handleSwipe(email.id)}
            index={index}
            isTop={index === 0}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },

  // counter
  counterWrap: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  counterPill: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  counterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },

  // deck
  deck: {
    flex: 1,
    position: 'relative',
    // leave edges clean; cards handle their own inset
  },

  // peek layers behind the active card (give that stacked feel)
  peek: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 16,
    bottom: 16,
    borderRadius: 24,
    backgroundColor: '#fff',
    opacity: 0.9,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
  },

  // empty state
  emptyWrap: {
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

export default EmailDeck;
