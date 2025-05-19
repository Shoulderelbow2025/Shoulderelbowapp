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

  // Automatski bira putanju u zavisnosti od okruženja
  const getImageUrl = (relativePath: string | undefined) => {
    const base =
      process.env.NODE_ENV === 'development'
        ? ''
        : 'https://sess2025.netlify.app'; // ← tvoj Netlify URL
    return relativePath && relativePath !== ''
      ? `${base}${relativePath}`
      : `${base}/default.jpg`; // ← opcioni placeholder ako slika ne postoji
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.container}>
          <Image
            source={{ uri: getImageUrl(speaker.imageUrl) }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{speaker.name}</Text>
            <Text style={styles.institution}>{speaker.institution}</Text>
            <View style={styles.countryContainer}>
              <MapPin size={14} color={Colors.medium} />
              <Text style={styles.country}>{speaker.country}</Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    padding: 12,
  },
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  institution: {
    color: Colors.medium,
    fontSize: 13,
    marginTop: 4,
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  country: {
    color: Colors.medium,
    fontSize: 12,
    marginLeft: 4,
  },
});
