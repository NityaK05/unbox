/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar } from 'react-native';
import { MailHeader } from './components/Email/MailHeader';
import { EmailDeck } from './components/Email/EmailDeck';
import { EmailList } from './components/Email/EmailList';
import Ionicons from 'react-native-vector-icons/Ionicons';

const mockEmails = [
  {
    id: '1',
    sender: 'Apple',
    subject: 'Your Apple ID security update',
    preview: "We've updated our security protocols to better protect your account. Please review the changes in your account settings.",
    aiSummary: ['Security', 'Account Update', 'Action Required'],
    time: '2:34 PM',
    read: false,
  },
  {
    id: '2',
    sender: 'GitHub',
    subject: 'Weekly digest: 12 new notifications',
    preview: 'You have new activity on your repositories. Check out the latest pull requests, issues, and discussions.',
    aiSummary: ['Development', 'Weekly Update', 'Notifications'],
    time: '1:22 PM',
    read: false,
  },
  {
    id: '3',
    sender: 'Figma',
    subject: 'Design system updates available',
    preview: "New components and tokens have been added to your team's design system. Update your local files to get the latest changes.",
    aiSummary: ['Design', 'Update Available', 'Team'],
    time: '11:45 AM',
    read: true,
  },
  {
    id: '4',
    sender: 'LinkedIn',
    subject: 'You have 3 new connection requests',
    preview: 'Sarah Chen, Michael Rodriguez, and David Kim would like to connect with you on LinkedIn.',
    aiSummary: ['Networking', 'Connection Requests', 'Social'],
    time: '10:30 AM',
    read: false,
  },
  {
    id: '5',
    sender: 'Slack',
    subject: 'Daily standup reminder',
    preview: "Don't forget about today's standup meeting at 9:00 AM. The team is waiting for your updates on the current sprint.",
    aiSummary: ['Meeting', 'Reminder', 'Team'],
    time: '9:15 AM',
    read: true,
  },
  {
    id: '6',
    sender: 'Netflix',
    subject: 'New episodes of your favorite show',
    preview: "The latest season of 'Tech Innovators' is now available. Continue watching where you left off.",
    aiSummary: ['Entertainment', 'New Content', 'TV Show'],
    time: 'Yesterday',
    read: true,
  },
  {
    id: '7',
    sender: 'Bank of America',
    subject: 'Monthly statement ready',
    preview: 'Your October statement is now available for download. Review your transactions and account activity.',
    aiSummary: ['Banking', 'Statement', 'Monthly'],
    time: 'Yesterday',
    read: false,
  },
  {
    id: '8',
    sender: 'Spotify',
    subject: 'Your Discover Weekly is ready',
    preview: "We've curated 30 new songs based on your listening history. Discover your new favorite tracks.",
    aiSummary: ['Music', 'Personalized', 'Weekly'],
    time: 'Monday',
    read: true,
  },
];



export default function App() {
  const [isCardView, setIsCardView] = useState(true);

  const handleToggleView = () => {
    setIsCardView((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.root}>
        <MailHeader
          isCardView={isCardView}
          onToggleView={handleToggleView}
          emailCount={mockEmails.length}
        />
        <View style={styles.content}>
          {isCardView ? (
            <EmailDeck emails={mockEmails} />
          ) : (
            <EmailList emails={mockEmails} isCardView={false} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f3f4f6' },
  root: { flex: 1 },
  content: { flex: 1 },
});
