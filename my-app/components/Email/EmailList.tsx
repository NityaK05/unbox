import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { EmailCard } from './EmailCard';
import { Email } from './types';

interface EmailListProps {
  emails: Email[];
  isCardView: boolean;
}

export function EmailList({ emails, isCardView }: EmailListProps) {
  return (
    <ScrollView style={styles.scrollArea} contentContainerStyle={isCardView ? styles.cardPadding : undefined}>
      <View>
        {emails.map((email) => (
          <EmailCard key={email.id} email={email} isCardView={isCardView} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
  },
  cardPadding: {
    padding: 16,
  },
});
