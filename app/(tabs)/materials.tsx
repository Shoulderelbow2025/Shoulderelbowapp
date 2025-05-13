import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { CircleAlert as AlertCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

export default function MaterialsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.messageContainer}>
          <AlertCircle size={48} color={Colors.primary[500]} style={styles.icon} />
          <Text style={styles.title}>Materials Coming Soon</Text>
          <Text style={styles.message}>
            Congress materials, including presentations, papers, and educational resources, will be available here after the event.
          </Text>
          <Text style={styles.submessage}>
            Check back after May 30, 2025
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  content: {
    padding: Layout.spacing.m,
    flex: 1,
    justifyContent: 'center',
  },
  messageContainer: {
    backgroundColor: Colors.white,
    borderRadius: Layout.radius.medium,
    padding: Layout.spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  icon: {
    marginBottom: Layout.spacing.m,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: Colors.primary[700],
    marginBottom: Layout.spacing.m,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.neutral[700],
    textAlign: 'center',
    marginBottom: Layout.spacing.m,
    lineHeight: 24,
  },
  submessage: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.primary[500],
    textAlign: 'center',
  },
});