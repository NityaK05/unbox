import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MailHeaderProps {
  isCardView: boolean;
  onToggleView: () => void;
  emailCount?: number;
}

export function MailHeader({ isCardView, onToggleView, emailCount = 0 }: MailHeaderProps) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>{isCardView ? 'Email Cards' : 'Mailbox'}</Text>
        <Text style={styles.subtitle}>
          {isCardView ? `${emailCount} cards to review` : `${emailCount} new messages`}
        </Text>
      </View>
      <TouchableOpacity onPress={onToggleView} style={styles.toggleBtn}>
        {isCardView ? (
          <Ionicons name="list" size={20} color="#374151" />
        ) : (
          <Ionicons name="grid" size={20} color="#374151" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    color: '#111827',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 13,
    marginTop: 2,
  },
  toggleBtn: {
    padding: 8,
    borderRadius: 8,
  },
});
