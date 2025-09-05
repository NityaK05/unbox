import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Badge } from './Badge';
import { Email } from './types';

interface EmailCardProps {
  email: Email;
  isCardView: boolean;
}

export function EmailCard({ email, isCardView }: EmailCardProps) {
  if (isCardView) {
    return (
      <View style={styles.cardView}>
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
      </View>
    );
  }
  return (
    <View style={styles.listView}>
      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={styles.headerRow}>
          <Text style={styles.sender} numberOfLines={1}>{email.sender}</Text>
          <Text style={styles.time}>{email.time}</Text>
        </View>
        <Text style={styles.subject} numberOfLines={1}>{email.subject}</Text>
        <Text style={styles.preview} numberOfLines={1}>{email.preview}</Text>
      </View>
      {!email.read && <View style={styles.unreadDot} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: '#fff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sender: {
    fontWeight: '600',
    color: '#111827',
    fontSize: 16,
  },
  time: {
    color: '#6b7280',
    fontSize: 12,
    marginLeft: 8,
  },
  subject: {
    fontWeight: '500',
    color: '#111827',
    fontSize: 15,
    marginBottom: 4,
  },
  preview: {
    color: '#6b7280',
    fontSize: 13,
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    backgroundColor: '#3b82f6',
    borderRadius: 4,
    marginLeft: 8,
    marginTop: 2,
  },
});
