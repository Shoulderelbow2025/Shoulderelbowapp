import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin } from 'lucide-react-native';
import Card from './Card';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Speaker } from '@/types';

interface SpeakerCardProps {
  speaker: Speaker;
}

export default function SpeakerCard({ speaker }: SpeakerCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/speakers/${speaker.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.container}>
          <Image 
            source={{ 
              uri: speaker.imageUrl || '/b948952a-9356-4c77-8238-41ff8221f6d0.jpg'
            }} 
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{speaker.name}</Text>
            {speaker.title && (
              <Text style={styles.title}>{speaker.title}</Text>
            )}
            {speaker.institution && (
              <View style={styles.institutionContainer}>
                <MapPin size={14} color={Colors.neutral[600]} />
                <Text style={styles.institution}>{speaker.institution}</Text>
              </View>
            )}
            {speaker.topics && speaker.topics.length > 0 && (
              <View style={styles.topicsContainer}>
                {speaker.topics.map((topic, index) => (
                  <View key={index} style={styles.topicTag}>
                    <Text style={styles.topicText}>{topic}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Layout.spacing.m,
  },
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: Layout.radius.medium,
  },
  infoContainer: {
    flex: 1,
    marginLeft: Layout.spacing.m,
  },
  name: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: Colors.primary[700],
    marginBottom: Layout.spacing.xs,
  },
  title: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.primary[500],
    marginBottom: Layout.spacing.xs,
  },
  institutionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  institution: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginLeft: Layout.spacing.xs,
    flex: 1,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Layout.spacing.xs,
  },
  topicTag: {
    backgroundColor: Colors.primary[50],
    borderRadius: Layout.radius.small,
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 2,
    marginRight: Layout.spacing.xs,
    marginBottom: Layout.spacing.xs,
  },
  topicText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: Colors.primary[600],
  },
});